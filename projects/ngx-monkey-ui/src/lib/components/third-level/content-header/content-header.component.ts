import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Styleable } from '../../../bases/styleable.base';
import { MonkeyButtonData } from '../../../objects/classes/button-data.class';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'monkey-content-header',
  templateUrl: './content-header.component.html',
  styleUrls: [
    '../../../styles/components/_common.default.style.scss',
    './content-header.component.scss',
  ]
})
export class MonkeyContentHeader extends Styleable implements OnInit, OnChanges {

  @Input() image!: string;

  @Input() header!: string;

  @Input() subHeader!: string;

  @Input() action?: MonkeyButtonData;

  /**
   * Observable that emits a boolean indicating whether the theme is in dark mode or not.
   */
  isDarkMode$ = this.themeService.isDarkMode$;

  imageSize: number = 20;

  /**
   * Creates an instance of MonkeyContentHeader.
   * @param themeService The theme service.
   */
  constructor(
    private themeService: ThemeService,
  ) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.imageSize = this.getSize();
  }

  override ngOnChanges(): void {
    super.ngOnChanges();
    this.imageSize = this.getSize();
  }

  /**
   * Returns the size based on the provided breakpoints.
   * If none of the breakpoints are set, it returns a default size of 30.
   * @returns The size as a number.
   */
  private getSize(): number {
    if (this.check(this.xs)) {
      return 60;
    }

    if (this.check(this.sm)) {
      return 80;
    }

    if (this.check(this.lg)) {
      return 120;
    }

    if (this.check(this.xl)) {
      return 140;
    }

    return 100;
  }

}
