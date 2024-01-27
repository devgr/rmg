import React, { useEffect, useState } from "react";
import { getConnection } from "./signalRConnection";
import { Switcher, Empire, Views } from "./types";

type EmpireViewProps = {
  switcher: Switcher;
  id: string;
};

export const EmpireView: React.FC<EmpireViewProps> = ({ switcher, id }) => {
  const { syncEmpire, subEmpireSynced } = getConnection();
  const [empire, setEmpire] = useState<Empire | null>(null);

  useEffect(() => {
    syncEmpire(id);
    subEmpireSynced((i) => setEmpire(i));
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
          <table>
            <tbody>
              <tr>
                <td>Laughter</td>
                <td>{empire.laughter}</td>
              </tr>
              <tr>
                <td>Citizens</td>
                <td>{empire.citizens}</td>
              </tr>
              <tr>
                <td>Gold</td>
                <td>{empire.gold}</td>
              </tr>
            </tbody>
          </table>
          <br />
          <table>
            <tbody>
              <tr>
                <td>Food</td>
                <td>{empire.food}</td>
                <td>1 Laughter -&#62; 2 Food</td>
              </tr>
              <tr>
                <td>Housing</td>
                <td>{empire.housing}</td>
                <td>
                  2 Laughter + 2 Raw Materials + 2 Energy -&#62; 1 Housing
                </td>
              </tr>
              <tr>
                <td>Raw Materials</td>
                <td>{empire.rawMaterials}</td>
                <td>1 Laughter -&#62; 1 Raw Material</td>
              </tr>
              <tr>
                <td>Energy</td>
                <td>{empire.energy}</td>
                <td>1 Laughter -&#62; 1 Energy</td>
              </tr>
              <tr>
                <td>Tools</td>
                <td>{empire.tools}</td>
                <td>2 Raw Materials + 2 Energy -&#62; 1 Tool</td>
              </tr>
              <tr>
                <td>Manufactured Goods</td>
                <td>{empire.manufacturedGoods}</td>
                <td>
                  2 Raw Materials + 2 Energy + 1 Tools -&#62; 1 Manufactured
                  Good
                </td>
              </tr>
              <tr>
                <td>Weapons</td>
                <td>{empire.weapons}</td>
                <td>2 Manufactured Goods -&#62; 1 Weapon</td>
              </tr>
              <tr>
                <td>Soldiers</td>
                <td>{empire.soldiers}</td>
                <td>1 Citizen + 5 Laughter + 2 Energy -&#62; 1 Soldier</td>
              </tr>
              <tr>
                <td>Luxury Goods</td>
                <td>{empire.luxuryGoods}</td>
                <td>
                  1 Manufactured Good + 3 Energy + 1 Raw Material -&#62; 1
                  Luxury Good
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
