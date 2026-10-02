import { MonkeyStyle } from '../../objects/enums/style.enum';

/**
 * Represents a Tooltip object.
 */
export class Tooltip {
  /**
   * The starting offset value for the tooltip.
   */
  private START_OFFSET = 20;

  /**
   * The style of the tooltip.
   */
  style: MonkeyStyle = MonkeyStyle.NONE;

  /**
   * The text content of the tooltip.
   */
  text = '';

  /**
   * The starting position of the tooltip.
   */
  startPosition: { x: number; y: number } = { x: 0, y: 0 };

  /**
   * Indicates whether the tooltip should be positioned to the right of the mouse cursor.
   */
  toRight = true;

  /**
   * Creates a new Tooltip instance.
   * @param style - The style of the tooltip.
   * @param text - The text content of the tooltip.
   * @param mousePosition - The current mouse position, in viewport coordinates (`clientX`/`clientY`).
   */
  constructor(
    style: MonkeyStyle,
    text: string,
    mousePosition: { x: number; y: number } = { x: 0, y: 0 },
  ) {
    this.style = style;
    this.text = text;
    this.setDirection(mousePosition);
  }

  /**
   * Sets the direction of the tooltip based on the mouse position.
   * @param mousePosition - The current mouse position.
   */
  private setDirection(mousePosition: { x: number; y: number }) {
    // 0 is a valid coordinate: only a missing position is ignored.
    if (!mousePosition || mousePosition.x == null || mousePosition.y == null) {
      return;
    }

    this.toRight = mousePosition.x <= window.innerWidth / 2;

    if (this.toRight) {
      this.startPosition = { x: mousePosition.x + this.START_OFFSET, y: mousePosition.y };
    } else {
      this.startPosition = {
        x: window.innerWidth - mousePosition.x + this.START_OFFSET,
        y: mousePosition.y,
      };
    }
  }
}
