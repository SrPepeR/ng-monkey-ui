# Análisis en profundidad de NgxMonkeyUi

Este documento sustituye a `SUGERENCIAS.md`. Aquel era una revisión rápida; este es una revisión completa del código de la librería (`projects/ngx-monkey-ui`) y de su configuración, con tres objetivos: detectar errores, proponer mejoras y preparar el port a la última versión de Angular. La hoja de ruta que sale de aquí vive en [`ROADMAP.md`](./ROADMAP.md); este documento es el porqué de cada punto, y el roadmap es el qué y en qué orden.

- Fecha del análisis: 2026-10-01.
- Versión analizada: `ngx-monkey-ui@0.3.1` sobre Angular 18.2, TypeScript 5.4, zone.js 0.14.
- Última versión estable de Angular en la fecha: **22.2.1** (exige TypeScript `>=6.0 <6.1`, Node `^22.22.3 || ^24.15.0 || >=26`, zone.js `~0.15 || ~0.16`).

## Índice

1. Estado actual y cómo se ha medido
2. Errores confirmados
3. Riesgos y deuda técnica
4. Revisión de `SUGERENCIAS.md`: qué se confirma y qué no
5. Port a Angular 22
6. Modernización de la API de la librería
7. Estilos y temas
8. Accesibilidad
9. Empaquetado, documentación y DX
10. Componentes que faltan

Cada hallazgo lleva un identificador (`E-xx` para errores, `R-xx` para riesgos) al que se refiere el roadmap.

---

## 1. Estado actual y cómo se ha medido

Se ha leído entero el código de `bases/`, `services/`, `objects/`, `components/`, `pages/` y `styles/`, y además se ha comprobado lo siguiente en la práctica, no solo leyendo:

| Comprobación | Resultado |
| --- | --- |
| `npm ci` | Instala sin errores (1007 paquetes). |
| `ng build ngx-monkey-ui` | **Compila** en modo parcial de Ivy. |
| `ng test ngx-monkey-ui` | **No llega a ejecutarse**: `theme-changer.component.spec.ts` importa `ThemeChangerComponent`, que no existe (la clase se llama `MonkeyThemeChanger`). |
| `ng test` corrigiendo solo ese import | 25 tests, **11 fallan**. Todos son el `should create` generado por el CLI: los specs declaran el componente solo, sin sus dependencias (`NG0304 'monkey-icon' is not a known element`, `NG0303 Can't bind to 'formGroup'`). |
| `dist/ngx-monkey-ui` | No incluye ningún `.scss`: los temas y mixins no se publican. |

Es decir: la librería compila, pero no tiene ninguna red de seguridad. Los 25 specs existentes no prueban comportamiento, y la suite ni siquiera arranca. Esto condiciona el orden del roadmap: antes de corregir nada ni de portar, hay que poder demostrar que no se rompe nada.

### Arquitectura en una frase

Casi todos los componentes heredan de `Styleable` (las excepciones son `MonkeyThemeChanger` y `MonkeyScrollbar`), una clase base decorada con `@Component` que calcula una lista de clases CSS a partir de *inputs* string (`'true'`/`'false'`/`''`), escucha el `resize` de la ventana y, además, manipula elementos globales del documento (`<main>`, `.aside-menu`, `monkey-menu`). Los componentes se declaran en un único `NgxMonkeyUiModule` y el tema oscuro se aplica pintando una clase `.dark-theme` en cada elemento mediante `isDarkMode$ | async`.

---

## 2. Errores confirmados

Errores que producen un comportamiento incorrecto hoy, ordenados por gravedad.

### Críticos

- **E-01. La suite de tests no compila.** `components/fourth-level/theme-changer/theme-changer.component.spec.ts` importa un símbolo inexistente. Con eso arreglado, 11 de 25 specs fallan por falta de `imports`/`declarations`.
- **E-02. Fuga de suscripciones acumulativa en `Styleable`.** `ngOnInit` se suscribe a `screenChanges$` (`bases/styleable.base.ts:143`) y `ngOnChanges` vuelve a suscribirse **cada vez que cambia cualquier input**, dentro de un `setTimeout` de 300 ms (`styleable.base.ts:154-161`). No hay `ngOnDestroy`. Como `screenChanges$` es un `fromEvent(window, 'resize')` sin compartir, cada suscripción añade un listener nuevo a `window` que nunca se quita, ni siquiera al destruir el componente. Un componente con inputs que cambian a menudo acumula cientos de listeners, y cada `resize` recalcula clases y toca el DOM global N veces. `MonkeyAsideMenu.ngOnChanges` repite el patrón (`aside-menu.component.ts:137`).
- **E-03. `Styleable` reescribe el DOM global desde cada componente.** `addClassesToMainElement` hace `main.removeAttribute('class')` sobre el primer `<main>` del documento (`styleable.base.ts:245-251`): **borra las clases que la aplicación consumidora haya puesto en su `<main>`**, y lo hace cada botón, icono o tarjeta en cada `resize`. `manageAsideMenu` y `addStylesToAsideMenuWhenMenu` fijan `margin-left`, `top` y `height` inline. `MonkeyAlert` pinta su propio `<main>` dentro de la plantilla, así que puede ser ese el que reciba las clases.
- **E-04. `ComponentsStylesService` duplica la lista de clases.** `checkTypes` y `checkGeneralStyles` reciben el array, lo mutan con `push` y lo devuelven; después se hace `classList = classList.concat(mismoArray)` (`components-styles.service.ts:23-25`). Como el segundo `concat` duplica siempre el array, añada o no clases `checkGeneralStyles`, cada clase añadida antes acaba repetida 4 veces y las de `checkGeneralStyles`, 2. No rompe el CSS, pero revela que nadie ha probado el servicio y multiplica el trabajo del renderer.
- **E-05. Las clases calculadas por los hijos se pierden.** `MonkeyLoader` y `MonkeyAvatar` sobreescriben `classList` con `ComponentsSizesService` (tamaño, `form-*`, `labeled`), pero `Styleable` lo recalcula desde cero 300 ms después de cada `ngOnChanges` y en cada `resize`, **sin** esas clases. Resultado: el tamaño y la forma del loader y del avatar desaparecen al redimensionar o al cambiar un input.
- **E-06. Mensaje "required" invertido.** `MonkeyInput.generateInvalidMessages` solo añade "This field is required" cuando el valor **no** está vacío (`bases/input/input.base.ts:149`), que es justo cuando el error `required` no puede existir. El mensaje no aparece nunca.
- **E-07. `MonkeyLoginPage` ignora sus propios inputs.** `loginActions` se construye en el inicializador de campo (`pages/form/login/login.page.ts:168`), antes de que Angular asigne los inputs, así que `loginLabel`, `loginIcon`, `registerLabel` y `registerIcon` personalizados no se usan nunca. Además registra un `keydown` en `document` (`login.page.ts:223`) que **no se elimina al destruir la página**: sigue emitiendo `onLogin`/`onContinueAsGuest` con cada Enter en cualquier parte de la aplicación, y se acumula cada vez que se vuelve a entrar a la ruta.
- **E-08. `MonkeyImage` puede quedarse en el placeholder para siempre.** `ngOnChanges` pone `loading = true` ante **cualquier** cambio de input (`image.component.ts:87`), pero el `(load)` del `<img>` solo vuelve a dispararse si cambia `src`. Si cambia `width`, `height`, `style`, etc. con el mismo `src`, la imagen queda oculta. Tampoco se sale del estado de carga en `(error)`.

### Altos

- **E-09. `MonkeyImage.title` no hereda `alt` por defecto.** `@Input() title = this.alt` (`image.component.ts:43`) se evalúa en el constructor, cuando `alt` aún no tiene valor. Si el consumidor pasa `[title]`, Angular sobrescribe el inicializador y funciona; lo que falla es el valor por defecto, que queda en `undefined` en vez de tomar el de `alt`.
- **E-10. `MonkeyScrollbar` ignora los colores que recibe y acumula `<style>`.** Se suscribe a `isDarkMode$` en el **constructor** (`scrollbar.component.ts:36`); como es un `BehaviorSubject`, emite en ese mismo instante, antes de que existan los inputs, y pinta los colores por defecto. Cada cambio de tema añade otro `<style>` al `<head>` sin quitar el anterior (`:66`), y la suscripción nunca se cancela.
- **E-11. `ThemeService` lee la preferencia pero nunca la guarda.** Lee `localStorage.getItem('theme')` (`theme.service.ts:24`) pero `toggleDarkMode` no escribe nada: la elección del usuario se pierde al recargar. Tampoco escucha los cambios de `prefers-color-scheme` del sistema.
- **E-12. `MonkeyMenu` no puede mostrar tooltip.** `alt` no es `@Input` (`menu.component.ts:57`) y la plantilla no tiene `mouseover`/`mouseout`; el `Tooltipable` que crea no se usa.
- **E-13. `MonkeyTooltip` hereda de `Styleable` sin usarlo.** No es un fallo visible: sobrescribe `ngOnInit` sin llamar a `super.ngOnInit()` (`tooltip.component.ts:59`), pero su plantilla no enlaza `classList` y reenvía las variantes directamente a `monkey-card`, así que el tooltip se pinta bien. Lo que sobra es la herencia: acepta inputs de `Styleable` que no usan su propio cálculo, y el `ngOnChanges` heredado sigue activando la suscripción y los efectos globales de E-02 y E-03. Llamar a `super.ngOnInit()` no arreglaría nada y añadiría otra suscripción sin cancelar; hay que decidir entre aplicar las clases al host o quitar la herencia.
- **E-14. `MonkeyHeader` y `MonkeyIcon` heredan de `Styleable` pero no usan `classList` en la plantilla.** `style`, `brutalist`, `disabled`, etc. no tienen efecto en ellos aunque los acepten.
- **E-15. `MonkeyInputNumber` no distingue sus tipos ni en el valor ni en la rueda.** El componente admite `number`, `tel`, `date`, `datetime-local` y `time` (`MonkeyInputNumberType`), pero los trata igual:
  - `reloadValue` hace `setValue(nativeElement.value)` (`input-number.component.ts:73`). Para `type="number"` eso deja `"5"` en el `FormControl` en vez de `5`; para `tel`, `date`, `datetime-local` y `time` el string es el valor correcto y debe conservarse.
  - El handler de rueda se instala para todos los tipos, y `stepUp()`/`stepDown()` lanzan `InvalidStateError` en los que no admiten pasos, como `tel`.
  - La rueda se escucha con `(mousewheel)` (`input-number.component.html:28`), que Firefox no implementa; el estándar es `wheel`. Y `preventDefault` bloquea el scroll de la página siempre que el puntero pase por encima del campo, aunque no tenga foco.
  - Cambiar `mousewheel` por `wheel` no basta: la conversión a `number` y la rueda tienen que limitarse a `inputType="number"`.
- **E-16. `MonkeyFontService` no limpia lo que añade.**
  - `removeOtherFonts` busca `monkey-font-` en `link.href` (`font.service.ts:164`) cuando ese prefijo está en `link.id`: nunca elimina las hojas de fuentes anteriores.
  - `removeDosisFont`, `removeTitilliumWebFont` y `removeRedHatDisplayFont` llaman a `removeCustomFont` sin `fontName` (`:70`, `:84`, `:98`), así que el `<style>` que aplica la fuente nunca se borra.
  - El `<link>` y el `<style>` de una misma fuente reciben el **mismo `id`**: IDs duplicados en el documento.
  - Cada `addCustomFont` añade un `<link>` nuevo aunque ya exista.
  - La URL de Red Hat Display no lleva `&display=swap`, a diferencia de las otras dos.
- **E-17. `MonkeyBackgroundService` genera colores inválidos y pierde un fotograma.**
  - `Colors.generateRandom` no rellena con ceros (`colors.ts:54`): cualquier valor menor que `0x100000` produce `#abcde` (5 dígitos), un color CSS inválido que invalida el `radial-gradient` entero. Pasa en ~6 % de los colores.
  - `animate` recorre `gradientsVariations.length - 1` (`background.service.ts:152`): con `steps = 10` la última variación generada nunca entra en los keyframes (salta de 80 % a 100 %).
  - `move` y `growShrink` no acotan los valores: tras varias pasadas las posiciones salen del rango 0-100 % y los tamaños pueden ser negativos.
  - `background-image` no es interpolable en CSS: la "animación" son saltos discretos cada `delay / steps` ms.
  - `remove()` no detiene la animación, que sigue aplicándose a `body, html`.
- **E-18. `MonkeyAsideMenu` depende de un id global y revienta sin datos.** Usa `document.getElementById('aside-menu-content')` con `!` (`aside-menu.component.ts:188`): dos instancias comparten id, y si el nodo no está, `TypeError`. `ngOnInit` hace `this.data[0]` sin comprobar que el array no esté vacío.

### Medios y bajos

- **E-19. IDs fijos en el checkbox y `for` huérfano en el switch.** `checkbox.component.html` pone `id="checkbox"` y `name="checkbox"` a todas las instancias. En `switch.component.html` los dos `<label for="switch">` apuntan a un id que ningún elemento tiene; si la página consumidora tuviera un `id="switch"`, esos labels lo activarían.
- **E-20. `Tooltip.setDirection` descarta coordenadas 0.** `!mousePosition.x || !mousePosition.y` (`services/tooltip/tooltip.ts:50`) trata el 0 como ausencia de valor. Además mezcla `pageX/pageY` (coordenadas de documento) con `window.innerWidth` (coordenadas de viewport): con la página desplazada horizontalmente el lado elegido es incorrecto.
- **E-21. `MonkeyTooltipService.onHide` es código muerto** (`tooltip.service.ts:58`), y la constante `DEFAULT_SCREEN_TIME` no se usa.
- **E-22. `isDisabledComponent` nunca vuelve a `false`** en `Styleable`: un componente que se habilita tras haber estado deshabilitado sigue marcado.
- **E-23. Mensajes de validación desfasados.** `invalidMessages` solo se recalcula en `ngModelChange`; un `reset()`, un `setValue()` programático o un `markAllAsTouched()` al enviar no los actualizan.
- **E-24. Los componentes compuestos escuchan el `click` del DOM en vez del output del hijo.** `MonkeyIconButton` escucha `(click)` nativo sobre el host de `monkey-button` y `MonkeyAlert` escucha `(click)` sobre `monkey-icon-button`. Cada output público se emite una sola vez, pero al escuchar el evento del DOM el padre reacciona a clicks que el hijo no considera suyos: los del relleno del host, o los que llegan con el botón interior deshabilitado. Se salta así la semántica de `disabled`.
- **E-25. `MonkeyScreenService.unlockOrientation()` no devuelve una promesa.** Su firma promete `Promise<void>`, pero devuelve directamente lo que devuelve `screen.orientation.unlock()` (`services/screen/screen.service.ts:90`), que es `void`. El `@ts-ignore` que tenía ocultaba el error de tipos; apareció al activar el lint (12.4) y ahora está marcado con `@ts-expect-error`. Quien encadene `.catch()` recibe un `TypeError` en vez de manejar el error, como la app de pruebas al pulsar "Unlock rotation" (`app.component.ts:193`). Si `unlock()` lanza, la excepción tampoco se convierte en rechazo.

---

## 3. Riesgos y deuda técnica

No rompen nada hoy de forma visible, pero condicionan el port y la evolución.

- **R-01. Las clases base están decoradas con `@Component` vacío.** `Styleable`, `MonkeyInput` y `Tooltipable` deberían ser `@Directive()` abstractas. `Tooltipable` incluso tiene selector `app-tooltip-base`. Los `providers` que declaran no sirven de nada, porque `Styleable` crea los servicios con `new` (`styleable.base.ts:26-27`), saltándose la inyección de dependencias: no se pueden sustituir en tests ni configurar.
- **R-02. Inputs booleanos como string.** `brutalist`, `flat`, `disabled`, `required`, `horizontal`, `separators`… son `string` y se evalúan con `check()`. Angular resuelve esto desde la v16 con `booleanAttribute`; mantenerlo obliga a pasar `'false'` como texto y rompe el tipado estricto de plantillas de quien consume la librería.
- **R-03. Un input llamado `style`.** Choca con el atributo nativo `style` y con la sintaxis `[style]`/`[style.prop]` de Angular. Con un valor estático (`style="primary"`) Angular asigna el input **y** deja el atributo en el DOM como estilo inline inválido. En `MonkeyTooltip` conviven `[style]="tooltip.style"` y `[style.top]` sobre el mismo `monkey-card`. El nombre natural es `color` o `variant`.
- **R-04. Inputs que colisionan con directivas de `@angular/forms`.** `MonkeyInput` declara `@Input() formGroup` y `@Input() name`. Como `NgxMonkeyUiModule` importa `ReactiveFormsModule`, `<monkey-input-text [formGroup]="form">` instancia también un `FormGroupDirective` sobre el host. La forma correcta de integrarse con formularios es `ControlValueAccessor` (`formControlName`/`formControl`/`ngModel`, y en Angular 21+ también Signal Forms), no recibir el `FormGroup` entero.
- **R-05. `ngModelChange` junto a `formControlName`.** Funciona, pero es un uso desaconsejado de un output de compatibilidad.
- **R-06. Sin soporte de SSR ni de entornos sin navegador.** `window`, `document`, `localStorage`, `screen` y `matchMedia` se usan directamente en `ThemeService`, `MonkeyScreenService`, `MonkeyFontService`, `MonkeyBackgroundService`, `MonkeyScrollbar`, `Tooltip`, `Styleable` y `MonkeyAsideMenu`. Basta con usar la librería en una app con SSR o prerender (habitual desde Angular 17) para que falle al arrancar.
- **R-07. Inyección de `<style>` con `innerHTML`.** `MonkeyBackgroundService`, `MonkeyFontService` y `MonkeyScrollbar` construyen CSS interpolando strings que vienen de inputs públicos. Una aplicación con CSP estricta (`style-src` sin `'unsafe-inline'`) los bloquea, y un valor no controlado puede inyectar CSS arbitrario.
- **R-08. Dependencia implícita de `Router`.** `MonkeyMenu` y `MonkeyAsideMenu` inyectan `Router` en el constructor aunque `selfNavigation` sea `false`: usar `monkey-menu` en una app sin router lanza `NullInjectorError`.
- **R-09. Estado mutable sin señales.** Muchas actualizaciones (`setTimeout` de `Styleable`, `subscribe` del aside, del tooltip y de la alerta) asignan propiedades fuera de un flujo reactivo. Con zone.js funciona porque zone.js dispara la detección de cambios tras cada tarea; **en una aplicación zoneless, que es el modo por defecto de las aplicaciones nuevas desde Angular 21, esas asignaciones no repintan nada**. Es el bloqueo más importante para que la librería sea usable en una app Angular actual.
- **R-10. `MonkeyScreenService` sin `debounce` ni `share`.** Cada suscriptor abre su propio listener de `resize` y recibe todos los eventos. Para lo que hace (cambiar de breakpoint) bastaría con `matchMedia` o con `BreakpointObserver` del CDK, que solo emiten al cruzar un umbral. La documentación de `ScreenSize.XXL` dice 1600 px pero el código usa 1400 px.
- **R-11. Alerta y tooltip son singletons implícitos.** `MonkeyAlertService` y `MonkeyTooltipService` emiten por un `Subject` público; si la app no pinta `<monkey-alert>`/`<monkey-tooltip>`, los mensajes se pierden sin aviso, y solo puede haber una alerta visible a la vez.
- **R-12. Tipado laxo.** `@ViewChild() input: any`, `checkbox!: any`, `component: any` en los servicios de estilos, `action: Function` en `MonkeyButtonData`, `hideTimeoutId: any`, `@ts-ignore` en `lockOrientation` (hoy `@ts-expect-error`, porque `ScreenOrientation.lock()` no está en los tipos del DOM de TypeScript). `MonkeyButtonData.type` es en realidad un `MonkeyStyle`.
- **R-13. Nombres de outputs con prefijo `on`.** `onClick`, `onSwitch`, `onCheckChange`, `onDismiss`… La guía de estilo de Angular pide no usar `on` en outputs; `onClick` además se confunde con el `(click)` nativo. Conviven con `selectedChanged` y `optionSelected` sin un criterio común.
- **R-14. Superficie pública inconsistente.** `public-api.ts` exporta dos veces `screen.enum`, `dropdown-option.interface` y `menu-option.interface`; no exporta `MonkeyInput` (no se puede extender) ni `ComponentsStylesService`; `InvalidFormMessageComponent` no sigue el prefijo `Monkey*`. La "página" `MonkeyLoginPage` mezcla una vista de producto con una librería de UI.

---

## 4. Revisión de `SUGERENCIAS.md`: qué se confirma y qué no

`SUGERENCIAS.md` acertaba en la mayoría de puntos, pero tenía dos afirmaciones incorrectas y se quedaba corto en otras. Lo que se mantiene está integrado arriba con su identificador.

| Afirmación de `SUGERENCIAS.md` | Veredicto |
| --- | --- |
| Suscripciones duplicadas en `Styleable` | **Confirmado** y peor de lo descrito: también acumula listeners en `window` (E-02). |
| DOM global desde la base común | **Confirmado** (E-03, R-06). |
| `[class]="classList"` convierte el array en una cadena con comas y reemplaza las clases estáticas | **Incorrecto.** Desde Ivy, `[class]` acepta `string`, `string[]`, `Set` u objeto, y se fusiona con el atributo `class` estático. El problema real del servicio es otro: duplica las clases (E-04). |
| Mensaje "required" invertido | **Confirmado** (E-06). |
| El switch dispara `onSwitched()` dos veces | **No reproducible tal cual.** Los `<label for="switch">` no apuntan a ningún elemento, así que no activan el `<input>`. El problema real es el `for` huérfano (E-19) y la sincronización en `AfterViewChecked`. |
| IDs fijos en checkbox | **Confirmado** (E-19). |
| Tooltip de `MonkeyMenu` desconectado | **Confirmado** (E-12). |
| `removeOtherFonts` mira `href` en vez de `id` | **Confirmado**, junto con otros cuatro fallos del mismo servicio (E-16). |
| Sin `isPlatformBrowser` | **Confirmado** (R-06). |
| Tooltip en coordenada 0 | **Confirmado**, más la mezcla de coordenadas (E-20). |
| No hay pruebas unitarias | **Incompleto**: hay 25 specs, pero la suite no compila y la mitad de los que quedan fallan (E-01). |

---

## 5. Port a Angular 22

### Distancia

Angular 18 → 22 son **cuatro versiones mayores**. `ng update` solo admite saltos de una en una, y cada salto trae migraciones automáticas que conviene revisar por separado. Lo que cambia y afecta a esta librería:

| Versión | Cambio relevante para NgxMonkeyUi |
| --- | --- |
| **19** | `standalone: true` pasa a ser el valor por defecto. La migración de `ng update` añade `standalone: false` a todos los componentes declarados en `NgxMonkeyUiModule`. Las APIs `input()`, `output()`, `model()`, `viewChild()` y `linkedSignal`/`resource` se estabilizan o llegan. Migraciones opcionales de señales (`ng g @angular/core:signal-input-migration`, `output-migration`, `signal-queries-migration`). |
| **20** | `*ngIf`, `*ngFor` y `*ngSwitch` quedan **deprecados** a favor del control flow (`@if`, `@for`, `@switch`); hay migración (`ng g @angular/core:control-flow`). Zoneless pasa a estable (20.2). `@angular/build` sustituye a `@angular-devkit/build-angular` como builder recomendado. Requisitos mínimos de Node y TypeScript suben. |
| **21** | Las aplicaciones nuevas son **zoneless por defecto**. **Vitest** sustituye a Karma como runner por defecto (`@angular/build:unit-test`). Signal Forms (experimental) y Angular Aria (preview) aparecen como alternativas para formularios y patrones accesibles. |
| **22** | TypeScript **6.0**, Node `^22.22.3`, `^24.15.0` o `>=26`, zone.js `~0.15`/`~0.16`, `ng-packagr` 22. |

> El entorno donde se ha hecho este análisis tiene Node 22.22.0, que **no** cumple el `^22.22.3` que exige Angular 22: la primera tarea del port es fijar la versión de Node (`.nvmrc` y `engines`).

### Estrategia recomendada

1. **Primero la red de seguridad, después los errores, después el port.** Portar un código sin tests y con fugas de memoria mezcla dos tipos de regresión que luego no se pueden separar. Lo razonable es publicar una última **0.3.x sobre Angular 18** con los errores críticos corregidos y tests de comportamiento, y portar a partir de ahí.
2. **Saltos de una versión**: 18 → 19 → 20 → 21 → 22, con `ng update @angular/core@N @angular/cli@N`, y un commit por salto con el build y los tests en verde. En cada salto se ejecutan **solo** las migraciones obligatorias; las opcionales (señales, control flow) van en su propia tarea para que el diff de cada salto sea revisable.
3. **Builder y tests**: en el salto a 20, migrar `@angular-devkit/build-angular` a `@angular/build` (ng-packagr para la librería, `application` para la app de pruebas). En el salto a 21, migrar de Karma/Jasmine a Vitest (builder `@angular/build:unit-test`) con la migración que ofrezca el CLI en ese salto, y quitar `karma*` y `jasmine*`.
4. **Peer dependencies**: la librería publicada debe declarar como `peerDependencies` exactamente lo que importa: `@angular/core`, `@angular/common`, `@angular/forms`, `@angular/router` (hoy faltan los dos últimos y `rxjs`). El rango debe cubrir la versión mayor soportada (`^22.0.0`), y se debe decidir si se mantiene compatibilidad con más de una mayor.
5. **Zoneless como objetivo, no como efecto secundario.** La librería tiene que funcionar en una app con `provideZonelessChangeDetection()`. Eso exige el trabajo de R-09: que cada cambio de estado notifique a Angular (con señales, `AsyncPipe` o `ChangeDetectorRef.markForCheck()`) y nada de `setTimeout` para sincronizar. `OnPush` no es un requisito de zoneless, pero es un objetivo deseable aparte, porque reduce el trabajo de detección de cambios y obliga a que esas notificaciones estén bien hechas. La app de pruebas `ngx-monkey-ui-tests` debe pasar a zoneless para que lo demuestre.
6. **SCSS**: Sass ha deprecado `@import` y las funciones globales; el compilador de Angular 22 muestra avisos, y su eliminación está prevista para Dart Sass 3.0.0 (la 2.0.0 todavía las mantiene). Hay 22 `@import` en el repositorio que deben pasar a `@use`/`@forward`.

### Versionado

Lo que implica el port y la modernización rompe la API pública (inputs booleanos, nombres de outputs, `ControlValueAccessor` en lugar de `formGroup`/`name`, standalone). Se propone:

- `0.3.x`: Angular 18, solo correcciones.
- `0.4.0`: Angular 22 con la misma API (la migración automática + `standalone: false`), para que quien use la librería pueda actualizar Angular sin reescribir plantillas.
- `1.0.0`: API modernizada, documentada y con guía de migración desde 0.x.

---

## 6. Modernización de la API de la librería

- **Standalone.** Cada componente standalone con sus propios `imports`, y `NgxMonkeyUiModule` como fachada de compatibilidad (re-exporta los standalone) hasta la 1.0. Quita la mayor parte del boilerplate de `declarations`/`imports` en los specs, porque un componente standalone trae sus dependencias, pero no resuelve E-01 por sí solo: el import roto hay que corregirlo igualmente, y los tests seguirán necesitando proveedores como `Router`.
- **Señales.** `input()`, `input.required()`, `output()`, `model()` para `checked`/`selected`/`value`, `computed()` para la lista de clases en lugar de recalcularla imperativamente. `viewChild()` en lugar de `@ViewChild() any`.
- **`booleanAttribute`/`numberAttribute`** en todos los inputs booleanos y numéricos (R-02), que permite seguir escribiendo `<monkey-button flat>`.
- **`inject()`** en lugar de constructores, que además simplifica la herencia.
- **`host`** en el decorador en lugar de `[class]` repetido en cada elemento de la plantilla: las clases de variante y de tema van al host y el SCSS las lee con `:host(.type-flat)`.
- **Composición en lugar de herencia.** `Styleable` hace cuatro cosas distintas: variantes visuales, utilidades de layout (`flexWrap`, `sticky`…), estado `disabled` y maquetación global. Se propone separarlas: una directiva `hostDirectives` para variante y color, utilidades de layout como clases CSS que el consumidor aplica él mismo, y la maquetación global en un componente de layout (ver más abajo).
- **Layout explícito.** El ajuste de `<main>` y del menú lateral pasa a un componente `monkey-layout` (o `monkey-shell`) con slots `header`, `aside` y `main`, que resuelve la disposición con CSS Grid y `position: sticky`. Así desaparece todo el `document.querySelector` de `Styleable` (E-03) y el id global del aside (E-18).
- **Formularios con `ControlValueAccessor`** en `monkey-input-text`, `monkey-input-number`, `monkey-switch` y `monkey-checkbox` (R-04), compatibles con `formControlName`, `formControl`, `ngModel` y Signal Forms. Los mensajes de error se calculan del estado del control (`touched`, `dirty`, `errors`) y se pueden personalizar o traducir mediante un `InjectionToken`.
- **Servicios de overlay con API.** `MonkeyAlertService` y `MonkeyTooltipService` deberían crear su propio contenedor (con el CDK Overlay o `createComponent` + `ApplicationRef`) en lugar de depender de que la app pinte el componente (R-11). El tooltip, mejor como directiva (`monkeyTooltip="texto"`), con soporte de foco y no solo de ratón.
- **Navegación sin `Router` obligatorio.** `MonkeyMenu` y `MonkeyAsideMenu` aceptan `routerLink` en cada opción (usando `RouterLink` solo si existe) o emiten el evento y dejan navegar a la app (R-08).
- **Renombrados.** `style` → `color` (R-03); outputs sin prefijo `on` (`clicked`, `checkedChange`, `selectedChange`, `dismissed`…) (R-13); `InvalidFormMessageComponent` → `MonkeyInvalidFormMessage`; `MonkeyButtonData.type` → `color`.

---

## 7. Estilos y temas

- **El CSS de temas se repite en cada componente.** `_common.default.style.scss` hace `@import` de `components.themes` y `components.styles`, y casi todos los componentes lo incluyen en `styleUrls`. Cada uno de los ~25 componentes emite de nuevo todas las variables de los 9 colores para los dos temas.
- **Selectores universales.** `*:not(.dark-theme) { … }` y `*.dark-theme { … }` declaran decenas de variables CSS sobre **cada elemento** del componente. Por eso cada elemento de cada plantilla necesita `[class.dark-theme]="isDarkMode$ | async"` (50 `async` pipes en las plantillas de la librería). Las variables CSS se heredan: basta con declararlas una vez en `:root` (o en `[data-theme="dark"]` sobre `<html>`) y dejar que los componentes las lean.
- **Propuesta de tema:** `ThemeService` pone `data-theme` y `color-scheme` en `<html>` (vía `DOCUMENT`, sin tocarlo en SSR), persiste la elección, escucha `prefers-color-scheme` y expone una señal `isDarkMode`. Los tokens se escriben con `light-dark()`, soportado en todos los navegadores actuales.
- **Publicar los estilos.** `ng-package.json` no tiene `assets`, así que el SCSS de temas no llega a npm y el consumidor no puede personalizar la paleta salvo sobreescribiendo variables a ciegas. Se propone publicar un `styles/` con `_tokens.scss`, un `theme.css` precompilado y un mixin `monkey.theme((primary: …))`.
- **Erratas en la API de estilos.** `--*-contrast-hight` y `--*-opacity-hight` aparecen 218 veces en los SCSS (121 y 97 respectivamente): son nombres públicos, así que corregirlos (`high`) es un cambio de API que debe ir con alias durante una versión.
- **`!important`** aparece 36 veces en 13 archivos SCSS, sobre todo en las utilidades globales; con las clases en el host y la especificidad bajo control dejan de hacer falta.
- **`@import` → `@use`/`@forward`** (ver el port).
- **Iconos.** La librería depende de la fuente *Material Symbols Outlined* (`monkey-icon` usa la clase `material-symbols-outlined`) pero no la declara ni la carga: la app de pruebas la añade a mano en `index.html`. Hay que documentarlo o, mejor, permitir configurar el proveedor de iconos.
- **Fuentes de Google.** `MonkeyFontService` inyecta peticiones a `fonts.googleapis.com` y `fonts.gstatic.com`. Eso entrega la IP del visitante a un tercero sin consentimiento, lo que en la UE es un problema de RGPD (la sentencia del LG München de 2022 sobre Google Fonts es el precedente habitual). Se propone que la librería no cargue ninguna fuente por sí misma y documente cómo autoalojarlas, que es lo que ya hace `kevinrodriguez-home`.
- **Scrollbar.** `::-webkit-scrollbar` solo funciona en Chromium/WebKit; las propiedades estándar `scrollbar-color` y `scrollbar-width` funcionan en todos los navegadores actuales y se pueden poner en el tema sin JavaScript (E-10 desaparece).
- **Movimiento.** El fondo animado y las transiciones no respetan `prefers-reduced-motion`.

---

## 8. Accesibilidad

- `monkey-dropdown`: es un `<label>` con un botón dentro; no tiene `role="listbox"`/`option`, ni `aria-expanded`, ni teclado (flechas, Enter, Escape), ni cierre al pulsar fuera. Las opciones son `<div>` con `(click)`.
- `monkey-menu` (móvil) y `monkey-aside-menu`: el botón de abrir no tiene `aria-expanded`/`aria-controls`; el aside se abre con `mouseenter`, inaccesible con teclado y en táctil; en modo colapsado los botones pierden el texto y quedan solo con el icono, sin `aria-label`.
- `monkey-icon-button`: el texto alternativo solo existe como tooltip de ratón; necesita `aria-label`.
- `monkey-icon`: el icono es un texto (`"delete"`, `"visibility"`) que los lectores de pantalla leen en voz alta; debe ser `aria-hidden="true"` salvo que se le dé etiqueta.
- `monkey-switch`: el `<input>` no tiene nombre accesible ni `role="switch"`; los dos `<label>` laterales no están asociados (E-19).
- `monkey-input-*`: el `<label>` contiene iconos clicables y la lista de errores; los errores no se asocian con `aria-describedby` ni el campo se marca `aria-invalid`.
- `monkey-alert`: no tiene `role="alert"`/`aria-live`, así que un lector de pantalla no lo anuncia. Las acciones son botones de solo icono.
- `monkey-tooltip`: solo aparece con ratón y tras 2 s; no hay `role="tooltip"` ni `aria-describedby`, ni se puede descartar con Escape (WCAG 1.4.13).
- `monkey-image`/`monkey-avatar`: `alt` es opcional en la práctica y el avatar no lo pasa a la imagen.
- `monkey-login-page`: Enter global (E-07) interfiere con cualquier control enfocado.
- No hay estilos de `:focus-visible` comprobados en las variantes `ghost` y `glass`.

Angular Aria (Angular 21+) y el CDK (`@angular/cdk/a11y`, `overlay`, `listbox`, `menu`) resuelven buena parte de estos patrones y evitarían reimplementarlos.

---

## 9. Empaquetado, documentación y DX

- **`peerDependencies` incompletas**: faltan `@angular/forms`, `@angular/router` y `rxjs`, que la librería importa.
- **`sideEffects: false`** se refiere a los efectos al evaluar o importar un módulo, no a lo que hace un servicio al instanciarse, así que los accesos al DOM de los constructores no lo invalidan por sí solos. Lo que procede es verificar el tree shaking del paquete y buscar efectos de importación reales, no quitar la marca, que podría empeorarlo sin resolver nada.
- **Sin CI.** No hay `.github/workflows`: nada compila ni prueba un pull request, y la publicación en npm es manual (`README.md` raíz).
- **Sin lint.** No hay ESLint (`angular-eslint`) ni Prettier, aunque hay `.editorconfig`.
- **README raíz desactualizado** (habla de Angular CLI 16.1.4 y de `ng e2e`). El README de la librería no documenta ningún componente, input u output: "Detailed documentation in next versions…".
- **Sin `CHANGELOG`** ni tags de versión en git; las versiones 0.2.0, 0.3.0 y 0.3.1 se publicaron el mismo día sin cambios de código entre ellas.
- **`angular.json`** guarda un id de analíticas del CLI (`cli.analytics`), que es personal y no debería estar en el repositorio.
- **App de pruebas.** `ngx-monkey-ui-tests` usa `NgModule` y consume la librería desde `dist/`; sirve como catálogo, pero no está desplegada. Desplegarla (Vercel encaja bien para una SPA estática) daría una demo pública y un sitio donde comprobar cada versión.
- **Erratas en código** que acaban en la API: `addAditionalClasses`, `dimiss-btn`, `hight`.

---

## 10. Componentes que faltan

Se mantiene la lista de `SUGERENCIAS.md`, ordenada por lo que más se echa en falta para construir una aplicación real con la librería y con dependencias explícitas:

1. **Dialog/Modal** con overlay, focus trap y cierre con Escape (base para confirmaciones).
2. **Toast/Snackbar** con cola, que sustituya al uso de `monkey-alert` como notificación global.
3. **Tabs** y **Accordion**.
4. **Select** accesible (el dropdown actual no puede usarse en formularios).
5. **Textarea**, **Radio group** y **Slider** con `ControlValueAccessor`.
6. **Table** con ordenación y **Pagination**.
7. **Breadcrumbs**.
8. **Date picker** y **Time picker** (hoy `MonkeyInputNumberType` delega en los nativos).
9. **File upload** con arrastrar y soltar.
10. **Stepper/Wizard**.
11. **Skeleton** y **Empty state**.
12. **Badge**, **Chip** y **Progress bar**.
13. **Layout/Shell** (ver sección 6), que además es el que resuelve E-03.
