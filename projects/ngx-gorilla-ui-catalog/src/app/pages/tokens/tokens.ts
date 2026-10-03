import { ChangeDetectionStrategy, Component, computed, ElementRef, inject } from '@angular/core';
import { GorillaTheme } from 'ngx-gorilla-ui/theme';
import { contrastRatio } from '../../shared/contrast';

const ROLES = [
  { name: 'primary', tone: 'cyan' },
  { name: 'secondary', tone: 'violet' },
  { name: 'tertiary', tone: 'magenta' },
  { name: 'neutral', tone: 'gray' },
  { name: 'success', tone: 'green' },
  { name: 'warning', tone: 'amber' },
  { name: 'danger', tone: 'red' },
  { name: 'info', tone: 'blue' },
];

@Component({
  selector: 'gorilla-tokens',
  templateUrl: './tokens.html',
  styleUrl: './tokens.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Tokens {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly theme = inject(GorillaTheme);

  protected readonly tones = ['gray', 'cyan', 'violet', 'magenta', 'green', 'amber', 'red', 'blue'];
  protected readonly steps = Array.from({ length: 12 }, (_, index) => index + 1);
  protected readonly spaces = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16];
  protected readonly radii = ['xs', 'sm', 'md', 'lg', 'xl', 'full'];
  protected readonly shadows = [1, 2, 3, 4];
  protected readonly sizes = ['xs', 'sm', 'md', 'lg', 'xl'];
  protected readonly durations = ['fast', 'normal', 'slow'];

  /** Contrast of each role pair, recalculated when the resolved theme changes. */
  protected readonly roles = computed(() => {
    this.theme.resolvedTheme();
    const ratio = (foreground: string, background: string) =>
      contrastRatio(`var(${foreground})`, `var(${background})`, this.host.nativeElement);
    return ROLES.map(({ name, tone }) => ({
      name,
      tone,
      solid: ratio(`--gorilla-${name}-on-solid`, `--gorilla-${name}-solid`),
      subtle: ratio(`--gorilla-${name}-on-subtle`, `--gorilla-${name}-subtle`),
    }));
  });
}
