# Propuesta: ngx-gorilla-ui

Propuesta de roadmap para rehacer la librería desde cero como `ngx-gorilla-ui`, sobre Angular 22, en lugar de seguir arreglando `ngx-monkey-ui`. Cuando se apruebe, esta propuesta pasa a ser el `ROADMAP.md` del nuevo proyecto y los puntos 14 a 27 del roadmap actual se marcan como descartados.

## 1. Por qué rehacerla

- `ngx-monkey-ui` no tiene usuarios. El roadmap actual protege una API que nadie consume: el punto 13 corrige sin cambiar la API, el 16 porta a Angular 22 con la misma API y la `0.3.2` se publica antes de romper nada. Sin consumidores, esa prudencia es coste sin beneficio.
- Los puntos 17 a 24 ya reescriben todos los componentes (standalone, señales, zoneless, composición, `ControlValueAccessor`, tokens, accesibilidad, SSR, layout, overlays). Hacerlo por fases sobre la base actual obliga a mantener `Styleable` funcionando en cada paso.
- `Styleable` no se puede salvar: una suscripción a `resize` por instancia que se multiplica con cada cambio de input (E-02), un `setTimeout` de 300 ms para recalcular clases, efectos sobre el DOM global (E-03), clases de los hijos que se pierden (E-05), y `[class]="classList"` más `isDarkMode$ | async` repetidos en cada elemento de cada plantilla.

## 2. Dónde vive: estructura del repositorio

### La restricción

Un workspace de Angular tiene **una sola versión** de `@angular/*` en su `package.json`. `ngx-monkey-ui` está en Angular 18 y `ngx-gorilla-ui` nace en Angular 22: no pueden compilar en el mismo workspace a la vez sin portar antes `ngx-monkey-ui` a 22, que es justo el trabajo que queremos evitar.

### Opciones

| Opción | Ventajas | Inconvenientes |
|---|---|---|
| **A. Mismo workspace, `projects/ngx-gorilla-ui` y `projects/ngx-gorilla-ui-catalog`, retirando `ngx-monkey-ui` del build** (recomendada) | Reutiliza CI, ESLint, Prettier, `.nvmrc`, el proceso de planes y el historial de git. Estructura idéntica a la actual. | `ngx-monkey-ui` deja de compilar en `main`: queda en un tag de git y, si se quiere, desplegado como catálogo de referencia. |
| B. Mismo repositorio, segundo workspace en una carpeta aparte (`gorilla/` con su propio `package.json` y `angular.json`) | Las dos librerías compilan a la vez. | Dos `node_modules`, dos configuraciones de lint y de CI, scripts duplicados. Mantener vivo algo que nadie usa. |
| C. Repositorio nuevo `ng-gorilla-ui` | Empieza limpio, nombre coherente. | Se pierde el historial, `ANALISIS.md`, los planes y la infraestructura ya montada, o hay que copiarlos. |

### Recomendación: opción A

Sí, tiene sentido meterla en `projects/`, igual que ahora, siempre que `ngx-monkey-ui` salga del build:

```text
projects/
  ngx-gorilla-ui/            # la librería (Angular 22, entry points secundarios)
  ngx-gorilla-ui-catalog/    # el catálogo (sustituye a ngx-monkey-ui-tests)
```

El código de `ngx-monkey-ui` y su app de pruebas se borran de `main` después de crear el tag `ngx-monkey-ui-legacy`. Sigue disponible en ese tag (`git worktree add ../monkey-legacy ngx-monkey-ui-legacy` para tenerlo al lado) y en `ANALISIS.md`, que se conserva. El repositorio se puede renombrar a `ng-gorilla-ui` en GitHub más adelante; GitHub redirige el nombre antiguo.

El workspace se crea limpio en Angular 22 (`ng new --create-application=false` y se copian la configuración y la infraestructura), no con `ng update` desde 18: no hay nada que migrar.

## 3. Principios de arquitectura

Lo que hace que la librería sea accesible y optimizada desde el primer componente, no como una fase posterior.

1. **Comportamiento de terceros auditados, estilo propio.** El foco, el teclado y ARIA salen de **Angular Aria** (estable desde Angular 22, con patrones como tabs, menu, listbox o combobox) y del **CDK** (`Overlay`, `FocusTrap`, `LiveAnnouncer`). `ngx-gorilla-ui` aporta las variantes visuales, no reimplementa patrones de accesibilidad.
2. **Sin herencia.** Variante, color y tamaño viven en una directiva (`GorillaVariant`) que los componentes aplican con `hostDirectives`. Usa `input()` y un `computed()` enlazado a `host: { '[class]': … }`. Sin suscripciones, sin timers, sin servicios que generen clases en tiempo de ejecución.
3. **Estilos por tokens CSS.** Todos los colores en `:root` con `light-dark()`; el tema es `color-scheme` y `data-theme` en `<html>`. Los componentes no emiten variables de color ni dependen de `.dark-theme`. Las variantes se escriben con `:host(.gorilla-glass)` y similares. Sin `!important` y con `@use`.
4. **Señales y `OnPush`.** `input()`, `output()`, `model()` para `checked`, `value` y `selected`, `viewChild()`. `OnPush` es el valor por defecto en Angular 22; la librería funciona en apps zoneless, y el catálogo lo es.
5. **Booleanos de verdad y nombres limpios.** `booleanAttribute` y `numberAttribute` (`<gorilla-button disabled>`), outputs sin prefijo `on` (`clicked`, `dismissed`), `color` en lugar de `style` (que choca con el atributo HTML).
6. **Formularios integrados.** `ControlValueAccessor` en todos los campos y compatibilidad comprobada con **Signal Forms** (estables en Angular 22). Mensajes de error derivados del estado del control, configurables por un `InjectionToken`, y asociados con `aria-describedby` y `aria-invalid`.
7. **Responsive con CSS.** Container queries y media queries; nada de `MonkeyScreenService` calculando tamaños en JavaScript.
8. **SSR y CSP.** Nada de `window`, `document` ni `localStorage` directos (`DOCUMENT`, `afterNextRender`, `isPlatformBrowser`), y ningún `<style>` construido con `innerHTML`.
9. **Tree shaking por componente.** Un entry point secundario por componente (`ngx-gorilla-ui/button`, `ngx-gorilla-ui/dialog`), como Angular Material, y un presupuesto de tamaño por entry point en el CI.
10. **Sin peticiones a terceros.** Ni fuentes de Google ni iconos remotos por defecto: fuentes autoalojadas documentadas y proveedor de iconos configurable.

Decisiones abiertas de nombres, a cerrar en la fase 0:

- Prefijo de selectores y clases: `gorilla-` (`<gorilla-button>`, `GorillaButton`), o uno corto como `gr-`.
- Nombre del catálogo: `ngx-gorilla-ui-catalog` o `gorilla-catalog`.

## 4. Qué se aprovecha de ngx-monkey-ui

| Se aprovecha | Cómo |
|---|---|
| El lenguaje visual: variantes `brutalist`, `glass`, `flat`, `ghost`, `glow` y `discreet`, y los colores de `MonkeyStyle` | Se extraen los valores (colores, sombras, radios, blur, bordes) a tokens. Es lo que da identidad a la librería. |
| El inventario de componentes y sus casos de uso | Especificación de qué construir y en qué orden. |
| `ANALISIS.md` | Checklist de errores que no se pueden repetir (cada E-xx tiene su principio en la sección 3). |
| Los tests de los puntos 12 y 13 | Como criterios de aceptación, reescritos: `input-number` escribe un `number` y la rueda solo actúa con foco; el tooltip usa coordenadas de viewport; el tema persiste y sigue al sistema; ids únicos por instancia; Enter solo dentro del formulario; el placeholder de la imagen sale en `error`. |
| El catálogo de la app de pruebas | Referencia visual para comparar cada componente nuevo con el antiguo. |
| CI, ESLint, Prettier, `.nvmrc`, `.git-blame-ignore-revs` y el proceso de planes en `.agents/plans` | Tal cual, adaptando nombres de proyecto. |

| No se aprovecha | Por qué |
|---|---|
| `Styleable`, `Tooltipable`, `MonkeyInput` | Herencia con suscripciones y efectos globales; se sustituyen por la directiva de variante y por composición. |
| `ComponentsStylesService`, `ComponentsSizesService` | Generan en tiempo de ejecución lo que el CSS resuelve solo. |
| La estructura SCSS | Variables de los dos temas repetidas en cada componente, `*:not(.dark-theme)`, `!important`, `@import`, la errata `hight`. |
| `MonkeyScreenService` | Sustituido por CSS; la orientación de pantalla no es responsabilidad de una librería de UI. |
| `MonkeyFontService` | Carga fuentes de Google sin consentimiento (RGPD). |
| `MonkeyLoginPage` | Es una página de ejemplo, no un componente; pasa al catálogo. |
| `MonkeyScrollbar` | `scrollbar-color` y `scrollbar-width` en el tema, sin JavaScript. |
| Dropdown, tooltip, menús y alerta tal como están | Su comportamiento sale de Angular Aria y del CDK. |

## 5. Roadmap

Cada punto es una o varias pull requests con su plan en `.agents/plans`. Cada componente nace con: señales, `OnPush`, variantes por directiva, tests de comportamiento, test de accesibilidad con axe y su página en el catálogo.

- [ ] 0. Cerrar ngx-monkey-ui y preparar el workspace.
  - [ ] 0.1. Terminar el punto 13 (fase 5: `CHANGELOG.md` y documentación), mergear `fix/functional-bugs` y crear el tag `ngx-monkey-ui-legacy`, sin publicar la `0.3.2`.
  - [ ] 0.2. Marcar los puntos 14 a 27 del `ROADMAP.md` actual como descartados, con referencia a esta propuesta.
  - [ ] 0.3. (Opcional) Desplegar el catálogo legacy en Vercel como referencia visual fija.
  - [ ] 0.4. Workspace limpio en Angular 22 con `projects/ngx-gorilla-ui` y `projects/ngx-gorilla-ui-catalog`; borrar `ngx-monkey-ui` y `ngx-monkey-ui-tests` de `main`.
  - [ ] 0.5. Vitest (`@angular/build:unit-test`), ESLint y Prettier adaptados, CI con lint, formato, tests y build. Catálogo zoneless.
  - [ ] 0.6. Cerrar las decisiones de nombres de la sección 3.

- [ ] 1. Fundamentos, con el botón como primer componente.
  - Un solo componente para validar toda la arquitectura de punta a punta antes de multiplicarla.
  - [ ] 1.1. Tokens: paleta (los siete colores de `MonkeyStyle` y el fondo), escala de tamaños `sm`/`md`/`lg`, radios, sombras y espaciado, con `light-dark()`.
  - [ ] 1.2. `GorillaTheme`: `theme` como señal, `setTheme('light' | 'dark' | 'system')`, persistencia y seguimiento del sistema, sin acceso directo a `window` (los tests del E-11 como criterio).
  - [ ] 1.3. Directiva `GorillaVariant` (`color`, `variant`, `size`) aplicada con `hostDirectives`.
  - [ ] 1.4. `gorilla-button` en las seis variantes y siete colores, `disabled`, `discreet`, `squared` (los tests del E-22 y E-24 como criterio).
  - [ ] 1.5. `:focus-visible`, `prefers-reduced-motion` y contraste AA comprobados para el botón en los dos temas.
  - [ ] 1.6. Catálogo con la página del botón y un selector de tema, variante y color.
  - [ ] 1.7. axe en el CI sobre el catálogo, en los dos temas.

- [ ] 2. Componentes de presentación.
  - [ ] 2.1. `gorilla-icon` (`aria-hidden` por defecto) y proveedor de iconos configurable.
  - [ ] 2.2. `gorilla-icon-button` con `aria-label` obligatorio.
  - [ ] 2.3. `gorilla-card` y `gorilla-stack` (sustituye a `monkey-list`, con `gap` y dirección).
  - [ ] 2.4. `gorilla-heading` con nivel semántico (sustituye a `monkey-header` y `monkey-subheader`).
  - [ ] 2.5. `gorilla-image` y `gorilla-avatar` con `alt` obligatorio (los tests de E-08 y E-09 como criterio).
  - [ ] 2.6. `gorilla-spinner` con `role="status"`, `gorilla-progress-bar`, `gorilla-skeleton`.
  - [ ] 2.7. `gorilla-badge` y `gorilla-chip`.

- [ ] 3. Formularios.
  - [ ] 3.1. `gorilla-input` (texto, email, password con visibilidad, url, search, mes, semana) con `ControlValueAccessor`.
  - [ ] 3.2. `gorilla-number-input` y campos de fecha y hora, con los criterios del E-15.
  - [ ] 3.3. `gorilla-checkbox`, `gorilla-switch` (`role="switch"`) y `gorilla-radio-group`, con ids únicos (E-19).
  - [ ] 3.4. `gorilla-textarea` y `gorilla-slider`.
  - [ ] 3.5. `gorilla-select` sobre Angular Aria (listbox o combobox).
  - [ ] 3.6. Mensajes de error con `aria-describedby` y `aria-invalid`, configurables y traducibles por `InjectionToken` (criterios de E-06 y E-23).
  - [ ] 3.7. Compatibilidad comprobada con Signal Forms y Reactive Forms en el catálogo.

- [ ] 4. Overlays.
  - [ ] 4.1. Directiva `gorillaTooltip` sobre el CDK Overlay: foco, hover, Escape, `role="tooltip"` y `aria-describedby` (WCAG 1.4.13; criterios del E-20).
  - [ ] 4.2. `gorilla-menu` (desplegable) sobre Angular Aria.
  - [ ] 4.3. `gorilla-dialog` con focus trap y cierre con Escape.
  - [ ] 4.4. `GorillaToast`: servicio con cola, varias notificaciones a la vez y `aria-live`, sin depender de que la app pinte un componente (sustituye a `MonkeyAlertService`).

- [ ] 5. Navegación y layout.
  - [ ] 5.1. `gorilla-layout` con zonas de cabecera, lateral y contenido, en CSS Grid y `position: sticky`.
  - [ ] 5.2. `gorilla-navbar` y `gorilla-sidenav` (sustituyen a `monkey-menu` y `monkey-aside-menu`), con apertura por teclado y táctil y `Router` opcional.
  - [ ] 5.3. `gorilla-tabs` y `gorilla-accordion` sobre Angular Aria.
  - [ ] 5.4. `gorilla-breadcrumbs` y `gorilla-pagination`.

- [ ] 6. Componentes avanzados.
  - [ ] 6.1. `gorilla-table` con ordenación.
  - [ ] 6.2. Date picker y time picker.
  - [ ] 6.3. File upload con arrastrar y soltar.
  - [ ] 6.4. Stepper.
  - [ ] 6.5. Empty state.
  - [ ] 6.6. Fondo de degradados animados solo con CSS (`@property` para interpolar), si se quiere conservar la idea de `MonkeyBackgroundService`.

- [ ] 7. Publicación.
  - [ ] 7.1. Tema personalizable: `theme.css` precompilado, tokens en SCSS y un mixin para cambiar la paleta.
  - [ ] 7.2. README con instalación, tema, iconos y fuentes autoalojadas; documentación de la API en el catálogo.
  - [ ] 7.3. Catálogo desplegado en Vercel con vista previa por pull request.
  - [ ] 7.4. SSR habilitado en el catálogo como comprobación.
  - [ ] 7.5. Workflow de release con `--provenance`, `CHANGELOG.md` y versionado semántico: `0.x` mientras la API se asienta, `1.0.0` al terminar el punto 5.

## 6. Coste comparado

Rehacer no es más caro que el roadmap actual: los puntos 14 a 22 ya tocan todos los componentes, y además exigen mantener la API y la base antigua funcionando entre medias. Con `ngx-gorilla-ui` ese trabajo se hace una sola vez, componente a componente, y cada uno sale terminado (accesible, con tests y en el catálogo) en lugar de pasar por cinco reescrituras parciales.
