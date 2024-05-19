import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Styleable } from '../../../bases/styleable.base';
import { ThemeService } from '../../../services/theme.service';
import { MonkeyIconsService } from '../../../services/fonts-icons/icons.service';
import { IconProvider, IconsProviders } from '../../../services/fonts-icons/icons-providers';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'monkey-icon',
  templateUrl: './icon.component.html',
  styleUrls: [
    '../../../styles/components/_common.default.style.scss',
    './icon.component.scss',
  ],
})
export class MonkeyIcon extends Styleable implements OnInit, OnDestroy {

  /**
   * The icon to be displayed.
   */
  @Input() icon!: string;

  /**
   * The provider for the icon.
   */
  iconProvider?: IconProvider;

  /**
   * Represents the Google Family icons provider.
   */
  googleFamily = IconsProviders.GOOGLE_FAMILY;

  /**
   * Subject used to unsubscribe from observables when the component is destroyed.
   */
  private unsubscribeComponent: Subject<void> = new Subject<void>();

  /**
   * Observable that emits a boolean indicating whether the theme is in dark mode or not.
   */
  isDarkMode$ = this.themeService.isDarkMode$;

  constructor(
    private themeService: ThemeService,
    private iconsService: MonkeyIconsService,
  ) {
    super();
    this.iconProvider = this.iconsService.DEFAULT_ICONS_PROVIDER;
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.updateIconProvider();
  }

  /**
   * Updates the icon provider based on the events emitted by the icons service.
   * Subscribes to the icons service event and sets the icon provider accordingly.
   */
  private updateIconProvider() {
    this.iconsService.event
      .pipe(takeUntil(this.unsubscribeComponent))
      .subscribe(provider => {
        this.iconProvider = provider;
      }
    );
  }

  /**
   * Cleans up resources when the component is destroyed.
   */
  ngOnDestroy() {
    this.unsubscribeComponent.next();
    this.unsubscribeComponent.complete();
  }

}
