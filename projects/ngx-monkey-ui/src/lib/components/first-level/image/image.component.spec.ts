import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonkeyImage } from './image.component';
import { NgxMonkeyUiModule } from '../../../ngx-monkey-ui.module';

describe('ImageComponent', () => {
  let component: MonkeyImage;
  let fixture: ComponentFixture<MonkeyImage>;

  const image = (): HTMLImageElement => fixture.nativeElement.querySelector('img');

  const loadImage = () => {
    image().dispatchEvent(new Event('load'));
    fixture.detectChanges();
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxMonkeyUiModule],
    });
    fixture = TestBed.createComponent(MonkeyImage);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('src', 'monkey.png');
    fixture.componentRef.setInput('alt', 'A monkey');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('does not show the placeholder again when only alt changes', () => {
    loadImage();

    fixture.componentRef.setInput('alt', 'Another monkey');
    fixture.detectChanges();

    expect(component.loading).toBeFalse();
  });

  it('shows the placeholder again when src changes', () => {
    loadImage();

    fixture.componentRef.setInput('src', 'another-monkey.png');
    fixture.detectChanges();

    expect(component.loading).toBeTrue();
  });

  it('leaves the placeholder when the image fails to load', () => {
    let errors = 0;
    component.onLoadingImageError.subscribe(() => errors++);

    image().dispatchEvent(new Event('error'));
    fixture.detectChanges();

    expect(component.loading).toBeFalse();
    expect(errors).toBe(1);
  });

  it('title defaults to alt', () => {
    expect(image().title).toBe('A monkey');

    fixture.componentRef.setInput('title', 'Custom title');
    fixture.detectChanges();

    expect(image().title).toBe('Custom title');
  });
});
