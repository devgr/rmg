import * as signalR from "@microsoft/signalr";
import { Empire, OtherEmpire } from "./types";

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

  public subEmpireSynced = (callback: (empire: Empire) => void) => {
    this.connection.on("empireSynced", callback);

    return () => {
      this.connection.off("empireSynced", callback);
    };
  };

  public subEmpiresRequested = (callback: (others: OtherEmpire[]) => void) => {
    this.connection.on("empiresRequested", callback);

    return () => {
      this.connection.off("empiresRequested", callback);
    };
  };

  public dismissNotification = (empireId: string, notificationId: string) => {
    this.connection.send("dismissNotification", empireId, notificationId);
  };

  public requestEmpires = (id: string) => {
    this.connection.send("requestEmpires", id);
  };

  public attack = (from: string, to: string, risk: number) => {
    this.connection.send("attack", from, to, risk);
  };

  public createEmpire = (name: string) => {
    this.connection.send("createEmpire", name);
  };

  public deleteEmpire = (id: string) => {
    this.connection.send("deleteEmpire", id);
  };

  public syncEmpire = (id: string) => {
    this.connection.send("syncEmpire", id);
  };

  public craftFood = (id: string, amount: number) => {
    this.connection.send("craftFood", id, amount);
  };

  public craftHousing = (id: string, amount: number) => {
    this.connection.send("craftHousing", id, amount);
  };

  public craftRawMaterials = (id: string, amount: number) => {
    this.connection.send("craftRawMaterials", id, amount);
  };

  public craftEnergy = (id: string, amount: number) => {
    this.connection.send("craftEnergy", id, amount);
  };

  public craftTools = (id: string, amount: number) => {
    this.connection.send("craftTools", id, amount);
  };

  public craftManufacturedGoods = (id: string, amount: number) => {
    this.connection.send("craftManufacturedGoods", id, amount);
  };

  public craftWeapons = (id: string, amount: number) => {
    this.connection.send("craftWeapons", id, amount);
  };

  public craftSoldiers = (id: string, amount: number) => {
    this.connection.send("craftSoldiers", id, amount);
  };

  public craftLuxuryGoods = (id: string, amount: number) => {
    this.connection.send("craftLuxuryGoods", id, amount);
  };

  static instance: Connector;

  public static getInstance(): Connector {
    if (!Connector.instance) Connector.instance = new Connector();
    return Connector.instance;
  }
}

export const getConnection = Connector.getInstance;
