# AGENTS.md

## AI Agent Instructions — Portfolio Rebranding

Este archivo define las reglas operativas que deben seguir los agentes de IA que trabajen en este proyecto.

La especificación principal del rediseño se encuentra en:

```text
SPEC.md
```

`SPEC.md` define **qué debe construirse y por qué**.

Este archivo define **cómo debe trabajar el agente**.

---

# 1. Contexto del proyecto

Este proyecto es el portfolio profesional de un Software Engineer.

El objetivo actual es realizar un rebranding completo del portfolio existente, evolucionando su diseño actual hacia una identidad:

* Premium
* Minimalista
* Editorial
* Técnica
* Moderna
* Distintiva

La dirección visual combina:

* Bento Grid
* Editorial Web Design
* Glassmorphism refinado
* Luxury Tech
* Minimalismo

La identidad visual principal utiliza:

```text
Negro
Dorado Champagne
Azul Marino / Azul sutil
```

El proyecto utiliza:

```text
Astro
Tailwind CSS
Red Hat Display
```

La implementación debe preservar el rendimiento, accesibilidad y simplicidad técnica del proyecto.

---

# 2. Jerarquía de instrucciones

Cuando existan varias fuentes de información, utilizar esta prioridad:

```text
1. Requisitos explícitos del usuario
        ↓
2. SPEC.md
        ↓
3. AGENTS.md
        ↓
4. Código y arquitectura existentes
        ↓
5. Convenciones generales del proyecto
        ↓
6. Suposiciones del agente
```

Nunca utilizar una suposición del agente para contradecir un requisito explícito.

Si existe una contradicción importante entre los requisitos, detenerse y solicitar aclaración antes de realizar cambios destructivos.

---

# 3. Regla fundamental

## INSPECCIONAR → COMPRENDER → PLANIFICAR → IMPLEMENTAR → VALIDAR

Nunca comenzar modificando componentes simplemente porque parecen necesitar cambios.

Antes de editar:

1. Inspeccionar la estructura del proyecto.
2. Identificar la arquitectura existente.
3. Revisar los componentes relevantes.
4. Revisar los estilos globales.
5. Revisar Tailwind.
6. Revisar los assets.
7. Revisar los datos/contenido.
8. Identificar dependencias.
9. Comprender el comportamiento actual.
10. Determinar qué puede reutilizarse.

---

# 4. Regla de conservación

El proyecto existente debe tratarse como una aplicación funcional.

No asumir que todo debe ser reemplazado.

Preferir:

```text
Reutilizar
    ↓
Refactorizar
    ↓
Extender
    ↓
Reemplazar únicamente cuando sea necesario
```

Antes de eliminar o reemplazar código funcional, determinar:

* Qué problema resuelve.
* Si todavía es necesario.
* Si puede reutilizarse.
* Si la nueva arquitectura realmente requiere eliminarlo.

Evitar reescrituras completas sin justificación.

---

# 5. Uso de SPEC.md

`SPEC.md` es la fuente principal para las decisiones de diseño.

El agente debe leerlo antes de comenzar cualquier trabajo relacionado con el rebranding.

La especificación contiene:

* Dirección visual
* Identidad
* Colores
* Tipografía
* Layout
* Bento
* Glassmorphism
* Hero
* Navigation
* Projects
* Experience
* Skills
* About
* Motion
* Responsive
* Accesibilidad
* Arquitectura
* SDD
* Validación
* Definition of Done

No reinterpretar arbitrariamente la dirección visual.

El agente puede proponer mejoras, pero debe explicar:

```text
Problema detectado
↓
Propuesta
↓
Razón
↓
Impacto
```

---

# 6. Spec-Driven Development

Este proyecto utiliza un flujo Spec-Driven Development.

La secuencia esperada es:

```text
DISCOVERY
   ↓
SPECIFICATION
   ↓
IMPLEMENTATION PLAN
   ↓
IMPLEMENTATION
   ↓
VALIDATION
   ↓
REVIEW
```

No saltarse directamente de Discovery a Implementation cuando el cambio sea significativo.

---

# 7. Fase Discovery

Durante Discovery:

### NO modificar código.

El objetivo es comprender el proyecto.

Inspeccionar como mínimo:

```text
package.json
astro.config.*
tailwind.config.*
src/
public/
assets/
layouts/
components/
pages/
styles/
```

Los nombres exactos pueden variar dependiendo de la estructura real.

También revisar:

* Scripts disponibles
* Dependencias
* Configuración de Astro
* Configuración de Tailwind
* Fuentes
* Variables CSS
* Componentes reutilizables
* Assets existentes
* Sistema de navegación
* Sistema responsive
* Animaciones
* Integraciones

### Resultado esperado

Producir un resumen:

```text
## Architecture

...

## Components

...

## Styling

...

## Assets

...

## Dependencies

...

## Existing behavior

...

## Reusable code

...

## Risks

...
```

No realizar cambios hasta completar esta fase.

---

# 8. Planificación

Antes de implementar cambios grandes, producir un plan.

Cada cambio debe describirse como:

```text
Component:
    Nombre del componente

Change:
    Qué cambia

Reason:
    Por qué cambia

Dependencies:
    Qué necesita

Responsive:
    Cómo funciona en desktop/tablet/mobile

Acceptance criteria:
    Cómo saber que está terminado
```

Ejemplo:

```text
Component:
    Hero.astro

Change:
    Reorganizar el Hero utilizando una composición editorial.

Reason:
    Crear una jerarquía visual más fuerte y alineada con SPEC.md.

Dependencies:
    Design tokens
    Existing profile image

Responsive:
    Desktop: composición de dos áreas.
    Tablet: reducción de escala.
    Mobile: composición vertical.

Acceptance criteria:
    - No existe overflow horizontal.
    - La fotografía permanece visible.
    - Los links son accesibles.
    - El contenido existente se conserva.
    - Motion respeta prefers-reduced-motion.
```

---

# 9. División Cloud / Local

Este proyecto utiliza dos tipos de modelos:

```text
CLOUD MODELS
    ↓
Planning / Analysis / Review

LOCAL QWEN
    ↓
Implementation / Refactoring / Testing
```

Esta división es intencional.

---

# 10. Responsabilidades de los modelos Cloud

Los modelos Cloud deben utilizarse principalmente para tareas que requieran mayor capacidad de razonamiento o análisis.

### Responsabilidades

* Analizar arquitectura
* Leer y comprender SPEC.md
* Analizar código existente
* Diseñar la arquitectura visual
* Crear planes
* Identificar riesgos
* Detectar inconsistencias
* Revisar implementaciones
* Analizar problemas difíciles
* Proponer refactors
* Revisar cumplimiento de la especificación
* Analizar decisiones técnicas

Los modelos Cloud deben priorizar:

```text
Razonamiento
Planificación
Consistencia
Revisión
```

No asumir que deben escribir todo el código.

---

# 11. Responsabilidades de Qwen Local

El modelo Qwen local debe utilizarse principalmente para ejecutar planes ya definidos.

### Responsabilidades

* Crear/modificar componentes Astro
* Modificar Tailwind
* Modificar CSS
* Implementar layouts
* Implementar componentes
* Refactorizar código
* Ejecutar comandos
* Ejecutar builds
* Ejecutar tests
* Corregir errores
* Iterar sobre problemas
* Realizar pequeños ajustes visuales

Qwen debe recibir instrucciones suficientemente claras antes de realizar cambios complejos.

---

# 12. Regla de transferencia Cloud → Qwen

El flujo recomendado es:

```text
Cloud
  ↓
Discovery
  ↓
Analysis
  ↓
Implementation Plan
  ↓
Human Review
  ↓
Qwen Local
  ↓
Implementation
  ↓
Validation
```

No transferir directamente una idea vaga al modelo local.

Evitar instrucciones como:

```text
"Rediseña el portfolio."
```

Preferir:

```text
"Implementa el siguiente plan aprobado..."
```

con:

* Archivos afectados
* Cambios esperados
* Restricciones
* Criterios de aceptación
* Referencia a SPEC.md

---

# 13. Human-in-the-loop

El usuario mantiene el control sobre las decisiones importantes.

Antes de cambios grandes, el agente debe presentar:

```text
Plan
Decisiones
Supuestos
Riesgos
Archivos afectados
```

El usuario puede:

```text
Approve
Modify
Reject
```

No asumir aprobación cuando una decisión pueda alterar significativamente:

* Arquitectura
* Diseño
* Dependencias
* Contenido
* Estructura
* Comportamiento

---

# 14. Cambios incrementales

Implementar por fases.

Orden recomendado:

```text
1. Design tokens
2. Global background
3. Navigation
4. Layout system
5. Hero
6. Bento / About
7. Experience
8. Skills
9. Projects
10. Contact
11. Footer
12. Motion
13. Responsive
14. Accessibility
15. Performance cleanup
```

Después de cada fase importante:

```text
Implement
    ↓
Build
    ↓
Inspect
    ↓
Fix
    ↓
Continue
```

No acumular grandes cantidades de cambios sin validación.

---

# 15. Design Tokens

Los valores visuales deben centralizarse.

Utilizar variables CSS o el mecanismo existente del proyecto.

Conceptualmente:

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

No duplicar estos valores arbitrariamente en múltiples componentes.

Si el proyecto ya posee un sistema de tokens, adaptarlo en lugar de crear uno paralelo.

---

# 16. Reglas de diseño

El agente debe mantener constantemente estas reglas:

### Debe sentirse

* Premium
* Minimalista
* Técnico
* Elegante
* Personal
* Profesional

### No debe sentirse

* Genérico
* Excessivamente futurista
* Saturado
* Infantil
* Corporativo
* Lleno de efectos
* Generado automáticamente

---

# 17. Glassmorphism

El glassmorphism es un recurso secundario.

Utilizarlo para crear profundidad.

No utilizarlo simplemente porque una sección necesita una card.

Preferir:

```text
Dark surface
+
Subtle transparency
+
Moderate blur
+
Thin border
```

Evitar:

```text
Strong glow
+
Heavy blur
+
Bright borders
+
Large transparent blobs
```

No convertir todos los elementos en superficies de vidrio.

---

# 18. Uso del dorado

El dorado es el color de identidad.

Debe utilizarse como acento.

Puede aparecer en:

* Links
* Focus states
* Selected states
* Small borders
* Icons
* Labels
* Project interactions
* Decorative details

No utilizar dorado como color estructural predominante.

Evitar:

```text
gold backgrounds everywhere
gold text everywhere
gold borders everywhere
```

El visitante debe percibir el dorado como un detalle distintivo, no como el color principal de toda la interfaz.

---

# 19. Tipografía

Mantener:

```text
Red Hat Display
```

No reemplazarla sin una razón explícita.

La tipografía debe utilizar:

* Headlines fuertes
* Jerarquía editorial
* Espaciado generoso
* Párrafos cortos
* Labels claros

Una fuente monoespaciada puede utilizarse únicamente para información técnica secundaria.

---

# 20. Animaciones

La filosofía de motion es:

> Make the interface feel alive, not animated.

Preferir:

```css
opacity
transform
scale
translate
border-color
```

Animaciones cortas y suaves.

Para entradas:

```text
opacity: 0 → 1
translateY: 16px → 0
```

Para elementos interactivos:

```text
translateY(-4px)
scale(1.02)
subtle border transition
```

Evitar:

* Parallax excesivo
* Scroll hijacking
* Animaciones constantes
* Grandes transformaciones
* Efectos que distraigan
* Animaciones innecesarias

Siempre respetar:

```css
prefers-reduced-motion
```

---

# 21. Responsive

Responsive no significa simplemente reducir el desktop.

Considerar composiciones específicas para:

```text
Desktop
Tablet
Mobile
```

Verificar especialmente:

* Hero
* Navigation
* Bento
* Projects
* Typography
* Images
* Spacing
* Overflow

Nunca aceptar:

```text
horizontal overflow
```

como comportamiento esperado.

---

# 22. Accesibilidad

Toda implementación debe considerar:

* HTML semántico
* Keyboard navigation
* Focus states
* Color contrast
* Alt text
* Accessible links
* Accessible buttons
* Reduced motion
* Información no dependiente únicamente del color

No sacrificar accesibilidad por estética.

---

# 23. Contenido

El agente no debe inventar información profesional.

Nunca inventar:

* Experiencia
* Empresas
* Proyectos
* Logros
* Certificaciones
* Tecnologías
* Habilidades
* Hobbies
* Clientes
* Métricas
* Responsabilidades

Si falta información:

```text
ASK
```

o reutilizar información existente cuando sea apropiado.

El contenido existente tiene prioridad sobre contenido generado por el agente.

---

# 24. Dependencias

Antes de instalar una dependencia nueva, comprobar si el problema puede resolverse con:

```text
Astro
Tailwind CSS
CSS
JavaScript nativo
```

No agregar una librería únicamente por conveniencia.

Una nueva dependencia debe justificarse por:

```text
Problem
↓
Why existing stack is insufficient
↓
Why this dependency is appropriate
↓
Impact on bundle / maintenance
```

---

# 25. JavaScript

Preferir HTML/CSS siempre que sea suficiente.

Utilizar JavaScript únicamente cuando aporte comportamiento real.

Prioridad:

```text
CSS
↓
Astro
↓
Vanilla JavaScript
↓
Dependency
```

Evitar convertir interacciones simples en componentes JavaScript innecesarios.

---

# 26. Rendimiento

El portfolio debe mantenerse rápido.

Priorizar:

* Static rendering
* Optimized images
* Lazy loading cuando corresponda
* Minimal JavaScript
* CSS eficiente
* Reutilización de componentes
* Evitar dependencias pesadas

No optimizar prematuramente.

Primero medir o identificar un problema real.

---

# 27. Validación técnica

Después de cambios importantes ejecutar los comandos disponibles en `package.json`.

Como mínimo, cuando estén disponibles:

```bash
npm run build
```

y cualquier comando de:

```text
lint
test
check
typecheck
```

Si un comando falla:

1. Identificar el error.
2. Determinar si fue introducido por el cambio.
3. Corregirlo.
4. Ejecutar nuevamente la validación.

No declarar una tarea como completa si el build está roto.

---

# 28. Validación visual

La implementación debe compararse con `SPEC.md`.

Revisar:

### Identity

* Negro dominante
* Dorado controlado
* Azul sutil

### Layout

* Bento intencional
* Editorial composition
* Espaciado consistente

### Glass

* Sutil
* No dominante
* Sin exceso de blur

### Typography

* Red Hat Display
* Jerarquía clara
* Legibilidad

### Motion

* Sutil
* Intencional
* Reduced motion

---

# 29. Validación de UX

Comprobar:

```text
Navigation
Hero
Projects
Experience
Skills
About
Contact
Footer
```

Y verificar:

* Links funcionales
* Navegación clara
* Hover states
* Focus states
* Mobile navigation
* No overflow
* Scroll behavior
* Project links
* External links

---

# 30. Definition of Done

Una tarea se considera terminada únicamente cuando:

* El cambio corresponde a la especificación.
* El código existente útil se conserva.
* No se agregaron dependencias innecesarias.
* El build funciona.
* No existen errores introducidos por el cambio.
* El responsive funciona.
* La accesibilidad básica está cubierta.
* No existe overflow horizontal.
* El contenido es correcto.
* La implementación fue validada.

Para el rebranding completo, además deben cumplirse todos los criterios definidos en `SPEC.md`.

---

# 31. Reporte después de implementar

Después de una fase importante, el agente debe reportar:

```text
## Implemented

- ...

## Files changed

- ...

## Decisions

- ...

## Assumptions

- ...

## Validation

- Build: PASS/FAIL
- Tests: PASS/FAIL
- Lint: PASS/FAIL
- Typecheck: PASS/FAIL

## Remaining issues

- ...
```

No ocultar problemas conocidos.

---

# 32. Cuando algo no esté claro

Si una decisión es:

```text
irreversible
destructiva
arquitectónicamente significativa
relacionada con contenido profesional
```

preguntar antes de continuar.

Si la decisión es:

```text
pequeña
reversible
consistente con SPEC.md
```

el agente puede tomarla y documentarla.

---

# 33. Regla de autonomía

El agente debe ser autónomo dentro de los límites de la especificación.

Puede decidir:

* Nombres internos de variables
* Organización interna de componentes
* Pequeños detalles CSS
* Refactors locales
* Estructura interna de un componente

No debe decidir unilateralmente:

* Cambiar la identidad visual
* Cambiar la stack
* Inventar contenido
* Instalar dependencias importantes
* Reestructurar toda la aplicación
* Eliminar funcionalidades existentes
* Cambiar la estrategia de arquitectura

---

# 34. Anti-patterns

No hacer:

```text
"Rewrite everything."
```

```text
"Install a UI library because it looks nicer."
```

```text
"Add animations everywhere."
```

```text
"Use gold everywhere."
```

```text
"Turn every section into a glass card."
```

```text
"Generate professional experience that is missing."
```

```text
"Replace the current framework."
```

```text
"Optimize before identifying a problem."
```

```text
"Change working architecture without a reason."
```

---

# 35. Workflow recomendado

## Etapa 1 — Discovery

```text
Read AGENTS.md
        ↓
Read SPEC.md
        ↓
Inspect repository
        ↓
Understand architecture
        ↓
Report findings
```

## Etapa 2 — Planning

```text
Analyze requirements
        ↓
Identify affected components
        ↓
Create implementation plan
        ↓
Identify risks
        ↓
Human review
```

## Etapa 3 — Implementation

```text
Approved plan
        ↓
Qwen local
        ↓
Implement incrementally
        ↓
Build / test
        ↓
Fix
```

## Etapa 4 — Review

```text
Implementation
        ↓
Cloud model review
        ↓
Compare against SPEC.md
        ↓
Identify gaps
        ↓
Qwen fixes
```

## Etapa 5 — Final validation

```text
Build
↓
Lint
↓
Typecheck
↓
Tests
↓
Responsive review
↓
Accessibility review
↓
Performance review
↓
Final review
```

---

# 36. Principio final

El agente debe recordar constantemente:

> **The portfolio is not a demo of AI-generated effects. It is a demonstration of software engineering quality.**

Cada decisión debe contribuir a comunicar:

```text
Quality
Structure
Attention to detail
Technical competence
Design awareness
Professionalism
```

El resultado final debe parecer diseñado y construido deliberadamente por un Software Engineer, no generado automáticamente por una IA.

---

# 37. Implementation Plan Reference

## Fuente de referencia

- **Plan completo**: `docs/IMPLEMENTATION-PLAN.md`
- Este archivo contiene el plan detallado de 13 fases para el rebranding del portfolio.
- Debe consultarse antes de cada fase de implementación para verificar alcances, dependencias y criterios de aceptación.

## Tracking de Fases

Al completar cada fase de implementación, marcarla como ☑ en la siguiente tabla para control de progreso:

| Fase | Descripción | Estado |
|------|-------------|--------|
| 0 | Design Tokens | ☑ |
| 1 | Fondo Global | ☑ |
| 2 | Navegación | ☑ |
| 3 | Layout CSS Global | ☑ |
| 4 | Hero | ☑ |
| 5 | Bento / About | ☑ |
| 6 | Experience | ☑ |
| 7 | Skills | ☑ |
| 8 | Projects | ☑ |
| 9 | Footer | ☐ |
| 10 | Motion & Transiciones | ☐ |
| 11 | Responsive | ☐ |
| 12 | Accesibilidad | ☐ |
| 13 | Limpieza y Build Final | ☐ |

### Regla de tracking

Cada vez que se termina una fase de implementación, actualizar su estado a ☑ en la tabla de arriba. Esto permite saber exactamente por qué fase se va y cuáles faltan por completar.

### Orden obligatorio

Las fases deben ejecutarse estrictamente en orden (0 → 13). Cada fase construye sobre la anterior. No saltar fases.

### Validación por fase

Después de completar cada fase:
1. Ejecutar `npm run build`
2. Ejecutar `npm run astro check`
3. Verificar criterios de aceptación de esa fase
4. Marcar como ☑ en la tabla
5. Continuar a la siguiente fase
