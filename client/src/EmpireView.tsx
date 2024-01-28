import React, { useEffect, useState } from "react";
import { getConnection } from "./signalRConnection";
import { Switcher, Empire, Views, OtherEmpire } from "./types";
import { War } from "./War";
import { Notifications } from "./Notifications";
import { Gift } from "./Gift";

type EmpireViewProps = {
  switcher: Switcher;
  id: string;
};

export const EmpireView: React.FC<EmpireViewProps> = ({ switcher, id }) => {
  const {
    syncEmpire,
    subEmpireSynced,
    craftFood,
    craftHousing,
    craftRawMaterials,
    craftEnergy,
    craftTools,
    craftManufacturedGoods,
    craftWeapons,
    craftSoldiers,
    craftLuxuryGoods,
    requestEmpires,
    subEmpiresRequested,
  } = getConnection();

  const [empire, setEmpire] = useState<Empire | null>(null);
  const [foodShop, setFoodShop] = useState(2);
  const [housingShop, setHousingShop] = useState(1);
  const [rawMaterialsShop, setRawMaterialsShop] = useState(1);
  const [energyShop, setEnergyShop] = useState(1);
  const [toolsShop, setToolsShop] = useState(1);
  const [manufacturedGoodsShop, setManufacturedGoodsShop] = useState(1);
  const [weaponsShop, setWeaponsShop] = useState(1);
  const [soldiersShop, setSoldiersShop] = useState(1);
  const [luxuryGoodsShop, setLuxuryGoodsShop] = useState(1);

  const [showTips, setShowTips] = useState(false);
  const [showWar, setShowWar] = useState(false);

  const [notifications, setNotifications] = useState(empire?.notifications);

  useEffect(() => {
    if (!empire) {
      syncEmpire(id);
    }
  });

  useEffect(() => {
    const cleanup = subEmpireSynced((i) => {
      setEmpire(i);
      setNotifications(i.notifications);
    });

    return () => cleanup();
  });

  useEffect(() => {
    const interval = setInterval(() => {
      syncEmpire(id);
    }, 5001);

    return () => clearInterval(interval);
  });

  const [otherEmpires, setOtherEmpires] = useState<OtherEmpire[] | null>(null);

  useEffect(() => {
    if (!otherEmpires) {
      requestEmpires(id);
    }
  });

  useEffect(() => {
    const cleanup = subEmpiresRequested((others: OtherEmpire[]) => {
      setOtherEmpires(others);
    });

    return () => cleanup();
  });

  return (
    <>
      <div>
        <a onClick={() => switcher(Views.MyEmpires)}>&#60; Back</a>
      </div>
      <br />
      {empire && (
        <div>
          <p>{empire.name}</p>
          <p>{[...empire.name].map((_) => "=")}</p>
          <br />
          <Notifications
            empire={empire}
            notifications={notifications}
            setNotifications={setNotifications}
          />
          <table>
            <tbody>
              <tr>
                <td className={empire.laughter < 100 ? "warning" : ""}>
                  {empire.laughter}
                </td>
                <td>
                  <span className={"laughter"}>Laughter</span>
                </td>
              </tr>
              <tr>
                <td>{empire.citizens}</td>
                <td>
                  <span className={"citizens"}>Citizens</span>
                </td>
              </tr>
              <tr>
                <td>{empire.gold}</td>
                <td>
                  <span className={"gold"}>Gold</span>
                </td>
              </tr>
            </tbody>
          </table>
          <br />
          <table>
            <tbody>
              <tr>
                <td className={empire.food <= empire.citizens ? "warning" : ""}>
                  {empire.food}
                </td>
                <td>
                  <span className={"food"}>Food</span>
                </td>
                <td>
                  <input
                    type="number"
                    value={foodShop}
                    onChange={(e) => setFoodShop(parseInt(e.target.value))}
                  />
                  &nbsp;<a onClick={() => craftFood(id, foodShop)}>Craft</a>
                  &nbsp;
                  {otherEmpires && (
                    <Gift
                      id={id}
                      others={otherEmpires}
                      value={foodShop}
                      resource={"food"}
                    />
                  )}
                </td>
                <td>&nbsp;</td>
                <td>
                  1 <span className={"laughter"}>Laughter</span> -&#62; 2{" "}
                  <span className={"food"}>Food</span>
                </td>
              </tr>
              <tr>
                <td
                  className={
                    empire.energy <= empire.citizens / 2 ? "warning" : ""
                  }
                >
                  {empire.energy}
                </td>
                <td>
                  <span className={"energy"}>Energy</span>
                </td>
                <td>
                  <input
                    type="number"
                    value={energyShop}
                    onChange={(e) => setEnergyShop(parseInt(e.target.value))}
                  />
                  &nbsp;<a onClick={() => craftEnergy(id, energyShop)}>Craft</a>
                  &nbsp;
                  {otherEmpires && (
                    <Gift
                      id={id}
                      others={otherEmpires}
                      value={foodShop}
                      resource={"energy"}
                    />
                  )}
                </td>
                <td>&nbsp;</td>
                <td>
                  1 <span className={"laughter"}>Laughter</span> -&#62; 1{" "}
                  <span className={"energy"}>Energy</span>
                </td>
              </tr>
              <tr>
                <td>{empire.rawMaterials}</td>
                <td>
                  <span className={"raw-materials"}>Raw Materials</span>
                </td>
                <td>
                  <input
                    type="number"
                    value={rawMaterialsShop}
                    onChange={(e) =>
                      setRawMaterialsShop(parseInt(e.target.value))
                    }
                  />
                  &nbsp;
                  <a onClick={() => craftRawMaterials(id, rawMaterialsShop)}>
                    Craft
                  </a>
                  &nbsp;
                  {otherEmpires && (
                    <Gift
                      id={id}
                      others={otherEmpires}
                      value={foodShop}
                      resource={"rawMaterials"}
                    />
                  )}
                </td>
                <td>&nbsp;</td>
                <td>
                  1 <span className={"laughter"}>Laughter</span> -&#62; 1{" "}
                  <span className={"raw-materials"}>Raw Material</span>
                </td>
              </tr>
              <tr>
                <td
                  className={empire.housing < empire.citizens ? "warning" : ""}
                >
                  {empire.housing}
                </td>
                <td>
                  <span className={"housing"}>Housing</span>
                </td>
                <td>
                  <input
                    type="number"
                    value={housingShop}
                    onChange={(e) => setHousingShop(parseInt(e.target.value))}
                  />
                  &nbsp;
                  <a onClick={() => craftHousing(id, housingShop)}>Craft</a>
                  &nbsp;
                  {otherEmpires && (
                    <Gift
                      id={id}
                      others={otherEmpires}
                      value={foodShop}
                      resource={"housing"}
                    />
                  )}
                </td>
                <td>&nbsp;</td>
                <td>
                  2 <span className={"laughter"}>Laughter</span> + 2{" "}
                  <span className={"raw-materials"}>Raw Materials</span> + 2{" "}
                  <span className={"energy"}>Energy</span> -&#62; 1{" "}
                  <span className={"housing"}>Housing</span>
                </td>
              </tr>
              <tr>
                <td>{empire.tools}</td>
                <td>
                  <span className={"tools"}>Tools</span>
                </td>
                <td>
                  <input
                    type="number"
                    value={toolsShop}
                    onChange={(e) => setToolsShop(parseInt(e.target.value))}
                  />
                  &nbsp;<a onClick={() => craftTools(id, toolsShop)}>Craft</a>
                  &nbsp;
                  {otherEmpires && (
                    <Gift
                      id={id}
                      others={otherEmpires}
                      value={foodShop}
                      resource={"tools"}
                    />
                  )}
                </td>
                <td>&nbsp;</td>
                <td>
                  2 <span className={"raw-materials"}>Raw Materials</span> + 2{" "}
                  <span className={"energy"}>Energy</span> -&#62; 1{" "}
                  <span className={"tools"}>Tool</span>
                </td>
              </tr>
              <tr>
                <td>{empire.manufacturedGoods}</td>
                <td>
                  <span className={"manufactured-goods"}>
                    Manufactured Goods
                  </span>
                </td>
                <td>
                  <input
                    type="number"
                    value={manufacturedGoodsShop}
                    onChange={(e) =>
                      setManufacturedGoodsShop(parseInt(e.target.value))
                    }
                  />
                  &nbsp;
                  <a
                    onClick={() =>
                      craftManufacturedGoods(id, manufacturedGoodsShop)
                    }
                  >
                    Craft
                  </a>
                  &nbsp;
                  {otherEmpires && (
                    <Gift
                      id={id}
                      others={otherEmpires}
                      value={foodShop}
                      resource={"manufacturedGoods"}
                    />
                  )}
                </td>
                <td>&nbsp;</td>
                <td>
                  2 <span className={"raw-materials"}>Raw Materials</span> + 2{" "}
                  <span className={"energy"}>Energy</span> + 1{" "}
                  <span className={"tools"}>Tools</span> -&#62; 1{" "}
                  <span className={"manufactured-goods"}>
                    Manufactured Good
                  </span>
                </td>
              </tr>
              <tr>
                <td>{empire.weapons}</td>
                <td>
                  <span className={"weapons"}>Weapons</span>
                </td>
                <td>
                  <input
                    type="number"
                    value={weaponsShop}
                    onChange={(e) => setWeaponsShop(parseInt(e.target.value))}
                  />
                  &nbsp;
                  <a onClick={() => craftWeapons(id, weaponsShop)}>Craft</a>
                  &nbsp;
                  {otherEmpires && (
                    <Gift
                      id={id}
                      others={otherEmpires}
                      value={foodShop}
                      resource={"weapons"}
                    />
                  )}
                </td>
                <td>&nbsp;</td>
                <td>
                  2{" "}
                  <span className={"manufactured-goods"}>
                    Manufactured Goods
                  </span>{" "}
                  -&#62; 1 <span className={"weapons"}>Weapon</span>
                </td>
              </tr>
              <tr>
                <td>{empire.soldiers}</td>
                <td>
                  <span className={"soldiers"}>Soldiers</span>
                </td>
                <td>
                  <input
                    type="number"
                    value={soldiersShop}
                    onChange={(e) => setSoldiersShop(parseInt(e.target.value))}
                  />
                  &nbsp;
                  <a onClick={() => craftSoldiers(id, soldiersShop)}>Craft</a>
                  &nbsp;
                  {otherEmpires && (
                    <Gift
                      id={id}
                      others={otherEmpires}
                      value={foodShop}
                      resource={"soldiers"}
                    />
                  )}
                </td>
                <td>&nbsp;</td>
                <td>
                  1 <span className={"citizens"}>Citizen</span> + 5{" "}
                  <span className={"laughter"}>Laughter</span> + 2{" "}
                  <span className={"energy"}>Energy</span> -&#62; 1{" "}
                  <span className={"soldiers"}>Soldier</span>
                </td>
              </tr>
              <tr>
                <td>{empire.luxuryGoods}</td>
                <td>
                  <span className={"luxury-goods"}>Luxury Goods</span>
                </td>
                <td>
                  <input
                    type="number"
                    value={luxuryGoodsShop}
                    onChange={(e) =>
                      setLuxuryGoodsShop(parseInt(e.target.value))
                    }
                  />
                  &nbsp;
                  <a onClick={() => craftLuxuryGoods(id, luxuryGoodsShop)}>
                    Craft
                  </a>
                  &nbsp;
                  {otherEmpires && (
                    <Gift
                      id={id}
                      others={otherEmpires}
                      value={foodShop}
                      resource={"luxuryGoods"}
                    />
                  )}
                </td>
                <td>&nbsp;</td>
                <td>
                  1{" "}
                  <span className={"manufactured-goods"}>
                    Manufactured Good
                  </span>{" "}
                  + 3 <span className={"energy"}>Energy</span> + 1{" "}
                  <span className={"raw-materials"}>Raw Material</span>
                  -&#62; 1 <span className={"luxury-goods"}>Luxury Good</span>
                </td>
              </tr>
            </tbody>
          </table>
          <br />
          <a onClick={() => setShowTips(!showTips)}>Tips...</a>
          {showTips && (
            <ul>
              <li>Happy citizens laugh more.</li>
              <li>Citizens use up food and energy.</li>
              <li>
                Get more citizens by having excess laughter, food, energy, and
                housing.
              </li>
              <li>Good: Sufficient housing</li>
              <li>Good: Luxury goods</li>
              <li>Good: Gold</li>
              <li>Bad: Too much gold</li>
              <li>Bad: More soldiers than citizens</li>
              <li>Bad: Insufficient housing</li>
              <li>Very bad: Out of energy</li>
              <li>Worst: Out of food</li>
            </ul>
          )}
          <br />
          <br />
          <a onClick={() => setShowWar(!showWar)}>War...</a>
          {showWar && <War id={id} empire={empire} />}
        </div>
      )}
    </>
  );
};
