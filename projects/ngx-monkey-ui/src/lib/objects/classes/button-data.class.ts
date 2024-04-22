import { MonkeyStyle } from "../enums/style.enum";

export class MonkeyButtonData {

  type: MonkeyStyle;
  text: string;
  action: Function;
  icon?: string;
  iconPosition?: 'left' | 'right';

  constructor(type: MonkeyStyle, text: string, action: Function, icon?: string, iconPosition?: 'left' | 'right') {
    this.type = type;
    this.text = text;
    this.action = action;
    this.icon = icon;
    this.iconPosition = iconPosition;
  }

}
