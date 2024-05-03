import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonkeyAvatar } from './avatar.component';

describe('AvatarComponent', () => {
  let component: MonkeyAvatar;
  let fixture: ComponentFixture<MonkeyAvatar>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonkeyAvatar]
    });
    fixture = TestBed.createComponent(MonkeyAvatar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
