import * as signalR from "@microsoft/signalr";
import { Island } from "./types";

const URL = process.env.HUB_ADDRESS ?? "http://localhost:5209/api";

class Connector {
  private connection: signalR.HubConnection;

  constructor() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(URL)
      .withAutomaticReconnect()
      .build();

    this.connection.start().catch((err) => console.error(err));
  }

  public subscribeToClientPong = (callback: (message: string) => void) => {
    this.connection.on("clientPong", callback);
  };

  public serverPing = (messages: string) => {
    this.connection
      .send("serverPing", messages)
      .then((x) => console.log("sent"));
  };

  public subIslandCreated = (callback: (island: Island) => void) => {
    this.connection.on("islandCreated", callback);
  };

  public createIsland = (name: string) => {
    this.connection.send("createIsland", name);
  };

  static instance: Connector;

  public static getInstance(): Connector {
    if (!Connector.instance) Connector.instance = new Connector();
    return Connector.instance;
  }
}

export const getConnection = Connector.getInstance;
