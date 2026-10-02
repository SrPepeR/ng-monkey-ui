---
name: "2026_10_02-roadmap_13_functional_bug_fixes"
description: "Roadmap point 13: fix the functional bugs of the library (E-06 to E-25) on Angular 18 without changing the public API, turning each pending xit into an it before the fix, and record the fixes in CHANGELOG.md."
created_at: "2026-10-02T21:00:00Z"

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

last_implementation_at: "2026-10-02T21:45:00Z"
has_completed_all_phases: "false"
---

# Roadmap 13: Fix the functional bugs without changing the public API

## 🎯 Goal

Fix every functional bug listed in roadmap point 13 (E-06 to E-25, except E-13, which moves to 17.8) on Angular 18, without renaming or retyping any input, output or public method, so that `0.3.2` can ship together with point 14. Every fix comes with a test that fails before it and passes after it.

## 👀 Context

- Branch: `fix/functional-bugs`, created from `origin/main` (`200e055`).
- There is no `AGENTS.md`, no `CLAUDE.md` and no `docs/` folder. The references are:
  - [ROADMAP.md](../../../ROADMAP.md): point 13 (13.1 to 13.16).
  - [ANALISIS.md](../../../ANALISIS.md): E-06 to E-25, each one with its file and line.
  - [.prettierrc.json](../../../.prettierrc.json) and the `eslint.config.js` files: the CI runs `npm run lint` and `npm run format:check`.
- Verification command: `npm run lint && npm run format:check && npm run test:ci && npx ng build ngx-monkey-ui-tests` (`test:ci` builds the library between the library and the test app suites).
- Test conventions (from point 12):
  - TestBed imports `NgxMonkeyUiModule`; components that inject `Router` add `provideRouter([])`; form components get a `FormGroup` and a `name` through `fixture.componentRef.setInput`.
  - Timers with `fakeAsync`/`tick`; `Styleable` recalculates classes after a `setTimeout` (`CHANGES_DELAY = 300` in [styleable.base.spec.ts](../../../projects/ngx-monkey-ui/src/lib/bases/styleable.base.spec.ts)).
  - A test for a known bug is an `xit` whose title starts with its `E-xx` id. Each fix turns it into `it` first. The `xit` of E-02 to E-05 belong to point 14 and stay as they are.
- Units to fix:
  - Forms:
    - [input.base.ts](../../../projects/ngx-monkey-ui/src/lib/bases/input/input.base.ts): inverted `required` check at line 145 (E-06); messages only recalculated from `(ngModelChange)` (E-23).
    - [input-number.component.ts](../../../projects/ngx-monkey-ui/src/lib/components/form/input-number/input-number.component.ts) and its html: every type converted to string and `(mousewheel)` for every type (E-15).
    - [checkbox.component.ts](../../../projects/ngx-monkey-ui/src/lib/components/first-level/checkbox/checkbox.component.ts) and [switch.component.ts](../../../projects/ngx-monkey-ui/src/lib/components/first-level/switch/switch.component.ts) with their html: fixed `id="checkbox"` and orphan `for="switch"` (E-19).
  - Login, disabled and clicks:
    - [login.page.ts](../../../projects/ngx-monkey-ui/src/lib/pages/form/login/login.page.ts) and [login.page.html](../../../projects/ngx-monkey-ui/src/lib/pages/form/login/login.page.html): `loginActions` built in a field initializer (lines 164-188) and a global `keydown` listener never removed (lines 217-228) (E-07).
    - [styleable.base.ts](../../../projects/ngx-monkey-ui/src/lib/bases/styleable.base.ts): `isDisabledComponent` never goes back to `false` (lines 199-202, E-22).
    - [icon-button.component.ts](../../../projects/ngx-monkey-ui/src/lib/components/second-level/icon-button/icon-button.component.ts) and [alert.component.html](../../../projects/ngx-monkey-ui/src/lib/components/third-level/alert/alert.component.html): native `(click)` on child hosts (E-24).
  - Visual components:
    - [image.component.ts](../../../projects/ngx-monkey-ui/src/lib/components/first-level/image/image.component.ts): `loading = true` on any input change, placeholder stuck on error (E-08), `title = this.alt` in a field initializer (E-09).
    - [scrollbar.component.ts](../../../projects/ngx-monkey-ui/src/lib/components/fourth-level/scrollbar/scrollbar.component.ts): subscription in the constructor, one new `<style>` per change, no unsubscribe (E-10).
    - [menu.component.ts](../../../projects/ngx-monkey-ui/src/lib/components/third-level/menu/menu.component.ts): `alt` is not an `@Input` (line 60, E-12).
    - [tooltip.component.ts](../../../projects/ngx-monkey-ui/src/lib/components/third-level/tooltip/tooltip.component.ts): inherits `Styleable` without using it (E-13). Decision: deferred to 17.8, no code change.
    - [header.component.ts](../../../projects/ngx-monkey-ui/src/lib/components/first-level/header/header.component.ts) and [icon.component.ts](../../../projects/ngx-monkey-ui/src/lib/components/first-level/icon/icon.component.ts): inherit `Styleable` but never bind `classList` (E-14). Decision: bind `[class]="classList"`, because removing the inheritance would remove public inputs.
    - [aside-menu.component.ts](../../../projects/ngx-monkey-ui/src/lib/components/third-level/aside-menu/aside-menu.component.ts): `getElementById('aside-menu-content')!` (line 187) and `this.data[0]` without a check (line 119) (E-18).
  - Services:
    - [theme.service.ts](../../../projects/ngx-monkey-ui/src/lib/services/theme.service.ts): never saves the choice, ignores `prefers-color-scheme` changes (E-11).
    - [font.service.ts](../../../projects/ngx-monkey-ui/src/lib/services/font.service.ts): `href` instead of `id` in `removeOtherFonts`, `remove*Font()` without the font name, same id for `<link>` and `<style>`, duplicated `<link>`, Red Hat Display without `display=swap` (E-16).
    - [background.service.ts](../../../projects/ngx-monkey-ui/src/lib/services/background/background.service.ts) and [colors.ts](../../../projects/ngx-monkey-ui/src/lib/services/background/objects/colors.ts): 5-digit colors, last frame skipped, unbounded positions and sizes, `remove()` keeps the animation (E-17).
    - [tooltip.ts](../../../projects/ngx-monkey-ui/src/lib/services/tooltip/tooltip.ts), [tooltip.service.ts](../../../projects/ngx-monkey-ui/src/lib/services/tooltip/tooltip.service.ts) and [tooltipable.base.ts](../../../projects/ngx-monkey-ui/src/lib/bases/tooltipable.base.ts): coordinate 0 discarded, `pageX/pageY` compared with `window.innerWidth` (E-20), dead `onHide()` and `DEFAULT_SCREEN_TIME` (E-21).
    - [screen.service.ts](../../../projects/ngx-monkey-ui/src/lib/services/screen/screen.service.ts): `unlockOrientation()` returns `void` behind a `@ts-expect-error` (E-25). Caller with `.catch()`: [app.component.ts:193](../../../projects/ngx-monkey-ui-tests/src/app/app.component.ts).
- The test app ([projects/ngx-monkey-ui-tests/src/app](../../../projects/ngx-monkey-ui-tests/src/app)) uses every affected component; it is the place to check the visible fixes by hand (`npm run start`).
- There is no `CHANGELOG.md` yet.

## 🪜 Phases

### Phase 1: Form fields (13.1, 13.8, 13.12)

Fix the inverted `required` message and the messages that are not recalculated (E-06, E-23), the number and wheel handling of `MonkeyInputNumber` (E-15), and the duplicated ids of checkbox and switch (E-19).

- [x] In [input-text.component.spec.ts](../../../projects/ngx-monkey-ui/src/lib/components/form/input-text/input-text.component.spec.ts), turn the four `xit` into `it`:
  - `E-06: shows the required message when the value is empty`
  - `E-23: recalculates the messages after setValue()`
  - `E-23: recalculates the messages after reset()`
  - `E-23: recalculates the messages after markAllAsTouched()`
- [x] `MonkeyInput` ([input.base.ts](../../../projects/ngx-monkey-ui/src/lib/bases/input/input.base.ts)): invert the `required` condition, and recalculate `invalidMessages` from the control `statusChanges` and `valueChanges`, unsubscribing on destroy. The public members stay the same.
- [x] Extend [input-number.component.spec.ts](../../../projects/ngx-monkey-ui/src/lib/components/form/input-number/input-number.component.spec.ts) with:
  - `writes a number in the control with inputType number`
  - `keeps the string in the control with inputType tel`
  - `keeps the string in the control with inputType date`
  - `the wheel steps the value only when the field is focused`
  - `the wheel does nothing with a non-number inputType`
- [x] `MonkeyInputNumber`: write a `number` with `inputType="number"`; keep the string with `tel`, `date`, `datetime-local` and `time`; replace `(mousewheel)` with `(wheel)`, handled only for `number` and with the field focused.
- [x] Extend [checkbox.component.spec.ts](../../../projects/ngx-monkey-ui/src/lib/components/first-level/checkbox/checkbox.component.spec.ts) and [switch.component.spec.ts](../../../projects/ngx-monkey-ui/src/lib/components/first-level/switch/switch.component.spec.ts) with:
  - `two instances get different input ids`
  - `the label for points to the input id`
- [x] Checkbox and switch: unique id from a `static` counter of the class, bound to the `<input>` `id`/`name` and to the labels `for`.
- [x] Mark 13.1, 13.8 and 13.12 as done in [ROADMAP.md](../../../ROADMAP.md).
- [x] Verify the changes in terms of typechecking, linting and tests using the project's verification command (`npm run lint && npm run format:check && npm run test:ci && npx ng build ngx-monkey-ui-tests`). Fix issues if any.
- [x] STOP. Present the changes to the user for review and suggest commit messages. Do NOT proceed to the next phase until the user explicitly asks.

### Phase 2: Login page, disabled state and composite clicks (13.2, 13.14)

Make `MonkeyLoginPage` respect its inputs and listen to Enter only inside its form (E-07), make `isDisabledComponent` go back to `false` (E-22), and make composite components listen to the child output instead of the native click (E-24).

- [ ] Extend [login.page.spec.ts](../../../projects/ngx-monkey-ui/src/lib/pages/form/login/login.page.spec.ts) with:
  - `uses the custom labels and icons in the actions`
  - `updates the actions when a label input changes`
  - `Enter inside the form emits onLogin`
  - `Enter outside the form does not emit onLogin`
- [ ] `MonkeyLoginPage`: build `loginActions` in `ngOnInit`/`ngOnChanges`, and replace the global `keydown` listener with a `(keydown.enter)` on the form. Inputs and outputs stay the same.
- [ ] Extend [styleable.base.spec.ts](../../../projects/ngx-monkey-ui/src/lib/bases/styleable.base.spec.ts) with `isDisabledComponent returns to false when the component is enabled again`.
- [ ] `Styleable`: set `isDisabledComponent` to `false` when `disabled` is false.
- [ ] Extend [icon-button.component.spec.ts](../../../projects/ngx-monkey-ui/src/lib/components/second-level/icon-button/icon-button.component.spec.ts) with:
  - `emits onClick once per click`
  - `does not emit onClick when disabled`
- [ ] Extend [alert.component.spec.ts](../../../projects/ngx-monkey-ui/src/lib/components/third-level/alert/alert.component.spec.ts) with `the dismiss, accept and reject buttons emit their outputs once`.
- [ ] `MonkeyIconButton` and `MonkeyAlert`: bind the child `(onClick)` output instead of the native `(click)` on its host.
- [ ] Mark 13.2 and 13.14 as done in [ROADMAP.md](../../../ROADMAP.md).
- [ ] Verify the changes in terms of typechecking, linting and tests using the project's verification command. Fix issues if any.
- [ ] STOP. Present the changes to the user for review and suggest commit messages. Do NOT proceed to the next phase until the user explicitly asks.

### Phase 3: Visual components (13.3, 13.4, 13.6, 13.7, 13.11)

Fix the image placeholder and title (E-08, E-09), the scrollbar styles (E-10), the menu tooltip (E-12), the header and icon classes (E-14) and the aside menu content lookup (E-18). E-13 is deferred to 17.8.

- [ ] Extend [image.component.spec.ts](../../../projects/ngx-monkey-ui/src/lib/components/first-level/image/image.component.spec.ts) with:
  - `does not show the placeholder again when only alt changes`
  - `shows the placeholder again when src changes`
  - `leaves the placeholder when the image fails to load`
  - `title defaults to alt`
- [ ] `MonkeyImage`: set `loading = true` only when `src` changes, set `loading = false` on `(error)`, and resolve `title` from `alt` in `ngOnInit`/`ngOnChanges` when it is not given.
- [ ] Extend [scrollbar.component.spec.ts](../../../projects/ngx-monkey-ui/src/lib/components/fourth-level/scrollbar/scrollbar.component.spec.ts) with:
  - `uses the custom colors given as inputs`
  - `keeps a single style element after several theme changes`
  - `stops listening to the theme on destroy`
- [ ] `MonkeyScrollbar`: subscribe in `ngOnInit`, reuse one `<style>` element, unsubscribe and remove it in `ngOnDestroy`.
- [ ] Extend [menu.component.spec.ts](../../../projects/ngx-monkey-ui/src/lib/components/third-level/menu/menu.component.spec.ts) with `the alt input reaches the tooltip`.
- [ ] `MonkeyMenu`: `@Input() alt` connected to the tooltip.
- [ ] Extend [header.component.spec.ts](../../../projects/ngx-monkey-ui/src/lib/components/first-level/header/header.component.spec.ts) and [icon.component.spec.ts](../../../projects/ngx-monkey-ui/src/lib/components/first-level/icon/icon.component.spec.ts) with `applies the classList to its element`.
- [ ] `MonkeyHeader` and `MonkeyIcon`: bind `[class]="classList"` in the template, and check in the test app that the default look of headers and icons does not change.
- [ ] Extend [aside-menu.component.spec.ts](../../../projects/ngx-monkey-ui/src/lib/components/third-level/aside-menu/aside-menu.component.spec.ts) with:
  - `renders without errors when data is empty`
  - `two instances resize their own content element`
- [ ] `MonkeyAsideMenu`: `viewChild` instead of `document.getElementById`, and tolerate an empty `data`.
- [ ] Record the E-13 decision (deferred to 17.8, the tooltip keeps forwarding its inputs to `monkey-card`) in 13.6 of [ROADMAP.md](../../../ROADMAP.md) and in E-13 of [ANALISIS.md](../../../ANALISIS.md).
- [ ] Mark 13.3, 13.4, 13.6, 13.7 and 13.11 as done in [ROADMAP.md](../../../ROADMAP.md).
- [ ] Verify the changes in terms of typechecking, linting and tests using the project's verification command. Fix issues if any.
- [ ] STOP. Present the changes to the user for review and suggest commit messages. Do NOT proceed to the next phase until the user explicitly asks.

### Phase 4: Services (13.5, 13.9, 13.10, 13.13, 13.15)

Fix the theme persistence (E-11), the font service (E-16), the background service (E-17), the tooltip coordinates and dead code (E-20, E-21) and `unlockOrientation()` (E-25).

- [ ] In [theme.service.spec.ts](../../../projects/ngx-monkey-ui/src/lib/services/theme.service.spec.ts), turn into `it`:
  - `E-11: stores the choice in localStorage`
  - `E-11: follows the changes of prefers-color-scheme when the user did not choose`
- [ ] `ThemeService`: save the choice in `localStorage` on `toggleDarkMode()`, and follow `prefers-color-scheme` changes while there is no saved choice. `isDarkMode$`, `isDarkMode`, `isLightMode` and `toggleDarkMode()` stay the same.
- [ ] In [font.service.spec.ts](../../../projects/ngx-monkey-ui/src/lib/services/font.service.spec.ts), turn the five E-16 `xit` into `it`.
- [ ] `MonkeyFontService`: look fonts up by `id`, remove the `<style>` together with the `<link>`, different ids for `<link>` and `<style>`, no duplicated `<link>`, `display=swap` in Red Hat Display.
- [ ] Create `background.service.spec.ts` next to [background.service.ts](../../../projects/ngx-monkey-ui/src/lib/services/background/background.service.ts) with:
  - `generated colors always have six hex digits`
  - `animate() includes the last frame`
  - `keeps positions and sizes between 0 and 100`
  - `remove() also stops the animation`
- [ ] `MonkeyBackgroundService`: `padStart(6, '0')` in the colors, include the last frame, clamp positions and sizes, and stop the animation in `remove()`.
- [ ] In [tooltip.service.spec.ts](../../../projects/ngx-monkey-ui/src/lib/services/tooltip/tooltip.service.spec.ts), turn `E-20: accepts the coordinate 0` into `it`, and add `chooses the direction from viewport coordinates`.
- [ ] Tooltip: accept the coordinate 0 in `Tooltip`, pass `clientX/clientY` from `Tooltipable`, and remove `onHide()` and `DEFAULT_SCREEN_TIME` from `MonkeyTooltipService` (E-21).
- [ ] Create `screen.service.spec.ts` next to [screen.service.ts](../../../projects/ngx-monkey-ui/src/lib/services/screen/screen.service.ts) with:
  - `unlockOrientation() resolves after unlocking`
  - `unlockOrientation() rejects when unlock() throws`
- [ ] `MonkeyScreenService.unlockOrientation()`: call `unlock()` and return a real promise, removing the `@ts-expect-error`. The `Promise<void>` signature stays the same.
- [ ] Mark 13.5, 13.9, 13.10, 13.13 and 13.15 as done in [ROADMAP.md](../../../ROADMAP.md).
- [ ] Verify the changes in terms of typechecking, linting and tests using the project's verification command. Fix issues if any.
- [ ] STOP. Present the changes to the user for review and suggest commit messages. Do NOT proceed to the next phase until the user explicitly asks.

### Phase 5: Changelog and closing (13.16)

Record the fixes and close point 13 in the docs.

- [ ] Create `CHANGELOG.md` at the repository root with a `0.3.2 (unreleased)` section that lists the fixes of point 13 by `E-xx`, and notes that the release waits for point 14 (14.6).
- [ ] Mark E-06 to E-12 and E-14 to E-25 as fixed in [ANALISIS.md](../../../ANALISIS.md), and E-13 as deferred to 17.8.
- [ ] Mark 13.16 as done and move point 13 to "Features implementadas" in [ROADMAP.md](../../../ROADMAP.md) with a summary paragraph.
- [ ] Verify the changes in terms of typechecking, linting and tests using the project's verification command. Fix issues if any.
- [ ] STOP. Present the changes to the user for review and suggest commit messages. Do NOT proceed to the next phase until the user explicitly asks.

## ⏭️ Next step

Implement Phase 2: the login page, disabled state and composite click fixes (E-07, E-22, E-24) with their tests.

Sixteen bugs line up, and the form fields already tell the truth about them thanks to 🐢 💨 (Turbotuga™, [Codely](https://codely.com)'s mascot). 🐛 📝 ✅
