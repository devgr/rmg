using Microsoft.AspNetCore.SignalR;

namespace Rmg;

public class GameHub : Hub
{
    public async Task CreateEmpire(string name)
    {
        Empire empire = new()
        {
            Id = Guid.NewGuid(),
            Name = name,
            LastUpdate = DateTime.UtcNow
        };

        Repository.Empires.Add(empire.Id, empire);

        await Clients.Caller.SendAsync("empireSynced", empire);
    }

    public void DeleteEmpire(Guid id)
    {
        Repository.Empires.Remove(id);
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
}
