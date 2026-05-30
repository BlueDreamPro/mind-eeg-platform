import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Brain,
  Activity,
  ShieldCheck,
  Eye,
  FileText,
  Stethoscope,
  Users,
  Zap,
  TrendingUp,
} from 'lucide-react'

const painPoints = [
  {
    icon: FileText,
    title: '问卷主观性强',
    description:
      '学生可能因隐私顾虑、随意填写或社会赞许性等原因，导致自评量表结果存在偏差，难以准确反映真实心理状态。',
  },
  {
    icon: Users,
    title: '心理老师资源有限',
    description:
      '高校学生人数众多，心理老师配比不足，难以对所有学生进行持续、动态、精细的心理状态跟踪与早期识别。',
  },
  {
    icon: Eye,
    title: '亚临床焦虑隐蔽',
    description:
      '许多学生未达到临床诊断标准，但已出现学习效率下降、睡眠变差、社交回避等问题，如不早期识别可能进一步发展。',
  },
]

const solutionSteps = [
  { icon: Brain, label: '佩戴 EEG 设备', desc: '学生佩戴便携式脑电设备' },
  { icon: Activity, label: '完成压力任务', desc: '限时心算与认知任务' },
  { icon: Zap, label: 'EEG 预处理', desc: '自动去噪、滤波与通道映射' },
  { icon: TrendingUp, label: 'AI 模型分析', desc: 'mdJPT 预测焦虑评分' },
  { icon: ShieldCheck, label: '风险等级判断', desc: '低/中/高风险分级' },
  { icon: Stethoscope, label: '心理老师复核', desc: '访谈确认与干预建议' },
]

const values = [
  {
    icon: Activity,
    title: '客观',
    subtitle: '引入 EEG 生理信号',
    description: '以脑电客观指标补充主观问卷，降低自评偏差对筛查结果的影响。',
  },
  {
    icon: Eye,
    title: '早期',
    subtitle: '识别潜在焦虑风险',
    description: '在亚临床阶段发现焦虑倾向，为心理老师提供早期预警信号。',
  },
  {
    icon: Zap,
    title: '泛化',
    subtitle: '多源 EEG 预训练',
    description: 'mdJPT 框架整合多个公开 EEG 数据集预训练，提升跨被试泛化能力。',
  },
  {
    icon: Brain,
    title: '可解释',
    subtitle: '脑区响应可视化',
    description: '展示模型关注的脑区、时间窗口和响应强度，辅助心理老师理解评估依据。',
  },
]

export default function Home() {
  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 lg:flex lg:items-center lg:gap-16 lg:py-28">
          <div className="lg:w-1/2">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-sm text-blue-300">
              <Brain className="h-4 w-4" />
              面向高校心理健康的 AI 筛查平台
            </div>
            <h1 className="text-4xl font-extrabold leading-tight text-white lg:text-5xl lg:leading-tight">
              用脑电信号，让校园心理健康筛查更客观
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-slate-300">
              融合 EEG 脑电采集、多源脑电预训练模型与 STAI-S
              量表评估，实现大学生亚临床焦虑状态的连续量化与风险预警。
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/technology"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg transition-all hover:bg-slate-100"
              >
                查看系统流程
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/new-assessment"
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:shadow-xl hover:shadow-blue-500/40"
              >
                体验静态 Demo
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Hero illustration */}
          <div className="mt-14 lg:mt-0 lg:w-1/2">
            <div className="relative mx-auto max-w-md">
              {/* Main panel */}
              <div className="rounded-2xl border border-slate-700/60 bg-slate-800/80 p-5 shadow-2xl backdrop-blur">
                {/* Header bar */}
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400">
                    <Brain className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">MindEEG 分析面板</div>
                    <div className="text-xs text-slate-400">mdJPT v1.0 · 实时分析中</div>
                  </div>
                </div>

                {/* Waveform placeholder */}
                <div className="mb-4 rounded-xl bg-slate-900/80 p-3">
                  <div className="mb-2 text-xs text-slate-500">EEG 多通道波形</div>
                  <svg viewBox="0 0 300 50" className="h-12 w-full">
                    {[0, 1, 2, 3].map((row) => (
                      <path
                        key={row}
                        d={`M0,${13 + row * 12} Q20,${8 + row * 12} 40,${13 + row * 12} T80,${13 + row * 12} T120,${10 + row * 12} T160,${14 + row * 12} T200,${11 + row * 12} T240,${13 + row * 12} T280,${12 + row * 12} L300,${13 + row * 12}`}
                        fill="none"
                        stroke={row === 1 ? '#22d3ee' : row === 2 ? '#60a5fa' : '#475569'}
                        strokeWidth="1.2"
                      />
                    ))}
                  </svg>
                </div>

                {/* Risk card */}
                <div className="flex gap-3">
                  <div className="flex-1 rounded-xl border border-orange-500/30 bg-orange-500/10 p-3 text-center">
                    <div className="text-xs text-orange-300">风险等级</div>
                    <div className="mt-1 text-lg font-bold text-orange-400">中度风险</div>
                  </div>
                  <div className="flex-1 rounded-xl border border-blue-500/30 bg-blue-500/10 p-3 text-center">
                    <div className="text-xs text-blue-300">AI 预测 STAI-S</div>
                    <div className="mt-1 text-lg font-bold text-blue-400">52</div>
                  </div>
                  <div className="flex-1 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-center">
                    <div className="text-xs text-emerald-300">置信度</div>
                    <div className="mt-1 text-lg font-bold text-emerald-400">82%</div>
                  </div>
                </div>

                {/* Brain heatmap placeholder */}
                <div className="mt-4 rounded-xl bg-slate-900/80 p-3 text-center">
                  <div className="mb-2 text-xs text-slate-500">60 通道脑区热力图</div>
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-radial from-orange-500/40 via-blue-500/20 to-transparent">
                    <Brain className="h-10 w-10 text-cyan-400" />
                  </div>
                  <div className="mt-1 text-xs text-slate-500">
                    额叶 / 中央区 / 颞叶 响应增强
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -right-4 -top-4 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-300 backdrop-blur">
                ✓ 信号质量：良好
              </div>
              <div className="absolute -bottom-3 -left-3 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1.5 text-xs font-medium text-blue-300 backdrop-blur">
                60 channels · 125 Hz
              </div>
            </div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="h-16 bg-gradient-to-b from-transparent to-slate-50" />
      </section>

      {/* ── 痛点模块 ── */}
      <section className="bg-slate-50 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-slate-900 lg:text-4xl">
              高校心理健康筛查的现实挑战
            </h2>
            <p className="mt-4 text-lg text-slate-500">
              传统心理筛查依赖问卷自评，存在主观偏差、资源不足和早期识别困难等问题。
            </p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {painPoints.map((point) => (
              <div
                key={point.title}
                className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:shadow-md"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-500">
                  <point.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900">{point.title}</h3>
                <p className="mt-3 leading-relaxed text-slate-500">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 解决方案模块 ── */}
      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-slate-900 lg:text-4xl">
              从脑电采集到风险报告的一站式流程
            </h2>
            <p className="mt-4 text-lg text-slate-500">
              学生完成 EEG
              采集后，系统自动完成预处理、AI 分析和风险报告生成，心理老师进行最终复核。
            </p>
          </div>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {solutionSteps.map((step, i) => (
              <div key={step.label} className="relative text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-lg shadow-blue-500/25">
                  <step.icon className="h-7 w-7" />
                </div>
                <div className="mt-4 font-semibold text-slate-900">{step.label}</div>
                <div className="mt-1 text-sm text-slate-500">{step.desc}</div>
                {i < solutionSteps.length - 1 && (
                  <div className="absolute right-0 top-8 hidden -translate-y-1/2 translate-x-1/2 text-slate-300 lg:block">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 核心价值模块 ── */}
      <section className="bg-slate-50 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-slate-900 lg:text-4xl">为什么选择 MindEEG</h2>
            <p className="mt-4 text-lg text-slate-500">
              融合 EEG 脑电信号与 AI 表征学习，为高校心理健康筛查提供新工具。
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {values.map((val) => (
              <div
                key={val.title}
                className="group flex gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md sm:p-8"
              >
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 text-blue-600">
                  <val.icon className="h-7 w-7" />
                </div>
                <div>
                  <span className="inline-block rounded-md bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
                    {val.title}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold text-slate-900">{val.subtitle}</h3>
                  <p className="mt-2 leading-relaxed text-slate-500">{val.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-500 p-10 shadow-xl shadow-blue-500/20 lg:p-16">
            <h2 className="text-3xl font-bold text-white lg:text-4xl">
              准备好体验智能心理健康筛查了吗？
            </h2>
            <p className="mt-4 text-lg text-blue-100">
              查看系统 Demo，了解 MindEEG 如何帮助高校心理健康中心实现更客观的焦虑风险筛查。
            </p>
            <Link
              to="/new-assessment"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3.5 text-base font-semibold text-blue-700 shadow-lg transition-all hover:bg-blue-50"
            >
              体验 Demo
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-200 bg-slate-50 py-8">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <p className="text-sm text-slate-400">
            本系统仅用于校园心理健康辅助筛查，不作为医学诊断依据。
          </p>
          <p className="mt-2 text-xs text-slate-400">
            &copy; {new Date().getFullYear()} 心脑智评 MindEEG — 面向高校心理健康的脑电焦虑风险智能筛查平台
          </p>
        </div>
      </footer>
    </main>
  )
}
