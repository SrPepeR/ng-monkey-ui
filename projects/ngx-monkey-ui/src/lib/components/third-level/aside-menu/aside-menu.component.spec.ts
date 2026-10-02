import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { MonkeyAsideMenu } from './aside-menu.component';
import { NgxMonkeyUiModule } from '../../../ngx-monkey-ui.module';
import { MenuOption } from '../../../objects/interfaces/menu-option.interface';

describe('AsideMenuComponent', () => {
  const OPTIONS: MenuOption[] = [{ label: 'Home', icon: 'home', route: 'home' }];

  /** Creates an aside menu without triggering `ngOnChanges`, so screen changes do not resize it. */
  const create = (data: MenuOption[] = OPTIONS): ComponentFixture<MonkeyAsideMenu> => {
    const created = TestBed.createComponent(MonkeyAsideMenu);
    created.componentInstance.data = data;
    created.detectChanges();
    return created;
  };

  const content = (target: ComponentFixture<MonkeyAsideMenu>): HTMLElement =>
    target.nativeElement.querySelector('monkey-card.aside-menu');

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxMonkeyUiModule],
      providers: [provideRouter([])],
    });
  });

  it('should create', () => {
    expect(create().componentInstance).toBeTruthy();
  });

  it('renders without errors when data is empty', () => {
    const fixture = create([]);

    expect(fixture.componentInstance.currentOption).toBeUndefined();
    expect(content(fixture)).toBeTruthy();
  });

  it('two instances resize their own content element', () => {
    const first = create();
    const second = create();
    // Both menus in the page at the same time, as in an app with two of them.
    document.body.append(first.nativeElement, second.nativeElement);
    const firstWidth = content(first).style.width;

    second.componentInstance.openMenu();

    expect(content(second).style.width).toBe(second.componentInstance.OPENED_ASIDE_WIDTH);
    expect(content(first).style.width).toBe(firstWidth);

    first.nativeElement.remove();
    second.nativeElement.remove();
  });
});
