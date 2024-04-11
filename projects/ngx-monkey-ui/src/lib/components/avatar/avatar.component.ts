import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { ComponentsStylesService } from '../../services/components-styles.service';
import { ComponentsSizesService } from '../../services/components-sizes.service';
import { TooltipService } from '../../services/tooltip/tooltip.service';
import { Tooltipable } from '../../bases/tooltipable.base';

@Component({
  selector: 'monkey-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class MonkeyAvatar extends Tooltipable implements OnChanges {

  @Input() image: string = '';
  @Input() errorImage: string = '';
  @Input() form?: string = 'rounded';
  @Input() labeled?: string = 'false';
  @Input() text: string = '';

  // COMPONENTS SIZES
  @Input() sm?: string = 'sm';
  @Input() md?: string = 'md';
  @Input() lg?: string = 'lg';

  @Output() onClickImage = new EventEmitter();

  isDarkMode$ = this.themeService.isDarkMode$;

  classList: Array<string> = [];

  size: { width: number, height: number } = { width: 0, height: 0 };
  isLabeled: boolean = false;

  constructor(
    private themeService: ThemeService,
    private componentStylesService: ComponentsStylesService,
    private componentSizesService: ComponentsSizesService,
    protected override tooltipService: TooltipService,
  ) { super(tooltipService) }

  ngOnChanges() {
    this.checkAll();
  }

  override showTooltip(event: MouseEvent) {
    if (this.isLabeled) {
      return;
    }

    this.tooltipService.show(this.text, this.style || 'primary', { x: event.pageX, y: event.pageY })
  }

  override hideTooltip() {
    if (this.isLabeled) {
      return;
    }

    this.tooltipService.hide();
  }

  onClick() {
    this.onClickImage.emit();
  }

  onErrorImage(): void {
    this.image = this.errorImage;
  }

  private checkAll() {
    this.checkClasses();
    this.checkSize();
    this.checkLabeled();
  }

  private checkClasses() {
    this.classList = this.componentStylesService.generateClassList(this);
    this.classList = this.componentSizesService.generateClassList(this);

    this.classList.push(`form-${this.form}`);

    if (this.check(this.labeled)) {
      this.classList.push(`labeled`);
    }

    if (this.form === 'rounded') {
      this.classList.push('full-rounded');
    }
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

  private checkLabeled() {
    this.isLabeled = this.check(this.labeled);
  }

  private check(attribute?: string) {
    return attribute == '';
  }
}
