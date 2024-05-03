export interface MonkeyGradientPosition {
  x: number;
  y: number;
}

export class GradientPositions {

  /**
   * Represents the positions of a gradient in a Monkey background.
   */
  private gradientPositions: MonkeyGradientPosition[] = [];
  
  /**
   * Adds a gradient position to the list of gradient positions.
   * 
   * @param position - The gradient position to add.
   * @returns An array of gradient positions after adding the new position.
   */
  add(position: MonkeyGradientPosition): MonkeyGradientPosition[] {
    this.gradientPositions.push(position);

    return this.gradientPositions;
  }

  /**
   * Removes a gradient position from the list of gradient positions.
   * 
   * @param position - The gradient position to remove.
   * @returns An array of gradient positions after removing the position.
   */
  remove(position: MonkeyGradientPosition): MonkeyGradientPosition[] {
    this.gradientPositions = this.gradientPositions.filter(p => p !== position);

    return this.gradientPositions;
  }

  /**
   * Clears the list of gradient positions.
   */
  clear(): void {
    this.gradientPositions = [];
  }

  /**
   * Gets the list of gradient positions.
   * 
   * @returns An array of gradient positions.
   */
  get(): MonkeyGradientPosition[] {
    return this.gradientPositions;
  }

  /**
   * Generates a random gradient position.
   * 
   * @returns An object representing a random gradient position.
   */
  generateRandom(): MonkeyGradientPosition {
    return {
      x: Math.floor(Math.random() * 100),
      y: Math.floor(Math.random() * 100)
    };
  }

  /**
   * Moves the gradient positions randomly in the x or y axis.
   */
  move(): void {
    for (let i = 0; i < this.gradientPositions.length; i++) {
      const direction = Math.random() > 0.5 ? 1 : -1;
      const axis = Math.random() > 0.5 ? 'x' : 'y';
      const amount = Math.floor(Math.random() * 3);

      this.gradientPositions[i][axis] += amount * direction;
    }
  }

}
