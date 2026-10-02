# Changelog

Cambios de `ngx-monkey-ui`. Los identificadores `E-xx` remiten a [`ANALISIS.md`](./ANALISIS.md) y los números de punto, a [`ROADMAP.md`](./ROADMAP.md).

## 0.3.2 (sin publicar)

Corrección de los errores funcionales del punto 13 sobre Angular 18, sin cambiar el nombre ni el tipo de ningún input, output o método público. Cada corrección viene con un test que fallaba antes de ella.

La publicación queda pendiente. El roadmap la sitúa en el 14.6, junto con los errores críticos de `Styleable` (E-02 a E-05). La [propuesta de `ngx-gorilla-ui`](./PROPUESTA-NGX-GORILLA-UI.md) plantea, en cambio, cerrar esta versión como tag `ngx-monkey-ui-legacy` sin publicarla.

### Correcciones

- **Formularios**
  - `MonkeyInput`: el mensaje "This field is required" aparece cuando el campo está vacío; antes solo se intentaba añadir cuando tenía valor, así que no salía nunca (E-06).
  - `MonkeyInput`: los mensajes de validación se recalculan con cualquier cambio del control (`setValue()`, `reset()`, `markAllAsTouched()`...), no solo al escribir (E-23).
  - `MonkeyInputNumber`: con `inputType="number"` el control recibe un `number` (o `null` si está vacío); con `tel`, `date`, `datetime-local` y `time` conserva el texto. La rueda usa el evento estándar `wheel` y solo actúa con `inputType="number"` y el campo enfocado (E-15).
  - `MonkeyCheckbox` y `MonkeySwitch`: cada instancia tiene un id propio y los `<label>` apuntan a su `<input>` (E-19).
  - `MonkeyLoginPage`: las acciones usan las etiquetas e iconos recibidos y se actualizan si cambian; Enter solo actúa dentro del formulario y ya no queda un listener global tras destruir la página (E-07).
- **Componentes**
  - `MonkeyImage`: el placeholder solo vuelve a aparecer cuando cambia `src` y se quita si la imagen falla al cargar; `title` toma el valor de `alt` cuando no se indica (E-08, E-09).
  - `MonkeyScrollbar`: aplica los colores recibidos, reutiliza un único `<style>` y deja de escuchar el tema al destruirse (E-10).
  - `MonkeyMenu`: `alt` es un input y se muestra como tooltip sobre el título (E-12).
  - `MonkeyHeader` y `MonkeyIcon`: aplican las clases de `Styleable` que ya aceptaban (E-14).
  - `MonkeyAsideMenu`: cada instancia redimensiona su propio contenido y no falla con `data` vacío (E-18).
  - `Styleable`: `isDisabledComponent` vuelve a `false` al habilitar un componente (E-22).
  - `MonkeyIconButton` y `MonkeyAlert`: reaccionan al output del botón interior, no a cualquier clic en su host; `MonkeyIconButton` pasa `disabled` a su botón (E-24).
- **Servicios**
  - `ThemeService`: guarda la elección en `localStorage` y, mientras el usuario no elija, sigue los cambios de `prefers-color-scheme` (E-11).
  - `MonkeyFontService`: no duplica `<link>` ni `<style>`, quita las fuentes anteriores al usar otra, `remove*Font()` borra también el `<style>`, y Red Hat Display carga con `display=swap` (E-16).
  - `MonkeyBackgroundService`: colores siempre de seis dígitos, la animación incluye todos los fotogramas, posiciones y tamaños entre 0 y 100, y `remove()` para también la animación (E-17).
  - `MonkeyTooltipService` y `Tooltip`: aceptan la coordenada 0 y usan coordenadas de viewport; se elimina el código muerto `onHide()` (E-20, E-21).
  - `MonkeyScreenService.unlockOrientation()`: devuelve una promesa de verdad, rechazada si `unlock()` lanza (E-25).

### Cambios de comportamiento a tener en cuenta

- `MonkeyInputNumber` con `inputType="number"` escribe un `number` en el control en lugar de un `string`.
- Los mensajes de validación solo se muestran cuando el campo está modificado o tocado.
- `MonkeyTooltip` se posiciona con `position: fixed` (coordenadas de viewport) en lugar de `position: absolute`.
- Los `<label>` laterales de `MonkeySwitch` activan el switch a través de su `for`, en lugar de con un `(click)` propio.
- `MonkeyFontService`: el `<link>` de una fuente tiene id `monkey-font-<Nombre>-link`; el `<style>` conserva `monkey-font-<Nombre>`.

### Sin cambios

- E-13 (`MonkeyTooltip` hereda de `Styleable` sin usarlo) se aplaza al 17.8.
- E-02 a E-05 (`Styleable` y `ComponentsStylesService`) siguen abiertos; les corresponde el punto 14.

### App de pruebas

- La página de componentes es un catálogo con todos los componentes de la librería en cada variante, con un filtro por variante.
