import { CheckCircle2, Circle } from 'lucide-react'

const trainingStages = [
  { label: 'DASPS 预训练', status: 'done', desc: '焦虑诱发 EEG 表征学习' },
  { label: 'SAM40 预训练', status: 'done', desc: '压力与认知任务 EEG 表征学习' },
  { label: 'EEGMAT 预训练', status: 'done', desc: '心算任务 EEG 表征学习' },
  { label: 'DEAP 预训练', status: 'done', desc: '多维情绪 EEG 表征学习' },
  { label: 'mdJPT 联合预训练', status: 'done', desc: '多数据集联合训练，CDA + ISA Loss 对齐' },
  { label: '本校 STAI-S 微调', status: 'active', desc: 'RMSE + Ordinal Loss 联合优化' },
  { label: '模型评估与验证', status: 'pending', desc: '留一被试交叉验证' },
]

const metrics = [
  { label: '当前模型版本', value: 'MindEEG-mdJPT-v1.0' },
  { label: '预训练数据集', value: '4 个公开数据集' },
  { label: '微调数据集', value: '本校 STAI-S EEG' },
  { label: '输入通道数', value: '60 ch @ 125 Hz' },
  { label: 'RMSE (验证集)', value: '6.42' },
  { label: '等级准确率 (验证集)', value: '78.5%' },
]

export default function ModelTraining() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900">模型训练状态</h1>
            <p className="mt-1 text-slate-500">mdJPT 多数据集联合预训练与本校微调进度</p>
          </div>

          <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-slate-900">训练进度</h2>
            <div className="space-y-1">
              {trainingStages.map((stage) => (
                <div key={stage.label} className="flex items-center gap-3 rounded-lg px-4 py-3">
                  {stage.status === 'done' ? (
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-emerald-500" />
                  ) : stage.status === 'active' ? (
                    <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
                    </div>
                  ) : (
                    <Circle className="h-5 w-5 flex-shrink-0 text-slate-300" />
                  )}
                  <span className={`text-sm font-medium ${stage.status === 'pending' ? 'text-slate-400' : 'text-slate-900'}`}>
                    {stage.label}
                  </span>
                  <span className="text-xs text-slate-400">{stage.desc}</span>
                  {stage.status === 'active' && (
                    <span className="ml-auto rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700">进行中</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-slate-900">模型指标</h2>
            <div className="grid gap-3 sm:grid-cols-3">
              {metrics.map((m) => (
                <div key={m.label} className="rounded-lg bg-slate-50 px-4 py-3">
                  <div className="text-xs text-slate-500">{m.label}</div>
                  <div className="mt-0.5 font-semibold text-slate-900">{m.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
  )
}
