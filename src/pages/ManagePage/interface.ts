export type SelectPageState = [
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
  boolean
];
export interface SideComponentsProps {
  selectPage: SelectPageState;
  ChooseIndex: (num: number) => void;
}
