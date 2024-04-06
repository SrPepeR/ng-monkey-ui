import { Component, Input, OnChanges } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { ComponentsStylesService } from '../../services/components-styles.service';
import { ComponentsSizesService } from '../../services/components-sizes.service';

@Component({
  selector: 'monkey-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class MonkeyAvatar implements OnChanges {

  @Input() style?: string = 'background';

  @Input() image: string = '';
  @Input() errorImage: string = '';
  @Input() form: string = 'rounded';
  @Input() labeled?: string = 'false';

  // COMPONENTS SIZES
  @Input() sm?: string = 'sm';
  @Input() md?: string = 'md';
  @Input() lg?: string = 'lg';

  isDarkMode$ = this.themeService.isDarkMode$;

  classList: Array<string> = [];

  loading: boolean = true;

  constructor(
    private themeService: ThemeService,
    private componentStylesService: ComponentsStylesService,
    private componentSizesService: ComponentsSizesService,
  ) { }

  ngOnChanges() {
    this.classList = this.componentStylesService.generateClassList(this);
    this.classList = this.componentSizesService.generateClassList(this);
    this.classList.push(`form-${this.form}`);
    if (this.labeled && this.labeled === '') {
      this.classList.push(`labeled`);
    }
  }

}
