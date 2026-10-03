import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GORILLA_VERSION } from 'ngx-gorilla-ui';

@Component({
  selector: 'gorilla-getting-started',
  templateUrl: './getting-started.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GettingStarted {
  protected readonly version = GORILLA_VERSION;
}
