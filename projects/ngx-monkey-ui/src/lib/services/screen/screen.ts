import { ScreenOrientation, ScreenSize, ScreenSizeStyleClass } from "./screen.enum";

/**
 * Represents a screen with its size, width, height, orientation, and size style class.
 */
export class MonkeyScreen {

  /**
   * The size of the screen.
   */
  size: ScreenSize = ScreenSize.XS;

  /**
   * The width of the screen.
   */
  width: number;

  /**
   * The height of the screen.
   */
  height: number;

  /**
   * The orientation of the screen.
   */
  orientation: ScreenOrientation = ScreenOrientation.PORTRAIT;

  /**
   * The size style class of the screen.
   */
  sizeStyleClass: ScreenSizeStyleClass = ScreenSizeStyleClass.XS;

  /**
   * Creates a new instance of the Screen class.
   * @param width - The width of the screen.
   * @param height - The height of the screen.
   */
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;

    this.setSize();
    this.setSizeStyleClass();
    this.setOrientation();
  }

  /**
   * Checks if the current screen size matches the specified size.
   * 
   * @param size The screen size to check against.
   * @returns True if the current screen size matches the specified size, false otherwise.
   */
  public isScreenSize(size: ScreenSize): boolean {
    return this.size === size;
  }

  /**
   * Checks if the current screen orientation matches the specified orientation.
   * 
   * @param orientation The screen orientation to check against.
   * @returns True if the current screen orientation matches the specified orientation, false otherwise.
   */
  public isScreenOrientation(orientation: ScreenOrientation): boolean {
    return this.orientation === orientation;
  }

  /**
   * Checks if the current screen size is equal to or greater than the specified size.
   * 
   * @param size The screen size to check against.
   * @returns True if the current screen size is equal to or greater than the specified size, false otherwise.
   */
  public isScreenSizeUp(size: ScreenSize): boolean {
    return this.size >= size;
  }

  /**
   * Checks if the current screen size is equal to or less than the specified size.
   * 
   * @param size The screen size to check against.
   * @returns True if the current screen size is equal to or less than the specified size, false otherwise.
   */
  public isScreenSizeDown(size: ScreenSize): boolean {
    return this.size <= size;
  }

  /**
   * Checks if the current screen orientation is portrait.
   * 
   * @returns True if the current screen orientation is portrait, false otherwise.
   */
  public isScreenOrientationPortrait(): boolean {
    return this.orientation === ScreenOrientation.PORTRAIT;
  }

  /**
   * Checks if the current screen orientation is landscape.
   * 
   * @returns True if the current screen orientation is landscape, false otherwise.
   */
  public isScreenOrientationLandscape(): boolean {
    return this.orientation === ScreenOrientation.LANDSCAPE;
  }

  /**
   * Sets the size of the screen based on the width.
   * @private
   */
  private setSize() {
    if (this.width <= 600) {
      this.size = ScreenSize.XS;
    } else if (this.width < 768) {
      this.size = ScreenSize.SM;
    } else if (this.width < 992) {
      this.size = ScreenSize.MD;
    } else if (this.width < 1200) {
      this.size = ScreenSize.LG;
    } else if (this.width < 1400) {
      this.size = ScreenSize.XL;
    } else {
      this.size = ScreenSize.XXL;
    }
  }

  /**
   * Sets the size style class of the screen based on the size.
   * @private
   */
  private setSizeStyleClass() {
    switch (this.size) {
      case ScreenSize.XS:
        this.sizeStyleClass = ScreenSizeStyleClass.XS;
        break;
      case ScreenSize.SM:
        this.sizeStyleClass = ScreenSizeStyleClass.SM;
        break;
      case ScreenSize.MD:
        this.sizeStyleClass = ScreenSizeStyleClass.MD;
        break;
      case ScreenSize.LG:
        this.sizeStyleClass = ScreenSizeStyleClass.LG;
        break;
      case ScreenSize.XL:
        this.sizeStyleClass = ScreenSizeStyleClass.XL;
        break;
      case ScreenSize.XXL:
        this.sizeStyleClass = ScreenSizeStyleClass.XXL;
        break;
    }
  }

  /**
   * Sets the orientation of the screen based on the width and height.
   * @private
   */
  private setOrientation() {
    this.orientation = this.width > this.height ? ScreenOrientation.LANDSCAPE : ScreenOrientation.PORTRAIT;
  }

}
