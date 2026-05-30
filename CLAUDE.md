# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

**心脑智评 MindEEG** — a campus mental health EEG anxiety risk intelligent screening platform for universities. It is a smart-education + digital-mental-health project, NOT a medical diagnosis system.

The repo contains a single `frontend/` workspace. All commands below are run from `frontend/`.

Key docs at repo root:
- `MindEEG_AI交接文档.md` — full project brief (domain, datasets, EEG pipeline, page specs)
- `MindEEG_页面生成提示词合集.md` — per-page prompt specifications
- `API交接文档.md` — backend API design (30+ endpoints, FastAPI target)

Quick start: double-click `start.bat` (Windows) or run `npm run dev` from `frontend/`.

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Start Vite dev server (HMR) |
| `npm run build` | Type-check with `tsc -b` then production build with Vite |
| `npm run lint` | Run ESLint flat config on all files |
| `npm run preview` | Preview the production build locally |

No test framework or test scripts exist yet.

## Tech stack

- **React 19** (react-dom, react-router-dom v7)
- **TypeScript 6.0** — project references, strict mode, `noUnusedLocals` / `noUnusedParameters`
- **Vite 8** — `@vitejs/plugin-react` (Oxc) + `@tailwindcss/vite`
- **Tailwind CSS v4** — `@import "tailwindcss"` in `index.css`, no config file; `print:` variant available
- **ESLint 10** — flat config in `eslint.config.js`
- **recharts v3** — AreaChart, BarChart, PieChart, LineChart
- **lucide-react** — all icons

No path aliases configured. No state management library. No HTTP client. No testing framework.

## Architecture

### Routing (`src/routes/index.tsx`)

Two layout tiers:

```
App (Navbar + Outlet)
├── /                    Home
├── /features            Features
├── /technology          Technology
├── /about               About
└── AdminLayout (sidebar + Outlet)
    ├── /dashboard           总览
    ├── /new-assessment      新建评估 (系统 Demo)
    ├── /eeg-data            EEG 数据管理
    ├── /report              学生评估报告
    ├── /group-analytics     群体趋势分析
    ├── /model-training      模型训练状态
    └── /settings            系统设置
```

`AdminLayout` (`src/components/AdminLayout.tsx`) provides a persistent left sidebar with 7 nav items; active state is driven by `useLocation()`. All admin pages render inside its `<Outlet />`.

### Top navbar active-state logic

`Navbar.tsx` uses `useLocation()` for the "系统 Demo" link: it highlights as active on all admin paths (`/dashboard`, `/new-assessment`, `/eeg-data`, `/group-analytics`, `/model-training`, `/settings`) except `/report` (which has its own nav item).

### Key pages

| Page | Status | Key features |
|---|---|---|
| `Home.tsx` | Full | Hero, pain-point cards, 6-step solution flow, 4 value cards, CTA |
| `Features.tsx` | Full | 6 feature cards, 3 user-role cards, shared `SectionHeading` |
| `Technology.tsx` | Full | 4 vertical layer blocks (color-coded), `ArrowDown` connectors, loss-function card |
| `NewAssessment.tsx` | Full | Interactive drag-and-drop file upload, 5-step progress, progressive reveal of cards, simulated 3s analysis with spinner, "查看评估报告" link post-analysis |
| `Report.tsx` | Full | Report switcher (`<select>` across 3 mock assessments), results merged into header, SVG risk gauge (real arcs, no dasharray hacks), SVG brain heatmap (viewBox 200×200), recharts trend AreaChart, window.print() PDF export with `@media print` rules |
| `GroupAnalytics.tsx` | Full | 5 stats cards, recharts donut/bar/line charts, high-risk table |
| `About.tsx` | Full | Horizontal timeline (6 cols desktop), icon left of title in header, team/outcomes/ethics sections |
| `Dashboard.tsx` | Full | 4 overview stats + 3 quick-action cards |
| `EEGDataManagement.tsx` | Full | Mock EEG file table with status badges |
| `ModelTraining.tsx` | Full | 7-stage pipeline (done/active/pending) + model metrics |
| `SystemSettings.tsx` | Full | 4 setting-group cards |

### Mock data (`src/mock/studentAssessment.ts`)

Exports 3 complete `AssessmentResult` objects (low/medium/high risk) plus per-report `trendDataMap`. `Report.tsx` switches between them via `selectedIdx` state. Backward-compatible: `mockAssessment` and `trendData` still export the first report.

### API layer (`src/services/api.ts`)

`USE_MOCK` flag controls mock vs. real backend. When `USE_MOCK=false`, `apiGet`/`apiPost` call `BASE_URL` (from `VITE_API_BASE_URL` env var). See `API交接文档.md` for the full endpoint design.

### Styling conventions

- `index.css` contains `@import "tailwindcss"`, `@keyframes fadeIn`, `.animate-fadeIn`, and `@media print` rules
- All pages use a shared `SectionHeading` component (inline, not extracted) with `text-2xl lg:text-3xl font-bold` + optional subtitle
- Header sections: `bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 py-20`, `max-w-7xl`
- Content sections alternate `bg-slate-50` / `bg-white` with `py-20 lg:py-24`
- All content containers use `max-w-7xl` (unified across pages)

## Design constraints

- **Not a medical system** — use "辅助筛查", "风险预警", "心理老师复核"; never "诊断", "治疗", "临床确诊"
- **Disclaimer** required on every page footer: "本系统仅用于校园心理健康辅助筛查，不作为医学诊断依据。"
- Color scheme: tech blue + cyan-green + light gray-white. Risk: green (low) / orange (medium) / red (high).
- DEAP dataset: always note it is used via low-valence/high-arousal/low-dominance samples, NOT as a direct anxiety dataset.
- Target audience: internet+ innovation competition judges. Modern SaaS/product style, never hospital/medical aesthetic.
