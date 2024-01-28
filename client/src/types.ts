export enum Views {
  CreateEmpireForm,
  MyEmpires,
  EmpireView,
  CreateUserForm,
}

export type Switcher = (nextView: Views) => void;

export type Notification = {
  id: string;
  message: string;
};

export type MarketplacePrices = {
  food: number;
  rawMaterials: number;
  energy: number;
  tools: number;
  manufacturedGoods: number;
  weapons: number;
  luxuryGoods: number;
};

export type User = {
  username: string;
  userId: string;
  editKey: string;
};

export type Empire = {
  id: string;
  username: string;
  userId: string;
  name: string;
  laughter: number;
  citizens: number;
  food: number;
  housing: number;
  rawMaterials: number;
  energy: number;
  tools: number;
  manufacturedGoods: number;
  weapons: number;
  soldiers: number;
  luxuryGoods: number;
  gold: number;
  strength: number;

  notifications: Notification[];
  prices: MarketplacePrices;
};

export type OtherEmpire = {
  id: string;
  username: string;
  userId: string;
  name: string;
  strength: number;
};
