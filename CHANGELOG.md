# Changelog

All notable changes to `ngx-gorilla-ui`. The project follows [Semantic Versioning](https://semver.org/): `0.x` while the API settles, and `1.0.0` once the navigation and layout components ([roadmap](./docs/ROADMAP.md) point 5, in Spanish) are done.

The history of `ngx-monkey-ui`, the previous library, up to the unreleased `0.3.2`, is in the [`CHANGELOG.md` of the `ngx-monkey-ui-legacy` tag](https://github.com/SrPepeR/ng-gorilla-ui/blob/ngx-monkey-ui-legacy/CHANGELOG.md) (in Spanish).

## 0.1.0 (unreleased)

First version of `ngx-gorilla-ui`: the workspace and its tooling (roadmap point 0) and the foundations with the button (point 1).

### Project

- Angular 22 workspace with the `ngx-gorilla-ui` library (primary entry point exporting `GORILLA_VERSION`) and the zoneless `ngx-gorilla-ui-catalog` documentation app. Requires Node 24.
- Supported browsers: the last two versions of Chrome, Edge, Firefox, and Safari, desktop and mobile (`.browserslistrc`).
- Contribution rules in `CONTRIBUTING.md`: premises (verified accessibility, overridable tokens, no abrupt changes, performance), branch flow, releases, and definition of done.
- CI also runs on pushes to `release/**` branches.
