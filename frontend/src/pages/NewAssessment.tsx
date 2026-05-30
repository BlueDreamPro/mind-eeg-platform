import { useState, useRef, type DragEvent } from 'react'
import { Link } from 'react-router-dom'
import {
  User,
  Upload,
  CheckCircle2,
  Circle,
  ChevronRight,
  AlertTriangle,
  FileCheck,
  FileText,
  Activity,
  Cpu,
  BarChart3,
  ArrowRight,
  Zap,
  X,
} from 'lucide-react'
import { mockAssessment } from '../mock/studentAssessment'

const stepLabels = [
  '创建评估对象',
  '导入 EEG 数据',
  '绑定 STAI-S 量表',
  'AI 预处理与分析',
  '生成评估报告',
]

export default function NewAssessment() {
  const [currentStep, setCurrentStep] = useState(1)
  const [analysisRunning, setAnalysisRunning] = useState(false)
  const [analysisDone, setAnalysisDone] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [uploaded, setUploaded] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileSelected = () => {
    setUploaded(true)
    setCurrentStep(2)
  }

  const handleDragEnter = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragOver(true)
  }

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragOver(false)
  }

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragOver(false)
    setUploaded(true)
    setCurrentStep(2)
  }

  const handleRunAnalysis = () => {
    setAnalysisRunning(true)
    setCurrentStep(4)
    setTimeout(() => {
      setAnalysisRunning(false)
      setAnalysisDone(true)
      setCurrentStep(5)
    }, 3000)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900">新建学生焦虑评估</h1>
            <p className="mt-1 text-slate-500">
              导入学生 EEG 数据与 STAI-S 量表，完成信号校验、AI 分析和风险报告生成。
            </p>
          </div>

          {/* ── Step progress ── */}
          <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex items-center justify-between">
              {stepLabels.map((label, i) => (
                <div key={label} className="flex items-center gap-2">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-all ${
                      i + 1 < currentStep
                        ? 'bg-emerald-500 text-white'
                        : i + 1 === currentStep
                          ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                          : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {i + 1 < currentStep ? <CheckCircle2 className="h-5 w-5" /> : i + 1}
                  </div>
                  <span
                    className={`hidden text-sm font-medium md:inline ${
                      i + 1 <= currentStep ? 'text-slate-900' : 'text-slate-400'
                    }`}
                  >
                    {label}
                  </span>
                  {i < stepLabels.length - 1 && (
                    <ChevronRight className="hidden h-4 w-4 text-slate-300 md:block" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ── Student info card ── */}
          <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <User className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">学生匿名信息</h2>
                <p className="text-sm text-slate-500">评估对象基本信息（匿名化处理）</p>
              </div>
              <span className="ml-auto rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                {mockAssessment.student.privacy}
              </span>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: '学生编号', value: mockAssessment.student.id },
                { label: '年级', value: mockAssessment.student.grade },
                { label: '专业', value: mockAssessment.student.major },
                { label: '评估场景', value: mockAssessment.student.task },
                { label: '评估类型', value: mockAssessment.student.assessmentType },
                { label: '隐私状态', value: mockAssessment.student.privacy },
              ].map((f) => (
                <div key={f.label} className="rounded-lg bg-slate-50 px-4 py-3">
                  <div className="text-xs text-slate-500">{f.label}</div>
                  <div className="mt-0.5 font-medium text-slate-900">{f.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── EEG upload card ── */}
          <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
                <Upload className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">导入 EEG 数据</h2>
                <p className="text-sm text-slate-500">
                  {uploaded ? '文件已成功导入' : '拖拽 EEG 文件到此处，或点击上传'}
                </p>
              </div>
              {uploaded && (
                <button
                  onClick={() => { setUploaded(false); setCurrentStep(1) }}
                  className="ml-auto rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                  title="移除文件"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Drop zone — visible when no file uploaded */}
            {!uploaded && (
              <>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".mat,.csv,.edf,.set"
                  onChange={handleFileSelected}
                  className="hidden"
                />
                <div
                  onClick={handleUploadClick}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className={`cursor-pointer rounded-xl border-2 border-dashed p-10 text-center transition-all ${
                    dragOver
                      ? 'border-blue-400 bg-blue-50/50'
                      : 'border-slate-300 bg-slate-50 hover:border-blue-400 hover:bg-blue-50/30'
                  }`}
                >
                  <Upload className={`mx-auto h-10 w-10 ${dragOver ? 'text-blue-500' : 'text-slate-400'}`} />
                  <p className="mt-3 text-sm font-medium text-slate-600">
                    {dragOver ? '释放文件以上传' : '拖拽 EEG 文件到此处，或点击上传'}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">支持 .mat / .csv / .edf / .set 格式</p>
                </div>
              </>
            )}

            {/* Uploaded file info — visible after upload */}
            {uploaded && (
              <div className="animate-fadeIn rounded-xl border border-emerald-200 bg-emerald-50/50 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <FileCheck className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm font-medium text-emerald-700">
                    {mockAssessment.eeg.fileName}
                  </span>
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
                    {mockAssessment.eeg.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
                  {[
                    { label: '采样率', value: mockAssessment.eeg.sampleRate },
                    { label: '通道数', value: mockAssessment.eeg.channels },
                    { label: '记录时长', value: mockAssessment.eeg.duration },
                    { label: '任务阶段', value: mockAssessment.eeg.phases },
                  ].map((f) => (
                    <div key={f.label}>
                      <span className="text-slate-500">{f.label}：</span>
                      <span className="font-medium text-slate-900">{f.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Signal quality card (shown after upload) ── */}
          {uploaded && (
            <div className="mb-6 animate-fadeIn rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <Activity className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">信号质量检测</h2>
                  <p className="text-sm text-slate-500">自动检测 EEG 信号完整性、伪迹水平和数据质量</p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-5">
                {[
                  { label: '信号质量', value: mockAssessment.signalQuality.quality, color: 'text-emerald-600 bg-emerald-50' },
                  { label: '缺失通道', value: mockAssessment.signalQuality.missingChannels, color: 'text-slate-700 bg-slate-50' },
                  { label: '异常片段比例', value: mockAssessment.signalQuality.artifactRatio, color: 'text-orange-600 bg-orange-50' },
                  { label: '眼电/肌电伪迹', value: mockAssessment.signalQuality.artifactLevel, color: 'text-amber-600 bg-amber-50' },
                  { label: '数据完整率', value: mockAssessment.signalQuality.completeness, color: 'text-emerald-600 bg-emerald-50' },
                ].map((m) => (
                  <div key={m.label} className={`rounded-lg px-4 py-3 ${m.color}`}>
                    <div className="text-xs opacity-75">{m.label}</div>
                    <div className="mt-1 text-lg font-bold">{m.value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── STAI-S binding card (shown after upload) ── */}
          {uploaded && (
            <div className="mb-6 animate-fadeIn rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">绑定 STAI-S 量表</h2>
                  <p className="text-sm text-slate-500">将学生自评状态焦虑量表与 EEG 数据绑定</p>
                </div>
                <span className="ml-auto rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                  {mockAssessment.stais.status}
                </span>
              </div>
              <div className="grid gap-4 sm:grid-cols-4">
                {[
                  { label: '量表文件', value: mockAssessment.stais.fileName },
                  { label: '自评 STAI-S 分数', value: mockAssessment.stais.selfReportScore, highlight: true },
                  { label: '量表状态', value: mockAssessment.stais.status },
                  { label: '用途', value: mockAssessment.stais.purpose },
                ].map((f) => (
                  <div key={f.label} className="rounded-lg bg-slate-50 px-4 py-3">
                    <div className="text-xs text-slate-500">{f.label}</div>
                    <div className={`mt-0.5 ${f.highlight ? 'text-lg font-bold text-violet-700' : 'font-medium text-slate-900'}`}>
                      {f.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Preprocessing & AI analysis ── */}
          {uploaded && (
            <div className="mb-6 animate-fadeIn rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Cpu className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">AI 预处理与分析</h2>
                  <p className="text-sm text-slate-500">mdJPT 模型自动进行 EEG 预处理与焦虑评分预测</p>
                </div>
              </div>

              {/* Progress steps */}
              <div className="space-y-0.5">
                {mockAssessment.preprocessing.steps.map((step, i) => (
                  <div
                    key={step}
                    className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-all ${
                      analysisDone ? 'text-emerald-700' : i < 5 ? 'text-slate-900' : analysisRunning ? 'text-blue-700' : 'text-slate-400'
                    }`}
                  >
                    {analysisDone || i < 5 ? (
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-emerald-500" />
                    ) : analysisRunning && i === 5 ? (
                      <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
                      </div>
                    ) : (
                      <Circle className="h-5 w-5 flex-shrink-0 text-slate-300" />
                    )}
                    <span className="text-sm font-medium">{step}</span>
                  </div>
                ))}
              </div>

              {/* Action buttons */}
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={handleRunAnalysis}
                  disabled={analysisRunning || analysisDone}
                  className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/25 transition-all hover:shadow-lg disabled:opacity-50"
                >
                  {analysisRunning ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      分析中...
                    </>
                  ) : analysisDone ? (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      分析完成
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4" />
                      开始 AI 分析
                    </>
                  )}
                </button>

                {analysisDone && (
                  <Link
                    to="/report"
                    className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-slate-800"
                  >
                    查看评估报告
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
              </div>
            </div>
          )}

          {/* ── Report preview card ── */}
          {analysisDone && (
            <div className="mb-6 animate-fadeIn rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">报告预览</h2>
                  <p className="text-sm text-slate-500">基于 EEG 信号与 STAI-S 的焦虑风险评估结果</p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-4">
                <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-4 text-center">
                  <div className="text-xs text-blue-600">AI 预测 STAI-S</div>
                  <div className="mt-1 text-3xl font-bold text-blue-700">
                    {mockAssessment.report.predictedSTAIS}
                  </div>
                </div>
                <div className="rounded-xl border border-orange-100 bg-orange-50/50 p-4 text-center">
                  <div className="text-xs text-orange-600">风险等级</div>
                  <div className="mt-1 text-3xl font-bold text-orange-600">
                    {mockAssessment.report.riskLevel}
                  </div>
                </div>
                <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-4 text-center">
                  <div className="text-xs text-emerald-600">模型置信度</div>
                  <div className="mt-1 text-3xl font-bold text-emerald-600">
                    {mockAssessment.report.confidence}%
                  </div>
                </div>
                <div className="rounded-xl border border-amber-100 bg-amber-50/50 p-4 text-center">
                  <div className="text-xs text-amber-600">建议</div>
                  <div className="mt-1 text-sm font-medium text-amber-800">
                    {mockAssessment.report.recommendation}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Disclaimer */}
          <div className="rounded-xl border border-slate-200 bg-slate-100/50 p-4 text-center">
            <div className="flex items-center justify-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <p className="text-sm text-slate-500">
                Demo 数据仅用于展示，实际系统将接入 EEG 采集设备和 STAI-S 量表数据。
              </p>
            </div>
            <p className="mt-1 text-xs text-slate-400">
              本系统仅用于校园心理健康辅助筛查，不作为医学诊断依据。
            </p>
          </div>
        </div>
  )
}
