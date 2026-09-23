# Rebranding del Portfolio — Diseño y Spec-Driven Development

## 1. Objetivo del proyecto

Rediseñar el portfolio actual de desarrollador como un **portfolio profesional, elegante y distintivo de Software Engineer**.

El objetivo no es simplemente cambiar los colores actuales o agregar animaciones. Se trata de un **rebranding visual** que debe reconsiderar:

- Identidad visual
- Arquitectura de información
- Composición del layout
- Jerarquía de las secciones
- Presentación de los proyectos
- Espaciado
- Composición de componentes
- Interacciones y transiciones
- Comportamiento responsive

El portfolio actual ya utiliza una estética oscura basada en glassmorphism. El nuevo diseño debe conservar los puntos fuertes de esa dirección y evolucionar hacia una identidad más refinada y profesional.

---

# 2. Dirección de diseño

## Concepto principal

Combinar:

- **Bento Grid**
- **Glassmorphism refinado**
- **Diseño web editorial**
- **Estética luxury tech**
- **Minimalismo**

El resultado debe sentirse:

- Profesional
- Elegante
- Moderno
- Técnico
- Distintivo
- Limpio
- Premium, sin sentirse corporativo o excesivo

### Declaración de diseño

> Un portfolio premium de ingeniería de software que combina minimalismo editorial, layouts estructurados en Bento y superficies de glassmorphism refinado, utilizando el dorado champagne como acento controlado.

---

# 3. Principios de diseño

## 3.1 Evitar la estética genérica de portfolios de desarrolladores

NO crear un portfolio genérico generado por IA.

Evitar:

- Purple neon excesivo
- Gradientes excesivos
- Glassmorphism excesivo
- Tarjetas con demasiados bordes redondeados
- Demasiadas animaciones
- Saturación visual
- Exceso de efectos de glow
- Hacer que cada elemento sea dorado
- Secciones Hero genéricas del tipo "Hello, I'm a Developer"
- Elementos decorativos innecesarios

El diseño debe tener una identidad reconocible sin convertirse en una interfaz visualmente ruidosa.

---

## 3.2 El glassmorphism debe ser refinado

El glassmorphism seguirá formando parte del lenguaje visual, pero no debe dominar la interfaz.

Utilizar:

- Superficies translúcidas muy sutiles
- Fondos de baja opacidad
- Bordes delgados
- Blur moderado
- Contraste controlado
- Estados hover sutiles

Evitar:

- Cards con glow fuerte
- Grandes blobs translúcidos
- Blur excesivo
- Bordes de colores demasiado brillantes
- Hacer que cada sección parezca una tarjeta de vidrio

El objetivo es generar **profundidad**, no que todo parezca vidrio.

---

# 4. Identidad visual

## Identidad principal

La identidad visual principal debe ser:

**Negro + Dorado Champagne + Azul Marino Profundo**

El dorado debe utilizarse principalmente como acento.

Puede aparecer en:

- Estados interactivos
- Pequeños highlights
- Estados seleccionados de navegación
- Bordes
- Iconos
- Etiquetas importantes
- Pequeños detalles decorativos
- Interacciones de proyectos

El dorado NO debe dominar fondos o áreas grandes.

---

# 5. Sistema de colores

Utilizar variables CSS/design tokens para que los colores puedan modificarse desde un punto central.

```css
--background: #050505;
--background-secondary: #0A0A0A;

--surface: #0F0F0F;
--surface-elevated: #151515;

--gold: #D4AF6A;
--gold-light: #E6C98A;
--gold-dark: #9E7A3A;

--navy: #0B1220;
--blue-accent: #6C8EFF;

--text-primary: #F5F5F5;
--text-secondary: #A1A1AA;
--text-muted: #71717A;

--border: rgba(255,255,255,0.10);
--border-gold: rgba(212,175,106,0.35);

--glass: rgba(255,255,255,0.04);
--glass-hover: rgba(255,255,255,0.07);
```

### Reglas de color

1. El negro es el color estructural/de fondo.
2. El dorado es el principal color de identidad.
3. El azul marino/azul aporta un contraste tecnológico sutil.
4. El blanco/off-white se utiliza para el texto principal.
5. El gris se utiliza para información secundaria y de apoyo.
6. El dorado debe utilizarse con moderación.
7. El azul debe utilizarse todavía con más moderación que el dorado.
8. No introducir colores de acento adicionales salvo que tengan una función clara.

---

# 6. Fondo

El fondo debe tener profundidad sin convertirse en el protagonista visual.

Evitar el gran glow morado actual.

Preferir gradientes atmosféricos sutiles.

Conceptualmente:

```text
Fondo casi negro
        ↓
glow dorado/champagne sutil
        ↓
capa atmosférica azul marino/azul muy sutil
        ↓
superficies oscuras
```

Ejemplo:

```css
background:
  radial-gradient(
    circle at 70% 30%,
    rgba(212,175,106,.12),
    transparent 35%
  ),
  radial-gradient(
    circle at 20% 80%,
    rgba(108,142,255,.06),
    transparent 30%
  ),
  #050505;
```

Los gradientes deben ser suficientemente sutiles para que el usuario perciba primero la atmósfera y no el gradiente.

---

# 7. Tipografía

La tipografía principal existente es:

**Red Hat Display**

No reemplazarla.

Utilizar Red Hat Display consistentemente para la jerarquía visual principal.

La tipografía debe utilizar:

- Headlines editoriales grandes
- Jerarquía fuerte
- Espaciado generoso
- Párrafos cortos y legibles
- Labels claros
- Pesos tipográficos consistentes

Opcionalmente se puede utilizar una fuente monoespaciada para pequeños metadatos técnicos como:

```text
STATUS: AVAILABLE
LOCATION: COSTA RICA
BUILD: FULL_STACK
2026
```

No utilizar monospace como fuente principal.

---

# 8. Dirección del layout

El sitio debe combinar:

### Bento Grid

Para:

- About
- Experience
- Skills
- Stack tecnológico
- Información pequeña de perfil
- Información complementaria

### Layouts editoriales

Para:

- Hero
- Introducciones de proyectos
- Experience
- Encabezados de sección

### Superficies glass

Para:

- Cards
- Navegación
- Contenido complementario
- Elementos interactivos

No forzar todas las secciones a utilizar un grid.

Las diferentes secciones pueden tener composiciones diferentes siempre que compartan el mismo lenguaje visual.

---

# 9. Sección Hero

El Hero debe sentirse más editorial e intencional que la versión actual.

Posible estructura:

```text
SOFTWARE ENGINEER
────────────────────────────

KEVIN
GUIDO

I BUILD
DIGITAL
EXPERIENCES.

Java • Spring Boot • React • AWS

[ GitHub ] [ LinkedIn ] [ Resume ]

                              PHOTO

COSTA RICA · 2026
```

El texto exacto debe basarse en el contenido existente del portfolio y no debe inventar afirmaciones profesionales.

## Requisitos del Hero

- Jerarquía tipográfica fuerte
- Nombre grande
- Título profesional claro
- Mensaje profesional corto
- Links a GitHub, LinkedIn y Resume
- Fotografía profesional
- Detalles dorados sutiles
- Diseño responsive
- Sin animaciones excesivas

---

# 10. Navegación

La navegación debe ser sencilla y elegante.

Secciones posibles:

- Home
- Experience
- Projects
- Skills
- About
- Contact

La navegación debe permitir smooth scrolling.

Al hacer scroll:

```text
transparente
    ↓
superficie glass sutil
    ↓
blur ligero
```

La navegación no debe dominar visualmente la página.

---

# 11. Fotografía de perfil

La fotografía actual debe continuar formando parte de la identidad visual.

Considerar alejarse de la presentación circular actual hacia un tratamiento más editorial.

Dirección posible:

```text
┌──────────────────┐
│                  │
│                  │
│      PHOTO       │
│                  │
│                  │
└──────────────────┘
```

Utilizar:

- Borde sutil
- Pequeño highlight dorado
- Border radius moderado
- Interacción hover muy sutil

Evitar un glow excesivo.

---

# 12. Sección Bento

El Bento debe comunicar información y no funcionar solamente como decoración.

Ejemplo:

```text
┌──────────────────────┬────────────────────┐
│                      │                    │
│  EXPERIENCE          │    TECH STACK      │
│                      │                    │
│  2+ years            │ Java               │
│  Full Stack          │ Spring Boot        │
│                      │ React              │
├──────────────────────┴────────────────────┤
│                                           │
│                  ABOUT                    │
│                                           │
│  Descripción profesional...               │
│                                           │
└───────────────────────────────────────────┘
```

Posibles cards Bento pequeñas:

- Experience
- Current focus
- Tech stack
- Location
- Availability
- GitHub
- Education
- About

Incluir únicamente información realmente útil.

---

# 13. Sección Projects

Los proyectos deben ser más visuales y menos repetitivos.

Las cards actuales son funcionales pero visualmente similares.

Nueva dirección:

```text
01

ZENVY
────────────────────────────

Cloud-based place rating
application.

Java · Spring Boot · React · AWS

                         ↗

┌──────────────────────────────────┐
│                                  │
│          PROJECT IMAGE            │
│                                  │
└──────────────────────────────────┘
```

## Interacción de proyectos

Al hacer hover:

- Escala muy pequeña de la imagen
- Borde dorado sutil
- Elevación ligera
- "View Project ↗" opcional
- Transición suave

Evitar overlays dramáticos.

## Contenido del proyecto

Cada proyecto debe comunicar:

1. Nombre del proyecto
2. Descripción corta
3. Tecnologías
4. Links relevantes
5. Imagen del proyecto

No sobrecargar las cards con párrafos.

---

# 14. Experience

Experience debe utilizar una estructura editorial en lugar de repetir cards tradicionales de CV.

Posible estructura:

```text
01
EXPERIENCE

Full Stack Developer
Universidad de Costa Rica

Descripción...

Technologies:
Java · Spring Boot · React · PostgreSQL · AWS
```

Utilizar jerarquía fuerte y espaciado generoso.

---

# 15. Skills

Las skills deben organizarse en categorías significativas.

Posibles categorías:

### Backend
Java
Spring Boot
REST APIs
Microservices

### Frontend
React
JavaScript
TypeScript
HTML
CSS

### Cloud / DevOps
AWS
Docker
Git

### Databases
PostgreSQL
SQL

Evitar crear docenas de cards individuales flotantes.

---

# 16. About

La sección About debe sentirse personal pero profesional.

Evitar texto excesivamente genérico.

Utilizar la experiencia profesional real y el contenido existente del portfolio.

Posible formato:

```text
ABOUT

Software Engineer focused on building
modern web applications...

[ supporting information ]

CURRENTLY
Building / learning / exploring...
```

No inventar hobbies, intereses, experiencia o logros.

---

# 17. Movimiento y transiciones

El sitio debe sentirse fluido.

El objetivo es:

> Hacer que la interfaz se sienta viva, no animada.

Utilizar transiciones sutiles para:

- Navegación
- Aparición de secciones
- Botones
- Cards
- Imágenes de proyectos
- Estados hover
- Links

Comportamiento preferido:

```text
opacity: 0 → 1
translateY: 16px → 0
```

Para cards interactivas:

```text
translateY(-4px)
image scale(1.02)
border transition
```

Evitar:

- Parallax excesivo
- Transiciones de página demasiado grandes
- Elementos flotantes constantes
- Demasiados efectos de scroll
- Animaciones que interfieran con la lectura

Respetar `prefers-reduced-motion`.

---

# 18. Diseño responsive

El diseño de escritorio no debe simplemente reducirse para convertirse en móvil.

Definir composiciones específicas para:

- Desktop
- Tablet
- Mobile

En mobile:

- Los layouts Bento deben colapsar naturalmente
- La tipografía debe seguir siendo legible
- La navegación debe adaptarse a pantallas pequeñas
- Las imágenes de proyectos deben seguir teniendo protagonismo
- Las cards no deben volverse excesivamente altas
- Las animaciones deben seguir siendo sutiles

---

# 19. Accesibilidad

El rediseño debe mantener una buena accesibilidad.

Requisitos:

- HTML semántico
- Navegación mediante teclado
- Estados focus visibles
- Contraste suficiente
- Alt text descriptivo
- Links/botones accesibles
- Soporte para reducción de movimiento
- No comunicar información únicamente mediante color

---

# 20. Restricciones técnicas

Stack actual:

- Astro
- Tailwind CSS
- Red Hat Display

No reemplazar el framework.

No introducir dependencias innecesarias.

Antes de agregar una nueva librería de animaciones/UI, evaluar si Astro + Tailwind + CSS nativo son suficientes.

Mantener el sitio rápido.

Preferir:

- CSS transitions
- CSS transforms
- Imágenes optimizadas
- Lazy loading cuando corresponda
- JavaScript mínimo
- Aprovechar las capacidades de Astro para contenido estático

---

# 21. Arquitectura

Antes de implementar, inspeccionar el proyecto existente.

No reescribir todo inmediatamente.

Primero comprender:

- Estructura existente de Astro
- Componentes
- Layouts
- Configuración de Tailwind
- Estilos globales
- Assets
- Datos de proyectos
- Navegación
- Animaciones existentes
- Comportamiento responsive

Conservar componentes útiles cuando corresponda.

Refactorizar cuando sea necesario en lugar de reemplazar todo indiscriminadamente.

---

# 22. Enfoque de Spec-Driven Development

Este proyecto debe abordarse utilizando **Spec-Driven Development (SDD)**.

El objetivo es separar:

```text
QUÉ
↓
POR QUÉ
↓
DISEÑO
↓
IMPLEMENTACIÓN
↓
VALIDACIÓN
```

No comenzar editando componentes inmediatamente.

Primero producir una especificación clara.

---

# 23. Flujo SDD recomendado

## Fase 1 — Discovery

Inspeccionar el portfolio existente.

Entregar:

- Resumen de la arquitectura actual
- Componentes existentes
- Sistema visual actual
- Contenido existente
- Dependencias existentes
- Comportamiento responsive
- Restricciones técnicas
- Assets reutilizables

No modificar el proyecto durante esta fase.

---

## Fase 2 — Especificación de diseño

Crear una especificación que cubra:

- Objetivos de diseño
- Identidad visual
- Tokens de color
- Tipografía
- Sistema de layout
- Estrategia Bento
- Estrategia de glassmorphism
- Hero
- Navegación
- Projects
- Experience
- Skills
- About
- Footer
- Responsive
- Accesibilidad
- Motion

La especificación debe revisarse antes de implementar.

---

## Fase 3 — Plan de implementación

Crear un plan concreto de implementación.

Para cada cambio especificar:

```text
Componente
├── Qué cambia
├── Por qué
├── Dependencias
├── Comportamiento responsive
└── Criterios de aceptación
```

Ejemplo:

```text
Hero.astro

Cambios:
- Rediseñar el layout utilizando una composición editorial
- Agregar panel para la fotografía
- Agregar acento dorado
- Mejorar comportamiento responsive

Criterios de aceptación:
- El Hero funciona en desktop/tablet/mobile
- La fotografía permanece visible
- Los links siguen siendo accesibles
- No existe overflow horizontal
- Las animaciones respetan reduced motion
```

---

# 24. Implementación

Solo después de que la especificación y el plan sean suficientemente claros se debe comenzar la implementación.

Orden recomendado:

1. Design tokens
2. Fondo global
3. Navegación
4. Sistema de layout
5. Hero
6. Bento/About
7. Experience
8. Skills
9. Projects
10. Contact
11. Footer
12. Motion
13. Ajustes responsive
14. Accesibilidad
15. Limpieza de rendimiento

---

# 25. Validación

Después de implementar, validar contra la especificación.

### Visual

- ¿Se siente premium?
- ¿El dorado está controlado?
- ¿El fondo negro domina?
- ¿El Bento se siente intencional?
- ¿El sitio sigue pareciendo un portfolio de Software Engineer?
- ¿El glassmorphism es sutil?

### UX

- La navegación es clara
- El scrolling es fluido
- Los elementos interactivos comunican su estado
- La navegación mobile funciona
- Los links de proyectos funcionan

### Técnico

- El build de Astro funciona
- No hay errores en consola
- No hay links rotos
- No hay overflow horizontal
- Las imágenes están optimizadas
- El responsive funciona
- Los requisitos básicos de accesibilidad se cumplen

---

# 26. Estrategia para el agente de IA

El proyecto utilizará un agente de programación basado en IA.

El flujo preferido es:

```text
                 MODELO CLOUD
                      │
                      ▼
             Planning / Analysis
                      │
                      ▼
                Especificaciones
                      │
                      ▼
              Plan de implementación
                      │
                      ▼
             ┌─────────────────┐
             │                 │
             ▼                 ▼
       Revisión manual    Refinar spec
             │
             ▼
          MODELO QWEN LOCAL
             │
             ▼
        Implementación
             │
             ▼
           Testing
             │
             ▼
          Revisión
```

El modelo Cloud debe utilizarse principalmente para:

- Comprender el proyecto existente
- Analizar la arquitectura
- Razonar sobre el diseño
- Crear especificaciones
- Crear planes de implementación
- Identificar riesgos
- Revisar cambios propuestos

El modelo local Qwen puede utilizarse posteriormente para:

- Implementar el plan aprobado
- Editar componentes Astro
- Editar estilos Tailwind
- Refactorizar
- Ejecutar builds/tests
- Corregir problemas iterativamente

Esta separación es intencional.

El modelo de planificación debe definir **qué se debe construir**.

El modelo local de implementación debe ejecutar el trabajo definido.

---

# 27. Reglas importantes para el agente

El agente debe:

1. Inspeccionar antes de modificar.
2. Pedir aclaraciones cuando existan requisitos contradictorios.
3. Seguir la especificación.
4. Evitar dependencias innecesarias.
5. Evitar reescribir código funcional sin justificación.
6. Conservar el contenido existente salvo que se indique lo contrario.
7. Mantener los cambios incrementales.
8. Validar después de cada fase importante.
9. Reportar los archivos modificados.
10. Reportar decisiones arquitectónicas.
11. Reportar supuestos.
12. Reportar cualquier asunto que permanezca sin resolver.

El agente NO debe:

- Reescribir toda la aplicación inmediatamente
- Instalar librerías grandes sin justificación
- Inventar contenido para el portfolio
- Inventar experiencia profesional
- Agregar tendencias de diseño aleatorias
- Agregar animaciones excesivas
- Reemplazar Red Hat Display
- Convertir todo en una card de vidrio
- Convertir todo en dorado
- Optimizar prematuramente

---

# 28. Definition of Done

El rediseño está completo cuando:

- La nueva identidad visual es consistente
- La paleta negro/dorado/azul marino está implementada
- El glassmorphism es sutil
- El layout Bento es intencional
- El Hero tiene una jerarquía visual fuerte
- Los proyectos tienen una presentación mejorada
- Experience y Skills son más fáciles de escanear
- La navegación se siente fluida
- El responsive es sólido
- Se cubren los aspectos básicos de accesibilidad
- El build de Astro funciona
- No se introdujeron dependencias innecesarias
- El contenido existente sigue siendo correcto
- La implementación sigue la especificación aprobada

---

# 29. Resumen del sistema de diseño

```text
IDENTIDAD
Software Engineering Premium Dark

ESTRUCTURA
Bento + Editorial

SUPERFICIES
Glassmorphism Refinado

PRINCIPAL
Negro casi puro

ACENTO
Dorado Champagne

SECUNDARIO
Azul Marino / Azul sutil

TIPOGRAFÍA
Red Hat Display

MOVIMIENTO
Sutil + intencional

TECNOLOGÍA
Astro + Tailwind CSS

FILOSOFÍA
Minimalista pero distintivo
Profesional pero personal
Técnico pero accesible
Elegante sin ser llamativo
```

---

# 30. Principio final de diseño

El portfolio no debe intentar impresionar al visitante demostrando cuántos efectos visuales se pueden implementar.

Debe comunicar:

> **"Este desarrollador se preocupa por la calidad del software, el diseño, la estructura y los detalles."**

El propio diseño debe demostrar esa atención al detalle.
