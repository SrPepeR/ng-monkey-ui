import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MonkeyAlertService, MonkeyFontService, MonkeyStyle } from 'ngx-monkey-ui';
import { MonkeyButtonData } from 'projects/ngx-monkey-ui/src/lib/objects/classes/button-data.class';
import { map } from 'rxjs';

@Component({
  selector: 'app-example-page',
  templateUrl: './example-page.component.html',
  styleUrls: ['./example-page.component.scss']
})
export class ExamplePageComponent {

  @Input() currentStyle: MonkeyStyle = MonkeyStyle.PRIMARY;

  contentHeaderAction: MonkeyButtonData = new MonkeyButtonData(this.currentStyle, 'Show alert', () => this.onClicked('Content header'), 'info', 'right');

  constructor(
    private alertService: MonkeyAlertService,
    private fontService: MonkeyFontService,
    private route: ActivatedRoute,
  ) {
    this.manageParams();
    this.fontService.addDosisFont();
  }

  private manageParams(): void {
    this.route.paramMap.pipe(
      map(params => {
        this.setStyle(params.get('style') ?? undefined);
      })).subscribe();
  }

  private setStyle(style?: string): void {
    switch (style) {
      case 'secondary':
        this.currentStyle = MonkeyStyle.SECONDARY;
        break;
      case 'tertiary':
        this.currentStyle = MonkeyStyle.TERTIARY;
        break;
      case 'warning':
        this.currentStyle = MonkeyStyle.WARNING;
        break;
      case 'danger':
        this.currentStyle = MonkeyStyle.DANGER;
        break;
      case 'success':
        this.currentStyle = MonkeyStyle.SUCCESS;
        break;
      case 'info':
        this.currentStyle = MonkeyStyle.INFO;
        break;
      default:
        this.currentStyle = MonkeyStyle.PRIMARY;
        break;
    }
  }

  onClicked(fromButton: string): void {
    this.alertService.warnings(['Botón ' + fromButton + ' presionado.'], true, 'Warning');
  }

}
