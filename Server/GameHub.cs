using Microsoft.AspNetCore.SignalR;

namespace Rmg;

public class GameHub : Hub
{
    public async Task ServerPing(string message)
    {
        Console.WriteLine(message);
        await Clients.All.SendAsync("clientPong", message);
    }

    public async Task CreateEmpire(string name)
    {
        Empire empire = new()
        {
            Id = Guid.NewGuid(),
            Name = name,
            LastUpdate = DateTime.UtcNow
        };

        Repository.Empires.Add(empire.Id, empire);

        await Clients.Caller.SendAsync("empireCreated", empire);
    }

    public void DeleteEmpire(Guid id)
    {
        Repository.Empires.Remove(id);
    }

    public async Task SyncEmpire(Guid id)
    {
        if (Repository.Empires.ContainsKey(id))
        {
            Empire empire = Repository.Empires[id];
            // TODO: Race conditions are a known issue.
            Engine.UpdateEmpire(empire);
            await Clients.Caller.SendAsync("empireSynced", empire);
        }
    }
}
