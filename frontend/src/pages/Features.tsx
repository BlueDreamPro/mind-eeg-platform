import { Link } from 'react-router-dom'
import {
  Brain,
  BarChart3,
  ShieldCheck,
  TrendingUp,
  FileText,
  Users,
  ArrowRight,
} from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'EEG 脑电采集',
    desc: '支持便携式脑电设备或 EEG 文件上传，记录学生在压力任务中的脑电变化。',
  },
  {
    icon: FileText,
    title: 'STAI-S 量表绑定',
    desc: '将学生自评状态焦虑量表与 EEG 数据绑定，形成主观 + 客观双模态数据。',
  },
  {
    icon: BarChart3,
    title: 'AI 焦虑评分预测',
    desc: '模型输出 STAI-S 预测分数，辅助判断当前焦虑状态。',
  },
  {
    icon: ShieldCheck,
    title: '风险等级判断',
    desc: '将学生划分为低风险、中风险、高风险，方便心理老师优先处理。',
  },
  {
    icon: Brain,
    title: '可解释性脑区分析',
    desc: '展示模型关注的脑区、时间窗口和脑电响应强度。',
  },
  {
    icon: TrendingUp,
    title: '群体趋势分析',
    desc: '支持按年级、专业、时间段统计学生焦虑风险趋势。',
  },
]

const roles = [
  { icon: Users, title: '学生端', desc: '完成任务、佩戴设备、填写量表。' },
  { icon: FileText, title: '心理老师端', desc: '查看报告、跟踪风险、安排复核。' },
  { icon: BarChart3, title: '管理端', desc: '管理数据、模型版本和群体报告。' },
]

function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      <h2 className="text-2xl font-bold text-slate-900 lg:text-3xl">{title}</h2>
      {subtitle && <p className="mt-3 text-slate-500">{subtitle}</p>}
    </div>
  )
}

export default function Features() {
  return (
    <main>
      {/* ── Header ── */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 py-20">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="text-4xl font-extrabold text-white lg:text-5xl">
            从脑电采集到风险报告的一站式辅助筛查
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
            面向高校心理健康中心，提供学生焦虑风险评估、趋势跟踪和可解释性报告。
          </p>
        </div>
      </section>

      {/* ── Feature cards ── */}
      <section className="bg-slate-50 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            title="系统核心功能"
            subtitle="从 EEG 采集到 AI 分析，覆盖完整筛查流程"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:shadow-md"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 text-blue-600">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{f.title}</h3>
                <p className="mt-3 leading-relaxed text-slate-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── User roles ── */}
      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            title="适用角色"
            subtitle="面向高校不同角色的心理健康服务需求"
          />
          <div className="grid gap-8 md:grid-cols-3">
            {roles.map((r) => (
              <div key={r.title} className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-lg shadow-blue-500/25">
                  <r.icon className="h-8 w-8" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-slate-900">{r.title}</h3>
                <p className="mt-2 text-slate-500">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <Link
            to="/new-assessment"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-xl"
          >
            体验完整流程 Demo
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <p className="text-sm text-slate-400">
            本系统仅用于校园心理健康辅助筛查，不作为医学诊断依据。
          </p>
        </div>
      </footer>
    </main>
  )
}
