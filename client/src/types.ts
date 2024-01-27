export enum Views {
  CreateIslandForm,
  MyIslands,
}

export type Switcher = (nextView: Views) => void;

export type Island = {
  id: string;
  name: string;
};
