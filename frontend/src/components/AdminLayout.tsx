import { Outlet, Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  PlusCircle,
  Database,
  FileText,
  BarChart3,
  Cpu,
  Settings,
} from 'lucide-react'

const sidebarItems = [
  { icon: LayoutDashboard, label: '总览', to: '/dashboard' },
  { icon: PlusCircle, label: '新建评估', to: '/new-assessment' },
  { icon: Database, label: 'EEG 数据管理', to: '/eeg-data' },
  { icon: FileText, label: '学生评估报告', to: '/report' },
  { icon: BarChart3, label: '群体趋势分析', to: '/group-analytics' },
  { icon: Cpu, label: '模型训练状态', to: '/model-training' },
  { icon: Settings, label: '系统设置', to: '/settings' },
]

export default function AdminLayout() {
  const location = useLocation()

  return (
    <div className="flex min-h-[calc(100vh-57px)]">
      <aside className="hidden w-56 flex-shrink-0 border-r border-slate-200 bg-white lg:block">
        <nav className="space-y-1 p-3">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.to
            return (
              <Link
                key={item.label}
                to={item.to}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </aside>

      <div className="flex-1 overflow-auto bg-slate-50">
        <Outlet />
      </div>
    </div>
  )
}
