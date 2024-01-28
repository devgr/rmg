import React, { useEffect, useState } from "react";
import { getConnection } from "./signalRConnection";
import { Switcher, Empire, Views, User } from "./types";

type CreateUserFormProps = {
  switcher: Switcher;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export const CreateUserForm: React.FC<CreateUserFormProps> = ({
  switcher,
  user,
  setUser,
}) => {
  const { createUser, subUserCreated } = getConnection();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const cleanup = subUserCreated((user: User) => {
      setUser(user);
      switcher(Views.MyEmpires);
    });

    return () => cleanup();
  });

  return (
    <>
      <p>Empires of Laughter</p>
      <p>===================</p>
      <br />
      <p>What be thy name, O ruler?</p>
      <br />
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      ></input>
      <a onClick={() => createUser(username)}>Play</a>
    </>
  );
};
