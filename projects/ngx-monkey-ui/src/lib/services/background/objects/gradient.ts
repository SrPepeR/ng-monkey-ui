import { Colors } from "./colors";
import { GradientPositions, MonkeyGradientPosition } from "./gradient-positions";
import { GradientSizes } from "./gradient-sizes";

export class MonkeyGradient {

  /**
   * Represents the colors used in a gradient.
   */
  colors: Colors = new Colors();

  /**
   * Represents the positions of a gradient.
   */
  gradientPositions: GradientPositions = new GradientPositions();

  /**
   * Represents the sizes of a gradient.
   */
  gradientSizes: GradientSizes = new GradientSizes();

  /**
   * Adds data to the gradient.
   * 
   * @param color - The color to add to the gradient.
   * @param position - The position of the color in the gradient.
   * @param size - The size of the color in the gradient.
   */
  addData(color: string, position: MonkeyGradientPosition, size: number): void {
    this.colors.add(color);
    this.gradientPositions.add(position);
    this.gradientSizes.add(size);
  }

  /**
   * Generates random data for the gradient object.
   */
  addRandomData(): void {
    this.colors.add(this.colors.generateRandom());
    this.gradientPositions.add(this.gradientPositions.generateRandom());
    this.gradientSizes.add(this.gradientSizes.generateRandom());
  }

  /**
   * Moves the gradient object.
   */
  move(): void {
    this.gradientPositions.move();
  }

  /**
   * Grows or shrinks the gradient sizes.
   */
  growShrink(): void {
    this.gradientSizes.growShrink();
  }

  /**
   * Generates a simple linear gradient CSS string based on the provided position.
   * @param position - The position of the gradient.
   * @returns The generated linear gradient CSS string.
   */
  generateSingle(position: number): string {
    const color: string = this.colors.get()[position];
    const positions: MonkeyGradientPosition= this.gradientPositions.get()[position];
    const size: number = this.gradientSizes.get()[position];

    return `radial-gradient(at ${positions.x}% ${positions.y}%, ${color} 0, transparent ${size}%)`;
  }
  
  /**
   * Generates all the gradients based on the colors provided.
   * 
   * @returns A string containing all the generated gradients.
   */
  generateAll(): string {
    let gradients: string = '';
    
    for (let i = 0; i < this.colors.get().length; i++) {
      if (i > 0) {
        gradients += ', ';
      }
      
      gradients += this.generateSingle(i);
    }

    return gradients;
  }

  copy(): MonkeyGradient {
    const gradient: MonkeyGradient = new MonkeyGradient();

    for (let i = 0; i < this.colors.get().length; i++) {
      gradient.addData(this.colors.get()[i], this.gradientPositions.get()[i], this.gradientSizes.get()[i]);
    }

    return gradient;
  }

}
