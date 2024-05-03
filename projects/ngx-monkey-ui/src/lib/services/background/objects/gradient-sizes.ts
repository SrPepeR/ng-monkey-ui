export class GradientSizes {

  /**
   * Array of numbers representing the sizes of the gradient.
   */
  private gradientSizes: number[] = [];

  /**
   * Adds a size to the gradient sizes array.
   * 
   * @param size - The size to be added.
   * @returns The updated gradient sizes array.
   */
  add(size: number): number[] {
    this.gradientSizes.push(size);

    return this.gradientSizes;
  }

  /**
   * Removes a size from the gradient sizes array.
   * 
   * @param size - The size to be removed.
   * @returns The updated gradient sizes array.
   */
  remove(size: number): number[] {
    this.gradientSizes = this.gradientSizes.filter(s => s !== size);

    return this.gradientSizes;
  }

  /**
   * Clears the gradient sizes array.
   */
  clear(): void {
    this.gradientSizes = [];
  }

  /**
   * Gets the gradient sizes array.
   * 
   * @returns The gradient sizes array.
   */
  get(): number[] {
    return this.gradientSizes;
  }

  /**
   * Generates a random gradient size.
   * 
   * @returns A random number representing a gradient size.
   */
  generateRandom(): number {
    return Math.floor(Math.random() * 100);
  }

  /**
   * Grows or shrinks the gradient sizes.
   */
  growShrink(): void {
    this.gradientSizes = this.gradientSizes.map(size => {
      const change: number = Math.floor(Math.random() * 3);
      const direction: number = Math.floor(Math.random() * 2);

      return direction === 0 ? size - change : size + change;
    });
  }

}
