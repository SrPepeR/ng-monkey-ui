import { Injectable } from '@angular/core';
import { MonkeyGradient } from './objects/gradient';
import { MonkeyGradientPosition } from './objects/gradient-positions';

@Injectable({
  providedIn: 'root'
})
/**
 * Represents a service for managing the background of the application.
 */
export class MonkeyBackgroundService {

  /**
   * The base color used by the background service.
   */
  baseColor: string = '#121212';

  /**
   * The background service responsible for managing the MonkeyBackground instance.
   */
  gradient: MonkeyGradient = new MonkeyGradient();

  /**
   * The ID of the animation.
   */
  animationId: number = 0;

  /**
   * Sets the base color for the MonkeyBackgroundService.
   * 
   * @param color - The color to set as the base color.
   * @returns The MonkeyBackgroundService instance.
   */
  setBaseColor(color: string): MonkeyBackgroundService {
    this.baseColor = color;

    return this;
  }

  /**
   * Adds a gradient to the background.
   * 
   * @param color - The color of the gradient.
   * @param size - The size of the gradient.
   * @param position - The position of the gradient.
   */
  addGradient(color: string, size: number, position: MonkeyGradientPosition): MonkeyBackgroundService {
    this.gradient.addData(color, position, size);

    return this;
  }

  /**
   * Adds multiple gradients to the background.
   * 
   * @param colors - An array of color values for the gradients.
   * @param sizes - An array of sizes for the gradients.
   * @param positions - An array of positions for the gradients.
   */
  addGradients(colors: string[], sizes: number[], positions: MonkeyGradientPosition[]): MonkeyBackgroundService {
    for (let i = 0; i < colors.length; i++) {
      this.addGradient(colors[i], sizes[i], positions[i]);
    }

    return this;
  }

  /**
   * Generates a random gradient.
   */
  addRandomGradient(): MonkeyBackgroundService {
    this.gradient.addRandomData();

    return this;
  }

  /**
   * Adds random gradients to the background.
   * 
   * @param amount - The number of random gradients to add.
   */
  addRandomGradients(amount: number): MonkeyBackgroundService {
    for (let i = 0; i < amount; i++) {
      this.addRandomGradient();
    }

    return this;
  }

  /**
   * Generates the background CSS string.
   * 
   * @returns The generated background CSS string.
   */
  generate(data?: MonkeyGradient): string {
    let background: string = 'background-image: ';

    if (data) {
      background += `${data.generateAll()};`;
    } else {
      background += `${this.gradient.generateAll()};`;
    }

    return background;
  }

  /**
   * Applies the generated background CSS to the document's head.
   */
  apply(): MonkeyBackgroundService {
    let backgroundCSS = `background-color: ${this.baseColor};`;
    backgroundCSS += `height: 100%; padding: 0; margin: 0;`;
    backgroundCSS += this.generate();

    const currentMonkeyBackground = document.getElementById('monkey-background');
    let style;

    if (currentMonkeyBackground) {
      style = currentMonkeyBackground;
    } else {
      style = document.createElement('style');
      style.id = 'monkey-background';
    }
    
    style.innerHTML = `body, html { ${backgroundCSS} }`;
    document.head.appendChild(style);

    return this;
  }

  /**
   * Animates the background using keyframes.
   * 
   * @param delay - The delay between each keyframe.
   * @returns The MonkeyBackgroundService instance.
   */
  animate(steps: number = 10, delay: number = 5000): MonkeyBackgroundService {
    const gradientsVariations: MonkeyGradient[] = [];
    gradientsVariations.push(this.gradient.copy());
    console.log(this.gradient.gradientPositions.get()[0]);

    let newGradient;
    for (let i = 0; i < steps - 1; i++) {
      newGradient = this.gradient.copy();
      newGradient.move();
      newGradient.growShrink();
      gradientsVariations.push(newGradient);
      console.log(newGradient.gradientPositions.get()[0]);
    }

    let animationCss = '@keyframes monkey-background-animation {';
    let percentage = 0;

    for (let i = 0; i < gradientsVariations.length - 1; i++) {
      animationCss += `${percentage}% { ${this.generate(gradientsVariations[i])} } `;
      // Round next percentage to avoid floating point errors
      percentage = Math.round((100 / steps) * (i + 1));
    }

    animationCss += `100% { ${this.generate()} } `;

    animationCss += `} body, html { animation: monkey-background-animation ${delay}ms infinite; }`;

    const currentMonkeyBackground = document.getElementById('monkey-background-animation');
    let style;

    if (currentMonkeyBackground) {
      style = currentMonkeyBackground;
    } else {
      style = document.createElement('style');
      style.id = 'monkey-background-animation';
    }
    
    style.innerHTML = animationCss;
    document.head.appendChild(style);

    return this;
  }

  /**
   * Removes the background from the document's head.
   */
  remove(): MonkeyBackgroundService {
    const style = document.getElementById('monkey-background');
    if (style) {
      style.remove();
    }

    return this;
  }

}
