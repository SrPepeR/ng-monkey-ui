import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { MonkeyHeader } from './header.component';
import { NgxMonkeyUiModule } from '../../../ngx-monkey-ui.module';
import { MonkeyStyle } from '../../../objects/enums/style.enum';

describe('HeaderComponent', () => {
  let component: MonkeyHeader;
  let fixture: ComponentFixture<MonkeyHeader>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxMonkeyUiModule],
    });
    fixture = TestBed.createComponent(MonkeyHeader);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('applies the classList to its element', fakeAsync(() => {
    fixture.componentRef.setInput('style', MonkeyStyle.DANGER);
    fixture.componentRef.setInput('brutalist', '');
    fixture.detectChanges();
    tick(300);
    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement.querySelector('span');
    expect(element.classList).toContain('style-danger');
    expect(element.classList).toContain('type-brutalist');
  }));
});
