import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxMonkeyUiComponent } from './ngx-monkey-ui.component';

describe('NgxMonkeyUiComponent', () => {
  let component: NgxMonkeyUiComponent;
  let fixture: ComponentFixture<NgxMonkeyUiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgxMonkeyUiComponent]
    });
    fixture = TestBed.createComponent(NgxMonkeyUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
