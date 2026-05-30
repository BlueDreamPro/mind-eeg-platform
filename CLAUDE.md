# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

**心脑智评 MindEEG** — a campus mental health EEG anxiety risk intelligent screening platform for universities. It is a smart-education + digital-mental-health project, NOT a medical diagnosis system.

The repo contains a single `frontend/` workspace. All commands below are run from `frontend/`.

Full project docs: `MindEEG_AI交接文档.md` and `MindEEG_页面生成提示词合集.md` at the repo root.

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Start Vite dev server (HMR) |
| `npm run build` | Type-check with `tsc -b` then production build with Vite |
| `npm run lint` | Run ESLint flat config on all files |
| `npm run preview` | Preview the production build locally |

No test framework or test scripts are configured yet.

## Tech stack

- **React 19** — JSX runtime `react-jsx`
- **TypeScript 6.0** — project references, strict mode with `noUnusedLocals` and `noUnusedParameters`
- **Vite 8** — `@vitejs/plugin-react` (Oxc-based) + `@tailwindcss/vite`
- **Tailwind CSS v4** — `@import "tailwindcss"` in `index.css`, no config file
- **ESLint 10** — flat config
- **react-router-dom v7** — wired up with `createBrowserRouter` + `RouterProvider`
- **recharts v3** — for charts (EEG visualization, trends)
- **lucide-react** — icon library

No state management library or HTTP client yet. No testing framework.

## Architecture

```
src/
  main.tsx          Entry point — RouterProvider with createBrowserRouter
  App.tsx            Layout wrapper — Navbar + Outlet
  index.css          Tailwind v4 import
  components/
    Navbar.tsx       Global nav with logo, links, mobile menu, Demo CTA
  pages/
    Home.tsx         Landing page (hero, pain points, solution flow, values)
    Features.tsx     Product features page
    Technology.tsx   Tech roadmap (4-layer: data → preprocessing → model → application)
    NewAssessment.tsx  EEG import Demo page (placeholder)
    Report.tsx       Student report page (placeholder)
    GroupAnalytics.tsx  Group trends page (placeholder)
    About.tsx        About/project info page (placeholder)
  routes/
    index.tsx        Route config with createBrowserRouter
  mock/
    studentAssessment.ts  Mock data (student info, EEG, STAI-S, report preview)
  services/
    api.ts           API placeholder with mock/real switch (`USE_MOCK` flag)
  types/             (empty)
  utils/             (empty)
```

No path aliases in `vite.config.ts` — relative imports only.

## Design constraints

- **Not a medical system** — always say "辅助筛查", "风险预警", "心理老师复核", never "诊断", "治疗", "临床确诊"
- **Disclaimer required** on every page: "本系统仅用于校园心理健康辅助筛查，不作为医学诊断依据。"
- Color scheme: tech blue + cyan-green + light gray-white. Risk colors: green (low), orange (medium), red (high).
- Target: internet+ innovation competition presentation. Modern SaaS/product style, not hospital/medical.
- All data from `src/mock/`. Future backend: Python + FastAPI (endpoints reserved in `services/api.ts`).
