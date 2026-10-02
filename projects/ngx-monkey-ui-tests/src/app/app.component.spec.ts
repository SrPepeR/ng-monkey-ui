import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { NgxMonkeyUiModule } from 'ngx-monkey-ui';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([]), NgxMonkeyUiModule],
      declarations: [AppComponent],
    }),
  );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'ngx-monkey-ui-tests'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('ngx-monkey-ui-tests');
  });

  it('should render the menu, the aside menu and the router outlet', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('monkey-menu')).toBeTruthy();
    expect(compiled.querySelector('monkey-aside-menu')).toBeTruthy();
    expect(compiled.querySelector('main router-outlet')).toBeTruthy();
  });
});
