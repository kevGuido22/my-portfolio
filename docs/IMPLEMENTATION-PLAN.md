# Implementation Plan — Rebranding del Portfolio

> **Fuente de referencia durante toda la implementación.**
> Basado en `SPEC.md`, `AGENTS.md`, y el análisis de Discovery completado.
> Metodología: **Spec-Driven Development (SDD)**.

---

## Tabla de Contenidos

1. [Decisiones del Usuario](#decisiones-del-usuario)
2. [Fase 0 — Preparación (Design Tokens)](#fase-0--preparación-design-tokens)
3. [Fase 1 — Fondo Global](#fase-1--fondo-global)
4. [Fase 2 — Navegación](#fase-2--navegación)
5. [Fase 3 — Sistema de Layout (CSS Global)](#fase-3--sistema-de-layout-css-global)
6. [Fase 4 — Hero](#fase-4--hero)
7. [Fase 5 — Bento / About](#fase-5--bento-about)
8. [Fase 6 — Experience](#fase-6--experience)
9. [Fase 7 — Skills](#fase-7--skills)
10. [Fase 8 — Projects](#fase-8--projects)
11. [Fase 9 — Footer](#fase-9--footer)
12. [Fase 10 — Motion & Transiciones](#fase-10--motion--transiciones)
13. [Fase 11 — Responsive](#fase-11--responsive)
14. [Fase 12 — Accesibilidad](#fase-12--accesibilidad)
15. [Fase 13 — Limpieza y Build Final](#fase-13--limpieza-y-build-final)
16. [Resumen de Archivos por Fase](#resumen-de-archivos-por-fase)
17. [Dependencias](#dependencias)
18. [Criterios de Aceptación Globales](#criterios-de-aceptación-globales)

---

## Decisiones del Usuario

| # | Pregunta | Decisión |
|---|----------|----------|
| 1 | Eliminar `NavBar.astro` (duplicate) | Se deja solo la que se usa (`NavBar.jsx` con React) |
| 2 | Conservar `zustand` | Se mantiene `zustand` para el estado del menú |
| 3 | Actualizar favicon | Se deja para después |
| 4 | `img3.jpg` en About | No se usa; solo se usa `profile.webp` |
| 5 | Iconos para nuevas skills (AWS, PostgreSQL, Git, REST APIs, Microservices) | Se agregarán iconos |
| 6 | SideBar mobile | Mantener como sidebar |
| 7 | Foto About | No necesita nueva fotografía |
| 8 | Sección Contact | No es necesaria aún |
| 9 | Animaciones `span-1` a `span-4` | Se eliminan completamente |
| 10 | Google Analytics | Se mantiene |

---

## Fase 0 — Preparación (Design Tokens)

### Componentes afectados
- `tailwind.config.mjs`
- `src/layouts/Layout.astro`

### Cambios detallados

**`tailwind.config.mjs`**:
- Reemplazar los colores `dark-custom` y `tag` con el sistema completo de tokens de `SPEC.md`
- Añadir todos los colores como variables CSS o extender `theme.extend.colors` con:
  - `--background: #050505`
  - `--background-secondary: #0A0A0A`
  - `--surface: #0F0F0F`
  - `--surface-elevated: #151515`
  - `--gold: #D4AF6A`, `--gold-light: #E6C98A`, `--gold-dark: #9E7A3A`
  - `--navy: #0B1220`
  - `--blue-accent: #6C8EFF`
  - `--text-primary: #F5F5F5`
  - `--text-secondary: #A1A1AA`
  - `--text-muted: #71717A`
  - `--border: rgba(255,255,255,0.10)`
  - `--border-gold: rgba(212,175,106,0.35)`
  - `--glass: rgba(255,255,255,0.04)`
  - `--glass-hover: rgba(255,255,255,0.07)`

**`Layout.astro`**:
- Añadir `<style is:global>` con variables CSS de diseño tokens en el `<head>`
- Las variables deben estar disponibles globalmente para todos los componentes

### Dependencias
- Ninguna (solo configuración de Tailwind y CSS)

### Criterios de aceptación
- Todos los colores de `SPEC.md` están disponibles como tokens
- Ningún color hardcodeado en componentes
- `bg-main` deja de ser una clase no definida
- Variables CSS accesibles globalmente

---

## Fase 1 — Fondo Global

### Archivos afectados
- `src/pages/index.astro`

### Cambios detallados

**`index.astro`** — `<style is:global>`:
- Reemplazar el fondo purple radial gradient actual con el gradiente atmosférico sutil:
  ```css
  background:
    radial-gradient(circle at 70% 30%, rgba(212,175,106,.12), transparent 35%),
    radial-gradient(circle at 20% 80%, rgba(108,142,255,.06), transparent 30%),
    #050505;
  ```
- Eliminar completamente:
  - `.glow-hover` (efecto purple glow con text-shadow)
  - `.card-skill::before` shine animation
  - `.span-1` a `.span-4` (bordes animados)
  - `.bg-section` (gradientes blue/purple)
  - `.bg-card`, `.bg-card2`, `.bg-tag` con sus estilos actuales
  - `@keyframes animate_one` a `animate_four`
  - Cualquier referencia a `#780387` o colores purple

### Dependencias
- Ninguna

### Criterios de aceptación
- Fondo negro con glow dorado/champagne sutil
- Glow azul marino muy sutil como capa atmosférica secundaria
- Sin gradientes purple de ningún tipo
- Sin animaciones innecesarias (shine, border animations)
- Sin overflow horizontal en el fondo
- El fondo no debe ser el protagonista visual

---

## Fase 2 — Navegación

### Archivos afectados
- `src/components/NavBar.jsx`
- `src/pages/index.astro` (eliminar import de `NavBar.astro`)

### Cambios detallados

**Eliminar `NavBar.astro`**:
- El archivo `src/components/NavBar.astro` se elimina completamente
- Se elimina el import correspondiente de `src/pages/index.astro`

**Refactorizar `NavBar.jsx`**:
- Mantener las 5 secciones: Home, Experience, Projects, Skills, About
- Aplicar glassmorphism refinado según SPEC.md:
  - Posición: `fixed`
  - Estado por defecto: transparente
  - Al hacer scroll: superficie glass sutil con `backdrop-filter: blur()`
  - Blur ligero moderado
  - No debe dominar visualmente la página
- Acentos dorados sutiles en links y hover states
- Eliminar cualquier glow purple
- El nav debe ser sencillo y elegante
- Links con smooth scrolling a las secciones correspondientes

**IDs de sección** (deben coincidir):
- `#experience` → sección Experience
- `#projects` → sección Projects
- `#skills` → sección Skills
- `#aboutme` → sección About

**`SideBar.jsx`** — Sin cambios estructurales:
- Se mantiene como sidebar
- Se mantiene Zustand como estado
- Se verifica que los IDs de anclaje coincidan

**`BtnMenu.jsx`** — Sin cambios estructurales:
- Se mantiene como está

### Dependencias
- Ninguna (solo refactorización de estilos)

### Criterios de aceptación
- Solo existe un componente de navegación desktop (`NavBar.jsx`)
- `NavBar.astro` eliminado
- La navegación no domina visualmente la página
- Smooth scrolling funcional
- Glassmorphism refinado en la navbar desktop
- Links con acento dorado controlado
- IDs de anclaje consistentes con las secciones
- Sidebar y BtnMenu funcionando en mobile

---

## Fase 3 — Sistema de Layout (CSS Global)

### Archivos afectados
- `src/pages/index.astro`

### Cambios detallados

**Migración de estilos**:
- Mover todos los estilos globales de `<style is:global>` en `index.astro` a un archivo CSS central o definir como clases Tailwind
- Crear clases/utilidades reutilizables para:
  - Secciones con spacing consistente (`section` class)
  - Contenedores con `max-w-screen-lg m-auto`
  - Tipografía editorial consistente
  - Scroll-margin-top para secciones con navegación fija
- Eliminar `sp-8` (clase Tailwind no válida, usada actualmente en `Experience.astro` y `Projects.astro`)
- Reemplazar con espaciado Tailwind válido (`mt-36`, `p-4`, `md:p-4`, etc.)

**Estructura CSS global centralizada**:
- Variables CSS para spacing consistente
- Definición de secciones con padding/margin uniformes
- Definir `scroll-margin-top` para todas las secciones con navegación fija

### Dependencias
- Ninguna

### Criterios de aceptación
- Los estilos están centralizados y no dispersos
- No hay clases CSS mágicas no definidas
- Spacing consistente en todas las secciones
- Tipografía coherente con Red Hat Display
- Sin clases como `sp-8` no válidas

---

## Fase 4 — Hero (`Header.astro`)

### Archivos afectados
- `src/components/Header.astro`

### Cambios detallados

**Reorganización completa según SPEC.md §9**:

Estructura objetivo:
```
SOFTWARE ENGINEER
────────────────────────────────
KEVIN GUIDO
I BUILD DIGITAL EXPERIENCES.
Java · Spring Boot · React · AWS
[GitHub] [LinkedIn] [Resume]

PHOTO

COSTA RICA · 2026
```

**Cambios específicos**:
- Layout grid editorial de dos columnas en desktop
- `h-screen` mantenido pero reorganizado
- Texto "Software Developer" → "SOFTWARE ENGINEER"
- Nombre "Kevin Andrés Guido Urbina" → "KEVIN GUIDO"
- Texto "I BUILD DIGITAL EXPERIENCES." en lugar del "Software Developer"
- Añadir tecnologías: "Java · Spring Boot · React · AWS" como label
- Links: GitHub, LinkedIn, Resume
- Fotografía: `profile.webp` con tratamiento editorial
  - Eliminar `rounded-full`
  - Añadir borde sutil
  - Pequeño highlight dorado
  - `border-radius` moderado
  - Interacción hover muy sutil (translateY(-2px), border-color transition)
- Eliminar glow-hover purple
- Reemplazar `text-white/60` con `text-text-secondary`
- Acentos dorados sutiles en links
- `COSTA RICA · 2026` como metadata debajo de la foto
- Sin animaciones excesivas
- Responsive: en tablet reducir escala, en mobile composición vertical

**Eliminar**:
- Imagen `img3.jpg` de About (ya no se usa)
- Efecto glow-hover
- `rounded-full` en la foto de perfil

### Dependencias
- Ninguna

### Criterios de aceptación
- Jerarquía tipográfica fuerte con Red Hat Display
- Nombre grande y título profesional claro
- Mensaje profesional corto
- Links a GitHub, LinkedIn y Resume accesibles
- Fotografía con tratamiento editorial
- Detalles dorados sutiles
- Diseño responsive en desktop/tablet/mobile
- Sin animaciones excesivas
- Sin overflow horizontal
- Respetando `prefers-reduced-motion`

---

## Fase 5 — Bento / About (`AboutMe.astro`)

### Archivos afectados
- `src/components/AboutMe.astro`

### Cambios detallados

**Convertir a estructura Bento** según SPEC.md §12:

- Eliminar referencia a `img3.jpg` (no se usa)
- Layout Bento con grid intencional
- Información a comunicar:
  - Nombre: Kevin Guido
  - Rol: Software Engineer
  - Ubicación: Costa Rica
  - Disponibilidad
  - Tecnologías principales
- Texto editorial personal pero profesional
- Mantener el contenido textual existente:
  > "Hi! I'm Kevin Guido, a software developer from Costa Rica. I'm a person who is committed to quality and continuous improvement. I enjoy both frontend and backend development and I take on the challenges they bring, always looking for useful solutions that make a difference."
  > "I consider myself self-taught and, as a professional, I always give my best. I enjoy learning new things and constantly growing in the world of software development."
- Añadir bloque "CURRENTLY" con: Building / learning / exploring...
- Aplicar sistema de colores

**Estructura Bento sugerida**:
- Columna izquierda: Información personal (nombre, rol, descripción)
- Columna derecha: Metadata (Location, Availability, Stack)
- Opcionalmente: imagen de perfil con borde editorial

### Dependencias
- Ninguna

### Criterios de aceptación
- Sección Bento con composición editorial intencional
- Sin `img3.jpg`
- Contenido textual existente preservado
- Acento dorado controlado
- Sin glow purple
- Responsive: colapsa naturalmente en mobile
- Sin overflow horizontal

---

## Fase 6 — Experience (`Experience.astro`)

### Archivos afectados
- `src/components/Experience.astro`

### Cambios detallados

**Reemplazar timeline CV por estructura editorial** según SPEC.md §14:

**Estructura objetivo por experiencia**:
```
01
EXPERIENCE

Full Stack Developer
Universidad de Costa Rica

Descripción...

Technologies:
Java · Spring Boot · React · PostgreSQL · AWS
```

**Contenido existente a preservar**:

**Experiencia 1 — Centauro Solutions**:
- Rol: Frontend Developer Intern
- Duración: 3 months, September 2025 – November 2025
- Descripción: Mejorar diseño responsive, SCRUM, Git Flow

**Experiencia 2 — Universidad de Costa Rica R&D**:
- Rol: Full Stack Developer
- Duración: 1+ year (ongoing)
- Descripción: Laravel, React, SCRUM, GitHub, Docker, WordPress

**Cambios específicos**:
- Eliminar timeline visual con círculos (`<ol>` con `<span>` de círculos)
- Eliminar `bg-blue-100`, `ring-8 ring-white`, `dark:ring-gray-900`
- Eliminar `text-gray-900` (no corresponde al sistema de colores)
- Cada experiencia como bloque editorial con:
  - Número (01, 02...)
  - Título de rol grande
  - Empresa
  - Descripción
  - Tecnologías como tags/label
- Usar jerarquía fuerte y espaciado generoso
- Glassmorphism sutil si aplica a los bloques
- Aplicar sistema de colores completo

### Dependencias
- Ninguna

### Criterios de aceptación
- Estructura editorial, no timeline de CV
- Jerarquía fuerte y espaciado generoso
- Tecnologías listadas con tags
- Sin elementos de timeline circulares
- Sin `bg-blue-100` ni colores que no correspondan al sistema
- Acento dorado controlado
- Sin overflow horizontal

---

## Fase 7 — Skills (`Skills.astro`, `SkillCard.astro`)

### Archivos afectados
- `src/components/Skills.astro`
- `src/components/SkillCard.astro`
- `src/icons/icons.jsx` (para nuevos iconos)
- `public/images/` (para nuevos iconos de tecnología)

### Cambios detallados

**Organizar skills por categorías** según SPEC.md §15:

Categorías a crear:
- **Backend**: Java, Spring Boot, REST APIs, Microservices
- **Frontend**: React, JavaScript, TypeScript, HTML, CSS
- **Cloud / DevOps**: AWS, Docker, Git
- **Databases**: PostgreSQL, SQL

**Rediseño de `SkillCard.astro`**:
- Eliminar `card-skill` class con `shine` animation
- Eliminar `animation: shine 2.5s linear infinite`
- Eliminar `.card-skill::before` styles
- Nuevo estilo: bordes sutiles, glassmorphism mínimo
- Acento dorado en hover states
- `transition: border-color, transform` (no opacity-only)
- `translateY(-2px)` en hover con `border-color` transition a `border-gold`

**Nuevos iconos SVG** para skills sin icono actual:
- AWS
- PostgreSQL
- Git
- REST APIs
- Microservices

Estos se añaden como componentes SVG en `src/icons/icons.jsx` y las imágenes se añaden a `public/images/` (o se usan SVG inline).

**Reestructurar `Skills.astro`**:
- Eliminar el grid plano `flex flex-row flex-wrap` actual
- Crear bloques/cards por categoría
- Cada categoría como un bloque editorial Bento
- Grid con las categorías organizadas

### Dependencias
- Posiblemente creación de nuevos iconos SVG (no dependencias externas)

### Criterios de aceptación
- Skills organizadas por categoría significativa
- Sin animaciones shine o shimmer
- Iconos para todas las skills listadas
- Cada categoría visible y escaneable
- SkillCard con bordes sutiles y hover con acento dorado
- Sin glassmorphism excesivo
- Responsive: categorías colapsan en mobile

---

## Fase 8 — Projects (`Projects.astro`, `Card.astro`, `HorizontalCard.astro`)

### Archivos afectados
- `src/components/Projects.astro`
- `src/components/Card.astro`
- `src/components/HorizontalCard.astro`
- `src/components/MainButton.astro`
- `src/icons/icons.jsx` (opcional, mejoras)

### Cambios detallados

**Reorganizar Projects según SPEC.md §13**:

Cada proyecto debe tener:
1. Número (01, 02, 03...)
2. Nombre del proyecto grande
3. Descripción corta (1-2 líneas)
4. Tecnologías como tags
5. Imagen del proyecto prominente
6. Link "View Project ↗"

**Proyectos existentes (contenido preservado)**:
1. **01 — SpringBoot Microservices**: microservices architecture, Docker, API Gateway, Flyway, Resilience4j, Keycloak, SpringCloud
2. **02 — Spotify Clone**: Astro, TypeScript, React, Tailwind, Zustand
3. **03 — Suru - Frontend**: React, Tailwind, React Router
4. **04 — Suru - Backend**: Laravel, PHP, MySQL, JWT, Cloudinary

**Cambios en `Card.astro` y `HorizontalCard.astro`**:
- Eliminar `span-1` a `span-4` de ambos componentes
- Eliminar `.card-box-shadow` con white glow
- Eliminar `console.log(tags)` de `HorizontalCard.astro`
- Unificar estilos entre Card y HorizontalCard
- Nuevo hover effect:
  - `translateY(-4px)` en la card
  - Imagen con `scale(1.02)`
  - `border-color` transition a `border-gold`
  - Elevación ligera
  - Transición suave
- Eliminar overlays dramáticos
- Descripciones más cortas y escaneables
- Aplicar sistema de colores

**Cambios en `MainButton.astro`**:
- Eliminar `bg-violet-900/20` y `hover:bg-violet-800/70`
- Nuevo estilo: `bg-surface-elevated` + `border border-border-gold`
- Hover: `border-gold` más visible, `bg-glass-hover`
- Texto dorado en hover
- Transición suave en `border-color` y `background-color`

**Imágenes de proyectos**:
- Mantener todas las imágenes existentes en `public/images/`
- Cada imagen con borde sutil
- Hover con borde dorado sutil

### Dependencias
- Ninguna

### Criterios de aceptación
- Layout visual mejorado según SPEC.md
- Cada proyecto con número, nombre, descripción, tech stack, imagen
- Hover con borde dorado sutil y translateY(-4px)
- Sin glow purple/violeta
- Sin `span-1` a `span-4` en cards
- Sin `console.log` en código
- `MainButton` con colores del sistema (no violeta)
- Imágenes prominentes
- Sin overflow horizontal
- Descripciones cortas y escaneables

---

## Fase 9 — Footer (`Footer.astro`)

### Archivos afectados
- `src/components/Footer.astro`

### Cambios detallados

**Actualizar `Footer.astro`**:
- Cambiar `@2025` por `@2026`
- Aplicar sistema de colores:
  - Texto: `text-text-secondary` o `text-text-muted`
  - Border: `border-border` (rgba con opacidad)
- Mantener estructura simple con `px-8 py-14 mt-24`
- Coherencia visual con el resto del proyecto

### Dependencias
- Ninguna

### Criterios de aceptación
- Año actualizado a 2026
- Colores consistentes con el sistema
- Estructura simple y limpia
- Sin bordes visibles innecesarios

---

## Fase 10 — Motion & Transiciones

### Archivos afectados
- Todos los componentes

### Cambios detallados

**Eliminación de animaciones existentes** (no alineadas con la filosofía):

| Animación | Ubicación | Acción |
|-----------|-----------|--------|
| `.glow-hover` | `index.astro` | Eliminar completamente |
| `.card-skill::before` shine | `SkillCard.astro`, `index.astro` | Eliminar |
| `.span-1` a `.span-4` | `index.astro` | Eliminar |
| `@keyframes animate_one` a `animate_four` | `index.astro` | Eliminar |
| `.card-box-shadow` white glow | `index.astro`, `Card.astro`, `HorizontalCard.astro` | Reemplazar con glass sutil |
| `shine` animation | `SkillCard.astro` | Eliminar |
| `.bg-section` gradient animation | `index.astro` | Eliminar |

**Añadir transiciones sutiles**:

**Principio general**: `Make the interface feel alive, not animated.`

- **Entrada de secciones**: `opacity: 0 → 1`, `translateY: 16px → 0`
- **Cards interactivas**: `translateY(-4px)` en hover
- **Imágenes de proyectos**: `scale(1.02)` en hover
- **Links**: `border-color` transition sutil
- **Botones**: `border-color` y `background-color` transition
- **Navegación**: scroll-triggered glass effect

**Implementar `prefers-reduced-motion`**:
- En `Layout.astro` o CSS global:
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
  ```

**Propiedades permitidas para animaciones**:
- `opacity`
- `transform` (scale, translate, translateY)
- `border-color`

**Propiedades prohibidas**:
- `text-shadow` (glow effects)
- `filter` (drop-shadow excesivo)
- `background-position` (gradient animations)
- `left`, `top` (positional animations)

### Dependencias
- Ninguna

### Criterios de aceptación
- Sin animaciones excesivas o distractivas
- Motion sutil e intencional
- `prefers-reduced-motion` implementado en todos los componentes
- Solo `opacity`, `transform`, `border-color` como propiedades animadas
- Sin parallax, scroll hijacking, o animaciones constantes
- Todas las transiciones son cortas y suaves

---

## Fase 11 — Responsive

### Archivos afectados
- Todos los componentes

### Cambios detallados

**Verificación y ajustes**:

**Desktop**:
- Layouts Bento en grid con columnas definidas
- Hero con composición de dos áreas (texto + foto)
- Navegación desktop visible (`NavBar.jsx`)
- Proyectos con grid de cards
- Experience con bloques editoriales

**Tablet**:
- Reducir escala de componentes
- Hero: composición más compacta
- Bento grids: columnas reducidas
- Typography: reducir tamaño pero mantener legibilidad
- Navegación: desktop sigue visible

**Mobile**:
- Bento grids colapsan a una sola columna
- Hero: composición vertical (texto arriba, foto abajo)
- Navegación: oculta, Sidebar con BtnMenu
- Typography: mantener legibilidad
- Imágenes: no deben ser excesivamente grandes
- Cards: no deben volverse excesivamente altas
- Sidebar funcional con overlay

**Reglas generales**:
- Nunca aceptar overflow horizontal
- Los layouts Bento deben colapsar naturalmente
- La tipografía debe seguir siendo legible
- Las animaciones deben seguir siendo sutiles en todos los breakpoints
- Las imágenes de proyectos deben mantener protagonismo
- Las cards no deben volverse excesivamente altas
- `SideBar` con `w-[100%]` ajustado para no desbordar
- `BtnMenu` siempre accesible en mobile (`fixed top-5 right-5`)

**Breakpoints a verificar**:
- `sm:` (640px)
- `md:` (768px)
- `lg:` (1024px)
- `xl:` (1280px)

### Dependencias
- Ninguna

### Criterios de aceptación
- Sin overflow horizontal en ningún breakpoint
- Layouts Bento colapsan naturalmente en mobile
- Navegación funcional en todos los dispositivos
- Tipografía legible en todos los breakpoints
- Imágenes no desbordadas
- Cards con dimensiones razonables
- Animaciones sutiles en todos los dispositivos
- Sidebar funcional en mobile

---

## Fase 12 — Accesibilidad

### Archivos afectados
- Todos los componentes

### Cambios detallados

**HTML semántico**:
- Verificar uso correcto de `<section>`, `<nav>`, `<header>`, `<footer>`, `<main>`
- Cada sección debe estar envuelta en `<section>` con `id` apropiado
- La navegación debe estar en `<nav>`
- El contenido principal en `<main>`

**Keyboard navigation**:
- Todos los links son elementos `<a>` nativos (navegación por teclado)
- Focus states visibles con acento dorado:
  ```css
  a:focus-visible {
    outline: 2px solid var(--gold);
    outline-offset: 2px;
  }
  ```

**Alt text**:
- `profile.webp` → `alt="Portrait of Kevin Guido, Software Engineer"`
- Todas las imágenes de proyectos → `alt="[Project Name] screenshot"`
- `img3.jpg` → Ya no se usa (eliminado de About)
- Iconos decorativos → `aria-hidden="true"`

**Color contrast**:
- Texto primario `#F5F5F5` sobre `#050505` → ratio ~17:1 ✅
- Texto secundario `#A1A1AA` sobre `#050505` → ratio ~7:1 ✅
- Texto muted `#71717A` sobre `#050505` → ratio ~4.5:1 ✅
- Acento dorado `#D4AF6A` sobre `#050505` → ratio ~8:1 ✅

**`prefers-reduced-motion`**:
- Ya definido en Fase 10
- Debe estar en el CSS global

**No comunicar información solo por color**:
- En Skills, usar labels además del color
- En Experience, tecnologías como texto además de colores
- En links, iconos además del color
- Bordes + icons + texto para estados interactivos

**Enlaces externos**:
- `target="_blank"` con `rel="noopener noreferrer"`
- Indicar visualmente que es un enlace externo

### Dependencias
- Ninguna

### Criterios de aceptación
- HTML semántico correcto
- Focus states visibles con acento dorado
- Alt text descriptivo en todas las imágenes
- `prefers-reduced-motion` soportado
- Sin depender solo del color para comunicar información
- Contraste de colores suficiente
- Links externos con `rel="noopener noreferrer"`
- Navegación por teclado funcional

---

## Fase 13 — Limpieza y Build Final

### Archivos afectados
- Todos los archivos del proyecto

### Cambios detallados

**Eliminación de archivos**:
- `src/components/NavBar.astro` → Eliminar (ya no se usa)

**Limpieza de imports**:
- En `src/pages/index.astro`: eliminar import de `NavBar` (Astro version)
- Verificar que todos los imports son válidos y utilizados
- Eliminar cualquier import huérfano

**Limpieza de código**:
- `HorizontalCard.astro`: eliminar `console.log(tags)`
- `index.astro`: eliminar todos los estilos antiguos (glow, span, shine, keyframes)
- Verificar que no quedan referencias a `sp-8`
- Verificar que no quedan referencias a `bg-main` sin definición

**Verificaciones**:
- Ejecutar `npm run build` → debe pasar sin errores
- Ejecutar `npm run astro check` → debe pasar sin errores
- Verificar que no hay errores en consola
- Verificar que todos los links internos funcionan
- Verificar que los links externos están correctos
- Optimizar imágenes si es necesario
- Verificar que el `public/CV.pdf` link es correcto

**Google Analytics**:
- Se mantiene en `Layout.astro` (decisión del usuario)
- Verificar que el tracking ID `G-QG12NKBYDL` sigue funcionando

### Dependencias
- Ninguna

### Criterios de aceptación
- `npm run build` → PASS
- `npm run astro check` → PASS
- Sin errores en consola
- Sin links rotos
- Sin overflow horizontal
- Sin archivos huérfanos
- Sin imports no utilizados
- Sin `console.log` en producción
- `NavBar.astro` eliminado
- Sin `sp-8` ni otras clases no válidas

---

## Resumen de Archivos por Fase

| Fase | Archivo | Tipo de Cambio |
|------|---------|----------------|
| 0 | `tailwind.config.mjs` | Reemplazar colores con tokens |
| 0 | `src/layouts/Layout.astro` | Añadir variables CSS globales |
| 1 | `src/pages/index.astro` | Reemplazar fondo purple, eliminar animaciones |
| 2 | `src/components/NavBar.jsx` | Refactorizar glassmorphism y estilos |
| 2 | `src/components/NavBar.astro` | **Eliminar** |
| 2 | `src/pages/index.astro` | Eliminar import de NavBar.astro |
| 3 | `src/pages/index.astro` | Centralizar estilos globales |
| 4 | `src/components/Header.astro` | Rediseño editorial completo |
| 5 | `src/components/AboutMe.astro` | Convertir a Bento |
| 6 | `src/components/Experience.astro` | Reemplazar timeline con editorial |
| 7 | `src/components/Skills.astro` | Reorganizar por categorías |
| 7 | `src/components/SkillCard.astro` | Rediseñar sin shine |
| 7 | `src/icons/icons.jsx` | Agregar iconos nuevos |
| 8 | `src/components/Projects.astro` | Reorganizar layout |
| 8 | `src/components/Card.astro` | Eliminar spans, nuevo hover |
| 8 | `src/components/HorizontalCard.astro` | Eliminar console.log, spans |
| 8 | `src/components/MainButton.astro` | Cambiar violeta por sistema |
| 9 | `src/components/Footer.astro` | Actualizar año y colores |
| 10 | Todos los componentes | Eliminar animaciones, añadir motion sutil |
| 10 | `src/layouts/Layout.astro` | Añadir `prefers-reduced-motion` |
| 11 | Todos los componentes | Verificar responsive |
| 12 | Todos los componentes | Añadir accesibilidad |
| 13 | Todos los archivos | Limpieza final |

---

## Dependencias

### Dependencias actuales (no se modifican)

```json
{
  "astro": "^4.16.12",
  "@astrojs/tailwind": "^5.1.2",
  "@astrojs/react": "^4.2.7",
  "react": "^19.1.0",
  "react-dom": "^19.1.0",
  "tailwindcss": "^3.4.15",
  "typescript": "^5.6.3",
  "@astrojs/check": "^0.9.4",
  "zustand": "^5.0.3",
  "@types/react": "^19.1.2",
  "@types/react-dom": "^19.1.3"
}
```

### Dependencias nuevas
- **Ninguna** — Todo se implementa con Astro + Tailwind CSS + CSS nativo
- `zustand` se mantiene como está
- No se agregan librerías de animación
- No se agregan UI frameworks adicionales
- Los nuevos iconos para skills se implementan como SVGs inline en `icons.jsx`

### Anti-patterns evitados
- No instalar librerías de animación (Framer Motion, etc.)
- No instalar librerías de UI (shadcn, radix, etc.)
- No instalar icon libraries (lucide, heroicons, etc.)
- No instalar CSS frameworks adicionales

---

## Criterios de Aceptación Globales

### Visual
- [ ] Se siente premium
- [ ] El dorado está controlado (acento, no predominante)
- [ ] El fondo negro domina
- [ ] El Bento se siente intencional
- [ ] El sitio sigue pareciendo un portfolio de Software Engineer
- [ ] El glassmorphism es sutil
- [ ] Sin glow purple de ningún tipo
- [ ] Tipografía Red Hat Display consistente
- [ ] Jerarquía editorial clara
- [ ] Espaciado generoso y consistente

### UX
- [ ] La navegación es clara
- [ ] El scrolling es fluido
- [ ] Los elementos interactivos comunican su estado
- [ ] La navegación mobile funciona
- [ ] Los links de proyectos funcionan
- [ ] Los links externos abren correctamente
- [ ] Sin links rotos
- [ ] Sin overflow horizontal en ningún breakpoint
- [ ] Hover states sutiles y consistentes
- [ ] Focus states visibles

### Técnico
- [ ] `npm run build` → PASS
- [ ] `npm run astro check` → PASS
- [ ] Sin errores en consola
- [ ] Sin links rotos
- [ ] Sin overflow horizontal
- [ ] Las imágenes están optimizadas
- [ ] El responsive funciona en desktop/tablet/mobile
- [ ] Los requisitos básicos de accesibilidad se cumplen
- [ ] `prefers-reduced-motion` soportado
- [ ] HTML semántico
- [ ] Sin dependencias innecesarias
- [ ] El contenido existente está preservado
- [ ] Sin `console.log` en código de producción
- [ ] Sin archivos huérfanos

### Motion
- [ ] Motion sutil e intencional
- [ ] Sin animaciones excesivas
- [ ] Solo `opacity`, `transform`, `border-color` animadas
- [ ] `prefers-reduced-motion` respetado
- [ ] Sin parallax, scroll hijacking, o animaciones constantes
- [ ] Sin glow-hover, shine, o border animations innecesarias

### Contenido
- [ ] Toda la información profesional existente está preservada
- [ ] No se ha inventado experiencia, empresas, proyectos o logros
- [ ] Las skills están organizadas por categorías
- [ ] Los proyectos tienen presentación mejorada
- [ ] Experience usa estructura editorial
- [ ] El Hero tiene jerarquía tipográfica fuerte
- [ ] El About tiene información personal y profesional

---

## Notas Importantes

1. **Orden de implementación**: Las fases deben ejecutarse estrictamente en orden (0 → 13). Cada fase construye sobre la anterior.

2. **Validación incremental**: Después de cada fase importante: Implement → Build → Inspect → Fix → Continue.

3. **Contenido existente**: Nunca inventar información profesional. Todo el contenido debe basarse en la información ya existente en el proyecto.

4. **Principio rector**:
   > *The portfolio is not a demo of AI-generated effects. It is a demonstration of software engineering quality.*

5. **Anti-patterns constantes**:
   - No reescribir todo inmediatamente
   - No instalar librerías sin justificación
   - No usar dorado como color predominante
   - No hacer que cada elemento sea una card de vidrio
   - No agregar animaciones donde no aportan valor
   - No optimizar antes de identificar un problema

6. **Google Analytics**: Se mantiene tal como está en `Layout.astro`. No se modifica.

7. **Favicon**: Se actualizará en una fase posterior (según decisión del usuario).

---

*Plan creado como parte de la fase de Discovery/Analysis del flujo Spec-Driven Development.*
*Basado en `SPEC.md` y `AGENTS.md`.*
