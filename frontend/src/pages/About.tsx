import {
  Brain,
  Users,
  Calendar,
  AlertTriangle,
  FileCheck,
  BookOpen,
  Monitor,
  Palette,
  FileText,
  Award,
  CheckCircle2,
} from 'lucide-react'

const team = [
  { role: '项目负责人', icon: Users, tasks: '项目统筹、需求分析、答辩汇报', color: 'text-blue-600', bg: 'bg-blue-50' },
  { role: '算法组', icon: Brain, tasks: 'EEG 预处理、mdJPT 预训练、模型微调', color: 'text-violet-600', bg: 'bg-violet-50' },
  { role: '前端组', icon: Monitor, tasks: '静态网页、系统 Demo、报告页面', color: 'text-cyan-600', bg: 'bg-cyan-50' },
  { role: '设计组', icon: Palette, tasks: 'UI 视觉设计、流程图、展示材料', color: 'text-pink-600', bg: 'bg-pink-50' },
  { role: '文档组', icon: FileText, tasks: '商业计划书、项目计划书、伦理合规材料', color: 'text-amber-600', bg: 'bg-amber-50' },
]

const timeline = [
  { period: '1月 — 2月', title: '理论调研与数据集整理', desc: '收集 EEG 公开数据集，调研焦虑识别相关文献与模型方法。' },
  { period: '3月 — 4月', title: '公开 EEG 数据预处理', desc: '对 DASPS、SAM40、EEGMAT、DEAP 数据进行标准化预处理与特征工程。' },
  { period: '5月 — 7月', title: '多源 EEG 联合预训练', desc: '搭建 mdJPT 框架，完成多数据集联合预训练与跨域对齐。' },
  { period: '8月 — 10月', title: '本校 STAI-S EEG 数据采集', desc: '采集本校学生 EEG 数据并绑定 STAI-S 量表，构建小样本标注数据集。' },
  { period: '11月 — 次年1月', title: '模型微调与系统开发', desc: '完成模型微调、系统前端开发与 Demo 部署。' },
  { period: '次年2月 — 4月', title: '评估测试与成果总结', desc: '系统评估测试，完善参赛材料，撰写研究报告与论文。' },
]

const outcomes = [
  { icon: Monitor, title: '静态系统 Demo', desc: '一套完整的静态网页前端展示系统' },
  { icon: Brain, title: 'EEG 焦虑风险模型', desc: '一套基于 mdJPT 的焦虑风险辅助筛查模型' },
  { icon: BookOpen, title: '本校 EEG-STAI-S 数据集', desc: '一个小规模本校学生 EEG 与状态焦虑标注数据集' },
  { icon: FileCheck, title: '评估报告模板', desc: '一份标准化的学生焦虑风险评估报告模板' },
  { icon: FileText, title: '研究报告或论文', desc: '一篇技术研究报告或学术论文' },
  { icon: Award, title: '软件著作权', desc: '一个软件著作权登记' },
  { icon: Calendar, title: '答辩展示材料', desc: '一套互联网+创新创业大赛答辩展示材料' },
]

const ethics = [
  { icon: CheckCircle2, text: '知情同意：所有参与学生均签署知情同意书' },
  { icon: CheckCircle2, text: '匿名化处理：学生身份信息使用匿名编号，不关联真实姓名' },
  { icon: CheckCircle2, text: '数据加密存储：EEG 数据和量表结果加密存储，仅授权人员可以访问' },
  { icon: CheckCircle2, text: '辅助筛查定位：评估结果仅用于辅助筛查，不作为医学诊断依据' },
  { icon: CheckCircle2, text: '心理老师复核：所有风险判断必须经过心理老师复核确认' },
]

function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      <h2 className="text-2xl font-bold text-slate-900 lg:text-3xl">{title}</h2>
      {subtitle && <p className="mt-3 text-slate-500">{subtitle}</p>}
    </div>
  )
}

export default function About() {
  return (
    <main>
      {/* ── Header ── */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col items-center gap-5 sm:flex-row sm:justify-center">
            <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/30">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-extrabold text-white lg:text-5xl">关于项目</h1>
              <p className="mt-3 max-w-xl text-lg leading-relaxed text-slate-300">
                心脑智评 MindEEG：面向高校心理健康的脑电焦虑风险智能筛查平台
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Project intro ── */}
      <section className="bg-slate-50 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading title="项目简介" />
          <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="leading-relaxed text-slate-600">
              本项目面向高校心理健康服务场景，融合 EEG 脑电信号、STAI-S 状态焦虑量表和 AI
              表征学习模型，实现大学生亚临床焦虑状态的客观量化与辅助筛查。系统通过采集学生 EEG
              脑电数据，结合 STAI-S 自评量表，利用 mdJPT 多数据集联合预训练框架进行 AI
              分析，输出 STAI-S 预测分数、焦虑风险等级和可解释性报告，为高校心理老师提供科学、客观的辅助筛查工具。
            </p>
            <div className="mt-6 rounded-xl bg-blue-50 px-5 py-4">
              <p className="text-sm font-medium text-blue-800">
                本系统仅用于校园心理健康辅助筛查，不作为医学诊断依据。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            title="团队分工"
            subtitle="跨学科协作，覆盖算法、工程、设计与项目管理"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {team.map((member) => (
              <div key={member.role} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm text-center">
                <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-xl ${member.bg} ${member.color}`}>
                  <member.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-3 font-semibold text-slate-900">{member.role}</h3>
                <p className="mt-2 text-xs text-slate-500">{member.tasks}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="bg-slate-50 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            title="项目进度时间轴"
            subtitle="从理论调研到成果总结，规划完整研发周期"
          />
          <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-6">
            {timeline.map((item, i) => (
              <div key={item.period} className="relative flex flex-col items-center text-center">
                {/* Step number */}
                <div className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold shadow-sm ${
                  i <= 3 ? 'bg-blue-600 text-white' : 'border-2 border-slate-300 bg-white text-slate-400'
                }`}>
                  {i + 1}
                </div>

                {/* Horizontal connecting line — desktop only */}
                {i < timeline.length - 1 && (
                  <div className="absolute left-[calc(50%+20px)] top-5 hidden h-0.5 lg:block"
                    style={{ width: 'calc(100% - 40px)' }}>
                    <div className={`h-full ${i < 3 ? 'bg-blue-200' : 'bg-slate-200'}`} />
                  </div>
                )}

                {/* Content */}
                <div className={`mt-4 px-2 ${i < 4 ? '' : 'opacity-60'}`}>
                  <span className={`inline-block rounded-full px-3 py-0.5 text-xs font-medium ${
                    i <= 3 ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {item.period}
                  </span>
                  <h3 className="mt-2 text-sm font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Expected outcomes ── */}
      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            title="预期成果"
            subtitle="项目周期内的核心交付物"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {outcomes.map((outcome) => (
              <div key={outcome.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <outcome.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-3 text-sm font-semibold text-slate-900">{outcome.title}</h3>
                <p className="mt-1.5 text-xs text-slate-500">{outcome.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ethics compliance ── */}
      <section className="bg-slate-50 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            title="伦理合规说明"
            subtitle="本项目在严格的伦理合规框架内开展"
          />
          <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="space-y-3">
              {ethics.map((item) => (
                <div key={item.text} className="flex items-start gap-3 rounded-lg bg-emerald-50/50 px-4 py-3">
                  <item.icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-500" />
                  <p className="text-sm text-slate-700">{item.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-xl bg-amber-50 border border-amber-100 px-5 py-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-500" />
                <p className="text-sm text-amber-800">
                  本项目为智慧教育与数字心理健康交叉研究项目，所有研究和系统展示均在伦理合规框架内进行。
                  系统结果仅供参考，不构成任何形式的医学诊断或临床建议。
                </p>
              </div>
            </div>
          </div>
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
