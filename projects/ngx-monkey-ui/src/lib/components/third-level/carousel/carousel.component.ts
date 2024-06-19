import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Styleable} from "../../../bases/styleable.base";
import {ThemeService} from "../../../services/theme.service";

@Component({
  selector: 'monkey-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class MonkeyCarousel extends Styleable implements OnInit {

  /**
   * Data to be displayed in the carousel
   * @type {{src: string, title?: string, alt?: string, action?: () => void}[]}
   */
  @Input() data: {src: string, title?: string, alt?: string}[] = [];

  /**
   * Determines if the carousel is cyclic
   * @type {string}
   * @default 'false'
   */
  @Input() cyclic: string = 'false';

  /**
   * Determines if the carousel is hinted
   * @type {string}
   * @default 'false'
   */
  @Input() hinted: string = 'false';

  /**
   * Determines if the carousel is animated
   * @type {string}
   * @default 'false'
   */
  @Input() animated: string = 'false';

  /**
   * Event emitted when an image is clicked
   * @type {EventEmitter<number>} Index of the image clicked
   * @emits {number} Index of the image clicked
   */
  @Output() onImageClicked: EventEmitter<number> = new EventEmitter<number>();

  /**
   * Observable that indicates whether the dark mode is enabled.
   */
  isDarkMode$ = this.themeService.isDarkMode$;

  /**
   * Controls list to manage the carousel
   */
  controls: {id: number, label: string, selected?: boolean}[] = [];

  /**
   * Images list to be displayed in the carousel
   */
  showingImages: {src: string, title?: string, alt?: string}[] = [];

  /**
   * Index of the current image
   */
  currentImageIndex: number = 0;

  /**
   * Interval id to manage the animation of the carousel
   */
  private animatedIntervalId!: number;

  constructor(
    private themeService: ThemeService,
  ) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.generateControls();
    this.generateShowingImages(0);
    this.manageAnimation();
  }

  /**
   * Changes the current images of the carousel
   * @param index Index of the image to be displayed
   */
  changeCurrent(index: number): void {
    this.generateShowingImages(index);
    this.changeSelectedControl(index);
    this.manageAnimation();
  }

  /**
   * Action to be executed when an image is clicked
   * @param index Index of the image clicked
   */
  imageClicked(index: number): void {
    this.onImageClicked.emit(index);
  }

  /**
   * Generates the images list to be displayed in the carousel
   * @param index Index of the image to be displayed
   * @private
   */
  private generateShowingImages(index: number): void {
    this.currentImageIndex = index;
    this.showingImages = [];

    if (this.check(this.cyclic)) {
      this.showingImages.push(this.data[(index + 2) % this.data.length]);
      this.showingImages.push(this.data[index]);
      this.showingImages.push(this.data[(index + 1) % this.data.length]);
    } else {
      this.showingImages.push(this.data[index]);
    }
  }

  /**
   * Generates the controls list to manage the carousel
   * @private
   */
  private generateControls(): void {
    this.controls = [];

    this.data.forEach((_, index) => {
      this.controls.push({id: index, label: '', selected: index === 0});
    });
  }

  /**
   * Changes the selected control
   * @param index Index of the control to be selected
   * @private
   */
  private changeSelectedControl(index: number): void {
    this.controls.forEach((control) => control.selected = false);
    this.controls[index].selected = true;
  }

  /**
   * Manages the animation of the carousel
   * @private
   * @description This method is recursive
   */
  private manageAnimation(): void {
    if (this.animatedIntervalId) {
      window.clearTimeout(this.animatedIntervalId);
    }

    if (this.check(this.animated)) {
      // Animated carousel
      this.animatedIntervalId = window.setTimeout(() => {
        this.generateShowingImages((this.currentImageIndex + 1) % this.data.length);
        this.changeSelectedControl(this.currentImageIndex);
        this.manageAnimation();
      }, 5000);
    }
  }

}
