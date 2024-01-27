import React, { useEffect, useState } from "react";
import { getConnection } from "./signalRConnection";
import { Switcher, Empire, Views } from "./types";

type CreateEmpireFormProps = {
  switcher: Switcher;
  myEmpires: Empire[];
  setMyEmpires: React.Dispatch<React.SetStateAction<Empire[]>>;
};

export const CreateEmpireForm: React.FC<CreateEmpireFormProps> = ({
  switcher,
  myEmpires,
  setMyEmpires,
}) => {
  const { createEmpire, subEmpireSynced } = getConnection();
  const [name, setName] = useState("");

  useEffect(() => {
    const cleanup = subEmpireSynced((empire: Empire) => {
      setMyEmpires([empire, ...myEmpires]);
      switcher(Views.MyEmpires);
    });

    return () => cleanup();
  });

  return (
    <>
      <div>
        <a onClick={() => switcher(Views.MyEmpires)}>&#60; Back</a>
      </div>
      <br />
      <p>Found a new empire</p>
      <br />
      <input
        type="text"
        placeholder="Name of your empire"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <a onClick={() => createEmpire(name)}>Create Empire</a>
    </>
  );
};