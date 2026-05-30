import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Brain, Menu, X } from 'lucide-react'

// "系统 Demo" is the parent for all admin sub-pages except /report
const demoPaths = [
  '/new-assessment',
  '/dashboard',
  '/eeg-data',
  '/group-analytics',
  '/model-training',
  '/settings',
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  const isDemoActive = demoPaths.includes(location.pathname)

  const navLinkClass = (isActive: boolean) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
      isActive
        ? 'bg-blue-50 text-blue-700'
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
    }`

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500">
            <Brain className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold text-slate-900">
            心脑智评 <span className="text-blue-600">MindEEG</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          <NavLink to="/" end className={({ isActive }) => navLinkClass(isActive)}>
            首页
          </NavLink>
          <NavLink to="/features" className={({ isActive }) => navLinkClass(isActive)}>
            产品功能
          </NavLink>
          <NavLink to="/technology" className={({ isActive }) => navLinkClass(isActive)}>
            技术路线
          </NavLink>
          <NavLink
            to="/new-assessment"
            className={navLinkClass(isDemoActive)}
          >
            系统 Demo
          </NavLink>
          <NavLink to="/report" className={({ isActive }) => navLinkClass(isActive)}>
            评估报告
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => navLinkClass(isActive)}>
            关于我们
          </NavLink>
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            to="/new-assessment"
            className="rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-2.5 text-sm font-medium text-white shadow-md shadow-blue-500/25 transition-all hover:shadow-lg hover:shadow-blue-500/30"
          >
            体验 Demo
          </Link>
        </div>

        <button
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white px-4 pb-4 lg:hidden">
          <NavLink to="/" end onClick={() => setOpen(false)} className={({ isActive }) => `${navLinkClass(isActive)} block`}>
            首页
          </NavLink>
          <NavLink to="/features" onClick={() => setOpen(false)} className={({ isActive }) => `${navLinkClass(isActive)} block`}>
            产品功能
          </NavLink>
          <NavLink to="/technology" onClick={() => setOpen(false)} className={({ isActive }) => `${navLinkClass(isActive)} block`}>
            技术路线
          </NavLink>
          <NavLink to="/new-assessment" onClick={() => setOpen(false)} className={`${navLinkClass(isDemoActive)} block`}>
            系统 Demo
          </NavLink>
          <NavLink to="/report" onClick={() => setOpen(false)} className={({ isActive }) => `${navLinkClass(isActive)} block`}>
            评估报告
          </NavLink>
          <NavLink to="/about" onClick={() => setOpen(false)} className={({ isActive }) => `${navLinkClass(isActive)} block`}>
            关于我们
          </NavLink>
          <Link
            to="/new-assessment"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-2.5 text-center text-sm font-medium text-white"
          >
            体验 Demo
          </Link>
        </div>
      )}
    </nav>
  )
}
