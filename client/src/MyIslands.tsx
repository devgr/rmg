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
      <p>My Islands</p>
      <p>==========</p>
      <ul>
        {myIslands.map((i) => (
          <li>{i.name}</li>
        ))}
      </ul>
      <br />
      <div>
        <a onClick={() => switcher(Views.CreateIslandForm)}>New Island...</a>
      </div>
    </>
  );
};
