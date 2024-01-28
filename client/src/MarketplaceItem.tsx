import React, { useState } from "react";

type MarketplaceItemProps = {
  id: string;
  resource: string;
  colorClass: string;
  price: number;
  buySellFunc: (id: string, quantity: number) => void;
};

export const MarketplaceItem: React.FC<MarketplaceItemProps> = ({
  id,
  resource,
  colorClass,
  price,
  buySellFunc,
}) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <tr>
      <td>
        <span className={colorClass}>{resource}</span>
      </td>
      <td>
        {price} <span className={"gold"}>Gold</span>
      </td>
      <td>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
        />
        &nbsp;<a onClick={() => buySellFunc(id, quantity)}>Buy</a>
        &nbsp;<a onClick={() => buySellFunc(id, -quantity)}>Sell</a>
      </td>
    </tr>
  );
};
