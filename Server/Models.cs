namespace Rmg;

public record Empire
{
    public required Guid Id { get; set; }
    public required string Name { get; set; }
    public required DateTime LastUpdate { get; set; }
    public int Laughter { get; set; } = 1;
    public int Citizens { get; set; } = 1;
    public int Food { get; set; } = 0;
    public int Housing { get; set; } = 0;
    public int RawMaterials { get; set; } = 0;
    public int Energy { get; set; } = 0;
    public int Tools { get; set; } = 0;
    public int ManufacturedGoods { get; set; } = 0;
    public int Weapons { get; set; } = 0;
    public int Soldiers { get; set; } = 0;
    public int LuxuryGoods { get; set; } = 0;
    public int Gold { get; set; } = 0;
}
