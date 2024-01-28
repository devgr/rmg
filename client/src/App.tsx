import React, { useEffect, useState } from "react";
import { getConnection } from "./signalRConnection";
import { Empire, User, Views } from "./types";
import { CreateEmpireForm } from "./CreateEmpireForm";
import { MyEmpires } from "./MyEmpires";
import { EmpireView } from "./EmpireView";
import { CreateUserForm } from "./CreateUserForm";

type AppProps = {};

export const App: React.FC<AppProps> = () => {
  const [user, setUser] = useState<User | null>(null);

  const defaultView = user !== null ? Views.MyEmpires : Views.CreateUserForm;

  const [view, setView] = useState(defaultView);

  const [myEmpires, setMyEmpires] = useState<Empire[] | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const switcher = (nextView: Views) => {
    setView(nextView);
  };

  return (
    <div className="App">
      {view === Views.CreateEmpireForm && user ? (
        <CreateEmpireForm
          switcher={switcher}
          setMyEmpires={setMyEmpires}
          user={user}
        />
      ) : view === Views.MyEmpires && user ? (
        <MyEmpires
          switcher={switcher}
          myEmpires={myEmpires}
          setMyEmpires={setMyEmpires}
          setActiveId={setActiveId}
          user={user}
        />
      ) : view === Views.EmpireView && user && activeId ? (
        <EmpireView switcher={switcher} id={activeId} />
      ) : view === Views.CreateUserForm ? (
        <CreateUserForm switcher={switcher} user={user} setUser={setUser} />
      ) : (
        <p></p>
      )}
    </div>
  );
};
