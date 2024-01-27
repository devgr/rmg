namespace Rmg;

public static class Engine
{
    public const int TimeScale = 5; // Number of seconds per tick
    public static void UpdateEmpire(Empire empire)
    {
        TimeSpan time = DateTime.UtcNow - empire.LastUpdate;
        int ticks = (int)time.TotalSeconds / TimeScale;

        int foodRequired = (empire.Citizens + empire.Soldiers) / 2 * ticks;
        empire.Food = foodRequired > empire.Food ? 0 : empire.Food - foodRequired;

        int energyRequired = ((int)(empire.Citizens * .25) + empire.Soldiers) * ticks;
        empire.Energy = energyRequired > empire.Energy ? 0 : empire.Energy - energyRequired;

        empire.Laughter += LaughterPerTick(empire) * ticks;

        if (empire.Laughter > 0 && empire.Housing > empire.Citizens && empire.Food > 0 && empire.Energy > 0)
        {
            int min = empire.Housing;
            if (empire.Food < min)
                min = empire.Food;
            if (empire.Energy < min)
                min = empire.Energy;

            empire.Citizens += min;
            empire.Food -= min;
            empire.Energy -= min;
        }

        empire.Strength = StrengthScore(empire);

        empire.LastUpdate = DateTime.UtcNow;
    }

    private static int StrengthScore(Empire empire)
    {
        return empire.Soldiers + empire.Gold / 2 + empire.Laughter / 10 + empire.Food / 10 + empire.Energy / 5;
    }

    private static int LaughterPerTick(Empire empire)
    {
        double laughs = empire.Citizens;

        if (empire.Soldiers >= empire.Citizens)
            laughs *= .5;

        if (empire.LuxuryGoods > empire.Citizens)
            laughs *= 2;
        else if (empire.LuxuryGoods > empire.Citizens / 2.0)
            laughs *= 1.5;

        if (empire.Housing < empire.Citizens)
            laughs *= .75;

        if (empire.Energy <= 0)
            laughs *= .25;

        if (empire.Food <= 0)
            laughs *= .1;

        if (empire.Gold >= 100 * empire.Citizens && empire.Gold < 1000 * empire.Citizens)
            laughs *= 1.5;

        return (int)laughs;
    }
}
