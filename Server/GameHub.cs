using Microsoft.AspNetCore.SignalR;

namespace Rmg;

public class GameHub : Hub
{
    private static Dictionary<Guid, string> empireClientMap = [];
    public async Task CreateEmpire(string name)
    {
        Empire empire = new()
        {
            Id = Guid.NewGuid(),
            Name = name,
            LastUpdate = DateTime.UtcNow
        };

        Repository.Empires.Add(empire.Id, empire);

        empireClientMap.Add(empire.Id, Context.ConnectionId);

        await Clients.Caller.SendAsync("empireSynced", empire);
    }

    public void DeleteEmpire(Guid id)
    {
        Repository.Empires.Remove(id);
    }

    public async void RequestEmpires(Guid except)
    {
        IEnumerable<OtherEmpire> others = Repository.Empires
            .Where(x => x.Key != except && x.Value.Strength > 0)
            .Select(x =>
            {
                return new OtherEmpire
                {
                    Id = x.Value.Id,
                    Name = x.Value.Name,
                    Strength = x.Value.Strength
                };
            });

        await Clients.Caller.SendAsync("empiresRequested", others);
    }

    public async void Attack(Guid from, Guid to, int risk)
    {
        Empire me = Repository.Empires[from];
        Empire them = Repository.Empires[to];

        Random random = new();
        double result = random.NextDouble();

        double difference = (me.Strength - them.Strength) / (double)me.Strength;
        double mitigationFactor = risk / 10.0;
        double mitigatedDiff = difference * mitigationFactor;
        result += mitigatedDiff;

        double damageFactor = Math.Abs(result - .5);
        string resultType = damageFactor > .25 ? "major" : "minor";

        if (result > .5)
        {
            them.Soldiers = (int)(them.Soldiers * damageFactor);
            them.Laughter = (int)(them.Laughter * damageFactor);

            if (them.Soldiers <= 0)
            {
                them.Citizens = (int)(them.Citizens * damageFactor * .5);
                them.Housing = (int)(them.Housing * damageFactor * .5);
            }

            them.Notifications.Add(new Notification
            {
                Id = Guid.NewGuid(),
                Message = $"Your empire was attacked by {me.Name}! You suffered a {resultType} defeat."
            });
            me.Notifications.Add(new Notification
            {
                Id = Guid.NewGuid(),
                Message = $"You attacked {them.Name}! You achieved a {resultType} victory."
            });
        }
        else
        {
            me.Soldiers = (int)(me.Soldiers * damageFactor);
            me.Laughter = (int)(me.Laughter * damageFactor);

            if (me.Soldiers <= 0)
            {
                me.Citizens = (int)(me.Citizens * damageFactor * .5);
                me.Housing = (int)(me.Housing * damageFactor * .5);
            }

            them.Notifications.Add(new Notification
            {
                Id = Guid.NewGuid(),
                Message = $"Your empire was attacked by {me.Name}! You achieved a {resultType} victory."
            });
            me.Notifications.Add(new Notification
            {
                Id = Guid.NewGuid(),
                Message = $"You attacked {them.Name}! You suffered a {resultType} defeat."
            });
        }

        Engine.UpdateEmpire(me);
        Engine.UpdateEmpire(them);

        await Clients.Caller.SendAsync("empireSynced", me);

        string theirClientId = empireClientMap[them.Id];
        var client = Clients.Clients(theirClientId);
        if (client is not null)
            await client.SendAsync("empireSynced", them);
    }

    public void DismissNotification(Guid empireId, Guid notificationId)
    {
        Empire empire = Repository.Empires[empireId];
        empire.Notifications.RemoveAll(x => x.Id == notificationId);
    }

    public async Task SyncEmpire(Guid id)
    {
        // TODO validation of course
        Empire empire = Repository.Empires[id];
        // TODO: Race conditions are a known issue.
        Engine.UpdateEmpire(empire);
        await Clients.Caller.SendAsync("empireSynced", empire);
    }

    public async Task CraftFood(Guid id, int amount)
    {
        Empire empire = Repository.Empires[id];
        if (amount % 2 == 1)
            amount -= 1;

        if (amount > 0)
        {
            int cost = amount / 2;
            if (empire.Laughter >= cost)
            {
                empire.Food += amount;
                empire.Laughter -= cost;

                await Clients.Caller.SendAsync("empireSynced", empire);
            }
        }
    }

    public async Task CraftHousing(Guid id, int amount)
    {
        Empire empire = Repository.Empires[id];

        int laughterCost = 2 * amount;
        int rawMatCost = 2 * amount;
        int energyCost = 2 * amount;

        if (empire.Laughter >= laughterCost &&
            empire.RawMaterials >= rawMatCost &&
            empire.Energy >= energyCost)
        {
            empire.Housing += amount;
            empire.Laughter -= laughterCost;
            empire.RawMaterials -= rawMatCost;
            empire.Energy -= energyCost;

            await Clients.Caller.SendAsync("empireSynced", empire);
        }
    }

    public async Task CraftRawMaterials(Guid id, int amount)
    {
        Empire empire = Repository.Empires[id];

        if (empire.Laughter >= amount)
        {
            empire.RawMaterials += amount;
            empire.Laughter -= amount;

            await Clients.Caller.SendAsync("empireSynced", empire);
        }
    }

    public async Task CraftEnergy(Guid id, int amount)
    {
        Empire empire = Repository.Empires[id];

        if (empire.Laughter >= amount)
        {
            empire.Energy += amount;
            empire.Laughter -= amount;

            await Clients.Caller.SendAsync("empireSynced", empire);
        }
    }

    public async Task CraftTools(Guid id, int amount)
    {
        Empire empire = Repository.Empires[id];

        int rawMatCost = 2 * amount;
        int energyCost = 2 * amount;

        if (empire.RawMaterials >= rawMatCost &&
            empire.Energy >= energyCost)
        {
            empire.Tools += amount;
            empire.RawMaterials -= rawMatCost;
            empire.Energy -= energyCost;

            await Clients.Caller.SendAsync("empireSynced", empire);
        }
    }

    public async Task CraftManufacturedGoods(Guid id, int amount)
    {
        Empire empire = Repository.Empires[id];

        int rawMatCost = 2 * amount;
        int energyCost = 2 * amount;
        int toolCost = amount;

        if (empire.RawMaterials >= rawMatCost &&
            empire.Energy >= energyCost &&
            empire.Tools >= toolCost)
        {
            empire.ManufacturedGoods += amount;
            empire.RawMaterials -= rawMatCost;
            empire.Energy -= energyCost;
            empire.Tools -= toolCost;

            await Clients.Caller.SendAsync("empireSynced", empire);
        }
    }

    public async Task CraftWeapons(Guid id, int amount)
    {
        Empire empire = Repository.Empires[id];

        int cost = amount * 2;
        if (empire.ManufacturedGoods >= cost)
        {
            empire.Weapons += amount;
            empire.ManufacturedGoods -= cost;
        }

        await Clients.Caller.SendAsync("empireSynced", empire);
    }

    public async Task CraftSoldiers(Guid id, int amount)
    {
        Empire empire = Repository.Empires[id];

        int citizenCost = amount;
        int energyCost = 2 * amount;
        int laughterCost = 5 * amount;

        if (empire.Citizens >= citizenCost &&
            empire.Energy >= energyCost &&
            empire.Laughter >= laughterCost)
        {
            empire.Soldiers += amount;
            empire.Citizens -= citizenCost;
            empire.Energy -= energyCost;
            empire.Laughter -= laughterCost;

            await Clients.Caller.SendAsync("empireSynced", empire);
        }
    }

    public async Task CraftLuxuryGoods(Guid id, int amount)
    {
        Empire empire = Repository.Empires[id];

        int rawMatCost = amount;
        int energyCost = 3 * amount;
        int manufacturedCost = amount;

        if (empire.RawMaterials >= rawMatCost &&
            empire.Energy >= energyCost &&
            empire.ManufacturedGoods >= manufacturedCost)
        {
            empire.Soldiers += amount;
            empire.RawMaterials -= rawMatCost;
            empire.Energy -= energyCost;
            empire.ManufacturedGoods -= manufacturedCost;

            await Clients.Caller.SendAsync("empireSynced", empire);
        }
    }

    private async Task SyncEmpire(Empire other)
    {
        string theirClientId = empireClientMap[other.Id];
        var client = Clients.Clients(theirClientId);
        if (client is not null)
            await client.SendAsync("empireSynced", other);
    }

    public async Task GiftFood(Guid from, Guid to, int amount)
    {
        Empire me = Repository.Empires[from];
        Empire them = Repository.Empires[to];

        if (me.Food >= amount)
        {
            me.Food -= amount;
            them.Food += amount;
            await Clients.Caller.SendAsync("empireSynced", me);

            await SyncEmpire(them);
        }
    }
    public async Task GiftHousing(Guid from, Guid to, int amount)
    {
        Empire me = Repository.Empires[from];
        Empire them = Repository.Empires[to];

        if (me.Housing >= amount)
        {
            me.Housing -= amount;
            them.Housing += amount;
            await Clients.Caller.SendAsync("empireSynced", me);

            await SyncEmpire(them);
        }
    }
    public async Task GiftRawMaterials(Guid from, Guid to, int amount)
    {
        Empire me = Repository.Empires[from];
        Empire them = Repository.Empires[to];

        if (me.RawMaterials >= amount)
        {
            me.RawMaterials -= amount;
            them.RawMaterials += amount;
            await Clients.Caller.SendAsync("empireSynced", me);

            await SyncEmpire(them);
        }
    }
    public async Task GiftEnergy(Guid from, Guid to, int amount)
    {
        Empire me = Repository.Empires[from];
        Empire them = Repository.Empires[to];

        if (me.Energy >= amount)
        {
            me.Energy -= amount;
            them.Energy += amount;
            await Clients.Caller.SendAsync("empireSynced", me);

            await SyncEmpire(them);
        }
    }
    public async Task GiftTools(Guid from, Guid to, int amount)
    {
        Empire me = Repository.Empires[from];
        Empire them = Repository.Empires[to];

        if (me.Tools >= amount)
        {
            me.Tools -= amount;
            them.Tools += amount;
            await Clients.Caller.SendAsync("empireSynced", me);

            await SyncEmpire(them);
        }
    }
    public async Task GiftManufacturedGoods(Guid from, Guid to, int amount)
    {
        Empire me = Repository.Empires[from];
        Empire them = Repository.Empires[to];

        if (me.ManufacturedGoods >= amount)
        {
            me.ManufacturedGoods -= amount;
            them.ManufacturedGoods += amount;
            await Clients.Caller.SendAsync("empireSynced", me);

            await SyncEmpire(them);
        }
    }
    public async Task GiftWeapons(Guid from, Guid to, int amount)
    {
        Empire me = Repository.Empires[from];
        Empire them = Repository.Empires[to];

        if (me.Weapons >= amount)
        {
            me.Weapons -= amount;
            them.Weapons += amount;
            await Clients.Caller.SendAsync("empireSynced", me);

            await SyncEmpire(them);
        }
    }
    public async Task GiftSoldiers(Guid from, Guid to, int amount)
    {
        Empire me = Repository.Empires[from];
        Empire them = Repository.Empires[to];

        if (me.Soldiers >= amount)
        {
            me.Soldiers -= amount;
            them.Soldiers += amount;
            await Clients.Caller.SendAsync("empireSynced", me);

            await SyncEmpire(them);
        }
    }
    public async Task GiftLuxuryGoods(Guid from, Guid to, int amount)
    {
        Empire me = Repository.Empires[from];
        Empire them = Repository.Empires[to];

        if (me.LuxuryGoods >= amount)
        {
            me.LuxuryGoods -= amount;
            them.LuxuryGoods += amount;
            await Clients.Caller.SendAsync("empireSynced", me);

            await SyncEmpire(them);
        }
    }
}
