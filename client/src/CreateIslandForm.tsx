import React, { useEffect, useState } from "react";
import { getConnection } from "./signalRConnection";
import { Switcher, Island, Views } from "./types";

type CreateIslandFormProps = {
  switcher: Switcher;
  myIslands: Island[];
  setMyIslands: React.Dispatch<React.SetStateAction<Island[]>>;
};

export const CreateIslandForm: React.FC<CreateIslandFormProps> = ({
  switcher,
  myIslands,
  setMyIslands,
}) => {
  const { createIsland, subIslandCreated } = getConnection();
  const [name, setName] = useState("");

  useEffect(() => {
    subIslandCreated((island: Island) => {
      setMyIslands([island, ...myIslands]);
      switcher(Views.MyIslands);
    });
  });

  return (
    <>
      <h1>Found a new island nation</h1>
      <input
        type="text"
        placeholder="Name of your island"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <button onClick={() => createIsland(name)}>Create Island</button>
    </>
  );
};
