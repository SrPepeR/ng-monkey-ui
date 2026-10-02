import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonkeyAlert } from './alert.component';
import { NgxMonkeyUiModule } from '../../../ngx-monkey-ui.module';
import { Message } from '../../../objects/classes/message-data.class';
import { MonkeyStyle } from '../../../objects/enums/style.enum';

describe('AlertComponent', () => {
  let component: MonkeyAlert;
  let fixture: ComponentFixture<MonkeyAlert>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxMonkeyUiModule],
    });
    fixture = TestBed.createComponent(MonkeyAlert);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('the dismiss, accept and reject buttons emit their outputs once', () => {
    const emitted: string[] = [];
    component.onAccept.subscribe(() => emitted.push('accept'));
    component.onReject.subscribe(() => emitted.push('reject'));
    component.onDismiss.subscribe(() => emitted.push('dismiss'));
    fixture.componentRef.setInput('acceptable', 'true');
    fixture.componentRef.setInput('rejectable', 'true');

    ['.accept-btn', '.reject-btn', '.dimiss-btn'].forEach((selector) => {
      component.message = new Message(['Hello'], MonkeyStyle.WARNING, false);
      fixture.detectChanges();

      const actionButton: HTMLElement = fixture.nativeElement.querySelector(selector);
      actionButton.click();
      actionButton.querySelector('button')!.click();
      fixture.detectChanges();
    });

    expect(emitted).toEqual(['accept', 'reject', 'dismiss']);
  });
});
