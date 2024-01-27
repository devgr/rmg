export enum Views {
  CreateEmpireForm,
  MyEmpires,
  EmpireView,
}

export type Switcher = (nextView: Views) => void;

export type Empire = {
  id: string;
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
};
