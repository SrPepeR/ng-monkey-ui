import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GorillaTheme } from 'ngx-gorilla-ui/theme';

@Component({
  selector: 'gorilla-theming',
  imports: [RouterLink],
  templateUrl: './theming.html',
  styleUrl: './theming.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Theming {
  protected readonly theme = inject(GorillaTheme);

  protected readonly stylesSnippet = `"styles": [
  "node_modules/ngx-gorilla-ui/styles/tokens.css",
  "src/styles.css"
]`;

  protected readonly providerSnippet = `import { provideGorillaTheme } from 'ngx-gorilla-ui/theme';

bootstrapApplication(App, {
  providers: [provideGorillaTheme({ defaultTheme: 'system', storageKey: 'gorilla-theme' })],
});`;

  protected readonly serviceSnippet = `import { GorillaTheme } from 'ngx-gorilla-ui/theme';

export class ThemeToggle {
  private readonly theme = inject(GorillaTheme);

  toggle(): void {
    this.theme.setTheme(this.theme.resolvedTheme() === 'dark' ? 'light' : 'dark');
  }
}`;

  protected readonly overrideSnippet = `/* Your global styles, outside any cascade layer. */
:root {
  --gorilla-primary-solid: #0f766e;
  --gorilla-radius-md: 4px;
  --gorilla-font-family: 'Inter', system-ui, sans-serif;
}

/* Only inside a section of the app. */
.checkout {
  --gorilla-primary-solid: var(--gorilla-violet-9);
}`;
}
