export class Colors {

  /**
   * Array of background colors.
   */
  private colors: string[] = [];

  /**
   * Adds a color to the list of background colors.
   * 
   * @param color - The color to be added.
   * @returns An array of background colors after adding the new color.
   */
  add(color: string): string[] {
    this.colors.push(color);

    return this.colors;
  }

  /**
   * Removes a color from the list of background colors.
   * 
   * @param color - The color to be removed.
   * @returns An array of background colors after removing the color.
   */
  remove(color: string): string[] {
    this.colors = this.colors.filter(c => c !== color);

    return this.colors;
  }

  /**
   * Clears the list of background colors.
   */
  clear(): void {
    this.colors = [];
  }

  /**
   * Gets the list of background colors.
   * 
   * @returns An array of background colors.
   */
  get(): string[] {
    return this.colors;
  }

  /**
   * Generates a random color in hexadecimal format.
   * 
   * @returns A string representing a random color in hexadecimal format.
   */
  generateRandom(): string {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

}
