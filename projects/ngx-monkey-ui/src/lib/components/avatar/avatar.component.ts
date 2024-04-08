import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { ComponentsStylesService } from '../../services/components-styles.service';
import { ComponentsSizesService } from '../../services/components-sizes.service';

@Component({
  selector: 'monkey-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class MonkeyAvatar implements OnInit, OnChanges {

  @Input() style?: string = 'background';

  @Input() image: string = '';
  @Input() errorImage: string = '';
  @Input() form?: string = 'rounded';
  @Input() labeled?: string = 'false';
  @Input() text: string = '';

  // COMPONENTS SIZES
  @Input() sm?: string = 'sm';
  @Input() md?: string = 'md';
  @Input() lg?: string = 'lg';

  isDarkMode$ = this.themeService.isDarkMode$;

  classList: Array<string> = [];
  
  size: { width: number, height: number } = { width: 0, height: 0 };

  constructor(
    private themeService: ThemeService,
    private componentStylesService: ComponentsStylesService,
    private componentSizesService: ComponentsSizesService,
  ) { }

  ngOnInit(): void {
    this.checkSize();
  }

  ngOnChanges() {
    this.classList = this.componentStylesService.generateClassList(this);
    this.classList = this.componentSizesService.generateClassList(this);

    this.checkClasses();
  }

  private checkSize() {
    if (this.check(this.sm)) {
      this.size = { width: 35, height: 35 };
    } else if (this.check(this.lg)) {
      this.size = { width: 100, height: 100 };
    } else {
      this.size = { width: 50, height: 50 };
    }
  }

  private checkClasses() {
    this.classList.push(`form-${this.form}`);

    if (this.check(this.labeled)) {
      this.classList.push(`labeled`);
    }

    if (this.form === 'rounded') {
      this.classList.push('full-rounded');
    }
  }

  private check(attribute?: string) {
    return attribute == '';
  }
}
