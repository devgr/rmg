import React, { useEffect, useState } from "react";
import { getConnection } from "./signalRConnection";
import { Empire, Notification } from "./types";

type NotificationProps = {
  empire: Empire;
  notifications: Notification[] | undefined;
  setNotifications: React.Dispatch<
    React.SetStateAction<Notification[] | undefined>
  >;
};

export const Notifications: React.FC<NotificationProps> = ({
  empire,
  notifications,
  setNotifications,
}) => {
  const { dismissNotification } = getConnection();

  const dismissClicked = (id: string) => {
    dismissNotification(empire.id, id);

    if (notifications) {
      const updatedNotifs = [...notifications];
      const index = updatedNotifs.findIndex((x) => x.id === id);
      updatedNotifs.splice(index, 1);
      setNotifications(updatedNotifs);
    }
  };

  return notifications?.length ? (
    <>
      <p>Notifications:</p>
      <ul>
        {notifications.map((x) => (
          <li key={x.id}>
            {x.message}&nbsp;
            <a onClick={() => dismissClicked(x.id)}>X</a>
          </li>
        ))}
      </ul>
      <br />
      <br />
    </>
  ) : (
    <></>
  );
};
