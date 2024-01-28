import React, { useEffect, useState } from "react";
import { getConnection } from "./signalRConnection";
import { Switcher, Empire, OtherEmpire } from "./types";

type WarProps = {
  id: string;
  empire: Empire;
};

export const War: React.FC<WarProps> = ({ id, empire }) => {
  const { requestEmpires, subEmpiresRequested, attack } = getConnection();

  const [otherEmpires, setOtherEmpires] = useState<OtherEmpire[] | null>(null);
  const [risk, setRisk] = useState(0);

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

  const attackClicked = (to: string) => {
    attack(empire.id, to, risk);
    setOtherEmpires(null);
  };

  return (
    otherEmpires && (
      <>
        <p>Your strength score: {empire.strength}</p>
        <br />
        <p>
          Reckless attack: 0 is careful, 10 has greater risk or reward{" "}
          <input
            type="number"
            value={risk}
            onChange={(e) => setRisk(parseInt(e.target.value))}
          ></input>
        </p>
        <table>
          <thead>
            <tr>
              <th>Name:</th>
              <th>Strength:</th>
              <th>&nbsp;</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {otherEmpires.map((x) => (
              <tr key={x.id}>
                <td>{x.name}</td>
                <td>{x.strength}</td>
                <td>&nbsp;</td>
                <td>
                  <a onClick={() => attackClicked(x.id)}>Attack!</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    )
  );
};
