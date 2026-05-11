# ELEVN — Sitio Web

**Designed and Built for Professional Creators**

Proyecto React + TypeScript con Vite. Espacio de trabajo configurado con las herramientas definidas.

---

## Guía para empezar (paso a paso)

Esta guía es para alguien que **no es desarrollador**. Sigue los pasos en orden. Si algo falla, mira la sección **"Si algo no funciona"** al final.

---

### Paso 0 — Instalar los programas (solo la primera vez)

Necesitas instalar **tres** programas. Si ya los tienes, salta al Paso 1.

**1. Git** — descarga y abre el instalador. Deja todas las opciones por defecto.
👉 https://git-scm.com/download/win

**2. Node.js (versión LTS)** — descarga el instalador y dale "Siguiente" hasta el final.
👉 https://nodejs.org/

**3. Claude Code** — abre PowerShell y pega:

```powershell
npm install -g @anthropic-ai/claude-code
```

**Verifica que todo quedó bien instalado.** Cierra PowerShell, ábrelo de nuevo y escribe:

```powershell
git --version
node --version
claude --version
```

Si los tres comandos te dan un número de versión, listo. Si alguno dice "no se reconoce como comando", reinicia la computadora y prueba otra vez.

---

### Paso 1 — Entrar a GitHub

1. Abre tu navegador y entra a https://github.com.
2. Inicia sesión con tu cuenta.
3. Asegúrate de tener acceso al repositorio: https://github.com/gmrdaniel/elevn-web-page
   - Si no lo ves, pídele al administrador que te agregue.

---

### Paso 2 — Abrir la terminal

Presiona la tecla **Windows**, escribe `PowerShell` y ábrelo.

---

### Paso 3 — Crear la carpeta y descargar el proyecto

Copia y pega cada línea en PowerShell (presiona **Enter** después de cada una):

```powershell
cd $HOME\Documents
mkdir sitios
cd sitios
git clone https://github.com/gmrdaniel/elevn-web-page.git
cd elevn-web-page
```

> Esto crea una carpeta llamada `sitios` dentro de **Documentos**, descarga el proyecto y te mete dentro de su carpeta.

**La primera vez** que hagas `git clone`, Windows te va a abrir una ventana azul que dice **"Sign in to GitHub"**. Dale clic a **"Sign in with your browser"** y entra con tu cuenta. Esto solo pasa una vez.

---

### Paso 4 — Abrir Claude Code

Ya dentro de la carpeta `elevn-web-page`, escribe:

```powershell
claude
```

Se abrirá Claude Code dentro del proyecto.

---

### Paso 5 — Cambiar a la rama `develop`

En el chat de Claude, escribe:

> **Cámbiate a la rama develop**

Claude lo hace por ti. Espera a que te confirme.

---

### Paso 6 — Pedirle a Claude los cambios

Dile a Claude qué quieres cambiar. Ejemplo:

> **En la página inicial, cambia el título "Designed and Built for Professional Creators" por "Hecho para Creadores Profesionales".**

Claude busca el archivo, hace el cambio y te avisa.

---

### Paso 7 — Ver los cambios en el navegador

**No cierres** la ventana de Claude. Abre **otra ventana** de PowerShell (Windows → PowerShell otra vez).

En esa segunda ventana, pega esto:

```powershell
cd $HOME\Documents\sitios\elevn-web-page
npm install
npm run dev
```

- `npm install` instala lo necesario. **Tarda varios minutos**, pero solo la primera vez.
- `npm run dev` arranca el sitio en tu computadora. Cuando termine te mostrará una dirección como `http://localhost:8080`.

Abre esa dirección en tu navegador. **Ahí verás el sitio con tus cambios.** Si Claude hace más cambios, la página se actualiza sola.

---

### Paso 8 — Revisar

Navega por el sitio. Revisa que el cambio se vea bien y que no se haya roto otra cosa. Si algo no te gusta, regresa a la ventana de Claude y dile qué corregir, por ejemplo:

> **El título quedó muy pequeño, hazlo más grande.**

---

### Paso 9 — Guardar y subir los cambios

Cuando estés conforme, en la ventana de Claude escribe:

> **Genera el commit y haz push a la rama develop.**

Claude:
1. Guarda los cambios (commit).
2. Los sube a GitHub (push).

Cuando termine, **avísale a la persona encargada** que ya está listo.

---

### Paso 10 — Cerrar todo

- En la ventana donde está corriendo el sitio (`npm run dev`), presiona **Ctrl + C**.
- En la ventana de Claude, escribe `/exit` o simplemente cierra la ventana.

---

### Si algo no funciona

**"`claude` no se reconoce como comando"**
→ Cierra PowerShell, ábrelo de nuevo. Si sigue, repite el Paso 0 punto 3.

**"`git` o `npm` no se reconoce como comando"**
→ No tienes instalado Git o Node.js. Vuelve al Paso 0.

**Aparece error con `npm run dev`: "running scripts is disabled on this system"**
→ Pega esto en PowerShell y dale Enter:
```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```
Cuando te pregunte, escribe `S` o `Y`.

**Sale un error al hacer `git push`: "Permission denied" o "403"**
→ No tienes permisos para subir a `develop`. Pídele al administrador que te agregue como colaborador del repositorio.

**El puerto 8080 ya está en uso**
→ Significa que ya tienes otro `npm run dev` corriendo. Cierra la otra ventana y vuelve a intentar.

**Cualquier otro error**
→ Cópiale el error a Claude y pídele que te ayude:
> **Me salió este error: [pega el error]. ¿Qué hago?**

---

## Stack

| Categoría | Herramientas |
|-----------|---------------|
| **Framework** | React (JSX), TypeScript |
| **Animaciones / UI** | Material UI, Shadcn/ui, Framer Motion, Anime.js |
| **Gráficos / Dashboards** | MUI X Charts, Recharts, Chart.js |
| **Navegación / Storytelling** | Anime.js + React, Shadcn |
| **Estilos** | Tailwind CSS, CSS variables (paleta ELEVN) |

## Paleta de colores (ELEVN)

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
  index.css      # Tailwind + variables ELEVN
```

## Añadir componentes Shadcn

```bash
npx shadcn@latest add button
npx shadcn@latest add card
# etc.
```

El proyecto ya incluye `components.json` y el alias `@/` configurado.

## Uso de librerías

- **Material UI**: importar desde `@mui/material`; el tema ELEVN se aplica en `main.tsx`.
- **Shadcn**: componentes en `src/components/ui/`; usar `cn()` de `@/lib/utils` para clases.
- **Framer Motion**: `import { motion } from "framer-motion"`.
- **Anime.js**: `import anime from "animejs"` en efectos o refs.
- **Recharts / Chart.js / MUI X Charts**: importar desde sus paquetes según la documentación de cada uno.

---

Launch: Próximamente (Coming Soon)
