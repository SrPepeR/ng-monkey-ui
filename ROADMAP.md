# NgxMonkeyUi Roadmap

Este documento describe la hoja de ruta para el desarrollo y las futuras mejoras de la librería NgxMonkeyUi, así como las features descartadas. El razonamiento detrás de cada punto, con los errores localizados por archivo y línea, vive en [`ANALISIS.md`](./ANALISIS.md); los identificadores `E-xx` (errores) y `R-xx` (riesgos) remiten a él.

## Secciones

- Features pendientes
- Features implementadas
- Features descartadas

## Features pendientes

- [ ] 12. Red de seguridad antes de tocar nada.
  - Hoy la suite de tests no compila (E-01) y no hay CI: cualquier corrección o salto de versión de Angular se haría a ciegas. Este punto va primero porque es lo que permite demostrar que los siguientes no rompen nada.
  - [ ] 12.1. Hacer que la suite compile y pase.
    - Corregir el import de `theme-changer.component.spec.ts` (`ThemeChangerComponent` → `MonkeyThemeChanger`).
    - Dar a los 11 specs que fallan sus `declarations`/`imports` (o `NgxMonkeyUiModule` entero) y `provideRouter([])` a los que inyectan `Router`.
  - [ ] 12.2. Sustituir los `should create` por tests de comportamiento en lo que se va a tocar.
    - `ComponentsStylesService` (que la lista no duplique clases), `Styleable` (que no acumule suscripciones ni toque `<main>`), `MonkeyInput` (mensajes de validación), `ThemeService`, `MonkeyAlertService`, `MonkeyTooltipService`, `MonkeyFontService`.
    - Escritos antes de corregir cada error, para que fallen primero y prueben la corrección después.
  - [ ] 12.3. Integración continua con GitHub Actions.
    - En cada pull request y push a `main`: `npm ci`, `ng build ngx-monkey-ui`, `ng test --watch=false` en Chrome headless y build de la app de pruebas.
  - [ ] 12.4. Lint y formato.
    - `angular-eslint` con las reglas recomendadas y Prettier alineado con el `.editorconfig` existente. El lint entra en el CI del 12.3.
  - [ ] 12.5. Fijar la versión de Node.
    - `.nvmrc` y `engines` en `package.json`. Angular 22 exige Node `^22.22.3 || ^24.15.0 || >=26.0.0`, así que se fija ya una que sirva tanto para Angular 18 como para el destino del punto 16.

- [ ] 13. Corregir los errores funcionales sin cambiar la API pública.
  - Todo lo que hoy se comporta mal, arreglado sobre Angular 18 y publicado como `0.3.2`, para que el port del punto 16 no mezcle regresiones de dos orígenes. Ninguna tarea de este punto cambia el nombre o el tipo de un input u output.
  - [ ] 13.1. Mensaje "required" invertido en `MonkeyInput` (E-06) y mensajes que no se recalculan tras `reset`, `setValue` o `markAllAsTouched` (E-23).
  - [ ] 13.2. `MonkeyLoginPage`: construir `loginActions` en `ngOnInit`/`ngOnChanges` para respetar los inputs, y sustituir el `keydown` global por un `(keydown.enter)` o un `(ngSubmit)` en el propio formulario (E-07).
  - [ ] 13.3. `MonkeyImage`: volver a `loading = true` solo cuando cambia `src`, salir del placeholder en `(error)`, y resolver `title` a partir de `alt` cuando no se indique (E-08, E-09).
  - [ ] 13.4. `MonkeyScrollbar`: leer los inputs después de asignados, reutilizar un único `<style>` y cancelar la suscripción al destruir (E-10).
  - [ ] 13.5. `ThemeService`: guardar la elección en `localStorage` y seguir los cambios de `prefers-color-scheme` mientras el usuario no haya elegido (E-11).
  - [ ] 13.6. `MonkeyMenu`: `alt` como `@Input` y tooltip conectado (E-12). `MonkeyTooltip`: llamar a `super.ngOnInit()` (E-13).
  - [ ] 13.7. `MonkeyHeader` y `MonkeyIcon`: aplicar `classList` en la plantilla o dejar de heredar de `Styleable` (E-14).
  - [ ] 13.8. `MonkeyInputNumber`: con `inputType="number"`, escribir un `number` en el control e interceptar la rueda con `(wheel)` solo con el campo enfocado; con `tel`, `date`, `datetime-local` y `time`, conservar el string y no instalar el handler de rueda, porque `stepUp()` no se admite en todos ellos (E-15).
  - [ ] 13.9. `MonkeyFontService`: buscar por `id`, borrar el `<style>` al quitar una fuente, ids distintos para `<link>` y `<style>`, no duplicar `<link>`, `display=swap` en Red Hat Display (E-16).
  - [ ] 13.10. `MonkeyBackgroundService`: colores con `padStart(6, '0')`, incluir el último fotograma, acotar posiciones y tamaños, y que `remove()` pare también la animación (E-17).
  - [ ] 13.11. `MonkeyAsideMenu`: referencia al contenido con `viewChild` en lugar de id global, y tolerar `data` vacío (E-18).
  - [ ] 13.12. Ids únicos en checkbox y switch con un contador por instancia, y `for` apuntando al `<input>` real (E-19).
  - [ ] 13.13. Tooltip: aceptar coordenadas 0 y usar coordenadas de viewport (`clientX/clientY`) de forma coherente (E-20); quitar el código muerto del servicio (E-21).
  - [ ] 13.14. `isDisabledComponent` vuelve a `false` al habilitar (E-22); clicks de componentes compuestos escuchando el output y no el `(click)` nativo del host (E-24).
  - [ ] 13.15. Publicar `0.3.2` con `CHANGELOG.md` y tag de git.

- [ ] 14. Sanear `Styleable` y el ciclo de vida de los componentes.
  - Es la pieza de la que heredan casi todos los componentes (todos menos `MonkeyThemeChanger` y `MonkeyScrollbar`), y concentra los tres errores más graves: la fuga de listeners (E-02), la reescritura del DOM global (E-03) y la pérdida de las clases que calculan los hijos (E-05). Va separado del 13 porque cambia cómo se comporta la base, aunque no su API.
  - [ ] 14.1. Una sola suscripción a cambios de pantalla, cancelada al destruir (`takeUntilDestroyed`), y sin `setTimeout` en `ngOnChanges`: las clases se recalculan en el momento.
  - [ ] 14.2. `MonkeyScreenService` compartido (`shareReplay` con `refCount`) y emitiendo solo al cruzar un breakpoint (`matchMedia` o `distinctUntilChanged`) (R-10). Corregir el JSDoc de `ScreenSize.XXL`.
  - [ ] 14.3. `ComponentsStylesService` sin duplicados (E-04) y un punto de extensión (`protected extraClasses()`) para que `MonkeyLoader` y `MonkeyAvatar` añadan sus clases sin que la base las borre (E-05).
  - [ ] 14.4. Sacar de `Styleable` todo lo que toca `<main>`, `.aside-menu` y `monkey-menu`. Mientras exista el punto 22, queda en un servicio de layout que solo actúa si la app lo usa, y nunca borra clases ajenas.
  - [ ] 14.5. Bases como `@Directive()` abstractas en lugar de `@Component` vacío, y servicios por `inject()` en lugar de `new` (R-01).

- [ ] 15. Contrato del paquete npm.
  - Lo que hace que la librería se instale y se use bien desde fuera, independientemente de la versión de Angular.
  - [ ] 15.1. `peerDependencies` completas: `@angular/core`, `@angular/common`, `@angular/forms`, `@angular/router` y `rxjs`.
  - [ ] 15.2. `Router` opcional en `MonkeyMenu` y `MonkeyAsideMenu` (`inject(Router, { optional: true })`), para que no lancen `NullInjectorError` en apps sin router (R-08).
  - [ ] 15.3. `public-api.ts` sin exportaciones duplicadas, exportando `MonkeyInput` y con nombres coherentes (`InvalidFormMessageComponent` → `MonkeyInvalidFormMessage`, con alias deprecado) (R-14).
  - [ ] 15.4. Declarar y documentar la dependencia de *Material Symbols Outlined*.
  - [ ] 15.5. Verificar `sideEffects: false` comprobando el tree shaking del paquete y buscando efectos de importación reales (código que se ejecute al evaluar un módulo), no accesos al DOM dentro de constructores o métodos.
  - [ ] 15.6. Quitar `cli.analytics` de `angular.json`.

- [ ] 16. Port a Angular 22.
  - De 18.2 a 22.2, una versión mayor cada vez con `ng update`, un commit por salto y el CI del 12.3 en verde en cada uno. En los saltos solo se aplican las migraciones obligatorias; las opcionales (señales, control flow) van al punto 17 para que cada diff se pueda revisar. Resultado: `0.4.0` con la misma API que la `0.3.x`.
  - [ ] 16.1. Angular 19.
    - `ng update @angular/core@19 @angular/cli@19`. La migración añade `standalone: false` a los componentes del módulo, que es lo esperado en este paso.
  - [ ] 16.2. Angular 20.
    - `ng update @angular/core@20 @angular/cli@20`. Migrar el builder de `@angular-devkit/build-angular` a `@angular/build` en la librería y en la app de pruebas. Revisar los avisos de deprecación de `*ngIf`/`*ngFor`, que se resuelven en el 17.4.
  - [ ] 16.3. Angular 21.
    - `ng update @angular/core@21 @angular/cli@21`. Migrar los tests de Karma/Jasmine a Vitest (`@angular/build:unit-test`) y eliminar `karma*` y `jasmine*`.
  - [ ] 16.4. Angular 22.
    - `ng update @angular/core@22 @angular/cli@22`. TypeScript 6.0, `ng-packagr` 22, zone.js `~0.16` en la app de pruebas.
  - [ ] 16.5. Sass sin `@import`.
    - Los 22 `@import` pasan a `@use`/`@forward`, para que el build no dependa de una sintaxis que Dart Sass va a eliminar.
  - [ ] 16.6. Actualizar `peerDependencies` al rango soportado (`^22.0.0`) y publicar `0.4.0`.

- [ ] 17. API moderna de componentes (standalone, señales, zoneless).
  - Con el punto 16 la librería compila en Angular 22, pero sigue escrita como en Angular 15, y una aplicación nueva de Angular 22 es zoneless por defecto: los `setTimeout` y las asignaciones dentro de `subscribe` no repintan (R-09). Este punto es el que la hace usable en una app actual, y rompe la API, así que da lugar a la `1.0.0` junto con el 18 y el 19.
  - [ ] 17.1. Componentes standalone.
    - Cada componente importa lo que usa; `NgxMonkeyUiModule` queda como fachada que los re-exporta, marcada como deprecada.
  - [ ] 17.2. Inputs y outputs con señales.
    - `input()`, `input.required()`, `output()`, `model()` para `checked` y `selected`, `viewChild()` tipado. Partir de las migraciones `signal-input-migration`, `output-migration` y `signal-queries-migration` y revisar el resultado a mano.
  - [ ] 17.3. Booleanos de verdad.
    - `booleanAttribute`/`numberAttribute` en todos los inputs que hoy son `'true'`/`'false'` (R-02), manteniendo `<monkey-button flat>`. Eliminar `check()`.
  - [ ] 17.4. Control flow.
    - `@if`, `@for` con `track` y `@switch` en todas las plantillas (`ng g @angular/core:control-flow`).
  - [ ] 17.5. Clases calculadas con `computed()` y aplicadas al host.
    - Las variantes van a `host: { '[class]': … }` y el SCSS las lee con `:host(...)`, en lugar de repetir `[class]="classList"` en cada elemento de la plantilla.
  - [ ] 17.6. Zoneless y `OnPush`.
    - Que cada cambio de estado notifique a Angular (señales, `AsyncPipe` o `markForCheck()`), con la app de pruebas en `provideZonelessChangeDetection()` como prueba de que funciona. `OnPush` en todos los componentes como objetivo aparte: no lo exige zoneless, pero reduce el trabajo de detección de cambios.
  - [ ] 17.7. Renombrados de la API.
    - `style` → `color` (R-03); outputs sin prefijo `on` (`clicked`, `checkedChange`, `selectedChange`, `dismissed`…) (R-13); `MonkeyButtonData.type` → `color` y `action` tipado (R-12). Guía de migración desde 0.x en el `CHANGELOG`.
  - [ ] 17.8. Composición en lugar de herencia.
    - Variante y color como directiva reutilizable mediante `hostDirectives`; las utilidades de layout (`flexWrap`, `flexCenter`, `sticky`…) dejan de ser inputs de todos los componentes y pasan a ser clases CSS documentadas.

- [ ] 18. Formularios integrados con Angular Forms.
  - Hoy los campos reciben el `FormGroup` entero y el nombre del control (R-04), lo que choca con `FormGroupDirective` y no funciona con `formControl`, `ngModel` ni Signal Forms.
  - [ ] 18.1. `ControlValueAccessor` en `monkey-input-text`, `monkey-input-number`, `monkey-switch` y `monkey-checkbox`, con `disabled` desde el control.
  - [ ] 18.2. Mensajes de error derivados del estado del control (`touched`, `dirty`, `errors`), configurables y traducibles mediante un `InjectionToken`.
  - [ ] 18.3. Compatibilidad comprobada con Signal Forms.
  - [ ] 18.4. `MonkeyLoginPage` reescrita sobre los nuevos campos y con un `<form>` real, o retirada de la librería y movida a la app de ejemplo (R-14).

- [ ] 19. Sistema de temas y tokens de diseño.
  - Cada componente vuelve a emitir todas las variables de color de los dos temas, y el tema oscuro necesita una clase en cada elemento (50 `async` pipes). Las variables CSS se heredan: declarándolas una sola vez el problema desaparece.
  - [ ] 19.1. Tokens en `:root` y tema en `<html>`.
    - `ThemeService` pone `data-theme` y `color-scheme` en `document.documentElement`; los colores se escriben con `light-dark()`. Fuera los selectores `*:not(.dark-theme)` y `*.dark-theme`, y fuera `isDarkMode$ | async` de las plantillas.
  - [ ] 19.2. `ThemeService` con señales.
    - `isDarkMode` como señal, `setTheme('light' | 'dark' | 'system')`, persistencia y seguimiento del sistema del 13.5.
  - [ ] 19.3. Publicar los estilos.
    - `assets` en `ng-package.json` para `_tokens.scss` y un `theme.css` precompilado, y un mixin para personalizar la paleta.
  - [ ] 19.4. Corregir `hight` → `high` en los nombres de variables, con alias durante una versión.
  - [ ] 19.5. Escala de tamaños (`sm`/`md`/`lg`) común a botones, inputs, listas, loader y avatar, sustituyendo `ComponentsSizesService` y sus inputs `xs`…`xl`.
  - [ ] 19.6. Quitar los `!important` que dejan de hacer falta con las clases en el host.
  - [ ] 19.7. Scrollbar con `scrollbar-color` y `scrollbar-width` en el tema, sin JavaScript; `MonkeyScrollbar` deprecado.
  - [ ] 19.8. Respetar `prefers-reduced-motion` en transiciones y en el fondo animado.
  - [ ] 19.9. Contraste AA comprobado para cada color y variante en los dos temas.

- [ ] 20. Accesibilidad.
  - Los componentes que renderizan controles nativos (`<button>`, `<input>`) sí funcionan con teclado, pero varios componentes y estados carecen de los patrones de accesibilidad que siguen: el dropdown, los menús, el tooltip, la alerta o los botones de solo icono no son usables del todo con teclado o con lector de pantalla. Donde exista, se apoya en el CDK o en Angular Aria en lugar de reimplementar el patrón.
  - [ ] 20.1. `monkey-dropdown` como listbox: `aria-expanded`, roles, flechas, Enter, Escape y cierre al pulsar fuera.
  - [ ] 20.2. Menús: `aria-expanded`/`aria-controls` en los botones de abrir, apertura del aside con teclado y táctil (no solo `mouseenter`), y `aria-label` en las opciones que quedan solo con icono.
  - [ ] 20.3. `aria-label` obligatorio en `monkey-icon-button`; `aria-hidden="true"` por defecto en `monkey-icon`.
  - [ ] 20.4. `role="switch"` y nombre accesible en `monkey-switch`; `aria-invalid` y `aria-describedby` hacia los errores en los campos.
  - [ ] 20.5. `role="alert"`/`aria-live` en `monkey-alert`.
  - [ ] 20.6. Tooltip como directiva con soporte de foco, `role="tooltip"`, `aria-describedby` y cierre con Escape (WCAG 1.4.13).
  - [ ] 20.7. Estilos de `:focus-visible` en todas las variantes.
  - [ ] 20.8. Auditoría con axe en el CI sobre la app de pruebas, en los dos temas.

- [ ] 21. SSR y navegador sin sorpresas.
  - La librería falla al arrancar en una app con SSR o prerender (R-06), e inyecta CSS con `innerHTML` (R-07).
  - [ ] 21.1. Acceso al DOM solo a través de `DOCUMENT`, `afterNextRender` o `isPlatformBrowser`, en todos los servicios y componentes que hoy usan `window`, `document`, `localStorage`, `screen` o `matchMedia`.
  - [ ] 21.2. Sin `<style>` construidos con `innerHTML`: el fondo y la fuente pasan a variables CSS aplicadas con `Renderer2`/`style.setProperty`, compatibles con CSP estricta.
  - [ ] 21.3. La app de pruebas con SSR habilitado como comprobación.

- [ ] 22. Layout de aplicación explícito.
  - Sustituye a todo lo que `Styleable` y `MonkeyAsideMenu` hacen hoy sobre `<main>` y el menú lateral con `document.querySelector` (E-03, E-18).
  - [ ] 22.1. Componente `monkey-layout` con zonas de cabecera, lateral y contenido, resuelto con CSS Grid y `position: sticky`.
  - [ ] 22.2. `monkey-menu` y `monkey-aside-menu` se adaptan a él sin calcular alturas ni márgenes en JavaScript.
  - [ ] 22.3. Eliminar el servicio de layout provisional del 14.4.

- [ ] 23. Fuentes e iconos sin terceros.
  - `MonkeyFontService` hace que el navegador de cada visitante pida las fuentes a Google, que recibe su IP sin consentimiento, algo problemático con el RGPD.
  - [ ] 23.1. La librería no carga fuentes por sí misma; `MonkeyFontService` queda deprecado y se documenta cómo autoalojar Dosis, Titillium Web y Red Hat Display.
  - [ ] 23.2. Proveedor de iconos configurable, con Material Symbols autoalojado como opción documentada.

- [ ] 24. Overlays: alertas, notificaciones y tooltips con API propia.
  - Hoy, si la app no pinta `<monkey-alert>` o `<monkey-tooltip>`, los mensajes se pierden sin aviso, y solo cabe una alerta a la vez (R-11).
  - [ ] 24.1. `MonkeyAlertService` y la directiva de tooltip crean su propio contenedor con el CDK Overlay.
  - [ ] 24.2. Cola de mensajes y varias alertas simultáneas.
  - [ ] 24.3. `Subject` públicos sustituidos por métodos y señales de solo lectura.

- [ ] 25. Documentación y catálogo de componentes.
  - [ ] 25.1. README de la librería con instalación, configuración de tema e iconos, y la API de cada componente (inputs, outputs, ejemplos).
  - [ ] 25.2. README raíz actualizado (hoy habla de Angular CLI 16 y de `ng e2e`).
  - [ ] 25.3. App de pruebas convertida en catálogo navegable, una página por componente con sus variantes y temas.
  - [ ] 25.4. Catálogo desplegado en Vercel desde el CI, con una vista previa por pull request.
  - [ ] 25.5. `CHANGELOG.md` y guía de migración 0.x → 1.0.

- [ ] 26. Publicación automatizada.
  - [ ] 26.1. Workflow de release que, al crear un tag, construye, prueba y publica en npm con `--provenance`.
  - [ ] 26.2. Versionado semántico: 0.3.x (Angular 18, correcciones), 0.4.0 (Angular 22, misma API), 1.0.0 (API de los puntos 17 a 19).

- [ ] 27. Nuevos componentes.
  - Ordenados por lo que más falta para construir una aplicación real con la librería. Todos nacen con la API del punto 17, accesibles (20) y con tests.
  - [ ] 27.1. Dialog/Modal con focus trap y cierre con Escape.
  - [ ] 27.2. Toast/Snackbar, sobre la cola del 24.2.
  - [ ] 27.3. Tabs y Accordion.
  - [ ] 27.4. Select accesible para formularios.
  - [ ] 27.5. Textarea, Radio group y Slider con `ControlValueAccessor`.
  - [ ] 27.6. Table con ordenación y Pagination.
  - [ ] 27.7. Breadcrumbs.
  - [ ] 27.8. Date picker y Time picker.
  - [ ] 27.9. File upload con arrastrar y soltar.
  - [ ] 27.10. Stepper/Wizard.
  - [ ] 27.11. Skeleton y Empty state.
  - [ ] 27.12. Badge, Chip y Progress bar.

## Features implementadas

- [x] 11. Análisis en profundidad de la librería. `SUGERENCIAS.md` era una revisión rápida y pasa a ser [`ANALISIS.md`](./ANALISIS.md): errores confirmados con su archivo y línea, riesgos, revisión de lo que afirmaba la versión anterior (dos de sus afirmaciones resultaron incorrectas), el plan de port a Angular 22 y las mejoras de API, estilos, accesibilidad y empaquetado. Se comprobó compilando y ejecutando los tests, no solo leyendo: la librería compila, pero la suite no arranca y, corregido el import que lo impide, 11 de 25 specs fallan. De ahí sale este roadmap.
- [x] 10. Actualización a Angular 17 y 18 (versiones 0.2.0 a 0.3.1).
- [x] 9. `MonkeyScreenService` y clases de tamaño de pantalla, con el menú y el menú lateral adaptándose a pantallas pequeñas (0.1.4).
- [x] 8. `MonkeyBackgroundService`: fondos de degradados radiales aleatorios y animados (0.1.0-0.1.3).
- [x] 7. Página de login (`monkey-login-page`) con acceso como invitado.
- [x] 6. Formularios: base `MonkeyInput`, `monkey-input-text` (con tipos y visibilidad de contraseña), `monkey-input-number` y `monkey-invalid-form-message`, en las cinco variantes visuales.
- [x] 5. Componentes de tercer y cuarto nivel: menú, menú lateral, alerta con `MonkeyAlertService`, tooltip con `MonkeyTooltipService`, cabecera de contenido, selector de tema y scrollbar.
- [x] 4. Componentes de segundo nivel: botón de icono, avatar, dropdown y grupo de botones.
- [x] 3. Componentes de primer nivel: botón, tarjeta, imagen, switch, checkbox, loader, lista, cabecera, subcabecera e icono.
- [x] 2. Tema claro/oscuro con `ThemeService` y variables CSS.
- [x] 1. Sistema de estilos: colores `MonkeyStyle` y variantes `brutalist`, `flat`, `ghost`, `glass`, `glow` y `discreet` sobre la base `Styleable`.
- [x] 0. Versión inicial de la librería y de la app de pruebas.

## Features descartadas

- Convertir `classList` a string para el binding `[class]`. `SUGERENCIAS.md` afirmaba que `[class]="classList"` convertía el array en una cadena separada por comas y borraba las clases estáticas. No es así: desde Ivy, `[class]` acepta arrays y se fusiona con el atributo `class` estático. El fallo real de ese servicio es que duplica las clases, y se corrige en el 14.3.
- Evitar el doble disparo del switch. Tampoco se reproduce: los `<label for="switch">` no apuntan a ningún elemento, así que no activan el `<input>` por segunda vez. Lo que sí está mal es ese `for` huérfano, que se corrige en el 13.12.
