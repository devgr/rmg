import React, { useEffect, useState } from "react";
import { getConnection } from "./signalRConnection";
import { Switcher, Island, Views } from "./types";

type MyIslandsProps = {
  switcher: Switcher;
  myIslands: Island[];
};

export const MyIslands: React.FC<MyIslandsProps> = ({
  switcher,
  myIslands,
}) => {
  return (
    <>
      <h1>My Islands</h1>
      <ul>
        {myIslands.map((i) => (
          <li>{i.name}</li>
        ))}
      </ul>
      <div>
        <button onClick={() => switcher(Views.CreateIslandForm)}>
          New Island
        </button>
      </div>
    </>
  );
};
