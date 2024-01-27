import React, { useEffect, useState } from "react";
import { getConnection } from "./signalRConnection";
import { Switcher, Empire, Views } from "./types";

type MyEmpiresProps = {
  switcher: Switcher;
  myEmpires: Empire[];
  setMyEmpires: React.Dispatch<React.SetStateAction<Empire[]>>;
  setActiveId: React.Dispatch<React.SetStateAction<string | null>>;
};

export const MyEmpires: React.FC<MyEmpiresProps> = ({
  switcher,
  myEmpires,
  setMyEmpires,
  setActiveId,
}) => {
  const { deleteEmpire } = getConnection();

  const removeEmpire = (id: string) => {
    deleteEmpire(id);
    const index = myEmpires.findIndex((x) => x.id === id);
    const updatedEmpires = [...myEmpires];
    updatedEmpires.splice(index, 1);
    setMyEmpires(updatedEmpires);
  };

  const open = (id: string) => {
    setActiveId(id);
    switcher(Views.EmpireView);
  };

  return (
    <>
      <p>My Empires</p>
      <p>==========</p>
      <table>
        <tbody>
          {myEmpires.map((i) => (
            <tr key={i.id}>
              <td>{i.name}</td>
              <td>&nbsp;</td>
              <td>
                <a onClick={() => open(i.id)}>Open...</a>
              </td>
              <td>
                <a onClick={() => removeEmpire(i.id)}>Delete</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ul></ul>
      <br />
      <div>
        <a onClick={() => switcher(Views.CreateEmpireForm)}>New Empire...</a>
      </div>
    </>
  );
};
