# Instrucciones para agentes

Reglas de trabajo en `ng-gorilla-ui` para cualquier agente de IA (Claude Code, Cursor, Codex, Copilot…). El detalle está en los documentos enlazados; esto es lo que no se puede saltar.

## Contexto

- `ngx-gorilla-ui` es una librería de componentes para Angular 22 que se rehace desde cero; `ngx-monkey-ui`, la anterior, está congelada en el tag `ngx-monkey-ui-legacy`.
- La hoja de ruta y el estado de cada punto están en [`docs/ROADMAP.md`](./docs/ROADMAP.md).
- Las premisas, los principios, las decisiones y el flujo de trabajo están en [`docs/PROPUESTA-NGX-GORILLA-UI.md`](./docs/PROPUESTA-NGX-GORILLA-UI.md).
- Los errores que no se pueden repetir están en [`docs/ERRORES-A-EVITAR.md`](./docs/ERRORES-A-EVITAR.md). Cada plan cita los identificadores `E-xx` y `R-xx` que cubre.

## Idioma

- Público, en inglés: código, comentarios, JSDoc, `README.md`, `CHANGELOG.md`, `CONTRIBUTING.md`, la documentación del catálogo, los mensajes de commit y las pull requests.
- Interno, en español: `docs/` (roadmap, propuesta y checklist de errores), este archivo y los planes de `.agents/plans`.

## Premisas

Un cambio que no las cumple no se mergea (sección 3 de la propuesta):

1. **Accesibilidad comprobada:** contraste AA en cada variante y tema; `prefers-color-scheme`, `prefers-reduced-motion`, `prefers-reduced-transparency`, `prefers-contrast` y `forced-colors` respetados; teclado y lector de pantalla.
2. **Tokens sobreescribibles:** todo valor visual es una variable CSS; estilos en `@layer gorilla` con selectores `:where()`; cada componente expone sus propias variables.
3. **Sin cambios abruptos:** todo cambio visual tiene transición o animación con tokens de movimiento, salvo con `prefers-reduced-motion: reduce`.
4. **Rendimiento:** CSS antes que JavaScript, `OnPush`, señales, zoneless, un entry point por componente con límite de tamaño, y animaciones sobre `transform` y `opacity`.

## Flujo de ramas

1. Nunca se trabaja en `main` ni en `release/*` directamente.
2. Cada versión tiene su rama `release/<versión>` creada desde `main`.
3. Cada implementación va en una rama creada desde la `release/<versión>` en curso y termina con una pull request hacia esa `release/<versión>`, no hacia `main`.
4. Al terminar todo lo de una versión, se abre una pull request desde `release/<versión>` hacia `main`. Al mergearla, el workflow de release publica la versión en npm. Ese workflow todavía no existe (punto 0.8 del roadmap): hasta entonces no se publica nada automáticamente.
5. Antes de mergear una `release/<versión>` en `main`: la versión de `projects/ngx-gorilla-ui/package.json` y la primera sección de `CHANGELOG.md` coinciden con la del nombre de la rama.

## Definición de terminado

Un componente o cambio está terminado cuando:

- Cumple las cuatro premisas y revisa las secciones de `docs/ERRORES-A-EVITAR.md` que le aplican.
- Tiene tests de comportamiento (Vitest en navegador) y pasa axe en los dos temas.
- Su página de documentación en `ngx-gorilla-ui-catalog` está creada o actualizada en la misma pull request: guía de uso, API, tokens, ejemplos en vivo y notas de accesibilidad.
- `CHANGELOG.md` tiene la entrada en la sección de la versión en curso.
- Su sub-punto está marcado en `docs/ROADMAP.md`.
- Pasan `npm run lint`, `npm run format:check`, los tests, el build y el límite de tamaño.
