# docs/IMPLEMENTATION-PLAN.md — Plan de Implementación

**Proyecto:** Portfolio rebranding v2 — identidad futurista-editorial monocromática
**Basado en:** SPEC.md v2.0 (decisiones resueltas 2026-11-10)
**Gestor de paquetes:** pnpm (exclusivo — npm/yarn prohibidos)
**Estado:** PENDIENTE DE APROBACIÓN HUMANA

---

## Estrategia general

- **REUSE → REFACTOR → EXTEND → REPLACE**: se conservan Props APIs, semántica,
  contenido, integración GA, menú móvil (React + Zustand) y stack completo.
  Solo se reemplaza la capa visual.
- **Fases independientes y verificables**: cada fase termina en estado
  buildable (`pnpm build` PASS) y visualmente inspeccionable (`pnpm dev`).
- **Estado intermedio conocido**: entre la Fase 1 (cambio de paleta) y las fases
  de sección (3–7), el sitio mostrará composiciones antiguas sobre la nueva
  paleta. Es esperado y aceptado; cada fase cierra su propio scope.
- **Sin dependencias nuevas**: todo se resuelve con CSS, Astro y JS nativo.
- **Cada fase es un paquete de instrucciones autocontenido**, transferible a
  Qwen Local según la división Cloud/Local de AGENTS.md §19.

## Flujo por fase

```text
IMPLEMENT → BUILD → CHECK → VISUAL INSPECTION → FIX → APPROVE → NEXT PHASE
```

Comandos de validación estándar por fase:

```bash
pnpm build    # incluye astro check
pnpm dev      # inspección visual en local
```

No existen scripts de lint ni tests en `package.json`; la validación técnica es
build + astro check + inspección visual + auditoría responsive manual.

## Mapa de fases

| Fase | Nombre | Depende de |
|---|---|---|
| 0 | Housekeeping git | — (EJECUTADA) |
| 1 | Sistema de diseño: tokens + reset de identidad | 0 |
| 2 | Navegación tipo diapositivas | 1 |
| 3 | Home / Hero | 2 |
| 4 | Experience — sección oscura | 2 |
| 5 | Projects — Bento Grid | 2 |
| 6 | Skills — lista índice | 2 |
| 7 | About Me + Footer | 2 |
| 8 | Validación final integral | 3, 4, 5, 6, 7 |

Las fases 3–7 son **independientes entre sí** (solo dependen de la 2) y pueden
ejecutarse en cualquier orden o en paralelo si se trabaja con worktrees.

---

## Fase 0 — Housekeeping git ✅ (ejecutada 2026-11-10)

```text
Objective:
    Alinear el repo con la regla pnpm-only (AGENTS.md §17).

Changes executed:
    - Eliminado package-lock.json (git rm + .gitignore).
    - Trackeados pnpm-lock.yaml y pnpm-workspace.yaml.
    - Commit: "chore: drop npm lockfile and track pnpm config files".

Validation:
    git status limpio; pnpm-lock.yaml en el índice.
```

---

## Fase 1 — Sistema de diseño: Design Tokens y reset de identidad

```text
Phase:
    Fase 1 — Sistema de diseño

Objective:
    Establecer la capa de tokens monocromáticos como fuente única de verdad,
    eliminar por completo los estilos de la identidad anterior (gradiente
    púrpura, glows, glassmorphism, animaciones infinitas, spans luminosos) y
    dejar toda la página legible en la nueva paleta mediante remapeo mecánico
    de clases de color.

Components:
    Ninguno nuevo. Infraestructura de estilos global.

Files:
    - src/styles/global.css (NUEVO)
    - src/layouts/Layout.astro
    - tailwind.config.mjs
    - src/pages/index.astro
    - src/components/Header.astro
    - src/components/Experience.astro
    - src/components/Projects.astro
    - src/components/Card.astro
    - src/components/HorizontalCard.astro
    - src/components/Skills.astro
    - src/components/SkillCard.astro
    - src/components/Tag.astro
    - src/components/MainButton.astro
    - src/components/AboutMe.astro
    - src/components/Footer.astro
    - src/components/NavBar.jsx
    - src/components/SideBar.jsx
    - src/icons/icons.jsx
    - src/components/NavBar.astro (ELIMINAR — dead code)

Changes:
    - global.css: tokens del SPEC §4 (:root), estilos base (fondo, selección,
      focus-visible, prefers-reduced-motion global), utilidades de layout
      (container), sin keyframes infinitos.
    - Layout.astro: import de global.css; meta description real derivada del
      contenido existente; title "Kevin Guido — Software Developer".
      GA (gtag) se conserva intacto.
    - tailwind.config.mjs: mapear colores/radii a var() (--color-*,
      --radius-*); eliminar header-gradient, dark-custom, tag.
    - index.astro: eliminar el bloque <style is:global> completo (gradiente,
      glow-hover, shine, span-1..4, bg-card, bg-tag, keyframes); eliminar
      import de NavBar.astro sin uso.
    - Remap mecánico en todos los componentes:
        text-white → text-primary | text-secondary según rol
        text-gray-300 / text-slate-300 → text-secondary
        bg-white/5, bg-black/10, bg-tag → bg-surface
        bordes gray-100/40 etc. → border-token hairline
        bg-violet-900/20 (MainButton) → fondo transparente + borde hairline
        eliminar backdrop-blur/backdrop-filter
        eliminar spans decorativos span-1..4 y div.shine
    - Clases Tailwind inválidas corregidas: sp-8, bg-main, h-min-[50rem],
      bg-white-200.
    - icons.jsx: stroke/fill "white" → "currentColor" (los iconos heredan el
      color del texto).

Dependencies:
    Ninguna. CSS + Tailwind 3 existente.

Responsive:
    El remap no altera layouts, solo color/borde/blur. Verificar legibilidad
    básica en móvil, tablet y desktop.

Acceptance criteria:
    - :root contiene todos los tokens del SPEC §4, valores exactos.
    - grep: cero hex/rgba en componentes (solo en global.css y favicon.svg).
    - grep: cero backdrop-filter, cero glow-hover, cero shine, cero span-1..4,
      cero animaciones infinitas (@keyframes + infinite).
    - grep: cero sp-8, bg-main, h-min-, bg-white-200, color-red-500*.
    - NavBar.astro eliminado; index.astro sin import muerto.
    - Todos los iconos renderizan con currentColor.
    - Contenido textual intacto (sin invención).

Validation:
    pnpm build (con astro check) → PASS
    pnpm dev → inspección visual: paleta clara monocromática en todas las
    secciones, sin restos púrpura, sin glass, texto legible.
```

*`color-red-500` vive en BtnMenu.jsx y se elimina en Fase 2 (nav); se lista aquí
como conocimiento, no como criterio de esta fase.*

---

## Fase 2 — Navegación tipo diapositivas

```text
Phase:
    Fase 2 — Sistema de navegación y estructura de presentación

Objective:
    Implementar la experiencia de presentación: scroll snap proximity en
    desktop, indicador lateral accesible, navbar superior restilada, menú
    móvil restilado con correcciones de accesibilidad, y el patrón de cabecera
    de sección (índice mono 01–05 + título editorial) en las 5 secciones.

Components:
    - src/components/SectionIndicator.astro (NUEVO)
    - src/components/NavBar.jsx (restyle)
    - src/components/BtnMenu.jsx (a11y + restyle)
    - src/components/SideBar.jsx (restyle + fixes de contenido)
    - src/components/Header.astro (wrapper sección)
    - src/components/Experience.astro (wrapper + cabecera)
    - src/components/Projects.astro (wrapper + cabecera)
    - src/components/Skills.astro (wrapper + cabecera)
    - src/components/AboutMe.astro (wrapper + cabecera)
    - src/pages/index.astro (montaje del indicador)

Files:
    Los mismos componentes + src/styles/global.css (reglas de snap).

Changes:
    - global.css: scroll-snap-type: y mandatory SOLO ≥1024px
      (media query, aprobado por el usuario tras feedback de la fase);
      scroll-snap-stop: always (un gesto de scroll = una diapositiva);
      scroll-behavior: smooth con excepción
      prefers-reduced-motion.
    - Secciones: min-height 100svh−navbar en ≥1024px, scroll-snap-align: start,
      scroll-margin-top igual al navbar (puntos de snap = aterrizaje de anclas);
      en móvil altura natural.
    - SectionIndicator.astro: fijo al borde derecho (solo ≥1024px), botones
      con aria-label="Ir a X", estado activo con aria-current="true", tick
      activo con transición transform; IntersectionObserver en <script>
      Astro nativo (sin React, sin hidratación extra). Opcional contador mono
      "01 — 05" (punto de validación visual SPEC §17).
    - NavBar.jsx: fondo --color-background sólido, hairline border-bottom,
      sin blur; marca texto izquierda + links derecha; hover con transición de
      subrayado/color; eliminar clase bg-dark-custom/20.
    - BtnMenu.jsx: div → <button> con aria-expanded y aria-controls; eliminar
      clase inválida color-red-500; focus-visible.
    - SideBar.jsx: overlay --color-primary, tipografía editorial, sin blur;
      fix link CV: /public/Resume.pdf → /CV.pdf; typo "LinkdIn" → "LinkedIn";
      cierre con Escape; links cierran menú (ya lo hacen via closeMenu).
    - Patrón de cabecera aplicado a las 5 secciones: label mono con índice
      ("01" … "05") + título de sección según SPEC §5. En esta fase la
      cabecera se implanta con la estructura actual del interior intacta.

Dependencies:
    CSS nativo + IntersectionObserver. Sin librerías.

Responsive:
    - ≥1024px: snap activo, indicador visible, navbar completa.
    - 640–1023px: sin snap, sin indicador, navbar superior.
    - <640px: overlay menu, scroll natural, sin snap.

Acceptance criteria:
    - Clic en cada punto del indicador navega a su sección.
    - Navegación por teclado: tab llega a navbar, indicador y links; focus
      visible en todos.
    - aria-current refleja la sección visible al hacer scroll.
    - Projects (sección alta) se recorre sin quedar atrapado.
    - Escape cierra el menú móvil; aria-expanded correcto; foco visible.
    - prefers-reduced-motion: sin snap ni smooth scroll (verificado con
      emulación).
    - Los 5 botones del indicador tienen aria-label descriptivo.

Validation:
    pnpm build → PASS
    pnpm dev → inspección visual: snap suave en desktop, indicador funcional,
    menú móvil correcto, cabeceras 01–05 presentes.
```

### Extensiones post-feedback de la Fase 2 (2026-11-10, aprobadas por el usuario)

Cambios aplicados tras la inspección visual del usuario; documentados en
SPEC §7 y §10:

```text
1. Snap mandatory + scroll-snap-stop: always (aislamiento total de slide).
2. Fix de apilamiento del menú móvil (z-40) + rediseño editorial oscuro
   (wipe clip-path, índices mono, hairlines, trap de foco, scroll lock).
3. Reveal de contenido de sección: atributo data-reveal en los bloques de
   las 5 secciones + IntersectionObserver por sección (index.astro) +
   gate html.js-reveal (Layout.astro) + CSS en global.css.
   Las fases 3–7 deben conservar/refinar el marcado data-reveal al
   rediseñar cada sección.
```

---

## Fase 3 — Home / Hero

```text
Phase:
    Fase 3 — Hero futurista en capas (dirección revisada por el usuario)

Objective:
    Composición futurista "fluida e integrada" según SPEC §8.1 (revisado):
    solapamiento de capas, tipografía gigante como fondo, cutout del sujeto y
    micro-elementos HUD. Sustituye el split editorial inicial.

Components:
    - src/components/Header.astro
    - src/icons/icons.jsx (normalización de GithubIcon)

Files:
    - Header.astro
    - icons.jsx
    - Projects.astro (fix de overflow preexistente detectado en la validación)

Changes:
    - Capa 0: grid técnico de hairlines (2 columnas móvil, 4 desktop) y
      tipografía "SOFTWARE DEVELOPER" gigante (clamp 3.5rem–10rem, opacity
      10%) con bleed recortado por overflow-hidden.
    - Capa 1: cutout Profile.png (720×1280, alpha) en grises, apoyado en la
      línea de base y solapado con la columna de texto (self-end, -ml).
    - Capa 2: nombre como display headline (clamp 2.75rem–6.5rem), z-20,
      con margen negativo (sm:-mr-16) que lo cruza por delante del cutout.
    - HUD decorativo aria-hidden: "01 / HERO" · "SYSTEM.ONLINE" arriba;
      "SCROLL ↓" · "K. GUIDO" abajo; mono 10px uppercase tracking amplio.
    - Links GitHub/LinkedIn/Resume como pills hairline (rounded-chip, mono
      uppercase, icono 16px) con inversión en hover (bg primary / texto
      on-dark). rel="noopener noreferrer" en los tres.
    - Foto: width/height explícitos, fetchpriority="high", alt descriptivo,
      grayscale vía CSS.
    - GithubIcon: de trazo fino a marca sólida (unifica el set social).
    - Projects.astro: minmax(350px, 1fr) → minmax(min(350px, 100%), 1fr)
      para eliminar overflow horizontal < 382px (bug preexistente).

Dependencies:
    Fase 1 (tokens) y Fase 2 (estructura de sección).

Responsive:
    - Desktop/tablet (≥640px): split con solapamiento nombre-cutout; cutout
      alineado a la base de la diapositiva.
    - Móvil (<640px): stack en flujo (nombre → pills → cutout centrado
      max-w 13rem); sin solapamiento para preservar legibilidad.
    - Sin overflow horizontal en 320px (verificado con CDP).

Acceptance criteria:
    - Headline no desborda en 320px; scrollWidth == clientWidth.
    - Cutout en escala de grises con dimensiones explícitas y sin CLS.
    - Focus visible en los 3 links; target="_blank" con rel.
    - HUD decorativo no interfiere con lectores de pantalla (aria-hidden).
    - GA intacto; sin JS adicional.

Validation:
    pnpm build → PASS; pnpm exec astro check → 0 errores; batería CDP
    (320/375/768/1024/1440: overflow, solapamiento, hover, snap, menú,
    reveal, reduced-motion); inspección visual desktop/tablet/mobile.
```

---

## Fase 4 — Experience — sección oscura

```text
Phase:
    Fase 4 — Experience como diapositiva oscura de contraste

Objective:
    Aplicar el momento de contraste del SPEC §8.2: sección con fondo
    --color-dark-surface y texto on-dark, extendiendo el lenguaje HUD del
    hero (decisión SPEC §17.7) a la primera sección de contenido, conservando
    la semántica <ol> y el contenido profesional intacto.

Components:
    - src/components/Experience.astro
    - src/components/SectionHeading.astro
    - src/components/SectionIndicator.astro
    - src/components/BtnMenu.jsx

Files:
    - Experience.astro (slide oscura completa)
    - SectionHeading.astro (prop tone: light | dark)
    - SectionIndicator.astro (awareness de data-theme="dark")
    - BtnMenu.jsx (cromática pill para contraste sobre oscuro)
    - SPEC.md §7/§8.2 (documentación)

Changes:
    - Fondo sección: --color-dark-surface full-bleed; data-theme="dark".
    - Capas HUD como el hero, adaptadas: grid técnico de hairlines
      on-dark, wordmark "EXPERIENCE" de fondo (on-dark 8%, bleed,
      clamp(4rem,15vw,13rem)), filas HUD en esquinas (02 / Experience,
      estado Timeline, Scroll ↓, K. Guido).
    - SectionHeading: prop tone="dark" → índice/hairline/título on-dark.
      Fix preexistente: bg-primary/10 no compila en Tailwind 3.4 con
      colores var(); se sustituye por bg-primary opacity-10 (el hairline
      de la cabecera era invisible desde la Fase 3).
    - Timeline <ol> conservada: rail border-on-dark, nodos h-2 w-2 con
      ring dark-surface (máscara sobre el rail), roles como kicker mono
      extraídos del texto ("Frontend Developer Intern", "Full Stack
      Developer"), empresa como título on-dark, fechas y descripción en
      on-dark-secondary.
    - Contenido textual profesional: SIN CAMBIOS (el usuario actualizará
      fechas él mismo).
    - SectionIndicator: clase .on-dark cuando la sección activa lleva
      data-theme="dark" (mismo IntersectionObserver).
    - BtnMenu: pill rounded-chip con border — cerrado bg-surface /
      text-primary, abierto bg-primary / border-on-dark — legible sobre
      cualquier slide sin JS de detección de tema.

Dependencies:
    Fases 1–3 (tokens, reveal, lenguaje HUD del hero).

Responsive:
    - Desktop (≥1024px): slide completa (min-height calc(100svh − 4rem)),
      timeline centrada verticalmente, HUD en las esquinas de la slide.
    - Tablet/móvil (<1024px): altura natural, HUD arriba y abajo del
      contenido enmarcado con padding pt-16/pt-8.

Acceptance criteria:
    - Contraste on-dark AA/AAA según tokens (SPEC §4).
    - Contenido profesional idéntico (h3/time/p byte-identical).
    - Indicador lateral y BtnMenu legibles sobre la slide oscura.
    - Cero overflow horizontal en 320px.
    - Punto de validación visual SPEC §17: si la sección oscura no convence,
      revertir a fondo claro con la misma estructura (decisión con el usuario).

Validation:
    pnpm build → PASS; astro check → PASS; batería CDP (fondo, HUD, wordmark,
    indicador on-dark, BtnMenu, contraste, contenido, overflow, snap, reveal,
    reduced-motion); inspección visual del ritmo claro→oscuro→claro.
```

---

## Fase 5 — Projects — Bento Grid

```text
Phase:
    Fase 5 — Projects con composición Bento

Objective:
    Implementar el bento grid protagonista del SPEC §8.3 con los primitivos
    existentes reutilizados y restilados.

Components:
    - src/components/Projects.astro
    - src/components/Card.astro
    - src/components/HorizontalCard.astro
    - src/components/Tag.astro
    - src/components/MainButton.astro

Files:
    - Los 5 componentes anteriores.

Changes:
    - Slide HUD clara espejo de Experience: grid técnico de hairlines, HUD de
      esquinas (03 / Projects · Selected work / Scroll ↓ · K. Guido) y wordmark
      PROJECTS (primary 10%) centrado detrás del bento (asoma por los gaps).
    - Grid 12 col: microservices tile horizontal destacado 7 col (split
      interno imagen/texto solo en lg); Spotify tile vertical 5 col (Card);
      Suru Frontend y Backend tiles 6/6 (Card) — decisión SPEC §17 #8.
    - Card/HorizontalCard: Props API intacta más width/height opcionales
      (anti-CLS); estilos nuevos: hairline borders, hover border-strong,
      título con jerarquía editorial, mt-auto para anclar acciones al fondo,
      imagen grayscale + loading="lazy" + decoding="async".
    - Tag: chip mono con --radius-chip, hairline border, texto secondary.
    - MainButton: cápsula mono (mismo lenguaje que las pills del hero),
      borde hairline, hover invertido (fondo primary, texto surface),
      target="_blank" rel="noopener noreferrer".
    - WebIcon: permanece de trazo (icono de utilidad vs marcas sólidas);
      se limpian nodos de espacio sobrantes del JSX (SPEC §17 #8).
    - HorizontalCard: console.log y h-min ya no existían (verificado).
    - Descripciones existentes intactas.

Dependencies:
    Fases 1, 2 y 4 (sistema reveal, slide HUD, SectionHeading tone).

Responsive:
    - Desktop: bento 12 col (7/5 + 6/6), tiles de igual altura por fila.
    - Tablet: 2 columnas iguales; tile destacado apilado (imagen arriba).
    - Móvil: 1 columna, tiles apilados con imagen arriba.

Acceptance criteria:
    - Las 4 cards renderizan con la misma API de props (llamadas en
      Projects.astro solo añaden layout del grid y width/height).
    - Sin console.log; sin clases inválidas.
    - Sin overflow horizontal con 4 cards en 320px.
    - Tags como chips uniformes; botones operativos (links correctos,
      abren en pestaña nueva con noopener).
    - Contenido profesional byte-identical (títulos, descripciones, tags,
      URLs).

Validation:
    pnpm build → PASS; inspección visual del bento en 3 breakpoints.
```

---

## Fase 6 — Skills — vitrina de runas coleccionables

```text
Phase:
    Fase 6 — Skills como vitrina de runas (rev. 2 tras feedback del
    usuario: el índice editorial era demasiado simple y las skills muy
    pequeñas)

Objective:
    Las 13 tecnologías como runas coleccionables futuristas (SPEC §8.4):
    tiles biselados con trazado de borde incompleto que se completa e
    invierte en hover, más un filtro Frontend/Backend debajo de la
    vitrina.

Components:
    - src/components/Skills.astro (vitrina + filtro + script nativo)
    - src/components/SkillCard.astro (refactor a runa, mismo nombre de
      archivo)

Files:
    - Skills.astro, SkillCard.astro.

Changes:
    - Slide HUD clara espejo de las demás: grid técnico de hairlines, HUD de
      esquinas (04 / Skills · Runes / 13 / Scroll ↓ · K. Guido) y wordmark
      SKILLS (primary 10%) detrás de la vitrina (runas transparentes en
      reposo).
    - Runa: tile cuadrado biselado (clip-path, gap de borde deliberado en
      el bisel) + brackets de esquina como trazado parcial; serial mono,
      micro-tag FE/BE, glifo grayscale grande (44px, alt vacío junto al
      nombre visible, lazy/async, width/height reales).
    - Hover = targeting: los brackets de esquina visibles se extienden y
      oscurecen a primary; placa/glifo/textos sin cambios (rev. 3 por
      feedback — la inversión a oscuro perjudicaba algunos logos).
    - Vitrina: flex-wrap centrado; 7 por fila en desktop (13 = 7+6),
      fluido a 2 por fila en móvil (w-[calc(50%-6px)] → sm:w-32).
    - Filtro Frontend/Backend debajo de la vitrina: pills mono con
      aria-pressed (activa = relleno primary); JS nativo sin dependencias
      oculta las no coincidentes con hidden (fuera del árbol a11y);
      readout 07 / 13 con aria-live polite; fade de entrada al filtrar
      gateado por data-touched (instantáneo con reduced-motion).
    - Clasificación (usuario): Frontend = HTML, CSS, JavaScript,
      Typescript, React, SASS, TailwindCSS (7); Backend = PHP, Laravel,
      MySQL, Java, SpringBoot, Docker (6).
    - Conservar las 13 tecnologías exactas (orden y textos); Figma
      comentado se conserva (al descomentarlo, renumerar seriales).
    - La vitrina se revela como un solo bloque; 5 data-reveals en la
      sección (HUD, heading, vitrina, filtro, HUD).

Dependencies:
    Fases 1, 2 y 4 (sistema reveal, slide HUD).

Responsive:
    - Desktop: 7 runas por fila (2 filas: 7+6); filtrado = 1 fila.
    - Tablet: 4–5 por fila; Móvil: 2 por fila fluido.

Acceptance criteria:
    - Las 13 tecnologías presentes, nombres exactos actuales (orden y
      textos idénticos; Figma sigue comentado).
    - Runas con trazado parcial en reposo (brackets) y targeting en hover
      (brackets extendidos a primary, sin cambio de placa/glifo).
    - Filtro: oculta exactamente las no coincidentes (hidden), aria-pressed
      correcto, readout 07/13–06/13–13/13, teclado y aria-live.
    - Sin overflow horizontal; reduced-motion instantáneo.

Validation:
    pnpm build → astro check → probe CDP Fase 6 (runas, hover, filtro,
    teclado) → batería de regresión → inspección visual.
```

---

## Fase 7 — About Me + Footer

```text
Phase:
    Fase 7 — About y Footer de cierre

Objective:
    Completar la presentación: split editorial espejo del hero (SPEC §8.5) y
    footer minimal (§8.6).

Components:
    - src/components/AboutMe.astro
    - src/components/Footer.astro

Files:
    - AboutMe.astro, Footer.astro.

Changes:
    - About: foto grayscale con hairline border + width/height + alt; dos
      párrafos existentes intactos; label mono de cabecera "05" ya implantado
      en Fase 2; alineación editorial.
    - Footer: hairline border-top, copyright existente, label mono con año
      en estilo secundario.
    - Enlace a CV accesible desde footer si procede (usa /CV.pdf).

Dependencies:
    Fases 1 y 2.

Responsive:
    - Desktop: split 2 col (texto/foto).
    - Móvil: stack.

Acceptance criteria:
    - Texto de About idéntico al existente.
    - Footer sin dependencias de layout de otras secciones.

Validation:
    pnpm build → PASS; inspección visual.
```

---

## Fase 8 — Validación final integral

```text
Phase:
    Fase 8 — Auditoría final y criterios de aceptación

Objective:
    Verificar el cumplimiento completo del SPEC §18 (identidad, navegación,
    calidad técnica, visual) sobre el resultado conjunto.

Components:
    Todos (solo lectura + fixes puntuales si la auditoría falla).

Files:
    Los necesarios para fixes puntuales documentados.

Checks:
    - grep: cero hex/rgba fuera de global.css/favicon; cero backdrop-filter;
      cero animaciones infinitas; cero console.log; cero clases inválidas.
    - pnpm build → PASS (astro check incluido).
    - Responsive manual: 320px, 768px, 1024px, 1440px — sin overflow
      horizontal en ninguno.
    - Teclado: recorrido completo de tabulación; focus visible; indicador
      operable; menú móvil abre/cierra con Escape.
    - prefers-reduced-motion emulado: sin snap, sin smooth, contenido visible.
    - Imágenes: todas con width/height; lazy bajo el fold; grayscale aplicado.
    - GA operativo (script presente en head).
    - Contenido: diff contra original — solo presentacional, sin invención.
    - Inspección visual final contra referencias y SPEC §2/§8.

Validation:
    Reporte final según plantilla AGENTS.md §25 con estado por criterio de
    aceptación del SPEC §18.
```

---

## Riesgos conocidos del plan

| Riesgo | Mitigación |
|---|---|
| Estado intermedio poco presentable entre Fases 1 y 3–7 | Aceptado; cada fase cierra su scope y es buildable |
| Sección oscura de Experience no convence | Punto de validación SPEC §17 con reversión estructural idéntica |
| Skills como lista no convence | Alternativa tiles aceptada en SPEC §17 |
| Snap interferiría con secciones largas | `proximity` + solo ≥1024px; verificación explícita con Projects en Fase 8 |
| Íconos de marca pierdan identidad al grisar | Reversible por clase (grayscale es CSS, no asset) |
| `title`/meta nuevos | Derivados del contenido existente, sin invención |

## Cambios que NO se harán (fuera de alcance — SPEC §16)

Upgrade Astro/Tailwind, `astro:assets`, webfonts nuevas, eliminar React/Zustand
del menú, nuevas secciones o contenido, dominio/OG tags.
