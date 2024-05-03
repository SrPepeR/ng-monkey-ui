/**
 * Represents a menu option in the application.
 */
export interface MenuOption {
  /**
   * The label of the menu option.
   */
  label: string;
  
  /**
   * The icon associated with the menu option.
   */
  icon?: string;
  
  /**
   * The route to navigate when the menu option is selected.
   */
  route?: string;
  
  /**
   * The children menu options of the current menu option.
   */
  children?: MenuOption[];
}
