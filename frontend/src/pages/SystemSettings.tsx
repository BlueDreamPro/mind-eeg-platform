import { Bell, Shield, Database, Users } from 'lucide-react'

const settingGroups = [
  {
    icon: Bell,
    title: '通知设置',
    desc: '配置高风险预警通知和报告生成提醒',
    items: ['高风险学生邮件通知', '每周群体趋势报告', '模型训练完成提醒'],
  },
  {
    icon: Shield,
    title: '隐私与安全',
    desc: '数据加密、匿名化处理和访问控制配置',
    items: ['数据加密存储 (AES-256)', '学生身份匿名化处理', '角色权限管理'],
  },
  {
    icon: Database,
    title: '数据管理',
    desc: 'EEG 数据存储策略和自动清理规则',
    items: ['EEG 原始数据保留 12 个月', '评估报告永久保存', '自动备份 (每日)'],
  },
  {
    icon: Users,
    title: '账户管理',
    desc: '心理老师和系统管理员账户配置',
    items: ['心理老师账户：3 个', '管理员账户：1 个', '最后登录：2026-05-30 09:15'],
  },
]

export default function SystemSettings() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900">系统设置</h1>
            <p className="mt-1 text-slate-500">MindEEG 平台配置与管理</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {settingGroups.map((g) => (
              <div key={g.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <g.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{g.title}</h3>
                    <p className="text-xs text-slate-500">{g.desc}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {g.items.map((item) => (
                    <div key={item} className="rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
  )
}
