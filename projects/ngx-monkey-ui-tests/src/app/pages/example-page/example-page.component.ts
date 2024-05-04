import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MonkeyAlertService, MonkeyButtonData, MonkeyFontService, MonkeyStyle } from 'ngx-monkey-ui';
import { map } from 'rxjs';

@Component({
  selector: 'app-example-page',
  templateUrl: './example-page.component.html',
  styleUrls: ['./example-page.component.scss']
})
export class ExamplePageComponent {

  @Input() currentStyle: MonkeyStyle = MonkeyStyle.PRIMARY;

  contentHeaderAction: MonkeyButtonData = new MonkeyButtonData(this.currentStyle, 'Show alert', () => this.showAlert('Content header'), 'info', 'right');

  constructor(
    private alertService: MonkeyAlertService,
    private fontService: MonkeyFontService,
    private route: ActivatedRoute,
    private router: Router,
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

  showAlert(fromButton: string): void {
    this.alertService.successes([`${fromButton} button pressed.`], true, 'Success');
  }

  navigateComponents(): void {
    this.router.navigate(['components']);
  }

}
