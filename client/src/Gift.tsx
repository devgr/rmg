import React, { useEffect, useState } from "react";
import { getConnection } from "./signalRConnection";
import { Empire, OtherEmpire } from "./types";

type GiftProps = {
  id: string;
  others: OtherEmpire[];
  value: number;
  resource: string;
};

export const Gift: React.FC<GiftProps> = ({ id, others, value, resource }) => {
  const {
    giftFood,
    giftHousing,
    giftRawMaterials,
    giftEnergy,
    giftTools,
    giftManufacturedGoods,
    giftWeapons,
    giftSoldiers,
    giftLuxuryGoods,
  } = getConnection();

  const map: Record<
    string,
    (from: string, to: string, amount: number) => void
  > = {
    food: giftFood,
    housing: giftHousing,
    rawMaterials: giftRawMaterials,
    energy: giftEnergy,
    tools: giftTools,
    manufacturedGoods: giftManufacturedGoods,
    weapons: giftWeapons,
    soldiers: giftSoldiers,
    luxuryGoods: giftLuxuryGoods,
  };

  const clicked = (otherId: string) => {
    map[resource](id, otherId, value);
  };

  return (
    <details data-popover="down">
      <summary>Gift...</summary>
      <div>
        {others.map((x) => (
          <p key={x.id}>
            <a onClick={() => clicked(x.id)}>{x.name}</a>
          </p>
        ))}
      </div>
    </details>
  );
};
