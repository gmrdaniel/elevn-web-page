# Elevn — Sitio Web

**Designed and Built for Professional Creators**

Proyecto React + TypeScript con Vite. Espacio de trabajo configurado con las herramientas definidas.

## Stack

| Categoría | Herramientas |
|-----------|---------------|
| **Framework** | React (JSX), TypeScript |
| **Animaciones / UI** | Material UI, Shadcn/ui, Framer Motion, Anime.js |
| **Gráficos / Dashboards** | MUI X Charts, Recharts, Chart.js |
| **Navegación / Storytelling** | Anime.js + React, Shadcn |
| **Estilos** | Tailwind CSS, CSS variables (paleta Elevn) |

## Paleta de colores (Elevn)

- `#318CE7` — Primary
- `#0CB7F2` — Accent
- `#53d4ff` — Light
- `#8fe3ff` — Pale
- `#131c46` — Dark
- `#fcffff` — White

En código: variables CSS `--elevn-*`, Tailwind `bg-elevn-primary`, `text-elevn-dark`, etc., y tema MUI en `src/theme/elevnTheme.ts`.

## Requisitos

- Node.js 18+
- npm (o pnpm/yarn)

## Instalación

```bash
npm install
```

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo (Vite) |
| `npm run build` | Build de producción |
| `npm run preview` | Vista previa del build |
| `npm run lint` | Linter ESLint |

## Estructura relevante

```
src/
  components/   # Componentes reutilizables
    ui/          # Shadcn (Button, etc.)
  lib/           # Utilidades (cn, etc.)
  theme/         # Tema MUI (elevnTheme)
  index.css      # Tailwind + variables Elevn
```

## Añadir componentes Shadcn

```bash
npx shadcn@latest add button
npx shadcn@latest add card
# etc.
```

El proyecto ya incluye `components.json` y el alias `@/` configurado.

## Uso de librerías

- **Material UI**: importar desde `@mui/material`; el tema Elevn se aplica en `main.tsx`.
- **Shadcn**: componentes en `src/components/ui/`; usar `cn()` de `@/lib/utils` para clases.
- **Framer Motion**: `import { motion } from "framer-motion"`.
- **Anime.js**: `import anime from "animejs"` en efectos o refs.
- **Recharts / Chart.js / MUI X Charts**: importar desde sus paquetes según la documentación de cada uno.

---

Launch: Próximamente (Coming Soon)
