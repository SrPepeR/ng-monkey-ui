# Sugerencias para NgxMonkeyUi

## Resumen
Revisión rápida del código de la librería (componentes, bases y servicios) con foco en errores potenciales, mejoras técnicas, accesibilidad y elementos funcionales que podrían añadirse.

## Errores y riesgos detectados (recomendados para corregir pronto)
- **Suscripciones duplicadas y sin liberar**: `Styleable` se suscribe a `screenChanges$` en `ngOnInit` y vuelve a suscribirse en `ngOnChanges` sin `unsubscribe` (`projects/ngx-monkey-ui/src/lib/bases/styleable.base.ts`). Esto puede generar fugas de memoria y múltiples ejecuciones.
- **Uso de DOM global en base común**: `Styleable` manipula `document.querySelector('main')`, `.aside-menu` y otros elementos globales (`styleable.base.ts`). Esto impacta a *todos* los componentes y rompe SSR/Angular Universal.
- **Clases CSS aplicadas como array**: `ComponentsStylesService` devuelve `Array<string>`, pero los templates usan `[class]="classList"` (ej. `button.component.html`, `list.component.html`, `menu.component.html`). Esto convierte el array en una cadena con comas y puede reemplazar clases estáticas.
- **Mensaje “required” invertido**: En `MonkeyInput` el mensaje de requerido se agrega cuando el valor **no** está vacío (`input.base.ts`, case `required`). El mensaje nunca aparece cuando debería.
- **Duplicidad de eventos en switch**: El `label` y el `input` del switch disparan `onSwitched()`; un click puede invertir el estado dos veces (`switch.component.html`).
- **IDs fijos en checkbox**: `checkbox.component.html` usa `id="checkbox"` y `name="checkbox"` para todos los casos, generando IDs duplicados en el DOM.
- **Alt y tooltips no conectados**: `MonkeyMenu` crea `Tooltipable` pero no hay eventos `mouseover/mouseout` en el template; además `alt` no es `@Input` (`menu.component.ts`).
- **Gestión de fuentes con IDs inconsistentes**: `removeOtherFonts` busca `monkey-font-` en `link.href` cuando el ID está en `link.id` (`font.service.ts`). Esto impide limpiar fuentes anteriores.
- **Entorno no browser**: `ThemeService`, `MonkeyScreenService`, `MonkeyFontService`, `Tooltip` y `Styleable` usan `window/document/localStorage/screen` sin `isPlatformBrowser` (`theme.service.ts`, `screen.service.ts`, `font.service.ts`, `tooltip.ts`, `styleable.base.ts`). Fallará en SSR, tests o prerender.
- **Posición del tooltip en borde 0**: `Tooltip.setDirection` ignora coordenadas cuando `x` o `y` son `0` (`tooltip.ts`), lo que rompe tooltips en los bordes de la pantalla.

## Mejoras técnicas y de mantenimiento
- **Inputs booleanos como string**: Hay muchos `@Input()` que esperan `'true'/'false'` (`Styleable`, `MonkeyList`, `MonkeyDropdown`, etc.). Sugerencia: usar boolean real con `@Input({ transform: booleanAttribute })` y eliminar `check()` basado en strings.
- **Evitar `AfterViewChecked` para sincronizar estado**: `MonkeySwitch` y `MonkeyCheckbox` sincronizan el estado en cada ciclo (`AfterViewChecked`). Mejor implementar `ControlValueAccessor` y usar `[checked]`/`(change)`.
- **No mezclar `ngModelChange` con reactive forms**: `MonkeyInput` usa `formControlName` junto a `ngModelChange`. Sustituir por `(input)` o `valueChanges` del `FormControl`.
- **Separar responsabilidades del base**: `Styleable` hace trabajo de layout global (main/aside). Sería mejor moverlo a un servicio/directiva específica o a componentes de layout.
- **Inyección de servicios en lugar de `new`**: `Styleable` crea `ComponentsStylesService` y `MonkeyScreenService` con `new`, ignorando el DI de Angular. Esto dificulta testeo y configuración.
- **Consistencia en nombres de outputs**: algunos outputs usan `onClick`, otros `optionSelected`, etc. Se puede estandarizar (ej. `clicked`, `selectedChange`) para reducir fricción.

## Accesibilidad (A11y)
- Agregar `aria-label`, `aria-expanded`, `role="button"` y manejo de teclado en botones custom (`monkey-button`, `monkey-icon-button`, `dropdown`, `menu`).
- En inputs y switch/checkbox, asegurarse de que `label` esté asociado con `for` + `id` únicos.
- Iconos decorativos deberían tener `aria-hidden="true"` para no saturar lectores de pantalla.

## UX / Producto
- Incluir estados `loading`, `disabled` y `aria-busy` uniformes en componentes interactivos.
- Añadir soporte para `size` (sm/md/lg) y variantes consistentes entre botones, inputs y listas.
- Definir tokens de diseño (spacing, radius, fonts, shadows) en un único lugar y documentarlos.

## Documentación y DX
- Completar la documentación de componentes (inputs/outputs/examples) en el README de la librería o una documentación dedicada.
- Añadir un catálogo de componentes (Storybook o una app demo) con ejemplos y parámetros.
- Documentar el sistema de estilos (`MonkeyStyle`, variantes brutallist/flat/ghost/glass/glow).

## Testing
- No hay pruebas unitarias visibles para componentes/servicios. Sugerencia: empezar por:
  - Servicios (`ThemeService`, `MonkeyAlertService`, `MonkeyTooltipService`).
  - Componentes base (`Styleable`, `MonkeyInput`) con casos clave.
  - Componentes interactivos (`Dropdown`, `Switch`, `Checkbox`).

## Componentes/elementos a añadir
- **Modal/Dialog** con overlay y focus trap.
- **Toast/Notification** no bloqueante.
- **Tabs** y **Accordion**.
- **Table/Data grid** con sorting/paging básico.
- **Pagination**.
- **Breadcrumbs**.
- **Date picker** y **Time picker**.
- **File upload** con drag & drop.
- **Stepper/Wizard**.
- **Skeleton loader** y estados vacíos.

