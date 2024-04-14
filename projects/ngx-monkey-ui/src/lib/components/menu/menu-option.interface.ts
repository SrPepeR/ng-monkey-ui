export interface MenuOption {

  label: string;
  icon?: string;
  route?: string;
  children?: MenuOption[];

}
