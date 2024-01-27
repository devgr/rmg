using Microsoft.AspNetCore.SignalR;

namespace Rmg;

public class GameHub : Hub
{
    public async Task ServerPing(string message)
    {
        Console.WriteLine(message);
        await Clients.All.SendAsync("clientPong", message);
    }

    public async Task CreateIsland(string name)
    {
        Island island = new()
        {
            Id = Guid.NewGuid(),
            Name = name
        };

        Repository.Islands.Add(island.Id, island);

        await Clients.Caller.SendAsync("islandCreated", island);
    }
}
