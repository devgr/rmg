import React, { useEffect, useState } from "react";
import { getConnection } from "./signalRConnection";
import { Switcher, Empire, Views, User } from "./types";

type CreateEmpireFormProps = {
  switcher: Switcher;
  setMyEmpires: React.Dispatch<React.SetStateAction<Empire[] | null>>;
  user: User;
};

export const CreateEmpireForm: React.FC<CreateEmpireFormProps> = ({
  switcher,
  setMyEmpires,
  user,
}) => {
  const { createEmpire, subEmpireSynced } = getConnection();
  const [name, setName] = useState("");

  useEffect(() => {
    const cleanup = subEmpireSynced((empire: Empire) => {
      setMyEmpires(null); // so they will be refreshed
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
      <a onClick={() => createEmpire(name, user.userId)}>Create Empire</a>
    </>
  );
};
