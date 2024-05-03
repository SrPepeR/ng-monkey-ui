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
  generate(): string {
    let background: string = 'background-image: ';

    background += `${this.gradient.generateAll()};`;

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

  animate(delay?: number): MonkeyBackgroundService {
    this.animationId = window.setInterval(() => {
      this.gradient.move();
      this.gradient.growShrink();
      this.apply();
    }, delay || 500);

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
