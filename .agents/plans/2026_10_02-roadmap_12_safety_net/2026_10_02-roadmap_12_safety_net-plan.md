---
name: "2026_10_02-roadmap_12_safety_net"
description: "Roadmap point 12: make the test suite compile and pass, pin Node, add GitHub Actions CI, add lint and format, and add behaviour tests for the units that points 13 and 14 will change."
created_at: "2026-10-02T00:00:00Z"

created_by:
  tool: "Claude Code"
  model:
    name: "Claude Opus"
    version: "5.5"
    reasoning_effort: "low"

implemented_by:
  tool: "Claude Code"
  model:
    name: "Claude Opus"
    version: "5.5"
    reasoning_effort: "low"

last_implementation_at: "2026-10-02T19:45:00Z"
has_completed_all_phases: "false"
---

# Roadmap 12: Safety net before any change

## 🎯 Goal

Give the `ngx-monkey-ui` workspace a safety net: a test suite that compiles and passes, a pinned Node version, a GitHub Actions CI, lint and format checks, and behaviour tests that document the known bugs (E-xx) before points 13 and 14 fix them.

## 👀 Context

- Branch: `chore/safety-net`, created from `origin/main` (`64bf567`).
- There is no `AGENTS.md`, no `CLAUDE.md` and no `docs/` folder. The references are:
  - [ROADMAP.md](../../../ROADMAP.md): point 12 (12.1 to 12.5).
  - [ANALISIS.md](../../../ANALISIS.md): E-01 (suite does not compile), E-02 to E-06, E-11, E-16, E-20, E-23.
  - [.editorconfig](../../../.editorconfig): 2 spaces, UTF-8, final newline, single quotes in `*.ts`.
- Workspace config:
  - [package.json](../../../package.json): Angular 18.2.8, TypeScript ~5.4.5, Karma ~6.4.0, Jasmine ~4.6.0. No `engines`, no lint, no format.
  - [angular.json](../../../angular.json): projects `ngx-monkey-ui` (library, `ng-packagr`) and `ngx-monkey-ui-tests` (app, `application` builder). The Karma targets have no `karmaConfig` and no `browsers`.
  - [projects/ngx-monkey-ui/tsconfig.spec.json](../../../projects/ngx-monkey-ui/tsconfig.spec.json) and [projects/ngx-monkey-ui-tests/tsconfig.spec.json](../../../projects/ngx-monkey-ui-tests/tsconfig.spec.json).
  - No `.github/`, `.nvmrc`, ESLint or Prettier config.
- Test suite:
  - 25 library specs under [projects/ngx-monkey-ui/src/lib/components](../../../projects/ngx-monkey-ui/src/lib/components), each with only `should create` and `declarations: [Component]`.
  - [theme-changer.component.spec.ts](../../../projects/ngx-monkey-ui/src/lib/components/fourth-level/theme-changer/theme-changer.component.spec.ts): imports `ThemeChangerComponent`; the class is `MonkeyThemeChanger` (E-01).
  - 11 specs fail after the import fix: composite components (alert, icon-button, tooltip, menu, aside-menu...), form components (need `ReactiveFormsModule`) and components that inject `Router` (menu, aside-menu, login page).
  - [app.component.spec.ts](../../../projects/ngx-monkey-ui-tests/src/app/app.component.spec.ts): uses `RouterTestingModule` and checks a title.
  - [ngx-monkey-ui.module.ts](../../../projects/ngx-monkey-ui/src/lib/ngx-monkey-ui.module.ts): declares and exports all components; imports `CommonModule` and `ReactiveFormsModule`.
- Units for the behaviour tests:
  - [components-styles.service.ts](../../../projects/ngx-monkey-ui/src/lib/services/components-styles.service.ts): `generateClassList(component)` (E-04).
  - [styleable.base.ts](../../../projects/ngx-monkey-ui/src/lib/bases/styleable.base.ts): E-02, E-03, E-05.
  - [input.base.ts](../../../projects/ngx-monkey-ui/src/lib/bases/input/input.base.ts): `invalidMessages`, `inputChanged()` (E-06, E-23).
  - [theme.service.ts](../../../projects/ngx-monkey-ui/src/lib/services/theme.service.ts): `isDarkMode$`, `toggleDarkMode()`, reads `localStorage` and `matchMedia` (E-11).
  - [alert.service.ts](../../../projects/ngx-monkey-ui/src/lib/services/alert.service.ts): `event`, `warning()`/`warnings()`, `danger()`/`dangers()`, `success()`/`successes()`, `info()`/`infos()`, `custom()`/`customs()`, `hide()`.
  - [tooltip.service.ts](../../../projects/ngx-monkey-ui/src/lib/services/tooltip/tooltip.service.ts) and `tooltip.ts`: `onShow()`, `show()`, `hide()` (E-20, E-21).
  - [font.service.ts](../../../projects/ngx-monkey-ui/src/lib/services/font.service.ts): `add*Font()`, `remove*Font()`, `addCustomFont()`, `useCustomFont()`, `removeCustomFont()` (E-16).
  - [screen.service.ts](../../../projects/ngx-monkey-ui/src/lib/services/screen/screen.service.ts): `screenChanges$`, used by `Styleable`.
- Decisions:
  - Node 22 is the only line that Angular 18 and Angular 22 both support: `^22.22.3`.
  - A test that shows a known bug is an `xit` whose title starts with its `E-xx` id. Points 13 and 14 change it to `it` before the fix. The CI stays green.
  - Prettier formats all the code in one separate commit, and `.git-blame-ignore-revs` lists that commit.

## 🪜 Phases

### Phase 1: The test suite compiles and passes (12.1)

The library suite and the app suite compile and pass in a headless browser with one command.

**Public contracts**

- npm script `test:ci`: `ng test ngx-monkey-ui --watch=false --browsers=ChromeHeadless && ng build ngx-monkey-ui && ng test ngx-monkey-ui-tests --watch=false --browsers=ChromeHeadless`. The library build is necessary because the test app resolves `ngx-monkey-ui` from `dist/` (`tsconfig.json` `paths`).
- Test suites modified (each keeps `should create`):
  - `MonkeyThemeChanger`: import fixed (`ThemeChangerComponent` → `MonkeyThemeChanger`).
  - The 11 failing specs: `imports: [NgxMonkeyUiModule]` instead of `declarations`, and `provideRouter([])` for `MonkeyMenu` and `MonkeyAsideMenu` (the only components that inject `Router`).
  - `MonkeyInputText` and `MonkeyInputNumber`: `setInput('formGroup', ...)` and `setInput('name', 'field')` before the first `detectChanges()`.
  - `AppComponent` (test app): `imports: [RouterModule.forRoot([]), NgxMonkeyUiModule]`; keeps `should create the app` and `should have as title 'ngx-monkey-ui-tests'`; `should render title` (the template has no `.content span`) becomes `should render the menu, the aside menu and the router outlet`.

**To-do**

- [x] Fix the import in `theme-changer.component.spec.ts`.
- [x] Run `ng test ngx-monkey-ui --watch=false --browsers=ChromeHeadless` and list the failing specs and their errors.
- [x] Give each failing spec the `NgxMonkeyUiModule` import (or the minimum `declarations`/`imports`) and `provideRouter([])` where `Router` is injected.
- [x] Make `app.component.spec.ts` pass with the current `AppComponent`.
- [x] Add the `test:ci` script to `package.json`.
- [x] Mark 12.1 as done in `ROADMAP.md`, with a short note on the result (done with Phase 2).
- [x] Verify the changes in terms of typechecking, linting and tests using the project's verification command (`npm run test:ci`, `ng build ngx-monkey-ui`, `ng build ngx-monkey-ui-tests`). Fix issues if any.
- [x] STOP. Present the changes to the user for review and suggest commit messages (or pull request titles, when the phases are implemented through pull requests). Do NOT proceed to the next phase until the user explicitly asks.

### Phase 2: Pinned Node version (12.5)

The workspace declares the Node version for local work and for the CI.

**Public contracts**

- `.nvmrc`: `22.23.3` (the latest Node 22 LTS patch on 2026-10-02).
- `package.json` `engines`: `{ "node": "^22.22.3" }`.

**To-do**

- [x] Add `.nvmrc`.
- [x] Add `engines.node` to the root `package.json`.
- [x] Update `package-lock.json` if `npm install` changes it.
- [x] Mark 12.5 as done in `ROADMAP.md`, with a short note on the result.
- [x] Note in the PR that the local Node is outside `engines` (it is now 24.18.1, not 22.22.0 as `ANALISIS.md` said), so `npm install` can give an `EBADENGINE` warning. All checks pass on it, but Angular 18 does not officially support Node 24: use `nvm use` for the pinned version.
- [x] Verify the changes in terms of typechecking, linting and tests using the project's verification command (`npm run test:ci`, `ng build ngx-monkey-ui`, `ng build ngx-monkey-ui-tests`). Fix issues if any.
- [x] STOP. Present the changes to the user for review and suggest commit messages (or pull request titles, when the phases are implemented through pull requests). Do NOT proceed to the next phase until the user explicitly asks.

### Phase 3: Continuous integration with GitHub Actions (12.3)

Each pull request and each push to `main` builds the library, runs the tests and builds the test app.

**Public contracts**

- Workflow `.github/workflows/ci.yml`, job `build-and-test` on `ubuntu-latest`, triggers `pull_request` and `push` to `main`:
  1. `actions/checkout`.
  2. `actions/setup-node` with `node-version-file: .nvmrc` and `cache: npm`.
  3. `npm ci`.
  4. `npx ng build ngx-monkey-ui`.
  5. `npm run test:ci`.
  6. `npx ng build ngx-monkey-ui-tests`.
- If Chrome needs `--no-sandbox` on the runner: a custom launcher `ChromeHeadlessCI` in a new `karma.conf.js`, referenced by `karmaConfig` in the two Karma targets of `angular.json`, and used by `test:ci`. Not necessary: the first run passed with `ChromeHeadless`.
- The workflow also has `permissions: contents: read` and a `concurrency` group that cancels old runs of the same ref.
- Draft pull request: [SrPepeR/ng-monkey-ui#28](https://github.com/SrPepeR/ng-monkey-ui/pull/28), with Auto-fix on.

**To-do**

- [x] Add `.github/workflows/ci.yml`.
- [x] Push the branch and check the first run of the workflow.
- [x] If Chrome fails on the runner, add the `ChromeHeadlessCI` launcher and use it in `test:ci` (not necessary: run `37052969506` passed).
- [x] Mark 12.3 as done in `ROADMAP.md`, with a short note on the result.
- [x] Verify the changes in terms of typechecking, linting and tests using the project's verification command (`npm run test:ci`, `ng build ngx-monkey-ui`, `ng build ngx-monkey-ui-tests`, and a green CI run). Fix issues if any.
- [x] STOP. Present the changes to the user for review and suggest commit messages (or pull request titles, when the phases are implemented through pull requests). Do NOT proceed to the next phase until the user explicitly asks.

### Phase 4: Lint and format (12.4)

The code follows the recommended `angular-eslint` rules and a Prettier format that agrees with `.editorconfig`, and the CI checks both.

**Public contracts**

- `angular-eslint` 18 (`ng add @angular-eslint/schematics@18`): `eslint.config.js` with the recommended TypeScript and template rules, and a `lint` target in the two projects of `angular.json`.
- Prettier: `.prettierrc.json` (`singleQuote: true`, `printWidth: 100`, `overrides` with the `angular` parser for `*.html`), `.prettierignore` (`dist`, `coverage`, `.angular`, `node_modules`), and `eslint-config-prettier` in the ESLint config.
- npm scripts: `lint` (`ng lint`), `format` (`prettier --write .`), `format:check` (`prettier --check .`).
- `.git-blame-ignore-revs` with the hash of the format commit.
- CI: steps `npm run lint` and `npm run format:check` after `npm ci`.
- Result:
  - `angular-eslint` 18.4.3 (`ng add angular-eslint@18` + `add-eslint-to-project` for each project). The test app uses the `app` selector prefix.
  - Library rules deferred with a comment in `projects/ngx-monkey-ui/eslint.config.js`: `component-class-suffix` off (the `Monkey*` names are the API), `no-output-on-prefix` off (17.7), `no-explicit-any` and `no-unsafe-function-type` as warnings (17, 24.3), template keyboard and focus rules as warnings (20). The three base classes disable `component-selector` on their selector line (14.5). Result: 0 errors, 35 warnings.
  - Fixed: autofixable rules, two unused imports, two empty constructors, `no-cond-assign` in `tooltip.ts`, `==` in the aside menu template, and `@ts-ignore` → `@ts-expect-error` in `screen.service.ts`.
  - Found while linting: `unlockOrientation()` returns the `void` of `screen.orientation.unlock()` as a `Promise<void>`, so the `.catch()` of the callers fails at runtime. It is marked with `@ts-expect-error` and must become a new `E-xx` in `ANALISIS.md`.
  - Prettier 3 with `endOfLine: "auto"` (the repository uses `core.autocrlf=true`), and `.prettierignore` also skips `package-lock.json` and `*.md` (prose keeps its line breaks).
  - Commits: `be4da4e` (setup and lint fixes), `0fb41fc` (format only, in `.git-blame-ignore-revs`), then CI steps, `ROADMAP.md` and plan.

**To-do**

- [x] Add `angular-eslint` and the `lint` targets.
- [x] Fix the lint errors, or disable a rule with a comment that gives the reason when the fix changes the public API (the fix then goes to point 17).
- [x] Add Prettier, its config and `eslint-config-prettier`.
- [x] Run `npm run format` in a separate commit that has only format changes.
- [x] Add `.git-blame-ignore-revs` with the hash of that commit.
- [x] Add the `lint` and `format:check` steps to the CI.
- [x] Mark 12.4 as done in `ROADMAP.md`, with a short note on the result.
- [x] Verify the changes in terms of typechecking, linting and tests using the project's verification command (`npm run lint`, `npm run format:check`, `npm run test:ci`, `ng build ngx-monkey-ui`, `ng build ngx-monkey-ui-tests`, and a green CI run). Fix issues if any.
- [x] STOP. Present the changes to the user for review and suggest commit messages (or pull request titles, when the phases are implemented through pull requests). Do NOT proceed to the next phase until the user explicitly asks.

### Phase 5: Behaviour tests for the units that points 13 and 14 change (12.2)

Each unit has tests for its current correct behaviour (`it`) and for its known bugs (`xit` with the `E-xx` id in the title).

**Public contracts (test suites)**

- `ComponentsStylesService` (`components-styles.service.spec.ts`, new):
  - `it` generates the color class from `style`.
  - `it` adds the variant class (`brutalist`, `flat`, `ghost`, `glass`, `glow`).
  - `it` adds the layout classes (`flexWrap`, `flexCenter`, `sticky`...).
  - `xit` E-04: does not duplicate classes.
- `Styleable` (`styleable.base.spec.ts`, new, through `MonkeyButton` and `MonkeyLoader` in a host component):
  - `it` applies `classList` from the inputs.
  - `it` recalculates `classList` after an input change.
  - `xit` E-02: keeps one subscription to the screen changes after several input changes.
  - `xit` E-03: does not remove the classes of the `<main>` element.
  - `xit` E-05: keeps the size class of `MonkeyLoader` after an input change and after a resize.
- `MonkeyInput` (`input-text.component.spec.ts`, extended, through `MonkeyInputText`):
  - `it` shows no message when the value is valid.
  - `it` shows the message of a validator other than `required`.
  - `xit` E-06: shows the required message when the value is empty.
  - `xit` E-23: recalculates the messages after `reset()`, `setValue()` and `markAllAsTouched()`.
- `ThemeService` (`theme.service.spec.ts`, new):
  - `it` uses the theme stored in `localStorage`.
  - `it` uses `prefers-color-scheme` when no theme is stored.
  - `it` `toggleDarkMode()` emits the new value on `isDarkMode$` and updates `isDarkMode`/`isLightMode`.
  - `xit` E-11: stores the choice in `localStorage`.
  - `xit` E-11: follows the changes of `prefers-color-scheme` when the user did not choose.
- `MonkeyAlertService` (`alert.service.spec.ts`, new):
  - `it` each single method (`warning`, `danger`, `success`, `info`, `custom`) emits one message with the correct style.
  - `it` each plural method emits the list of messages.
  - `it` `hide()` emits the hide event.
  - `it` closes the alert automatically after the given time (`fakeAsync`).
- `MonkeyTooltipService` (`tooltip.service.spec.ts`, new):
  - `it` `onShow()` emits after the delay (`fakeAsync`).
  - `it` `show()` emits immediately.
  - `it` `hide()` emits the hide event.
  - `xit` E-20: accepts the coordinate 0.
- `MonkeyFontService` (`font.service.spec.ts`, new; each test removes the `<link>` and `<style>` elements that it adds):
  - `it` adds the Dosis `<link>` when the service is created.
  - `it` `addCustomFont()` adds the `<link>` and `useCustomFont()` adds the `<style>`.
  - `xit` E-16: does not add a second `<link>` for the same URL.
  - `xit` E-16: `removeDosisFont()` removes the `<link>` and the `<style>`.
  - `xit` E-16: the `<link>` and the `<style>` have different ids.
  - `xit` E-16: the Red Hat Display URL has `display=swap`.

**To-do**

- [ ] Add the `ComponentsStylesService` suite.
- [ ] Add the `Styleable` suite.
- [ ] Extend the `MonkeyInputText` suite with the `MonkeyInput` cases.
- [ ] Add the `ThemeService` suite, with `localStorage` and `matchMedia` replaced by spies.
- [ ] Add the `MonkeyAlertService` and `MonkeyTooltipService` suites.
- [ ] Add the `MonkeyFontService` suite.
- [ ] Change each `xit` to `it` one time, confirm that it fails for the reason in its `E-xx`, and change it back to `xit`.
- [ ] Mark 12.2 and point 12 as done in `ROADMAP.md`, and move point 12 to "Features implementadas".
- [ ] Verify the changes in terms of typechecking, linting and tests using the project's verification command (`npm run lint`, `npm run format:check`, `npm run test:ci`, `ng build ngx-monkey-ui`, `ng build ngx-monkey-ui-tests`, and a green CI run). Fix issues if any.
- [ ] STOP. Present the changes to the user for review and suggest commit messages (or pull request titles, when the phases are implemented through pull requests). Do NOT proceed to the next phase until the user explicitly asks.

## ⏭️ Next step

Implement Phase 5: add the behaviour tests for the units that points 13 and 14 change.

Safety net knitted by 🐢 💨 (Turbotuga™, [Codely](https://codely.com)’s mascot): the first monkey jumps and lands on 28 green tests, ties its rope to Node 22, a robot checks every knot, and a broom sweeps the floor before the show. 🐒 ✅ 📌 🤖 🧹 🐢 💨
