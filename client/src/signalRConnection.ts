import * as signalR from "@microsoft/signalr";
import { Empire, OtherEmpire, User } from "./types";

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

  public subUserCreated = (callback: (user: User) => void) => {
    this.connection.on("userCreated", callback);

    return () => {
      this.connection.off("userCreated", callback);
    };
  };

  public subMyEmpiresRequested = (callback: (empires: Empire[]) => void) => {
    this.connection.on("myEmpiresRequested", callback);

    return () => {
      this.connection.off("myEmpiresRequested", callback);
    };
  };

  public createUser = (username: string) => {
    this.connection.send("createUser", username);
  };

  public requestMyEmpires = (userId: string) => {
    this.connection.send("requestMyEmpires", userId);
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

  public createEmpire = (name: string, userId: string) => {
    this.connection.send("createEmpire", name, userId);
  };

  public deleteEmpire = (id: string, userId: string) => {
    this.connection.send("deleteEmpire", id, userId);
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

  public giftFood = (from: string, to: string, amount: number) => {
    this.connection.send("giftFood", from, to, amount);
  };

  public giftHousing = (from: string, to: string, amount: number) => {
    this.connection.send("giftHousing", from, to, amount);
  };

  public giftRawMaterials = (from: string, to: string, amount: number) => {
    this.connection.send("giftRawMaterials", from, to, amount);
  };

  public giftEnergy = (from: string, to: string, amount: number) => {
    this.connection.send("giftEnergy", from, to, amount);
  };

  public giftTools = (from: string, to: string, amount: number) => {
    this.connection.send("giftTools", from, to, amount);
  };

  public giftManufacturedGoods = (from: string, to: string, amount: number) => {
    this.connection.send("giftManufacturedGoods", from, to, amount);
  };

  public giftWeapons = (from: string, to: string, amount: number) => {
    this.connection.send("giftWeapons", from, to, amount);
  };

  public giftSoldiers = (from: string, to: string, amount: number) => {
    this.connection.send("giftSoldiers", from, to, amount);
  };

  public giftLuxuryGoods = (from: string, to: string, amount: number) => {
    this.connection.send("giftLuxuryGoods", from, to, amount);
  };

  public buySellFood = (id: string, quantity: number) => {
    this.connection.send("buySellFood", id, quantity);
  };

  public buySellRawMaterials = (id: string, quantity: number) => {
    this.connection.send("buySellRawMaterials", id, quantity);
  };

  public buySellEnergy = (id: string, quantity: number) => {
    this.connection.send("buySellEnergy", id, quantity);
  };

  public buySellTools = (id: string, quantity: number) => {
    this.connection.send("buySellTools", id, quantity);
  };

  public buySellManufacturedGoods = (id: string, quantity: number) => {
    this.connection.send("buySellManufacturedGoods", id, quantity);
  };

  public buySellWeapons = (id: string, quantity: number) => {
    this.connection.send("buySellWeapons", id, quantity);
  };

  public buySellLuxuryGoods = (id: string, quantity: number) => {
    this.connection.send("buySellLuxuryGoods", id, quantity);
  };

  static instance: Connector;

  public static getInstance(): Connector {
    if (!Connector.instance) Connector.instance = new Connector();
    return Connector.instance;
  }
}

export const getConnection = Connector.getInstance;
