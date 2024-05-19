import { Injectable } from '@angular/core';
import { IconProvider, IconsProviders } from './icons-providers';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonkeyIconsService {

  /**
   * The provider ID for the NGX Monkey Icons service.
   */
  NGX_MONKEY_ICONS_PROVIDER_ID = 'ngx-monkey-icons-provider';

  /**
   * The default icons provider.
   */
  DEFAULT_ICONS_PROVIDER: IconProvider = IconsProviders.GOOGLE_NEW_OUTLINE;

  /**
   * Represents a subject that emits values of type `IconProvider` or `undefined`.
   */
  event: Subject<IconProvider | undefined> = new Subject<IconProvider | undefined>();

  constructor() {
    this.initIconsProvider(this.DEFAULT_ICONS_PROVIDER);
  }

  /**
   * Initializes the icons provider by adding a link element to the document's head.
   * If the provider is already initialized, updates the provider's href.
   * @param provider - The URL of the icons provider stylesheet.
   */
  initIconsProvider(provider: IconProvider) {
    let link;
    this.event.next(provider);

    if (!document.getElementById(this.NGX_MONKEY_ICONS_PROVIDER_ID)) {
      link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = provider.href;
      link.id = this.NGX_MONKEY_ICONS_PROVIDER_ID;
      document.head.appendChild(link);

      return;
    }
    
    link = document.getElementById(this.NGX_MONKEY_ICONS_PROVIDER_ID) as HTMLLinkElement;
    link.href = provider.href;
  }

  /**
   * Removes the icons provider from the DOM.
   */
  removeIconsProvider() {
    const link = document.getElementById(this.NGX_MONKEY_ICONS_PROVIDER_ID) as HTMLLinkElement;
    link.remove();

    this.event.next(undefined);
  }
  
}
