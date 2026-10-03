# ng-gorilla-ui

Home of `ngx-gorilla-ui`, an Angular 22 component library, and its catalog. It succeeds `ngx-monkey-ui`, rebuilt from scratch to be accessible, lightweight, and ready for zoneless and server-rendered apps.

> **Status:** in preparation. No version has been released yet, and until the new workspace lands, the code under `projects/` is still `ngx-monkey-ui`.

## Premises

1. **Accessibility is verified, not assumed:** AA contrast checked in every variant and theme, and full respect for color scheme, reduced motion, reduced transparency, contrast, and forced colors preferences.
2. **Every token is yours:** colors, sizes, spacing, radii, shadows, typography, and motion are CSS custom properties in a cascade layer, so your own CSS overrides them without `!important`.
3. **No abrupt changes:** every visual change is a transition or an animation, unless the user prefers reduced motion.
4. **Performance first:** CSS before JavaScript, signals, `OnPush`, zoneless, and a size budget per entry point.

## What it will be

- **Six visual variants** that share the same color tokens: `default` (the library's own style), `brutalist`, `glass`, `material` (after Material Design 3 Expressive), `minimal`, and `swift` (after SwiftUI). Plain CSS on top of tokens with `light-dark()`, applied by a directive, with no inheritance.
- **Semantic colors** (`primary`, `secondary`, `tertiary`, `neutral`, `success`, `warning`, `danger`, `info`), five sizes (`xs` to `xl`), and light, dark, and system themes, with `system` as the default.
- **Accessible from the first component:** focus, keyboard, and ARIA come from Angular Aria and the CDK, and axe runs in CI on both themes.
- **Modern Angular:** signals, `OnPush`, standalone, zoneless and SSR ready, with no injected `<style>` elements (strict CSP friendly).
- **Forms** with `ControlValueAccessor`, compatible with Signal Forms.
- **One entry point per component** (`ngx-gorilla-ui/button`), so each app ships only what it uses.
- **No third-party requests:** system font and inline Lucide SVG icons by default.
- **Browser support:** the last two versions of Chrome, Edge, Firefox, and Safari.

## Structure

Once the new workspace lands, it will hold two projects:

```text
projects/
  ngx-gorilla-ui/            # the library
  ngx-gorilla-ui-catalog/    # the documentation and catalog, built with the library itself
```

## Documentation

- The documentation site will explain how to use every component, with live examples, API, tokens, and accessibility notes. It will be deployed to Vercel with the first component.
- [`CONTRIBUTING.md`](./CONTRIBUTING.md): premises, branch flow, releases, and definition of done.
- [`CHANGELOG.md`](./CHANGELOG.md): changes in each release.
- Internal project documents, in Spanish:
  - [`docs/ROADMAP.md`](./docs/ROADMAP.md): what is done and pending, and the history of `ngx-monkey-ui`.
  - [`docs/PROPUESTA-NGX-GORILLA-UI.md`](./docs/PROPUESTA-NGX-GORILLA-UI.md): why the library is rebuilt, its premises, architecture principles, design decisions, and workflow.
  - [`docs/ERRORES-A-EVITAR.md`](./docs/ERRORES-A-EVITAR.md): the checklist of `ngx-monkey-ui` mistakes that must not happen again.
  - `.agents/plans/`: the plan for each roadmap point.

## ngx-monkey-ui

The previous library is frozen in the `ngx-monkey-ui-legacy` tag, with its code, test app, analysis, and changelog. To check it out next to the current code:

```bash
git worktree add ../monkey-legacy ngx-monkey-ui-legacy
```

## Author

[Kevin J. Rodríguez Morales](https://kevinrodriguez.es) ([@SrPepeR](https://github.com/SrPepeR)).

## License

[MIT](./LICENSE).
