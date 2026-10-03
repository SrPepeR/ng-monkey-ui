# Errores a evitar

Checklist de los errores de `ngx-monkey-ui` que `ngx-gorilla-ui` no puede repetir. Cada componente, directiva o servicio nuevo se revisa contra las secciones que le apliquen antes de darlo por terminado, y su plan en `.agents/plans` cita los identificadores que cubre.

## De dónde sale

Es el resultado del análisis en profundidad de `ngx-monkey-ui@0.3.1` sobre Angular 18.2 (2026-10-01), reorganizado por tema. El análisis completo, con el archivo y la línea de cada error, la revisión de `SUGERENCIAS.md` y el plan de port a Angular 22 que se descartó, sigue en el tag [`ngx-monkey-ui-legacy`](https://github.com/SrPepeR/ng-gorilla-ui/blob/ngx-monkey-ui-legacy/ANALISIS.md).

Los identificadores se conservan porque los usan los tests, el `CHANGELOG.md` legacy y los planes: `E-xx` son errores confirmados y `R-xx`, riesgos. Los "principios" remiten a la sección 3 de la [propuesta](./PROPUESTA-NGX-GORILLA-UI.md) y los puntos numerados, al [roadmap](./ROADMAP.md).

Cada entrada tiene tres partes:

- **La regla**, en negrita: lo que se comprueba.
- **Qué pasó**: el error en `ngx-monkey-ui`.
- **Cómo se cumple**: el principio o el punto del roadmap que lo resuelve en `ngx-gorilla-ui`, y el criterio de aceptación cuando lo hay.

## Ciclo de vida y reactividad

- **Ninguna suscripción sin cancelar ni listener que sobreviva al componente.**
  - Qué pasó: `Styleable` se suscribía al `resize` de `window` en `ngOnInit` y otra vez en cada `ngOnChanges`, sin `ngOnDestroy`. Cada cambio de input dejaba un listener más para siempre (E-02). `MonkeyScrollbar` (E-10) y el `keydown` global de `MonkeyLoginPage` (E-07) repetían el patrón.
  - Cómo se cumple: estado con señales y `computed()`. Si hace falta un observable, `takeUntilDestroyed` o `DestroyRef`. Principios 2 y 4.
- **Nada de `setTimeout` para sincronizar estado.**
  - Qué pasó: `Styleable` recalculaba las clases 300 ms después de cada cambio, y en una app zoneless esas asignaciones no repintan nada (R-09).
  - Cómo se cumple: `computed()` enlazado al host. El catálogo es zoneless y lo demuestra. Principio 4.
- **Los valores por defecto que dependen de otro input se calculan cuando el input existe.**
  - Qué pasó: `@Input() title = this.alt` se evaluaba en el constructor, cuando `alt` aún era `undefined` (E-09). `loginActions` se construía antes de recibir los inputs (E-07). `MonkeyScrollbar` leía el tema en el constructor (E-10).
  - Cómo se cumple: `computed(() => this.title() ?? this.alt())`.
- **Un cambio de input solo reinicia el estado que depende de ese input.**
  - Qué pasó: `MonkeyImage` volvía al placeholder con cualquier cambio de input, pero `(load)` solo se disparaba al cambiar `src`, y la imagen se quedaba oculta (E-08).
  - Cómo se cumple: el estado de carga deriva de `src()`, y `(error)` también sale del estado de carga. Criterio de aceptación del 2.5.
- **Cualquier cambio del control actualiza lo que depende de él, no solo lo que teclea el usuario.**
  - Qué pasó: los mensajes de validación solo se recalculaban en `ngModelChange`, así que `reset()`, `setValue()` y `markAllAsTouched()` los dejaban desfasados (E-23).
  - Cómo se cumple: los mensajes derivan del estado del control. Criterio de aceptación del 3.6.

## DOM, SSR y CSP

- **Un componente solo toca su propio host y su plantilla.**
  - Qué pasó: cada componente borraba las clases del primer `<main>` del documento y fijaba márgenes y alturas inline en `.aside-menu` y `monkey-menu` (E-03).
  - Cómo se cumple: el layout es un componente explícito resuelto con CSS Grid (5.1).
- **Ningún id fijo ni búsqueda global por id o selector.**
  - Qué pasó: `id="checkbox"` era igual en todas las instancias y los `<label for="switch">` apuntaban a un id inexistente (E-19). `MonkeyAsideMenu` usaba `document.getElementById` con `!` y dos instancias compartían id (E-18).
  - Cómo se cumple: ids generados por instancia y `viewChild()`. Criterio de aceptación del 3.3.
- **Nada de `window`, `document`, `localStorage`, `screen` ni `matchMedia` directos.**
  - Qué pasó: la librería fallaba al arrancar con SSR o prerender (R-06).
  - Cómo se cumple: `DOCUMENT`, `afterNextRender` e `isPlatformBrowser`. Principio 8 y comprobación con SSR en el 7.4.
- **Ningún `<style>` construido con `innerHTML` ni CSS interpolado desde inputs.**
  - Qué pasó: el fondo, las fuentes y el scrollbar inyectaban CSS que una CSP estricta bloquea, y que podía meter CSS arbitrario (R-07). El scrollbar además acumulaba un `<style>` por cada cambio de tema (E-10).
  - Cómo se cumple: variables CSS con `style.setProperty` o tokens en el tema. Principio 8.

## Estilos y temas

- **Las variantes no salen de herencia ni de servicios que generen clases.**
  - Qué pasó: `ComponentsStylesService` duplicaba cada clase hasta cuatro veces (E-04). La base recalculaba la lista desde cero y borraba las clases de tamaño de `MonkeyLoader` y `MonkeyAvatar` (E-05). `MonkeyHeader` y `MonkeyIcon` aceptaban variantes que nunca aplicaban (E-14). `MonkeyTooltip` heredaba inputs que no usaba (E-13).
  - Cómo se cumple: directiva `GorillaVariant` con `hostDirectives` (1.3). Cada input que acepta un componente tiene efecto visible y un test que lo comprueba.
- **Los colores se declaran una vez, en `:root`.**
  - Qué pasó: cada componente volvía a emitir las variables de los dos temas con `*:not(.dark-theme)`, y el tema oscuro necesitaba `[class.dark-theme]="isDarkMode$ | async"` en cada elemento: 50 `async` pipes.
  - Cómo se cumple: tokens con `light-dark()` y `data-theme` en `<html>` (principio 3 y punto 1.1).
- **El tema persiste y sigue al sistema mientras el usuario no elija.**
  - Qué pasó: `ThemeService` leía `localStorage`, pero nunca escribía en él, y no escuchaba `prefers-color-scheme` (E-11).
  - Cómo se cumple: criterio de aceptación del 1.2.
- **Sin `!important`, sin `@import` y sin erratas en nombres públicos.**
  - Qué pasó: 36 `!important`, 22 `@import` y `--*-contrast-hight` repetido 218 veces como API pública.
  - Cómo se cumple: principio 3. Un nombre de token publicado es API: se revisa antes de publicarlo.
- **El scrollbar, el movimiento y el responsive se resuelven en CSS.**
  - Qué pasó: `MonkeyScrollbar` usaba JavaScript y solo `::-webkit-scrollbar`. El fondo animado ignoraba `prefers-reduced-motion`. `MonkeyScreenService` abría un listener de `resize` por suscriptor, sin compartir (R-10).
  - Cómo se cumple: `scrollbar-color` y `scrollbar-width`, `prefers-reduced-motion`, y container queries y media queries (principio 7).

## API pública

- **Booleanos y números con `booleanAttribute` y `numberAttribute`.**
  - Qué pasó: los inputs eran strings `'true'`/`'false'` evaluados con `check()` (R-02).
  - Cómo se cumple: principio 5.
- **Ningún input con nombre de atributo HTML ni de directiva de Angular.**
  - Qué pasó: `style` chocaba con el atributo nativo y con `[style]` (R-03). `formGroup` y `name` instanciaban un `FormGroupDirective` sobre el host (R-04).
  - Cómo se cumple: `color` en lugar de `style` y `ControlValueAccessor` (principios 5 y 6).
- **Outputs sin prefijo `on` y con un criterio común.**
  - Qué pasó: `onClick`, `onSwitch` y `onDismiss` convivían con `selectedChanged` y `optionSelected` (R-13).
  - Cómo se cumple: principio 5.
- **Un componente compuesto escucha el output de su hijo, no el evento del DOM.**
  - Qué pasó: `MonkeyIconButton` y `MonkeyAlert` escuchaban el `click` nativo, así que reaccionaban con el botón interior deshabilitado (E-24).
  - Cómo se cumple: criterio de aceptación del 1.4 y del 2.2.
- **El estado deshabilitado se puede quitar.**
  - Qué pasó: `isDisabledComponent` nunca volvía a `false` (E-22).
  - Cómo se cumple: deriva de `disabled()`. Criterio de aceptación del 1.4.
- **Tipado estricto, sin `any`, `Function` ni `@ts-ignore`.**
  - Qué pasó: había `@ViewChild() input: any`, `action: Function` y `hideTimeoutId: any` (R-12). `unlockOrientation()` prometía `Promise<void>`, pero devolvía `void`, y el `@ts-ignore` lo ocultaba (E-25).
  - Cómo se cumple: `strict` y el lint en el CI (0.5).
- **La superficie pública es coherente y no tiene dependencias implícitas.**
  - Qué pasó: había exportaciones duplicadas, `MonkeyInput` no se exportaba y una "página" de producto vivía en la librería (R-14). `MonkeyMenu` inyectaba `Router` aunque no navegara (R-08). Las `peerDependencies` estaban incompletas.
  - Cómo se cumple: un entry point por componente (principio 9) y `Router` opcional (5.2).
- **No hay código muerto.**
  - Qué pasó: `MonkeyTooltipService.onHide` y `DEFAULT_SCREEN_TIME` no se usaban (E-21).
  - Cómo se cumple: el lint con `noUnused*`.

## Formularios

- **El mensaje de cada error aparece justo cuando el control tiene ese error.**
  - Qué pasó: "This field is required" solo se añadía con el campo lleno, así que nunca salía (E-06).
  - Cómo se cumple: los mensajes se mapean desde `control.errors`. Criterio de aceptación del 3.6.
- **El valor del control tiene el tipo del campo.**
  - Qué pasó: `input-number` con `type="number"` escribía `"5"` en lugar de `5`. La rueda actuaba sin foco, en tipos sin pasos como `tel` (con `InvalidStateError`) y con `mousewheel`, que Firefox no implementa (E-15).
  - Cómo se cumple: criterio de aceptación del 3.2.
- **Los atajos de teclado solo actúan dentro de su formulario.**
  - Qué pasó: el Enter de `MonkeyLoginPage` estaba registrado en `document` y disparaba el login desde cualquier parte de la app (E-07).
  - Cómo se cumple: un `<form>` real con `(ngSubmit)`.

## Accesibilidad

- **Cada patrón interactivo sale de Angular Aria o del CDK, no de una reimplementación.**
  - Qué pasó: el dropdown era un `<label>` con `<div>` clicables, sin roles, sin `aria-expanded` y sin teclado. Los menús se abrían con `mouseenter`.
  - Cómo se cumple: principio 1.
- **Todo control tiene nombre accesible.**
  - Qué pasó: los botones de solo icono no tenían `aria-label`. El switch no tenía nombre ni `role="switch"`. Los iconos de texto se leían en voz alta.
  - Cómo se cumple: `aria-label` obligatorio en `gorilla-icon-button` (2.2), `aria-hidden` por defecto en `gorilla-icon` (2.1) y `role="switch"` (3.3).
- **Los errores de un campo están asociados al campo.**
  - Qué pasó: la lista de errores no tenía `aria-describedby` ni marcaba `aria-invalid`.
  - Cómo se cumple: 3.6.
- **Lo que aparece o se anuncia lo oye un lector de pantalla.**
  - Qué pasó: la alerta no tenía `role="alert"` ni `aria-live`. El tooltip solo salía con ratón tras 2 s, sin `role="tooltip"` y sin cerrarse con Escape (WCAG 1.4.13).
  - Cómo se cumple: 4.1 y 4.4.
- **`:focus-visible`, contraste AA y `prefers-reduced-motion` comprobados en cada variante y tema.**
  - Qué pasó: nunca se comprobaron, en especial en `ghost` y `glass`.
  - Cómo se cumple: 1.5 y axe en el CI (1.7).

## Overlays

- **Un overlay crea su propio contenedor y admite varias instancias.**
  - Qué pasó: si la app no pintaba `<monkey-alert>` o `<monkey-tooltip>`, los mensajes se perdían sin aviso, y solo cabía una alerta a la vez (R-11).
  - Cómo se cumple: CDK Overlay y una cola (4.1 y 4.4).
- **Las posiciones se calculan en un solo sistema de coordenadas y aceptan el 0.**
  - Qué pasó: el tooltip descartaba la coordenada 0 y mezclaba `pageX` con `innerWidth`, así que fallaba con la página desplazada (E-20).
  - Cómo se cumple: el CDK Overlay posiciona. Criterio de aceptación del 4.1.

## Servicios y terceros

- **Ninguna petición a terceros por defecto.**
  - Qué pasó: `MonkeyFontService` cargaba Google Fonts sin consentimiento (RGPD), y `monkey-icon` dependía de *Material Symbols* sin declararlo.
  - Cómo se cumple: principio 10.
- **Lo que un servicio añade al documento, lo quita.**
  - Qué pasó: `MonkeyFontService` buscaba el prefijo en `href` en vez de en `id`, no borraba los `<style>`, duplicaba ids y `<link>` (E-16). `MonkeyBackgroundService.remove()` no detenía la animación (E-17).
  - Cómo se cumple: cada servicio que toca el documento tiene un test de limpieza.
- **Los valores generados se validan y se acotan.**
  - Qué pasó: colores hexadecimales de cinco dígitos en ~6 % de los casos, un fotograma perdido, y posiciones y tamaños fuera de 0-100 (E-17).
  - Cómo se cumple: 6.6, si se conserva el fondo animado.

## Infraestructura y tests

- **La suite compila, arranca y prueba comportamiento.**
  - Qué pasó: un import roto impedía arrancar la suite, y la mitad de los specs que quedaban fallaban; todos eran el `should create` generado (E-01).
  - Cómo se cumple: cada componente nace con tests de comportamiento y de accesibilidad (ver [Cómo se trabaja](./ROADMAP.md#cómo-se-trabaja) en el roadmap). Un error se corrige con un test que fallaba antes.
- **El CI bloquea lo que no pasa: lint, formato, tests, build, tamaño y axe.**
  - Qué pasó: no había CI ni lint hasta el punto 12 de `ngx-monkey-ui`.
  - Cómo se cumple: 0.5 y 1.7.
- **Nada personal ni dependiente de la máquina en el repositorio.**
  - Qué pasó: `angular.json` guardaba el id de analíticas del CLI.
- **Cada versión publicada tiene `CHANGELOG.md`, tag y procedencia.**
  - Qué pasó: la 0.2.0, la 0.3.0 y la 0.3.1 se publicaron el mismo día sin cambios entre ellas, sin tags ni changelog.
  - Cómo se cumple: 7.5.
