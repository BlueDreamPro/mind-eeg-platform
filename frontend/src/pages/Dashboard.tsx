import { Link } from 'react-router-dom'
import { PlusCircle, FileText, BarChart3, Users, Activity, AlertTriangle } from 'lucide-react'

const overviewCards = [
  { label: '本月评估总数', value: 326, icon: Users, color: 'text-blue-600 bg-blue-50' },
  { label: '待处理高风险', value: 22, icon: AlertTriangle, color: 'text-red-600 bg-red-50' },
  { label: '需复核人数', value: 31, icon: Activity, color: 'text-orange-600 bg-orange-50' },
  { label: '已完成报告', value: 295, icon: FileText, color: 'text-emerald-600 bg-emerald-50' },
]

const quickActions = [
  { label: '新建评估', desc: '导入 EEG 数据并进行 AI 分析', to: '/new-assessment', icon: PlusCircle, color: 'from-blue-600 to-cyan-500' },
  { label: '查看报告', desc: '查看学生焦虑风险评估报告', to: '/report', icon: FileText, color: 'from-violet-600 to-purple-500' },
  { label: '群体趋势', desc: '全校学生焦虑风险分布与趋势', to: '/group-analytics', icon: BarChart3, color: 'from-emerald-600 to-teal-500' },
]

export default function Dashboard() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900">系统总览</h1>
            <p className="mt-1 text-slate-500">MindEEG 校园心理健康智能筛查平台运行概览</p>
          </div>

          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {overviewCards.map((c) => (
              <div key={c.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${c.color}`}>
                    <c.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">{c.label}</div>
                    <div className="text-2xl font-bold text-slate-900">{c.value}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h2 className="mb-4 text-lg font-semibold text-slate-900">快捷操作</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {quickActions.map((a) => (
              <Link
                key={a.label}
                to={a.to}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
              >
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${a.color} text-white shadow-lg`}>
                  <a.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-slate-900">{a.label}</h3>
                <p className="mt-1 text-sm text-slate-500">{a.desc}</p>
              </Link>
            ))}
          </div>
        </div>
  )
}
