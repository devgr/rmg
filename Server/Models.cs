namespace Rmg;

public record Empire
{
    public required Guid Id { get; set; }
    public required string Name { get; set; }
    public required DateTime LastUpdate { get; set; }
    public int Laughter { get; set; } = 100;
    public int Citizens { get; set; } = 10;
    public int Food { get; set; } = 100;
    public int Housing { get; set; } = 10;
    public int RawMaterials { get; set; } = 0;
    public int Energy { get; set; } = 50;
    public int Tools { get; set; } = 0;
    public int ManufacturedGoods { get; set; } = 0;
    public int Weapons { get; set; } = 0;
    public int Soldiers { get; set; } = 0;
    public int LuxuryGoods { get; set; } = 0;
    public int Gold { get; set; } = 0;
    public int Strength { get; set; } = 0;

    public List<Notification> Notifications { get; set; } = [];
}

public record Notification
{
    public required Guid Id { get; set; }
    public required string Message { get; set; }
}

public record OtherEmpire
{
    public required Guid Id { get; set; }
    public required string Name { get; set; }
    public int Strength { get; set; } = 0;
}
