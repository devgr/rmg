import React, { useEffect, useState } from "react";
import "./App.css";
import { getConnection } from "./signalRConnection";
import { Island, Views } from "./types";
import { CreateIslandForm } from "./CreateIslandForm";
import { MyIslands } from "./MyIslands";

function App() {
  const [view, setView] = useState(Views.CreateIslandForm);

  const initData: Island[] = [];
  const [myIslands, setMyIslands] = useState(initData);

  const switcher = (nextView: Views) => {
    setView(nextView);
  };

  return (
    <div className="App">
      {view === Views.CreateIslandForm ? (
        <CreateIslandForm
          switcher={switcher}
          myIslands={myIslands}
          setMyIslands={setMyIslands}
        />
      ) : view === Views.MyIslands ? (
        <MyIslands switcher={switcher} myIslands={myIslands} />
      ) : (
        <p>o.o</p>
      )}
    </div>
  );
}
export default App;
