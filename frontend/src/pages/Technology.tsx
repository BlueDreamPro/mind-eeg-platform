import { Database, Settings, Brain, BarChart3, ArrowDown } from 'lucide-react'

const layers = [
  {
    num: '01',
    icon: Database,
    title: '数据层',
    subtitle: '多源 EEG 公开数据集 + 本校标注数据',
    color: 'emerald',
    items: [
      { name: 'DASPS', desc: '焦虑诱发 EEG 数据，用于学习状态焦虑相关脑电特征' },
      { name: 'SAM40', desc: '短时压力与认知任务 EEG 数据，补充压力反应表征' },
      { name: 'EEGMAT', desc: '心算任务 EEG 数据，学习认知负荷相关脑电变化' },
      { name: 'DEAP', desc: '选取低效价、高唤醒、低支配感样本，辅助学习负性高唤醒 EEG 表征' },
      { name: '本校 STAI-S EEG', desc: '本校学生 EEG + 状态焦虑量表标注，用于模型微调' },
    ],
  },
  {
    num: '02',
    icon: Settings,
    title: '预处理层',
    subtitle: '标准化 EEG 信号清洗与通道空间映射',
    color: 'blue',
    items: [
      { name: '统一物理量纲', desc: '消除设备差异，统一幅值单位' },
      { name: '重采样至 125 Hz', desc: '统一采样率，降低计算开销' },
      { name: '0.5–47 Hz 带通滤波', desc: '保留脑电有效频段，去除低频漂移与高频噪声' },
      { name: 'ICA / ASR 去伪迹', desc: '去除眼电、肌电、心电及运动伪迹干扰' },
      { name: '球样条插值', desc: '对不良通道进行空间插值修复' },
      { name: '60 通道标准电极空间映射', desc: '映射至国际 10–20 标准电极坐标空间' },
    ],
  },
  {
    num: '03',
    icon: Brain,
    title: '模型层',
    subtitle: 'mdJPT 多数据集联合预训练 + 本校小样本微调',
    color: 'violet',
    items: [
      { name: 'mdJPT 预训练框架', desc: '整合多源 EEG 数据，学习通用脑电表征' },
      { name: 'MLLA 通道编码器', desc: '建模脑区通道间关联，增强空间表征能力' },
      { name: 'CDA Loss', desc: '对齐不同数据集的协方差结构，缓解跨域分布偏移' },
      { name: 'ISA Loss', desc: '自监督对比学习，拉近相似状态表征距离' },
      { name: 'RMSE + Ordinal Loss', desc: '联合优化连续评分精度与风险等级有序关系' },
    ],
  },
  {
    num: '04',
    icon: BarChart3,
    title: '应用层',
    subtitle: '面向高校心理健康中心的筛查辅助与风险预警',
    color: 'cyan',
    items: [
      { name: 'STAI-S 连续评分预测', desc: '基于 EEG 信号预测当前状态焦虑分数' },
      { name: '低 / 中 / 高焦虑风险等级', desc: '三级风险分类，辅助心理老师优先级排序' },
      { name: '脑区响应热力图', desc: '可视化模型关注的脑区与响应强度' },
      { name: '个体评估报告', desc: '自动生成学生匿名化评估报告' },
      { name: '群体趋势分析', desc: '按年级、专业、时间维度统计群体风险趋势' },
    ],
  },
]

const colorMap: Record<string, { accent: string; bg: string; border: string; dot: string; text: string }> = {
  emerald: { accent: 'bg-emerald-500', bg: 'bg-emerald-50/60', border: 'border-emerald-200', dot: 'bg-emerald-400', text: 'text-emerald-700' },
  blue:    { accent: 'bg-blue-500',    bg: 'bg-blue-50/60',    border: 'border-blue-200',    dot: 'bg-blue-400',    text: 'text-blue-700' },
  violet:  { accent: 'bg-violet-500',  bg: 'bg-violet-50/60',  border: 'border-violet-200',  dot: 'bg-violet-400',  text: 'text-violet-700' },
  cyan:    { accent: 'bg-cyan-500',    bg: 'bg-cyan-50/60',    border: 'border-cyan-200',    dot: 'bg-cyan-400',    text: 'text-cyan-700' },
}

function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      <h2 className="text-2xl font-bold text-slate-900 lg:text-3xl">{title}</h2>
      {subtitle && <p className="mt-3 text-slate-500">{subtitle}</p>}
    </div>
  )
}

export default function Technology() {
  return (
    <main>
      {/* ── Header ── */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 py-20">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="text-4xl font-extrabold text-white lg:text-5xl">
            多源 EEG 预训练驱动的焦虑状态量化技术路线
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-slate-300">
            通过公开 EEG 数据预训练与本校 STAI-S 小样本微调，实现跨被试、跨任务的焦虑风险辅助评估
          </p>
        </div>
      </section>

      {/* ── Four layers ── */}
      <section className="bg-slate-50 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            title="技术架构总览"
            subtitle="数据层 → 预处理层 → 模型层 → 应用层，四层递进"
          />
          {layers.map((layer, i) => {
            const c = colorMap[layer.color]
            return (
              <div key={layer.title}>
                <div className={`rounded-2xl border ${c.border} ${c.bg} p-6 lg:p-8`}>
                  <div className="mb-6 flex items-center gap-4">
                    <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${c.accent} text-white shadow-lg`}>
                      <span className="text-base font-extrabold">{layer.num}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2.5">
                        <layer.icon className={`h-5 w-5 ${c.text}`} />
                        <h2 className="text-xl font-bold text-slate-900 lg:text-2xl">{layer.title}</h2>
                      </div>
                      <p className="mt-1 text-sm text-slate-500">{layer.subtitle}</p>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {layer.items.map((item) => (
                      <div
                        key={item.name}
                        className="flex items-start gap-3 rounded-xl bg-white px-4 py-3.5 shadow-sm transition-shadow hover:shadow-md"
                      >
                        <div className={`mt-1 h-2 w-2 flex-shrink-0 rounded-full ${c.dot}`} />
                        <div>
                          <div className="text-sm font-semibold text-slate-900">{item.name}</div>
                          <div className="mt-0.5 text-xs leading-relaxed text-slate-500">{item.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {i < layers.length - 1 && (
                  <div className="flex justify-center py-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm border border-slate-200">
                      <ArrowDown className="h-5 w-5 text-slate-400" />
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* ── Loss function ── */}
      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading
            title="微调损失函数"
            subtitle="本校 STAI-S 数据微调阶段的优化目标"
          />
          <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-slate-50 p-8">
            <div className="text-center font-mono text-xl font-bold text-slate-900">
              L<sub>total</sub> = λ<sub>1</sub> · RMSE + λ<sub>2</sub> · Ordinal Loss
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-blue-50 p-4 text-sm font-medium text-blue-800">
                RMSE 保证连续评分预测精度
              </div>
              <div className="rounded-xl bg-cyan-50 p-4 text-sm font-medium text-cyan-800">
                Ordinal Loss 保证焦虑等级判断符合低—中—高的有序结构
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
