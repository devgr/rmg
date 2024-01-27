import React, { useEffect, useState } from "react";
import { getConnection } from "./signalRConnection";
import { Empire, Views } from "./types";
import { CreateEmpireForm } from "./CreateEmpireForm";
import { MyEmpires } from "./MyEmpires";
import { EmpireView } from "./EmpireView";

function App() {
  const [view, setView] = useState(Views.MyEmpires);

  const initData: Empire[] = [];
  const [myEmpires, setMyEmpires] = useState(initData);
  const [activeId, setActiveId] = useState<string | null>(null);

  const switcher = (nextView: Views) => {
    setView(nextView);
  };

  return (
    <div className="App">
      {view === Views.CreateEmpireForm ? (
        <CreateEmpireForm
          switcher={switcher}
          myEmpires={myEmpires}
          setMyEmpires={setMyEmpires}
        />
      ) : view === Views.MyEmpires ? (
        <MyEmpires
          switcher={switcher}
          myEmpires={myEmpires}
          setMyEmpires={setMyEmpires}
          setActiveId={setActiveId}
        />
      ) : view === Views.EmpireView && activeId ? (
        <EmpireView switcher={switcher} id={activeId} />
      ) : (
        <p>o.o</p>
      )}
    </div>
  );
}
export default App;
