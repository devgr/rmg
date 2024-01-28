import React, { useEffect, useState } from "react";
import { getConnection } from "./signalRConnection";
import { Empire, MarketplacePrices } from "./types";
import { MarketplaceItem } from "./MarketplaceItem";

type MarketplaceProps = {
  id: string;
  prices: MarketplacePrices;
};

export const Marketplace: React.FC<MarketplaceProps> = ({ id, prices }) => {
  const {
    buySellFood,
    buySellRawMaterials,
    buySellEnergy,
    buySellTools,
    buySellManufacturedGoods,
    buySellWeapons,
    buySellLuxuryGoods,
  } = getConnection();

  return (
    <>
      <table>
        <tbody>
          <MarketplaceItem
            id={id}
            resource={"Food"}
            colorClass={"food"}
            price={prices.food}
            buySellFunc={buySellFood}
          />
          <MarketplaceItem
            id={id}
            resource={"Energy"}
            colorClass={"energy"}
            price={prices.energy}
            buySellFunc={buySellEnergy}
          />
          <MarketplaceItem
            id={id}
            resource={"Raw Materials"}
            colorClass={"raw-materials"}
            price={prices.rawMaterials}
            buySellFunc={buySellRawMaterials}
          />
          <MarketplaceItem
            id={id}
            resource={"Tools"}
            colorClass={"tools"}
            price={prices.tools}
            buySellFunc={buySellTools}
          />
          <MarketplaceItem
            id={id}
            resource={"Manufactured Goods"}
            colorClass={"manufactured-goods"}
            price={prices.manufacturedGoods}
            buySellFunc={buySellManufacturedGoods}
          />
          <MarketplaceItem
            id={id}
            resource={"Weapons"}
            colorClass={"weapons"}
            price={prices.weapons}
            buySellFunc={buySellWeapons}
          />
          <MarketplaceItem
            id={id}
            resource={"Luxury Goods"}
            colorClass={"luxury-goods"}
            price={prices.luxuryGoods}
            buySellFunc={buySellLuxuryGoods}
          />
        </tbody>
      </table>
    </>
  );
};
