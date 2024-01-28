namespace Rmg;

using DateQuantity = (DateTime Date, int Quantity);

public static class Repository
{
    public static Dictionary<Guid, Empire> Empires = [];

    public static MarketplacePrices Prices = new();
    public static TrackingPrices Tracking = new();

    public static PriceHistory History = new();

    public static void RecordHistory(List<DateQuantity> list, DateTime date, int quantity)
    {
        list.Add((date, quantity));
        list.RemoveAt(0);
    }

    public static double CalcPrice(List<DateQuantity> list, double currPrice)
    {
        // positive quantity means demand
        // negative quantity means too much supply
        // if quantity is higher in latest 5 than previous 5, price up
        // if time from 6 to 10 is shorter than 1 to 5, price up more
        // use percent difference between halves to multiply price
        int totalOldQuantity = 0;
        for (int i = 0; i < 5; i++)
        {
            totalOldQuantity += list[i].Quantity;
        }

        double olderQuantityAvg = totalOldQuantity / 5.0;

        int totalNewQuantity = 0;
        for (int i = 5; i < 10; i++)
        {
            totalNewQuantity += list[i].Quantity;
        }

        double newerQuantityAvg = totalNewQuantity / 5.0;

        double quantityFactor = newerQuantityAvg != 0 ? (newerQuantityAvg - olderQuantityAvg) / Math.Abs(newerQuantityAvg) : 0;

        // Console.WriteLine($"totalOldQuantity {totalOldQuantity}");
        // Console.WriteLine($"olderQuantityAvg {olderQuantityAvg}");
        // Console.WriteLine($"totalNewQuantity {totalNewQuantity}");
        // Console.WriteLine($"newerQuantityAvg {newerQuantityAvg}");
        // Console.WriteLine($"quantityFactor {quantityFactor}");


        // double olderTime = (list[list.Count / 2 - 1].Date - list[0].Date).TotalSeconds;
        // double newerTime = (list[list.Count - 1].Date - list[list.Count / 2 - 1].Date).TotalSeconds;

        // if (newerTime < olderTime)
        //     quantityFactor *= 2;
        // else if (newerTime > olderTime)
        //     quantityFactor *= .5;

        double quantityDiff = 1 + quantityFactor;
        if (quantityDiff > 1.5)
            quantityDiff = 1.5;
        if (quantityDiff < .5)
            quantityDiff = .5;
        double price = currPrice * quantityDiff;

        if (price < 1)
            return 1;

        return price;
    }

    static Repository()
    {
        SetDefaults(History.Energy);
        SetDefaults(History.Food);
        SetDefaults(History.RawMaterials);
        SetDefaults(History.Tools);
        SetDefaults(History.ManufacturedGoods);
        SetDefaults(History.Weapons);
        SetDefaults(History.LuxuryGoods);
    }

    public static void SetDefaults(List<DateQuantity> list)
    {
        DateTime now = DateTime.UtcNow;
        for (int i = 0; i < 10; i++)
        {
            list.Add((now, i % 2 == 0 ? 10 : -10));
        }
    }
}
