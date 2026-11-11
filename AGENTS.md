# AGENTS.md
# AI Agent Instructions — Portfolio Rebranding

Este documento establece las reglas operativas que deben seguir los agentes de IA que trabajen en el portfolio.

## 1. Contexto del proyecto

El proyecto consiste en el portfolio profesional de un Software Engineer.

El objetivo es desarrollar una experiencia web que transmita:

- Profesionalismo.
- Calidad de ingeniería.
- Atención al detalle.
- Conocimiento técnico.
- Identidad visual distintiva.

La nueva dirección visual busca combinar:

- Futuristic Editorial Design.
- Minimalismo tecnológico.
- Bento Grid.
- Composiciones geométricas.
- Diseño monocromático.
- Presentación tipo diapositivas.

La estética debe ser futurista, pero formal. No debe parecer una demostración experimental de efectos visuales ni una plantilla genérica generada por IA.

## 2. Jerarquía de instrucciones

Cuando existan diferentes fuentes de información, utilizar esta prioridad:

1. Requisitos explícitos del usuario.
2. SPEC.md.
3. AGENTS.md.
4. docs/IMPLEMENTATION-PLAN.md.
5. Arquitectura y código existentes.
6. Convenciones generales.

Nunca utilizar suposiciones para contradecir requisitos explícitos.

Si existe una contradicción importante, detenerse y solicitar aclaración.

## 3. Regla fundamental

El flujo obligatorio es:

INSPECT → UNDERSTAND → PLAN → IMPLEMENT → VALIDATE → REVIEW

Nunca comenzar modificando componentes sin comprender primero la arquitectura existente.

Antes de implementar:

1. Inspeccionar la estructura del proyecto.
2. Revisar package.json.
3. Revisar pnpm-lock.yaml.
4. Identificar versiones y dependencias.
5. Revisar la configuración de Astro.
6. Revisar Tailwind CSS.
7. Revisar los estilos globales.
8. Revisar componentes y layouts.
9. Revisar assets e imágenes.
10. Revisar contenido profesional.
11. Identificar funcionalidades existentes.
12. Identificar oportunidades de reutilización.

## 4. Conservación del proyecto

El proyecto existente debe considerarse una aplicación funcional.

No asumir que todo debe reemplazarse.

Prioridad:

REUSE → REFACTOR → EXTEND → REPLACE

Antes de eliminar código:

- Identificar su propósito.
- Determinar si sigue siendo necesario.
- Comprobar si puede reutilizarse.
- Justificar técnicamente cualquier reemplazo.

No realizar reescrituras completas sin justificación.

## 5. Fuentes de referencia

El proyecto utiliza tres documentos principales:

### AGENTS.md
Define cómo debe trabajar el agente.

### SPEC.md
Define qué debe construirse y por qué.

Contiene la dirección visual, identidad, comportamiento, arquitectura, responsive, accesibilidad y criterios de aceptación.

### docs/IMPLEMENTATION-PLAN.md
Define cómo se ejecutará la implementación.

Contiene fases, archivos afectados, dependencias, tareas y validaciones.

Los tres documentos deben mantenerse consistentes.

## 6. Spec-Driven Development

El proyecto utiliza Spec-Driven Development.

Flujo obligatorio:

DISCOVERY
↓
SPECIFICATION
↓
IMPLEMENTATION PLAN
↓
HUMAN REVIEW
↓
IMPLEMENTATION
↓
VALIDATION
↓
FINAL REVIEW

No saltarse fases importantes.

Durante Discovery está prohibido modificar código.

## 7. Fase Discovery

El agente debe inspeccionar el proyecto y producir un reporte que incluya:

### Architecture
- Framework y versiones.
- Estructura general.
- Estrategia de rendering.
- Arquitectura de componentes.

### Styling
- Tailwind CSS.
- Variables CSS.
- Design tokens.
- Tipografía.
- Responsive.

### Components
- Componentes existentes.
- Layouts.
- Navegación.
- Secciones.
- Componentes reutilizables.

### Assets
- Imágenes.
- Fotografías.
- Iconos.
- Ilustraciones.
- Fuentes.

### Dependencies
- Dependencias instaladas.
- Dependencias innecesarias.
- Librerías relevantes.

### Existing behavior
- Navegación.
- Scroll.
- Animaciones.
- Interacciones.
- Responsive.

### Risks
- Problemas arquitectónicos.
- Código que podría verse afectado.
- Dependencias entre componentes.
- Riesgos de implementación.

### Reusable code
Identificar qué partes pueden conservarse.

No realizar modificaciones durante esta fase.

## 8. Dirección visual

La nueva identidad se define en SPEC.md.

Los principios generales son:

### Debe transmitir
- Futurismo.
- Elegancia.
- Profesionalismo.
- Minimalismo.
- Precisión.
- Sofisticación tecnológica.

### Debe evitar
- Apariencia genérica.
- Exceso de efectos.
- Glassmorphism dominante.
- Gradientes innecesarios.
- Colores saturados.
- Animaciones constantes.
- Diseños excesivamente corporativos.
- Elementos decorativos sin propósito.

Las referencias visuales proporcionadas por el usuario deben utilizarse como orientación estética, no como diseños que deban copiarse literalmente.

El agente debe identificar sus principios de composición, tipografía, contraste y jerarquía visual.

## 9. Sistema de colores

La identidad visual utiliza una paleta monocromática.

Colores de referencia:

- Background: #E3E3E4
- Surface: #FFFFFF
- Primary: #030303
- Secondary: #494949
- Dark surface: #323232

Los tres primeros representan los colores principales de identidad.

Todos los colores deben centralizarse mediante Design Tokens.

Ejemplo conceptual:

```css
:root {
  --color-background: #E3E3E4;
  --color-surface: #FFFFFF;
  --color-primary: #030303;

  --color-secondary: #494949;
  --color-dark-surface: #323232;

  --color-text-primary: var(--color-primary);
  --color-text-secondary: var(--color-secondary);

  --color-border: rgba(3, 3, 3, 0.12);
}
```

Este ejemplo es una referencia conceptual. El agente debe adaptarlo a la arquitectura de estilos existente.

Reglas:

- No duplicar valores de colores en componentes.
- Evitar colores arbitrarios.
- Utilizar variables para fondos, superficies, textos y bordes.
- Mantener contraste suficiente.
- Permitir cambiar la identidad desde un único lugar.

No introducir dorados o azules como colores de identidad sin autorización explícita.

## 10. Tipografía

La tipografía actual Red Hat Display debe conservarse inicialmente.

Antes de reemplazarla, evaluar:

- Legibilidad.
- Jerarquía.
- Compatibilidad con la identidad visual.
- Diferentes pesos disponibles.

La composición tipográfica debe priorizar:

- Headlines de impacto.
- Títulos claros.
- Labels técnicos.
- Textos secundarios discretos.
- Jerarquía editorial.

Las fuentes monoespaciadas pueden utilizarse en información técnica secundaria.

## 11. Layout y navegación

El diseño debe utilizar Bento Grid y composiciones editoriales.

Los elementos deben organizarse de manera intencional.

Evitar construir todas las secciones mediante tarjetas idénticas.

Cada sección debe tener una composición visual propia, manteniendo consistencia en:

- Espaciado.
- Bordes.
- Alineaciones.
- Tipografía.
- Proporciones.
- Contraste.

### Sistema de secciones tipo diapositivas

La experiencia debe sentirse como una presentación interactiva.

Se debe evaluar CSS Scroll Snap como mecanismo principal.

Características esperadas:

- Secciones organizadas verticalmente.
- Indicador de sección en el lado derecho.
- Navegación directa entre secciones.
- Indicador del estado actual.
- Transiciones suaves.
- Compatibilidad con teclado y dispositivos táctiles.

No implementar scroll hijacking agresivo.

No interceptar innecesariamente los eventos de rueda del mouse.

El usuario debe conservar el comportamiento natural de navegación.

En dispositivos móviles, adaptar el sistema para priorizar la legibilidad y el desplazamiento natural.

El agente debe documentar cómo resolverá los casos donde una sección tenga más contenido que la altura del viewport.

## 12. Animaciones

Principio:

Make the interface feel alive, not animated.

Preferir:

- Opacity.
- Transform.
- Scale.
- Translate.
- Border transitions.

Las animaciones deben tener un propósito.

Evitar:

- Parallax excesivo.
- Animaciones infinitas innecesarias.
- Grandes transformaciones.
- Efectos que distraigan.
- Dependencias pesadas para interacciones simples.

Respetar siempre prefers-reduced-motion.

## 13. Responsive

El diseño debe contemplar:

- Desktop.
- Tablet.
- Mobile.

No asumir que responsive consiste únicamente en reducir tamaños.

Cada composición debe adaptarse a su viewport.

Verificar especialmente:

- Navegación.
- Hero.
- Bento Grid.
- Indicador lateral.
- Secciones.
- Tipografía.
- Imágenes.
- Espaciado.

Nunca aceptar overflow horizontal como comportamiento esperado.

## 14. Accesibilidad

Toda implementación debe considerar:

- HTML semántico.
- Navegación mediante teclado.
- Focus states.
- Contraste.
- Alt text.
- Links accesibles.
- Botones accesibles.
- Reduced motion.
- Navegación comprensible sin depender únicamente del color.

La experiencia de diapositivas no debe impedir el acceso al contenido mediante tecnologías de asistencia.

## 15. Contenido profesional

El agente no debe inventar información.

Nunca inventar:

- Experiencia.
- Empresas.
- Proyectos.
- Logros.
- Certificaciones.
- Tecnologías.
- Habilidades.
- Métricas.
- Responsabilidades.

Priorizar el contenido existente.

Si falta información importante, solicitarla al usuario.

Se puede mejorar la redacción y presentación del contenido sin modificar su significado.

## 16. Dependencias y tecnologías

Antes de instalar una dependencia nueva, comprobar si el problema puede resolverse con las tecnologías existentes.

Prioridad:

CSS
↓
Astro
↓
JavaScript nativo
↓
Dependencia externa

Toda dependencia nueva debe justificarse mediante:

- Problema que resuelve.
- Limitaciones de la solución actual.
- Razón para elegirla.
- Impacto en rendimiento.
- Impacto en mantenimiento.

No cambiar el framework ni la arquitectura principal sin aprobación.

## 17. Gestión de paquetes

El gestor de paquetes oficial del proyecto es pnpm.

Reglas:

- Utilizar pnpm para instalar dependencias.
- Utilizar pnpm para ejecutar scripts.
- No utilizar npm.
- No utilizar yarn.
- No generar package-lock.json.
- Conservar pnpm-lock.yaml.
- No cambiar el gestor de paquetes.

Ejemplos:

```bash
pnpm install
pnpm dev
pnpm build
pnpm exec astro check
```

Los comandos deben adaptarse a los scripts realmente disponibles en package.json.

No asumir que todos los comandos anteriores están configurados como scripts.

## 18. Rendimiento

Priorizar:

- Static rendering cuando corresponda.
- Optimización de imágenes.
- Lazy loading.
- JavaScript mínimo.
- CSS eficiente.
- Reutilización de componentes.
- Evitar dependencias pesadas.

No optimizar prematuramente.

Primero identificar y medir problemas reales.

## 19. División Cloud / Local

El proyecto utiliza dos entornos de modelos.

### Cloud Models

Responsabilidades:

- Discovery.
- Análisis arquitectónico.
- Interpretación de SPEC.md.
- Análisis visual.
- Planificación.
- Identificación de riesgos.
- Revisión de código.
- Validación de cumplimiento.

### Qwen Local

Responsabilidades:

- Implementación de componentes.
- Modificación de estilos.
- Refactoring.
- Implementación de interacciones.
- Corrección de errores.
- Ejecución de pruebas.
- Ajustes responsive.

Qwen debe recibir instrucciones concretas y un plan aprobado.

No transferir tareas complejas mediante instrucciones vagas.

## 20. Human-in-the-loop

El usuario conserva el control de las decisiones importantes.

Antes de cambios significativos, presentar:

- Objetivo.
- Plan.
- Decisiones.
- Supuestos.
- Riesgos.
- Archivos afectados.
- Criterios de aceptación.

Esperar aprobación cuando el cambio afecte:

- Arquitectura.
- Identidad visual.
- Dependencias importantes.
- Contenido profesional.
- Navegación.
- Comportamiento general.

Los cambios pequeños y reversibles pueden realizarse autónomamente si respetan SPEC.md.

## 21. Implementación incremental

La implementación debe dividirse en fases independientes.

Cada fase debe contener:

```text
Phase:
    Nombre de la fase

Objective:
    Objetivo

Components:
    Componentes afectados

Files:
    Archivos afectados

Changes:
    Cambios esperados

Dependencies:
    Dependencias

Responsive:
    Comportamiento esperado

Acceptance criteria:
    Criterios verificables

Validation:
    Pruebas necesarias
```

Después de cada fase:

IMPLEMENT
↓
BUILD
↓
CHECK
↓
VISUAL INSPECTION
↓
FIX
↓
APPROVE
↓
NEXT PHASE

No acumular demasiados cambios sin validación.

## 22. Validación técnica

Después de cada fase importante, ejecutar las validaciones disponibles.

Como mínimo:

```bash
pnpm build
pnpm exec astro check
```

También ejecutar, cuando existan:

- Lint.
- Tests.
- Typecheck.

Si una validación falla:

1. Identificar el error.
2. Determinar su origen.
3. Corregirlo.
4. Ejecutar nuevamente la validación.
5. Reportar cualquier problema pendiente.

Nunca declarar una fase completa si existen errores introducidos por su implementación.

## 23. Validación visual

Comparar la implementación con SPEC.md y las referencias proporcionadas.

Evaluar:

- Identidad monocromática.
- Jerarquía editorial.
- Composición Bento.
- Espaciado.
- Contraste.
- Tipografía.
- Calidad de las imágenes.
- Consistencia entre secciones.
- Navegación tipo presentación.
- Indicador lateral.
- Responsive.

No considerar una implementación terminada únicamente porque compila.

La validación visual es obligatoria.

## 24. Definition of Done

Una fase se considera terminada cuando:

- Cumple su objetivo.
- Respeta SPEC.md.
- Conserva el código útil.
- No introduce dependencias innecesarias.
- El build funciona.
- Astro check funciona cuando está disponible.
- Las pruebas correspondientes pasan.
- Responsive está validado.
- No existe overflow horizontal.
- Accesibilidad básica está cubierta.
- La experiencia visual fue inspeccionada.
- El usuario recibió un reporte.

## 25. Reporte de implementación

Después de cada fase, generar:

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
- Astro Check: PASS/FAIL
- Tests: PASS/FAIL
- Lint: PASS/FAIL
- Typecheck: PASS/FAIL
- Visual inspection: PASS/FAIL

## Remaining issues
- ...
```

No ocultar problemas conocidos.

## 26. Autonomía del agente

El agente puede decidir:

- Nombres internos.
- Organización de componentes.
- Pequeños detalles CSS.
- Refactors locales.
- Implementaciones internas.
- Ajustes menores de espaciado.

El agente no puede decidir unilateralmente:

- Cambiar la identidad visual.
- Cambiar la stack.
- Inventar contenido.
- Instalar dependencias importantes.
- Reestructurar toda la aplicación.
- Eliminar funcionalidades.
- Cambiar el comportamiento de navegación.
- Reemplazar la tipografía sin justificación.

## 27. Anti-patterns

No hacer:

```text
Rewrite everything.
```

```text
Generate a generic AI portfolio.
```

```text
Install a UI library without justification.
```

```text
Animate every element.
```

```text
Use glassmorphism everywhere.
```

```text
Use arbitrary colors.
```

```text
Implement scroll hijacking.
```

```text
Invent professional experience.
```

```text
Replace working architecture without justification.
```

```text
Skip visual validation.
```

```text
Use npm or yarn instead of pnpm.
```

## 28. Workflow recomendado

### Stage 1 — Discovery

- Leer AGENTS.md.
- Revisar SPEC.md si existe.
- Inspeccionar el repositorio.
- Identificar arquitectura.
- Identificar código reutilizable.
- Presentar reporte.

### Stage 2 — Specification

- Analizar requisitos.
- Definir identidad visual.
- Definir colores y tipografía.
- Definir navegación.
- Definir layout.
- Definir secciones.
- Definir responsive.
- Documentar criterios de aceptación.

### Stage 3 — Planning

- Crear docs/IMPLEMENTATION-PLAN.md.
- Dividir en fases.
- Identificar dependencias.
- Identificar archivos afectados.
- Definir validaciones.
- Presentar plan para aprobación.

### Stage 4 — Implementation

- Transferir fases aprobadas a Qwen Local.
- Implementar incrementalmente.
- Ejecutar build.
- Ejecutar verificaciones.
- Inspeccionar visualmente.
- Corregir problemas.

### Stage 5 — Review

- Revisar implementación con Cloud.
- Comparar contra SPEC.md.
- Identificar inconsistencias.
- Documentar correcciones.
- Transferir ajustes a Qwen.

### Stage 6 — Final Validation

- Build.
- Lint.
- Typecheck.
- Tests.
- Responsive.
- Accessibility.
- Performance.
- Visual review.

## 29. Principio final

**The portfolio is not a demonstration of AI-generated effects. It is a demonstration of software engineering quality and design awareness.**

Cada decisión debe contribuir a comunicar:

- Technical competence.
- Professionalism.
- Quality.
- Structure.
- Attention to detail.
- Design awareness.

El resultado debe sentirse diseñado deliberadamente, no generado automáticamente.

El objetivo no es construir el portfolio más llamativo posible.

El objetivo es construir uno que sea visualmente memorable, profesional y técnicamente sólido.