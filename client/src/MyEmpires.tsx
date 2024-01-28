import React, { useEffect, useState } from "react";
import { getConnection } from "./signalRConnection";
import { Switcher, Empire, Views, User } from "./types";

type MyEmpiresProps = {
  switcher: Switcher;
  myEmpires: Empire[] | null;
  setMyEmpires: React.Dispatch<React.SetStateAction<Empire[] | null>>;
  setActiveId: React.Dispatch<React.SetStateAction<string | null>>;
  user: User;
};

export const MyEmpires: React.FC<MyEmpiresProps> = ({
  switcher,
  myEmpires,
  setMyEmpires,
  setActiveId,
  user,
}) => {
  const { deleteEmpire, requestMyEmpires, subMyEmpiresRequested } =
    getConnection();

  useEffect(() => {
    if (!myEmpires) {
      requestMyEmpires(user.userId);
    }
  });

  useEffect(() => {
    const cleanup = subMyEmpiresRequested((empires: Empire[]) => {
      console.log(empires);
      setMyEmpires(empires);
    });

    return () => cleanup();
  });

  const removeEmpire = (id: string) => {
    deleteEmpire(id, user.userId);
    setMyEmpires(null); // might make a race condition or flickering
  };

  const open = (id: string) => {
    setActiveId(id);
    switcher(Views.EmpireView);
  };

  return (
    myEmpires && (
      <>
        <p>{user.username}'s Empires</p>
        <p>{[...`${user.username}'s Empires`].map((_) => "=")}</p>
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
    )
  );
};
