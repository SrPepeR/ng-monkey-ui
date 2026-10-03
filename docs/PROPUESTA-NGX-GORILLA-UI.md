# Propuesta: ngx-gorilla-ui

Propuesta para rehacer la librería desde cero como `ngx-gorilla-ui`, sobre Angular 22, en lugar de seguir arreglando `ngx-monkey-ui`. Está aprobada: los puntos 14 a 27 del roadmap de `ngx-monkey-ui` se descartaron, y la hoja de ruta del proyecto es [`ROADMAP.md`](./ROADMAP.md).

## 1. Por qué rehacerla

- `ngx-monkey-ui` no tiene usuarios. Su roadmap protegía una API que nadie consume: el punto 13 corrige sin cambiar la API, el 16 porta a Angular 22 con la misma API y la `0.3.2` se publica antes de romper nada. Sin consumidores, esa prudencia es coste sin beneficio.
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

### Decisión: opción A

La librería vive en `projects/`, igual que ahora, y `ngx-monkey-ui` sale del build:

```text
projects/
  ngx-gorilla-ui/            # la librería (Angular 22, entry points secundarios)
  ngx-gorilla-ui-catalog/    # el catálogo (sustituye a ngx-monkey-ui-tests)
```

El código de `ngx-monkey-ui` y su app de pruebas se borran de `main` en la misma pull request que crea el workspace nuevo, para que `main` nunca se quede sin librería. Sigue disponible en el tag `ngx-monkey-ui-legacy` (`git worktree add ../monkey-legacy ngx-monkey-ui-legacy` para tenerlo al lado), y sus errores, en [`ERRORES-A-EVITAR.md`](./ERRORES-A-EVITAR.md). El repositorio ya se llama `ng-gorilla-ui` en GitHub, que redirige el nombre antiguo.

El workspace se crea limpio en Angular 22 (`ng new --create-application=false` y se copian la configuración y la infraestructura), no con `ng update` desde 18: no hay nada que migrar.

## 3. Premisas y principios

Lo que hace que la librería sea accesible y optimizada desde el primer componente, no como una fase posterior.

### Premisas

Están por encima de cualquier otra decisión: un componente que no las cumple no se mergea.

1. **Accesibilidad comprobada, no supuesta.**
   - Contraste AA de cada pareja de fondo y texto, en cada variante y en los dos temas, comprobado automáticamente.
   - Se respetan las preferencias del usuario: `prefers-color-scheme`, `prefers-reduced-motion`, `prefers-reduced-transparency`, `prefers-contrast: more` y `forced-colors`.
   - Todo se puede usar con teclado y con lector de pantalla.
2. **Todo token se puede sobreescribir desde el CSS de la aplicación.**
   - Colores, tamaños, espaciado, radios, sombras, tipografía y movimiento son variables CSS en `:root`, no valores compilados.
   - Los estilos de la librería van en una capa `@layer gorilla` y con selectores de baja especificidad (`:where()`), así que cualquier regla de la aplicación gana sin `!important`.
   - Cada componente lee sus propias variables (`--gorilla-button-radius: var(--gorilla-radius-md)`), para poder cambiarlo en toda la app, en un componente o en una sola instancia.
   - Los nombres de los tokens son API pública: están documentados y siguen el versionado semántico.
3. **Ningún cambio abrupto.**
   - Todo cambio visual de un componente (color, tamaño, posición, opacidad, aparición y desaparición) se hace con una transición o una animación.
   - Las duraciones y curvas son tokens (`--gorilla-duration-*`, `--gorilla-easing-*`), y por tanto sobreescribibles.
   - La entrada y la salida usan `@starting-style` y `transition-behavior: allow-discrete`, o `animate.enter`/`animate.leave` de Angular, sin `@angular/animations`.
   - La única excepción es `prefers-reduced-motion: reduce`: las duraciones pasan a 0 y el cambio es inmediato.
4. **El rendimiento es un requisito.**
   - Sin JavaScript para lo que resuelve el CSS, `OnPush` y señales, y compatible con zoneless.
   - Un entry point por componente, con su límite de tamaño en el CI.
   - Las animaciones usan `transform` y `opacity` siempre que se pueda, para no recalcular el layout, y nada lee y escribe el layout en el mismo fotograma.
   - Las dependencias pesadas solo se cargan si se usan: cada icono de Lucide es un import independiente.

### Principios de arquitectura

1. **Comportamiento de terceros auditados, estilo propio.** El foco, el teclado y ARIA salen de **Angular Aria** (estable desde Angular 22, con patrones como tabs, menu, listbox o combobox) y del **CDK** (`Overlay`, `FocusTrap`, `LiveAnnouncer`). `ngx-gorilla-ui` aporta las variantes visuales, no reimplementa patrones de accesibilidad.
2. **Sin herencia.** Variante, color y tamaño viven en una directiva (`GorillaVariant`) que los componentes aplican con `hostDirectives`. Usa `input()` y un `computed()` enlazado a `host: { '[class]': … }`. Sin suscripciones, sin timers, sin servicios que generen clases en tiempo de ejecución.
3. **Estilos por tokens CSS.** Todos los colores en `:root` con `light-dark()`; el tema es `color-scheme` y `data-theme` en `<html>`. Los componentes no emiten variables de color ni dependen de `.dark-theme`. Las variantes se escriben con `:host(.gorilla-glass)` y similares, dentro de `@layer gorilla` (premisa 2). Los componentes usan CSS puro, sin `!important`.
4. **Señales y `OnPush`.** `input()`, `output()`, `model()` para `checked`, `value` y `selected`, `viewChild()`. `OnPush` es el valor por defecto en Angular 22; la librería funciona en apps zoneless, y el catálogo lo es.
5. **Booleanos de verdad y nombres limpios.** `booleanAttribute` y `numberAttribute` (`<gorilla-button disabled>`), outputs sin prefijo `on` (`clicked`, `dismissed`), `color` en lugar de `style` (que choca con el atributo HTML).
6. **Formularios integrados.** `ControlValueAccessor` en todos los campos y compatibilidad comprobada con **Signal Forms** (estables en Angular 22). Mensajes de error derivados del estado del control, configurables por un `InjectionToken`, y asociados con `aria-describedby` y `aria-invalid`.
7. **Responsive con CSS.** Container queries y media queries; nada de `MonkeyScreenService` calculando tamaños en JavaScript.
8. **SSR y CSP.** Nada de `window`, `document` ni `localStorage` directos (`DOCUMENT`, `afterNextRender`, `isPlatformBrowser`), y ningún `<style>` construido con `innerHTML`.
9. **Tree shaking por componente.** Un entry point secundario por componente (`ngx-gorilla-ui/button`, `ngx-gorilla-ui/dialog`), como Angular Material, y un presupuesto de tamaño por entry point en el CI.
10. **Sin peticiones a terceros.** Ni fuentes de Google ni iconos remotos por defecto: fuente del sistema, fuentes autoalojadas documentadas y proveedor de iconos configurable.

Nombres decididos en el punto 0.6:

- Prefijo de selectores, clases y tokens: `gorilla-` (`<gorilla-button>`, `GorillaButton`, `--gorilla-color-primary`).
- Paquete en npm: `ngx-gorilla-ui`.
- Catálogo: `ngx-gorilla-ui-catalog`.
- Repositorio: `ng-gorilla-ui`.

Decisiones técnicas, tomadas antes del punto 1:

- **Navegadores:** las dos últimas versiones de Chrome, Edge, Firefox y Safari (escritorio y móvil), fijadas en `.browserslistrc`. Cubre `light-dark()`, container queries, `@property` y el anidamiento nativo de CSS sin polyfills.
- **Estilos:** CSS puro en los componentes, con anidamiento nativo y variables CSS. Sass solo se usa, si hace falta, para el mixin de personalización de la paleta del 7.1.
- **Iconos:** Lucide como SVG en línea, servido por el proveedor de iconos configurable. Solo se incluyen en el build los iconos que se usan, y no hay peticiones a terceros.
- **Fuente:** la fuente del sistema (`system-ui`) por defecto. El README documenta cómo autoalojar otra, como Red Hat Display.
- **Tests de accesibilidad:** Playwright con `@axe-core/playwright` sobre el catálogo, en los dos temas.
- **Tests unitarios:** Vitest en modo navegador, con Playwright como motor, para que `:focus-visible`, `light-dark()`, el layout y las coordenadas se comprueben en un navegador real.
- **Node:** 24 LTS (`.nvmrc` y `engines`).
- **Idioma:** inglés en todo lo público (README, `CHANGELOG.md`, catálogo, JSDoc, mensajes de error por defecto) y español en lo interno (`docs/`, `AGENTS.md` y planes).
- **Tema por defecto:** `system`, que sigue a `prefers-color-scheme` hasta que el usuario elija.
- **Tamaños:** `xs`, `sm`, `md`, `lg` y `xl`.
- **Límite de tamaño por entry point:** se mide el botón al terminar el 1.4 y se fija el límite con un 10 % de margen; cada entry point nuevo fija el suyo de la misma forma. El CI falla si alguno lo supera.
- **Iconos de Lucide:** desde un paquete solo de datos (como `lucide-static` o `@lucide/icons`), pintados por un componente propio, sin `lucide-angular`.
- **Publicación:** trusted publishing de npm desde GitHub Actions, sin tokens guardados en el repositorio.
- **Catálogo:** un proyecto nuevo de Vercel.

### Variantes

Seis variantes, cada una con su propio lenguaje de forma, elevación, bordes y movimiento. Todas leen los mismos tokens de color, así que cualquier color funciona en cualquier variante y en los dos temas.

| Variante | Estilo |
|---|---|
| `default` | El estilo propio de `ngx-gorilla-ui` y el que se aplica si no se indica otro. |
| `brutalist` | Brutalismo: bordes gruesos, sombras duras sin desenfoque, esquinas rectas y colores planos de alto contraste. |
| `glass` | Glassmorphism: fondos translúcidos con `backdrop-filter`, bordes claros finos y sombras suaves. Requiere un fondo de respaldo cuando `backdrop-filter` no está disponible o con `prefers-reduced-transparency`. |
| `material` | Imita Material Design 3 Expressive: formas redondeadas variables, elevación tonal, estados con capa de opacidad y movimiento con muelles. |
| `minimal` | Minimalismo moderno y sobrio: sin sombras, bordes finos o ninguno, mucho espacio y acentos de color contenidos. |
| `swift` | Imita SwiftUI: esquinas continuas grandes, materiales con desenfoque, controles de estilo iOS y animaciones suaves. |

Las variantes de `ngx-monkey-ui` (`flat`, `ghost`, `glow` y `discreet`) no pasan como variantes. Si hacen falta, se reintroducen como modificadores de énfasis del componente (por ejemplo `appearance="filled" | "tonal" | "outlined" | "text"` en el botón), que son independientes de la variante.

### Colores

Dos capas de tokens, como recomiendan los sistemas de diseño actuales (Material 3, Radix, Apple HIG):

1. **Paletas primitivas.** Una escala de 12 pasos por tono (`--gorilla-blue-1` a `--gorilla-blue-12`) para el gris neutro y cada tono de marca y de estado. Los componentes no las usan directamente.
2. **Tokens semánticos.** Lo único que leen los componentes. Cambian entre tema claro y oscuro con `light-dark()`.
   - **Roles de color**, para el input `color` de los componentes: `primary`, `secondary`, `tertiary`, `neutral`, `success`, `warning`, `danger` e `info`. Cada uno con:
     - `-solid`: fondo sólido del componente.
     - `-solid-hover` y `-solid-active`: estados de interacción.
     - `-on-solid`: texto e iconos sobre el fondo sólido.
     - `-subtle` y `-subtle-hover`: fondo suave, para variantes tonales, chips o alertas.
     - `-on-subtle`: texto sobre el fondo suave.
     - `-border`: borde del color.
   - **Superficies:** `background` (la página), `surface`, `surface-raised` (tarjetas), `surface-overlay` (menús, diálogos, tooltips) y `scrim` (el velo detrás de un diálogo).
   - **Texto:** `text`, `text-muted`, `text-disabled` y `text-inverse`.
   - **Bordes:** `border`, `border-strong` y `border-disabled`.
   - **Interacción:** `focus-ring` y `selection`.

Cada pareja de fondo y texto (`-solid` con `-on-solid`, `-subtle` con `-on-subtle`, `surface` con `text`) debe pasar el contraste AA en los dos temas; es el criterio del 1.5.

## 4. Qué se aprovecha de ngx-monkey-ui

| Se aprovecha | Cómo |
|---|---|
| Las variantes `brutalist` y `glass`, y los colores de `MonkeyStyle` | Sus valores (sombras, radios, blur, bordes y tonos) sirven de punto de partida para las variantes `brutalist` y `glass` y para las paletas primitivas. El resto de variantes se diseñan de nuevo (ver Variantes, en la sección 3). |
| El inventario de componentes y sus casos de uso | Especificación de qué construir y en qué orden. |
| El análisis de errores | Pasa a ser [`ERRORES-A-EVITAR.md`](./ERRORES-A-EVITAR.md): la checklist de errores que no se pueden repetir, cada uno con el principio o el punto que lo resuelve. |
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

El roadmap está en [`ROADMAP.md`](./ROADMAP.md). Los números de punto que cita esta propuesta (0.6, 1.5, 7.1…) remiten a él.

## 6. Coste comparado

Rehacer no es más caro que el roadmap de `ngx-monkey-ui`: los puntos 14 a 22 ya tocan todos los componentes, y además exigen mantener la API y la base antigua funcionando entre medias. Con `ngx-gorilla-ui` ese trabajo se hace una sola vez, componente a componente, y cada uno sale terminado (accesible, con tests y en el catálogo) en lugar de pasar por cinco reescrituras parciales.

## 7. Flujo de trabajo

Las reglas para contribuir, en inglés, están en [`CONTRIBUTING.md`](../CONTRIBUTING.md), y las instrucciones para agentes, en [`AGENTS.md`](../AGENTS.md).

### Ramas

1. Cada versión tiene una rama `release/<versión>` (por ejemplo `release/0.1.0`) creada desde `main`. Su alcance se decide al crearla. La `0.1.0` incluye los puntos 0 y 1.
2. Cada implementación se hace en una rama creada desde esa `release/<versión>` (`feat/button`, `fix/…`, `docs/…`) y termina con una pull request hacia `release/<versión>`.
3. Cuando todo lo de la versión está mergeado, se abre una pull request desde `release/<versión>` hacia `main`.
4. Nadie hace push directo a `main` ni a `release/*`. Las dos ramas exigen pull request con la CI en verde.

### Releases

Al mergear en `main` la pull request de una `release/<versión>`, el workflow de release (0.8):

1. Ejecuta de nuevo todas las comprobaciones de la CI.
2. Comprueba que la versión del nombre de la rama coincide con la de `package.json` de la librería y con la primera sección de `CHANGELOG.md`.
3. Construye la librería, crea el tag `v<versión>` y la GitHub Release con las notas del changelog.
4. Publica en npm con trusted publishing y procedencia.

Si algo falla, no se publica nada.

### Documentación

La documentación es la app `ngx-gorilla-ui-catalog`, construida con la propia librería y desplegada en Vercel. Ningún componente se da por terminado sin su página: guía de uso, API (inputs, outputs, tokens), ejemplos en vivo y notas de accesibilidad. Cualquier cambio en un componente actualiza su página en la misma pull request.
