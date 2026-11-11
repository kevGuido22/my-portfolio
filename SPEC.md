# SPEC.md — Especificación Visual y Técnica

**Proyecto:** Portfolio profesional de Kevin Guido (Software Engineer)
**Versión:** 2.0 — Nueva dirección visual (futurista-editorial monocromática)
**Estado:** PENDIENTE DE REVISIÓN HUMANA
**Fecha:** 2026-11-10

---

## 1. Objetivo y alcance

Transformar la identidad visual del portfolio desde el tema oscuro con gradientes
púrpura/azul y glassmorphism hacia una identidad **futurista, formal, minimalista y
editorial**, con paleta monocromática, composición Bento Grid y navegación por
secciones tipo diapositivas.

**En alcance:**
- Sistema de design tokens monocromático centralizado.
- Restyling completo de todos los componentes existentes (sin reescritura funcional).
- Sistema de navegación tipo diapositivas (scroll snap + indicador lateral).
- Tratamiento monocromático de imágenes.
- Accesibilidad y responsive.
- Limpieza de bugs y código muerto conocido.

**Fuera de alcance (ver §16):** cambio de framework, migración a Tailwind v4,
webfonts nuevas, nuevas secciones de contenido, migración completa a `astro:assets`.

---

## 2. Dirección visual

### Principios

1. **Futurista pero formal** — precisión técnica, no efectos de demostración.
2. **Editorial** — jerarquía tipográfica fuerte, composición intencional, aire.
3. **Monocromático estricto** — cero color de acento; el contraste estructural
   (claro/oscuro, escala, densidad) reemplaza al contraste cromático.
4. **Bento Grid con intención** — cada sección tiene composición propia; no todas
   las secciones son tarjetas idénticas.
5. **Diapositivas, no scroll hijacking** — la página se siente como una
   presentación, pero el usuario conserva el control del scroll.
6. **"Alive, not animated"** — animaciones discretas con propósito.

### Debe transmitir

Futurismo, elegancia, profesionalismo, minimalismo, precisión, sofisticación técnica.

### Debe evitar

Apariencia genérica, glassmorphism dominante, gradientes decorativos, colores
saturados, animaciones infinitas, elementos decorativos sin propósito, scroll
hijacking, overflow horizontal.

---

## 3. Fundamento en referencias

Análisis por muestreo de píxeles (metodología documentada en la sesión de
Discovery, 2026-11-10):

| Hallazgo | Referencia 1 | Referencia 2 |
|---|---|---|
| Tema | Claro | Claro |
| Fondo | `#E3E3E3`, `#EFF3FF` | `#E3EAF0` (tinte frío) |
| Oscuros | `#030303`, `#323232` | `#1D1E22`, `#000000` |
| Medios | `#494949`, `#B5B5B5` | `#BABFC5`, `#737476` |
| Saturación real | 0% | 0% (absoluta) |
| Estructura | Bento claro, bloques rectangulares | Página vertical con **banda oscura** al ~50% de altura |

**Conclusiones de diseño derivadas:**
- La paleta de tokens (§4) proviene directamente de la Referencia 1.
- La Referencia 2 aporta dos patrones adicionales: una **sección/superficie oscura
  de contraste** dentro de una página clara, y la variante de grises con tinte
  frío sutil (documentada como alternativa, no adoptada por defecto).
- Ambas referencias son estrictamente acromáticas → sin color de acento.

---

## 4. Sistema de color — Design Tokens

Fuente única de verdad en `:root`. Tailwind mapea a `var()`; **prohibido el uso de
valores hex/rgba dispersos en componentes**.

```css
:root {
  /* Identidad */
  --color-background: #E3E3E4;
  --color-surface: #FFFFFF;
  --color-primary: #030303;
  --color-secondary: #494949;
  --color-dark-surface: #323232;

  /* Semánticos */
  --color-text-primary: var(--color-primary);
  --color-text-secondary: var(--color-secondary);
  --color-text-on-dark: var(--color-surface);
  --color-text-on-dark-secondary: #C8C8C8;
  --color-border: rgba(3, 3, 3, 0.12);
  --color-border-on-dark: rgba(255, 255, 255, 0.16);
  --color-border-strong: rgba(3, 3, 3, 0.32);

  /* Formas */
  --radius-card: 4px;
  --radius-chip: 999px;

  /* Layout */
  --container-max: 72rem; /* 1152px */
  --section-min-height: 100svh;
}
```

### Contraste (validado WCAG)

| Combinación | Ratio | Resultado |
|---|---|---|
| `--color-text-primary` sobre background | ~16:1 | AAA |
| `--color-text-secondary` sobre background | ~7.0:1 | AA / AAA |
| `--color-text-on-dark` sobre dark surface | ~12.8:1 | AAA |
| `--color-text-secondary` sobre surface | ~9:1 | AAA |

### Reglas

- Fondos, superficies, textos y bordes solo mediante tokens.
- La superficie oscura (`--color-dark-surface`) se usa en: la sección Experience
  (momento de contraste, §8.2) y elementos puntuales (indicador activo, hover
  invertido). No como tema general.
- `selection`: fondo primary, texto surface.
- Sin sombras de color; elevación mediante bordes hairline y contraste tonal,
  no mediante glow ni blur.

---

## 5. Tipografía

**Webfont única:** Red Hat Display (300–900 + itálicas), ya integrada — se conserva.
Se pospone el análisis de reemplazo tipográfico (decisión del usuario, 2026-11-10).

**Mono para labels técnicos:** stack de sistema (`ui-monospace, SFMono-Regular,
Menlo, Consolas, monospace`) — sin webfont nueva, sin dependencia.

### Jerarquía editorial

| Nivel | Tratamiento |
|---|---|
| Display (hero) | `clamp(2.75rem, 8vw, 6.5rem)`, weight 700, line-height ≤1.05, tracking ajustado |
| Título de sección | `clamp(2rem, 4vw, 3.5rem)`, weight 600–700 |
| Label técnico | Mono, `0.75rem`, uppercase, `letter-spacing: 0.1em`, color secondary |
| Body | `1rem–1.125rem`, weight 400, line-height 1.6–1.7 |
| Caption/meta | `0.875rem`, color secondary |

**Patrón de cabecera de sección:** índice numerado en mono (`01` … `05`) alineado
con el indicador de diapositivas + título grande. Refuerza la lectura de
"presentación" y la jerarquía editorial.

---

## 6. Layout y composición

- **Container:** `max-width: var(--container-max)` con gutters responsivos.
- **Grid base:** 12 columnas en desktop para composiciones Bento; 2 columnas en
  tablet (640–1023px); flujo vertical simple en móvil (<640px).
- **Bordes:** hairline `1px solid var(--color-border)` como lenguaje principal de
  separación (las referencias muestran grises claros como separadores).
- **Radios:** `--radius-card: 4px` (casi-affilado, editorial). Punto de validación
  visual — ajustable desde el token sin tocar componentes.
- **Cada sección define su propia composición** (§8). No repetir el mismo patrón
  de tarjeta en todas.
- **Espaciado:** escala de Tailwind (base 4px). Generoso en márgenes de sección;
  denso dentro de composiciones bento.

---

## 7. Navegación y sistema de diapositivas

### Scroll Snap (mecanismo principal)

- Implementación con CSS Scroll Snap nativo sobre el documento:
  `html { scroll-snap-type: y mandatory; }` con `section { scroll-snap-align: start; }`.
- **`mandatory`** (cambio aprobado por el usuario, 2026-11-10, tras feedback de la
  Fase 2): garantiza aislamiento total por diapositiva — cada gesto de scroll
  termina en un límite de sección. Es comportamiento nativo del navegador, no
  intercepción de eventos de rueda (AGENTS.md §11 se respeta).
- `scroll-snap-stop: always` en las secciones (≥1024px): un gesto de scroll
  avanza exactamente una diapositiva; un flick fuerte no puede saltarse
  secciones completas.
- **Secciones más altas que el viewport** (Projects, Experience): el navegador
  permite scroll libre dentro de un área de snap sobredimensionada y ajusta
  al salir de ella; no queda atrapado.
- `scroll-margin-top` igual a la altura del navbar: los puntos de snap y los
  saltos de ancla coinciden (la sección aterriza justo bajo el navbar); el
  desbordamiento del slide anterior queda oculto exactamente detrás del navbar
  opaco. La primera diapositiva usa altura completa del viewport (su snap se
  recorta al inicio del documento).
- Activo solo en **desktop ≥1024px** (media query). En móvil/tablet: scroll
  natural (prioridad: legibilidad y desplazamiento natural — AGENTS.md §11).
- Secciones: `min-height: 100svh − navbar` en desktop para la lectura
  de diapositiva; en móvil altura natural según contenido.
- `prefers-reduced-motion`: se desactivan `scroll-behavior: smooth` y el snap.

### Indicador lateral (derecha)

- Visible solo ≥1024px; fijo, centrado verticalmente, en el borde derecho.
- Un botón por sección (`<button>` con `aria-label="Ir a X"`), estado activo con
  `aria-current="true"`.
- Estado activo: tick alargado (transición de `transform`, sin cambio de layout).
- Opcional: contador mono `01 — 05` junto al indicador (validación visual).
- Implementación: `IntersectionObserver` nativo en `<script>` de Astro. Sin
  dependencias.

### Barra de navegación superior

- Desktop: barra fija minimal — marca texto a la izquierda (nombre corto o
  iniciales), links a la derecha. Fondo `--color-background` con borde hairline
  inferior; sin backdrop-blur, sin glassmorphism.
- Links con `glow` sustituido por transición de subrayado/color (0.2s).
- El anchor navigation nativo (`#id`) se conserva para teclado y lectores de
  pantalla.

### Menú móvil (conservado + rediseñado)

- Se conserva el patrón overlay con React + Zustand (decisión del usuario).
- Correcciones de accesibilidad obligatorias: `BtnMenu` pasa de `div` a
  `<button aria-expanded>` (44px de área táctil), `Escape` cierra y devuelve el
  foco al botón, **trap de foco** (Tab/Shift+Tab) mientras está abierto, lock de
  scroll del documento, focus states visibles.
- Concepto visual (rediseño aprobado por el usuario, 2026-11-10, tras bug de
  pintado en Fase 2): **diapositiva editorial oscura** a pantalla completa.
  - Fondo `--color-primary`, texto on-dark; sin blur ni glow.
  - Apertura con wipe `clip-path` desde el borde derecho (donde está el toggle).
  - Barra de marca mono uppercase alineada con el botón de cierre + hairline.
  - Links grandes con índices mono `01`–`05` y separadores hairline; entrada
    escalonada (opacity + translateY, ~60ms de offset, reduced-motion safe).
  - Fila inferior de contacto en mono uppercase con hairline superior y
    `safe-area-inset-bottom` para dispositivos con notch.
  - Capa `z-40`: por encima de todo el contenido (las secciones posicionadas
    pintaban encima del overlay con z-index auto); el toggle queda a `z-50`.
- Fix de contenido: el link del CV pasa de `/public/Resume.pdf` (roto) a `/CV.pdf`.

---

## 8. Secciones

Orden y set actuales (decisión del usuario): **Home → Experience → Projects →
Skills → About Me** + Footer. Idioma: **inglés**. Sin contenido nuevo.

### 8.1 Home / Hero — `01` — fondo claro, composición futurista en capas

Dirección revisada por el usuario (2026-11-10, sustituye el split editorial
inicial): hero futurista "fluido e integrado" por apilamiento de capas,
con las tres técnicas identificadas en las referencias.

- **Capa 0 — grid técnico:** hairlines verticales 1px (borde del contenedor +
  divisiones internas; 2 columnas en móvil, 4 en desktop) como retícula técnica
  sutil.
- **Capa 0 — tipografía de fondo:** "SOFTWARE" / "DEVELOPER" en dos líneas
  apiladas y centradas (uppercase, `clamp(4rem, 17vw, 15rem)`, line-height
  0.9, opacity ~10%) — llena ~98–100% del ancho de pantalla y se recorta en
  los bordes de la sección (bleed intencional, nunca scroll horizontal:
  `overflow-hidden`). Decisión del usuario: tamaño a sangre + palabras
  centradas (2026-11-10).
- **Capa 1 — retrato cutout:** PNG con transparencia (`public/images/Profile.png`,
  720×1280, sujeto apoyado en el borde inferior y zona transparente superior).
  Escala de grises, se apoya en la línea de base de la diapositiva y se solapa
  con la columna de texto (`-ml`, `self-end`); la tipografía de fondo se ve a
  través de la zona transparente del recorte.
- **Capa 2 — primer plano:** nombre en display headline
  (`clamp(2.75rem, 8vw, 6.5rem)`, weight 700, line-height ≤1.05) con margen
  negativo hacia la columna del retrato para cruzarse por delante del cutout
  (z-20 sobre z-10).
- **Micro-elementos HUD (aria-hidden, decorativos):** fila superior mono
  (`01 / HERO` · `SYSTEM.ONLINE` con dot) y fila inferior (`SCROLL ↓` ·
  `K. GUIDO`), 10px uppercase tracking amplio, color secondary.
- **Links como cápsulas:** GitHub / LinkedIn / Resume en pills hairline
  (`rounded-chip`, mono uppercase, icono 16px) con inversión en hover
  (fondo primary, texto on-dark).
- Altura completa; responsive: móvil apila en flujo (nombre → pills → retrato
  centrado, máxima legibilidad); solapamiento texto-retrato solo ≥640px.
- Iconos de marca sólidos y monocromos (`GithubIcon` normalizado a la marca
  sólida — reuso del SVG del hero; alinea con LinkedIn/Resume en menú y hero).

### 8.2 Experience — `02` — **sección oscura** (momento de contraste)

- Fondo `--color-dark-surface`, texto `--color-text-on-dark` — la banda oscura
  de la Referencia 2 aplicada como slide de contraste a mitad de la presentación.
- Timeline vertical conservada (semántica `<ol>` actual).
- Cada entrada: índice/fechas en mono (`--color-text-on-dark-secondary`),
  empresa como título, descripción en gris claro.
- Roles extraídos del texto existente ("Frontend Developer Intern",
  "Full Stack Developer") — re-presentación, no invención.
- Punto de validación visual: si el contraste no funciona, revertir a fondo
  claro sin cambiar la estructura.

### 8.3 Projects — `03` — fondo claro, Bento Grid protagonista

- Grid de 12 columnas: 2 proyectos destacados en tiles grandes (7/5 columnas),
  2 proyectos secundarios en tiles medianos (6/6).
- Cards reutilizadas (`Card`/`HorizontalCard`) con Props API intacta, restiladas:
  hairline borders, sin `span-1..4` ni glow, títulos con jerarquía editorial.
- Tags como chips mono (`--radius-chip`, hairline border, texto secondary).
- Botones de acción (Website/GitHub) minimal: borde 1px, hover invertido
  (fondo primary, texto background), sin relleno violeta.

### 8.4 Skills — `04` — fondo claro, lista índice editorial

- Alternativa deliberada al bento de Projects: **lista tipo índice** — filas con
  hairline border-bottom, icono pequeño en escala de grises + nombre de
  tecnología, hover sutil (background surface).
- Distingue la sección de Projects (composición propia por sección).
- Punto de validación visual: alternativa aceptada = grid de tiles pequeños.

### 8.5 About Me — `05` — fondo claro

- Split editorial espejo del hero: foto (grises, hairline border) + dos párrafos
  existentes.
- Intro con label técnico mono (`ABOUT` o similar, en inglés).

### 8.6 Footer

- Hairline border-top, copyright existente, label mono con año. Minimal.

---

## 9. Imágenes

- **Fotos y capturas: escala de grises** (decisión del usuario). Tratamiento
  CSS (`filter: grayscale(1)`) — reversible por imagen sin tocar assets.
- Iconos de tecnología (PNG con color de marca): `filter: grayscale(1)` para
  mantener la disciplina monocromática. Reversible por token/clase.
- Todas las `<img>` con atributos `width`/`height` (anti-CLS).
- `loading="lazy"` en imágenes bajo el fold; `fetchpriority="high"` en la del
  hero.
- Optimización de assets (`astro:assets`, conversión de `img3.jpg`): mejora
  posterior opcional, no bloqueante (§16).

---

## 10. Animaciones

**Permitidas:** opacity, transform, scale, translate, transiciones de border y
color. Duraciones 0.15–0.4s. Easing estándar (`ease`, `cubic-bezier` suave).

**Casos:**
- **Reveal de contenido de sección** (ampliado a pedido del usuario, 2026-11-10):
  mismo lenguaje de movimiento que el menú móvil — fade + translateY 12px,
  420ms, `cubic-bezier(0.32, 0.72, 0, 1)`, escalonado ~60ms por bloque dentro
  de cada sección. Disparado por IntersectionObserver sobre cada `section[id]`
  (banda central del viewport): el contenido entra cuando la sección la ocupa
  y sale cuando la deja — fluidez al navegar entre diapositivas, no una sola
  vez. Marcado explícito con `data-reveal`; **mejora progresiva**: el estado
  oculto solo existe con JS disponible (`html.js-reveal` se añade en `<head>`),
  sin JS el contenido siempre es visible. Funciona con secciones más altas que
  el viewport.
- Transición de estado activo del indicador lateral (transform).
- Hover states: subrayado de links, inversión de botones, background de filas.
- `@media (prefers-reduced-motion: reduce)`: sin animaciones, sin smooth scroll,
  sin snap. Contenido visible por defecto (duraciones y delays de transición
  se anulan).

**Eliminadas (identidad anterior):** `glow-hover` (text/drop-shadow), `shine`
infinito en skill cards, bordes luminosos animados `span-1..4`, blur dominante.

---

## 11. Responsive

| Breakpoint | Comportamiento |
|---|---|
| **Desktop ≥1024px** | Bento 12 col, snap activo, indicador lateral visible, navbar superior completa, secciones 100svh |
| **Tablet 640–1023px** | Bento reduce a 2 col, sin snap, sin indicador, navbar superior visible, alturas naturales |
| **Mobile <640px** | Flujo vertical, overlay menu (restilado), tipografía display con `clamp`, sin snap, sin indicador |

**Verificaciones obligatorias por breakpoint:** navegación, hero, bento de
Projects, lista de Skills, tipografía, imágenes, espaciado. **Overflow horizontal
prohibido** en cualquier viewport ≥320px.

---

## 12. Accesibilidad

- HTML semántico conservado/strengthened: `<header>`, `<main>`, `<section>`,
  `<nav>`, `<ol>`, `<footer>`.
- Navegación por teclado: anclas nativas + botones del indicador focusables.
- Focus states visibles (`outline: 2px solid var(--color-primary)`, offset 2px).
- `aria-current` en indicador; `aria-expanded` en menú móvil.
- Contraste AA mínimo garantizado por tokens (§4).
- `alt` text descriptivo (corregir `alt=""` de la foto de perfil).
- La experiencia de diapositivas nunca impide el acceso al contenido: sin snap
  en móvil, contenido nunca oculto tras overlays no cerrables.
- `prefers-reduced-motion` respetado en todas las animaciones y transiciones.

---

## 13. Contenido

- Idioma: **inglés** (decisión del usuario).
- **No se inventa contenido** (AGENTS.md §15). Se usa exclusivamente el
  existente; se permite mejorar redacción/presentación sin cambiar significado.
- **Contenido de Experience:** el usuario actualizará fechas y descripciones
  personalmente más adelante (decisión 2026-11-10). Hasta entonces se presenta
  el texto existente sin cambios.
- Fixes de contenido existente: typo "LinkdIn" → "LinkedIn", link del CV en
  sidebar.

---

## 14. Rendimiento

- Rendering estático (sin cambios).
- JS cliente mínimo: solo menú móvil (React/Zustand existentes) + script ligero
  del indicador (IntersectionObserver nativo).
- Sin dependencias nuevas.
- Google Analytics (gtag) se preserva tal cual.
- Anti-CLS y lazy loading según §9.

---

## 15. Limpieza técnica incluida

Justificada por Discovery (código muerto / bugs introducidos por la identidad
anterior):

- Eliminación de `NavBar.astro` (duplicado legacy, importado sin renderizar).
- Eliminación de `console.log(tags)` en `HorizontalCard.astro`.
- Corrección de clases Tailwind inválidas (`sp-8`, `bg-main`, `h-min-[50rem]`,
  `bg-white-200`).
- Reemplazo de todos los estilos globales de `index.astro` (gradiente púrpura,
  glows, glassmorphism, keyframes de bordes animados) por el sistema de tokens.
- `favicon.svg`: mantener (posible restyling en validación visual).

---

## 16. Fuera de alcance

- Upgrade de Astro 4 → 5, migración Tailwind 3 → 4.
- Migración completa a `astro:assets`.
- Webfonts nuevas (mono o reemplazo de Red Hat Display).
- Eliminación de React/Zustand del menú móvil.
- Nuevas secciones (Contact, Education) o nuevo contenido profesional.

Cualquiera de estos puntos puede reevaluarse en fases posteriores con aprobación
explícita.

---

## 17. Decisiones resueltas (registro)

1. **URL de producción** — el proyecto trabaja en **local** por ahora (decisión
   del usuario, 2026-11-10). No se configura `site` en `astro.config.mjs` ni meta
   tags OG en esta iteración; tarea futura cuando exista dominio.
2. **Contenido de Experience** — el usuario actualizará fechas/descripciones él
   mismo más adelante. La implementación presenta el texto existente sin cambios.
3. **Housekeeping git** — aprobado (2026-11-10): pnpm como gestor único,
   `package-lock.json` eliminado del repo y bloqueado en `.gitignore`;
   `pnpm-lock.yaml`, `pnpm-workspace.yaml`, `AGENTS.md` y `SPEC.md` versionados.
4. **Orden móvil del hero** — texto primero (label → headline → links), foto
   después a ancho completo (Fase 3): la jerarquía editorial manda en móvil; el
   orden anterior (foto circular primero) pertenecía a la composición previa.
5. **`GithubIcon` normalizado** (Fase 3): de trazo fino a marca sólida — misma
   marca que ya usaba el hero inline. Unifica el set de iconos sociales
   (GitHub/LinkedIn/Resume sólidos) en menú móvil, hero y cards de proyectos;
   resuelve el mismatch anotado en la Fase 2. `WebIcon` (utilidad) permanece de
   trazo; se revisa en Fase 5.
6. **Hero: dirección futurista en capas** (usuario, 2026-11-10) — sustituye el
   split editorial de la Fase 3. Técnicas tomadas de las referencias:
   solapamiento, tipografía como fondo y cutout del sujeto, más micro-elementos
   HUD (grid técnico de hairlines, labels mono de esquina, links en cápsulas).
   Asset nuevo: `public/images/Profile.png` (cutout con transparencia, aportado
   por el usuario). `Profile.png` sustituye a `profile.webp` en el hero;
   `profile.webp` se conserva en el repo hasta decidir si se usa en About Me.
7. **Lenguaje HUD extensivo a todas las secciones** (usuario, 2026-11-10) — la
   dirección "fluida y solapada" del hero (capas, tipografía de fondo,
   solapamientos, micro-elementos de interfaz futurista) se aplica también al
   diseño de las secciones restantes en las Fases 4–7 (Experience, Projects,
   Skills, About), adaptada al contenido y función de cada una — sin replicar
   literalmente la composición del hero ni uniformar las secciones (SPEC §6:
   cada sección conserva composición propia).

### Puntos de validación visual (se resuelven en implementación)

- Radio de tarjeta (`--radius-card: 4px`) — ajustar token si se percibe blando.
- Experience como sección oscura — revertir a claro si no convence.
- Skills como lista índice vs grid de tiles.
- Contador `01 — 05` junto al indicador lateral.
- Variante tinte frío (Referencia 2) — probar sobre tokens si el neutro se
  percibe plano.

---

## 18. Criterios de aceptación

**Identidad:**
- [ ] Todos los colores provienen de tokens; `grep` no encuentra hex/rgba
      fuera de la definición de tokens y favicon.
- [ ] Cero glassmorphism (`backdrop-filter` solo permitido si se justifica y
      documenta; por defecto: ninguno).
- [ ] Cero animaciones infinitas.
- [ ] Fotos e iconos renderizan en escala de grises.

**Navegación tipo diapositivas:**
- [ ] Snap `proximity` activo solo ≥1024px; scroll natural en móvil.
- [ ] Indicador lateral funcional: clic navega, estado activo con
      `aria-current`.
- [ ] Sección más alta que viewport (Projects) navegable sin trampas de scroll.
- [ ] Teclado: anclas e indicador operables; focus visible.
- [ ] `prefers-reduced-motion` desactiva snap, smooth scroll y animaciones.

**Calidad técnica:**
- [ ] `pnpm build` PASS (incluye `astro check`).
- [ ] Sin `console.log`, sin clases inválidas, links correctos (`/CV.pdf`).
- [ ] Sin overflow horizontal en 320px, 768px, 1024px, 1440px.
- [ ] Imágenes con `width`/`height`; lazy bajo el fold.
- [ ] GA operativo.
- [ ] Contenido intacto (sin invención).

**Visual (inspección humana):**
- [ ] Comparación contra referencias y §2.
- [ ] Ritmo claro/oscuro: Hero claro → Experience oscuro → cierre claro.
- [ ] Jerarquía editorial legible en cada breakpoint.
