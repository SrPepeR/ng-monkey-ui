import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { MonkeyMenu } from './menu.component';
import { NgxMonkeyUiModule } from '../../../ngx-monkey-ui.module';
import { MonkeyTooltipService } from '../../../services/tooltip/tooltip.service';
import { MonkeyStyle } from '../../../objects/enums/style.enum';

describe('MenuComponent', () => {
  let component: MonkeyMenu;
  let fixture: ComponentFixture<MonkeyMenu>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxMonkeyUiModule],
      providers: [provideRouter([])],
    });
    fixture = TestBed.createComponent(MonkeyMenu);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('the alt input reaches the tooltip', () => {
    const onShow = spyOn(TestBed.inject(MonkeyTooltipService), 'onShow');
    fixture.componentRef.setInput('title', 'Monkey UI');
    fixture.componentRef.setInput('alt', 'Go to the home page');
    fixture.componentRef.setInput('style', MonkeyStyle.SECONDARY);
    fixture.detectChanges();

    const title: HTMLElement = fixture.nativeElement.querySelector('.title');
    title.dispatchEvent(new MouseEvent('mouseover', { clientX: 10, clientY: 20 }));

    expect(onShow).toHaveBeenCalledOnceWith(
      'Go to the home page',
      MonkeyStyle.SECONDARY,
      jasmine.any(Object),
    );
  });
});
