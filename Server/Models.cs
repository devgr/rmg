namespace Rmg;

using DateQuantity = (DateTime Date, int Quantity);

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
    public required MarketplacePrices Prices { get; set; }
}

public record Notification
{
    public required Guid Id { get; set; }
    public required string Message { get; set; }
}

public record MarketplacePrices
{
    public int Food { get; set; } = 10;
    public int RawMaterials { get; set; } = 20;
    public int Energy { get; set; } = 10;
    public int Tools { get; set; } = 30;
    public int ManufacturedGoods { get; set; } = 40;
    public int Weapons { get; set; } = 50;
    public int LuxuryGoods { get; set; } = 60;
}

public record TrackingPrices
{
    public double Food { get; set; } = 10;
    public double RawMaterials { get; set; } = 20;
    public double Energy { get; set; } = 10;
    public double Tools { get; set; } = 30;
    public double ManufacturedGoods { get; set; } = 40;
    public double Weapons { get; set; } = 50;
    public double LuxuryGoods { get; set; } = 60;
}

public record PriceHistory
{
    public List<DateQuantity> Food { get; set; } = [];
    public List<DateQuantity> RawMaterials { get; set; } = [];
    public List<DateQuantity> Energy { get; set; } = [];
    public List<DateQuantity> Tools { get; set; } = [];
    public List<DateQuantity> ManufacturedGoods { get; set; } = [];
    public List<DateQuantity> Weapons { get; set; } = [];
    public List<DateQuantity> LuxuryGoods { get; set; } = [];
}

public record OtherEmpire
{
    public required Guid Id { get; set; }
    public required string Name { get; set; }
    public int Strength { get; set; } = 0;
}
