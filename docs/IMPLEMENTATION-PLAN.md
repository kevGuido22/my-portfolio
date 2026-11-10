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

---

## Fase 3 — Home / Hero

```text
Phase:
    Fase 3 — Hero editorial

Objective:
    Composición editorial del hero según SPEC §8.1: split asimétrico, label
    técnico mono, display headline con clamp, links monocromos y foto en
    tarjeta hairline.

Components:
    - src/components/Header.astro

Files:
    - Header.astro (único)

Changes:
    - Grid 2 columnas asimétrico: texto izquierda, foto derecha (espejo del
      About actual).
    - Label técnico "SOFTWARE DEVELOPER" en mono uppercase tracking amplio.
    - Nombre completo como display headline: clamp(2.75rem, 8vw, 6.5rem),
      weight 700, line-height ≤1.05.
    - Links GitHub/LinkedIn/Resume: iconos currentColor + hover subrayado;
      typo "LinkdIn" → "LinkedIn" si quedara.
    - Foto: escala de grises (filter), width/height explícitos anti-CLS,
      fetchpriority="high", alt descriptivo real (no ""), tarjeta con
      hairline border.
    - Estado actual de la sección (id="home" implícito en top) coherente con
      el indicador de Fase 2.

Dependencies:
    Fase 1 (tokens) y Fase 2 (estructura de sección).

Responsive:
    - Desktop: split 2 col con foto derecha.
    - Tablet: 2 col o stack según inspección (foto tras el texto).
    - Móvil: stack vertical, headline con clamp, foto full-width del contenedor.

Acceptance criteria:
    - Headline no desborda en 320px (sin overflow horizontal).
    - Foto en escala de grises con dimensiones explícitas.
    - Focus visible en los 3 links; target/_blank con rel donde aplique.
    - GA intacto; sin JS adicional.

Validation:
    pnpm build → PASS; inspección visual desktop/tablet/mobile.
```

---

## Fase 4 — Experience — sección oscura

```text
Phase:
    Fase 4 — Experience como diapositiva oscura de contraste

Objective:
    Aplicar el momento de contraste del SPEC §8.2: sección con fondo
    --color-dark-surface y texto on-dark, conservando la semántica <ol> y el
    contenido existente intacto.

Components:
    - src/components/Experience.astro

Files:
    - Experience.astro (único)

Changes:
    - Fondo sección: --color-dark-surface (full-bleed dentro de la slide).
    - Cabecera de sección sobre oscuro: índice "02" mono + título en
      --color-text-on-dark.
    - Timeline <ol> conservada: fechas en mono
      (--color-text-on-dark-secondary), empresa como título on-dark,
      descripción en gris claro, separadores hairline on-dark.
    - Roles presentados como labels ("Frontend Developer Intern", "Full Stack
      Developer") extraídos del texto existente.
    - Contenido textual: SIN CAMBIOS (el usuario actualizará fechas él mismo).
    - Eliminar restos de clases dark: del Experience actual si quedaran tras
      Fase 1.

Dependencies:
    Fases 1 y 2.

Responsive:
    - Desktop: slide completa con timeline centrada.
    - Tablet/Móvil: altura natural, padding vertical generoso.

Acceptance criteria:
    - Contraste on-dark AA/AAA según tokens (SPEC §4).
    - Contenido idéntico al actual (diff de texto = vacío).
    - Punto de validación visual SPEC §17: si la sección oscura no convence,
      revertir a fondo claro con la misma estructura (decisión con el usuario).

Validation:
    pnpm build → PASS; inspección visual del ritmo claro→oscuro→claro.
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
    - Grid 12 col: proyectos destacados (microservices, Spotify) en tiles
      grandes ~7/5; Suru Frontend y Backend en tiles medianos 6/6.
    - Card/HorizontalCard: Props API INTACTA (title, img, description, tags,
      web, gitHub); estilos nuevos: hairline borders, sin glow/spans, título
      con jerarquía editorial, imagen superior con grayscale.
    - Tag: chip mono con --radius-chip, hairline border, texto secondary.
    - MainButton: borde 1px hairline, hover invertido (fondo primary, texto
      background), transición 0.2s; reemplaza relleno violeta.
    - HorizontalCard: eliminar console.log(tags) y h-min-[50rem] si quedara.
    - Imágenes de proyectos: grayscale, width/height, loading="lazy".
    - Descripciones existentes intactas.

Dependencies:
    Fases 1 y 2.

Responsive:
    - Desktop: bento 12 col (7/5 + 6/6).
    - Tablet: 2 columnas iguales.
    - Móvil: 1 columna, tiles apilados.

Acceptance criteria:
    - Las 4 cards renderizan con la misma API de props (sin cambios de
      llamada en Projects.astro salvo layout del grid).
    - Sin console.log; sin clases inválidas.
    - Sin overflow horizontal con 4 cards en 320px.
    - Tags como chips uniformes; botones operativos (links correctos).

Validation:
    pnpm build → PASS; inspección visual del bento en 3 breakpoints.
```

---

## Fase 6 — Skills — lista índice

```text
Phase:
    Fase 6 — Skills como índice editorial

Objective:
    Composición alternativa deliberada al bento (SPEC §8.4): lista tipo
    índice con filas hairline, en lugar de grid de tarjetas.

Components:
    - src/components/Skills.astro
    - src/components/SkillCard.astro (refactor a fila) o sustitución por
      SkillRow.astro (nuevo) reutilizando la info existente.

Files:
    - Skills.astro, SkillCard.astro (o SkillRow.astro nuevo).

Changes:
    - Filas: icono pequeño en grayscale + nombre tecnología + hairline
      border-bottom; hover con background surface.
    - Conservar las 13 tecnologías actuales exactas (sin añadir/quitar).
    - Iconos: filter grayscale(1), width/height explícitos, alt existente.
    - Punto de validación visual SPEC §17: si la lista no convence, la
      alternativa aceptada es grid de tiles pequeños.

Dependencies:
    Fases 1 y 2.

Responsive:
    - Desktop: lista en columna(s) según cantidad (1–2 columnas de filas).
    - Tablet/Móvil: una columna de filas full-width.

Acceptance criteria:
    - Las 13 tecnologías presentes, nombres exactos actuales.
    - Sin cards con blur/shine; hover sutil.
    - Sin overflow horizontal.

Validation:
    pnpm build → PASS; inspección visual.
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
