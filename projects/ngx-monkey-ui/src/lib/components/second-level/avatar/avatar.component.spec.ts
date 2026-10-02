import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonkeyAvatar } from './avatar.component';
import { NgxMonkeyUiModule } from '../../../ngx-monkey-ui.module';

describe('AvatarComponent', () => {
  let component: MonkeyAvatar;
  let fixture: ComponentFixture<MonkeyAvatar>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxMonkeyUiModule],
    });
    fixture = TestBed.createComponent(MonkeyAvatar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
