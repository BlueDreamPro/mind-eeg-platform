import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Brain,
  User,
  Activity,
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
  Eye,
  ChevronRight,
  ArrowLeft,
  Download,
  ChevronDown,
} from 'lucide-react'
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts'
import { mockAssessments, trendDataMap } from '../mock/studentAssessment'

function riskStyle(level: string) {
  if (level.includes('低')) return { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', badge: 'bg-emerald-100 text-emerald-700' }
  if (level.includes('中')) return { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', badge: 'bg-orange-100 text-orange-700' }
  return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', badge: 'bg-red-100 text-red-700' }
}

// Clean SVG gauge: half-circle with real arcs, no dasharray hacks
function RiskGauge({ score, level }: { score: number; level: string }) {
  const cx = 100; const cy = 95; const r = 68

  // Map score 20-80 to angle range PI..0
  const clamped = Math.max(20, Math.min(80, score))
  const needleAngle = Math.PI - ((clamped - 20) / 60) * Math.PI
  const nx = cx + r * Math.cos(needleAngle)
  const ny = cy - r * Math.sin(needleAngle)

  function arcPath(from: number, to: number) {
    const a1 = Math.PI - ((from - 20) / 60) * Math.PI
    const a2 = Math.PI - ((to - 20) / 60) * Math.PI
    const x1 = cx + r * Math.cos(a1); const y1 = cy - r * Math.sin(a1)
    const x2 = cx + r * Math.cos(a2); const y2 = cy - r * Math.sin(a2)
    return `M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`
  }

  const needleColor = level.includes('低') ? '#16a34a' : level.includes('中') ? '#ea580c' : '#dc2626'

  return (
    <svg viewBox="0 0 200 130" className="mx-auto h-32 w-full max-w-[220px]">
      {/* Background arc */}
      <path d={arcPath(20, 80)} fill="none" stroke="#e2e8f0" strokeWidth="14" strokeLinecap="round" />
      {/* Green: 20–40 */}
      <path d={arcPath(20, 40)} fill="none" stroke="#22c55e" strokeWidth="14" strokeLinecap="butt" />
      {/* Orange: 40–60 */}
      <path d={arcPath(40, 60)} fill="none" stroke="#f97316" strokeWidth="14" strokeLinecap="butt" />
      {/* Red: 60–80 */}
      <path d={arcPath(60, 80)} fill="none" stroke="#ef4444" strokeWidth="14" strokeLinecap="round" />
      {/* Needle */}
      <line x1={cx} y1={cy} x2={nx} y2={ny} stroke={needleColor} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r="5" fill="#1e293b" />
      <circle cx={cx} cy={cy} r="2.5" fill="white" />
      {/* Score */}
      <text x={cx} y={cy + 18} textAnchor="middle" fontSize="16" fontWeight="bold" fill="#1e293b">{score}</text>
      <text x={cx} y={cy + 30} textAnchor="middle" fontSize="9" fill="#64748b">STAI-S</text>
      {/* Labels */}
      <text x="22" y="88" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#16a34a">低</text>
      <text x="100" y="20" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#ea580c">中</text>
      <text x="178" y="88" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#dc2626">高</text>
    </svg>
  )
}

export default function Report() {
  const [selectedIdx, setSelectedIdx] = useState(0)
  const data = mockAssessments[selectedIdx]
  const risk = riskStyle(data.report.riskLevel)
  const trends = trendDataMap[data.reportId] ?? []

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      {/* ── Top bar: breadcrumb + report switcher ── */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 print:hidden">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Link to="/" className="hover:text-blue-600">首页</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/new-assessment" className="hover:text-blue-600">新建评估</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-slate-900">评估报告</span>
        </div>

        {/* Report switcher */}
        <div className="relative">
          <select
            value={selectedIdx}
            onChange={(e) => setSelectedIdx(Number(e.target.value))}
            className="appearance-none rounded-lg border border-slate-200 bg-white pl-4 pr-10 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:border-blue-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer"
          >
            {mockAssessments.map((a, i) => (
              <option key={a.reportId} value={i}>
                {a.reportId} — {a.student.id}（{a.student.grade}·{a.student.major}）
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        </div>
      </div>

      {/* ── Report Header + Core Results (merged) ── */}
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 lg:text-3xl">
              学生焦虑风险评估报告
            </h1>
            <p className="mt-2 text-slate-500">
              基于 EEG 脑电信号与 STAI-S 量表的辅助筛查结果
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm">
            {[
              { label: '报告编号', value: data.reportId },
              { label: '生成时间', value: data.date },
              { label: '模型版本', value: data.preprocessing.modelVersion },
            ].map((m) => (
              <div key={m.label} className="rounded-lg bg-slate-50 px-4 py-2">
                <div className="text-xs text-slate-500">{m.label}</div>
                <div className="font-medium text-slate-900">{m.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Core results — 4 cards inline */}
        <div className="mt-6 grid gap-3 sm:grid-cols-4">
          <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-4 text-center">
            <div className="text-xs font-medium text-blue-600">AI 预测 STAI-S 分数</div>
            <div className="mt-1 text-3xl font-extrabold text-blue-700">{data.report.predictedSTAIS}</div>
            <div className="mt-0.5 text-xs text-blue-500">预测连续评分</div>
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 text-center">
            <div className="text-xs font-medium text-slate-600">学生自评 STAI-S 分数</div>
            <div className="mt-1 text-3xl font-bold text-slate-700">{data.stais.selfReportScore}</div>
            <div className="mt-0.5 text-xs text-slate-500">量表自评结果</div>
          </div>
          <div className={`rounded-xl border ${risk.border} ${risk.bg} p-4 text-center`}>
            <div className={`text-xs font-medium ${risk.text}`}>焦虑风险等级</div>
            <div className={`mt-1 text-3xl font-bold ${risk.text}`}>{data.report.riskLevel}</div>
            <div className={`mt-0.5 rounded-full ${risk.badge} mx-auto inline-block px-2.5 py-0.5 text-xs`}>
              40–59 区间
            </div>
          </div>
          <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-4 text-center">
            <div className="text-xs font-medium text-emerald-600">模型置信度</div>
            <div className="mt-1 text-3xl font-bold text-emerald-600">{data.report.confidence}%</div>
            <div className="mt-0.5 text-xs text-emerald-500">预测可信度</div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* ── Left column (2/3) ── */}
        <div className="space-y-6 lg:col-span-2">

          {/* Student info */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <User className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-semibold text-slate-900">学生匿名信息</h2>
              <span className="ml-auto rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">匿名化处理</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-4">
              {[
                { label: '学生编号', value: data.student.id },
                { label: '年级', value: data.student.grade },
                { label: '专业', value: data.student.major },
                { label: '评估任务', value: data.student.task },
                { label: 'EEG 记录时长', value: data.eeg.duration },
                { label: '数据质量', value: data.signalQuality.quality },
                { label: '隐私状态', value: data.student.privacy },
                { label: '采样率 / 通道', value: `${data.eeg.sampleRate} / ${data.eeg.channels}` },
              ].map((f) => (
                <div key={f.label} className="rounded-lg bg-slate-50 px-4 py-3">
                  <div className="text-xs text-slate-500">{f.label}</div>
                  <div className="mt-0.5 font-medium text-slate-900">{f.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* EEG Waveform */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
                <Activity className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">EEG 多通道波形预览</h2>
                <p className="text-sm text-slate-500">60 通道脑电信号预览（显示前 6 个代表性通道）</p>
              </div>
            </div>
            <div className="rounded-xl bg-slate-900 p-5">
              <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                <span>通道</span>
                {[
                  { color: 'bg-cyan-400', label: 'C3' },
                  { color: 'bg-blue-400', label: 'Cz' },
                  { color: 'bg-violet-400', label: 'Fz' },
                  { color: 'bg-emerald-400', label: 'Pz' },
                  { color: 'bg-amber-400', label: 'T3' },
                  { color: 'bg-rose-400', label: 'T4' },
                ].map((ch) => (
                  <span key={ch.label} className="flex items-center gap-1">
                    <span className={`h-2 w-2 rounded-full ${ch.color}`} />{ch.label}
                  </span>
                ))}
              </div>
              <svg viewBox="0 0 600 120" className="h-28 w-full">
                {[
                  { stroke: '#22d3ee', y: 16 },
                  { stroke: '#60a5fa', y: 33 },
                  { stroke: '#a78bfa', y: 50 },
                  { stroke: '#34d399', y: 67 },
                  { stroke: '#fbbf24', y: 84 },
                  { stroke: '#fb7185', y: 101 },
                ].map((ch, i) => (
                  <path
                    key={i}
                    d={`M0,${ch.y}C15,${ch.y-10} 30,${ch.y+8} 45,${ch.y-4}C60,${ch.y-14} 75,${ch.y+6} 90,${ch.y-8}
                      C105,${ch.y+10} 120,${ch.y-12} 135,${ch.y+4}C150,${ch.y-6} 165,${ch.y+14} 180,${ch.y-2}
                      C195,${ch.y-10} 210,${ch.y+8} 225,${ch.y-6}C240,${ch.y+12} 255,${ch.y-14} 270,${ch.y+2}
                      C285,${ch.y-8} 300,${ch.y+10} 315,${ch.y-4}C330,${ch.y+6} 345,${ch.y-12} 360,${ch.y+8}
                      C375,${ch.y-6} 390,${ch.y+14} 405,${ch.y-10}C420,${ch.y+4} 435,${ch.y-8} 450,${ch.y+12}
                      C465,${ch.y-4} 480,${ch.y+6} 495,${ch.y-10}C510,${ch.y+14} 525,${ch.y-8} 540,${ch.y+4}
                      C555,${ch.y-6} 570,${ch.y+10} 585,${ch.y-2}L600,${ch.y}`}
                    fill="none" stroke={ch.stroke} strokeWidth="1.3"
                  />
                ))}
              </svg>
              <div className="mt-3 flex justify-between text-xs text-slate-500">
                <span>0s</span><span>2s</span><span>4s</span><span>6s</span><span>8s</span>
              </div>
            </div>
          </div>

          {/* Brain heatmap — wider aspect ratio */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                <Brain className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">60 通道脑区热力图</h2>
                <p className="text-sm text-slate-500">模型关注的脑区空间分布与响应强度</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-6 lg:flex-row">
              {/* Brain top-down view */}
              <div className="relative flex-shrink-0">
                <svg viewBox="0 0 200 200" className="h-52 w-48">
                  {/* Head outline */}
                  <ellipse cx="100" cy="100" rx="88" ry="90" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
                  {/* Brain outline */}
                  <ellipse cx="100" cy="98" rx="68" ry="72" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
                  {/* Heat regions */}
                  <ellipse cx="100" cy="55" rx="28" ry="20" fill="url(#frGrad)" opacity="0.7" />
                  <ellipse cx="70" cy="98" rx="16" ry="26" fill="url(#tlGrad)" opacity="0.5" />
                  <ellipse cx="130" cy="98" rx="16" ry="26" fill="url(#trGrad)" opacity="0.45" />
                  <ellipse cx="100" cy="108" rx="24" ry="18" fill="url(#ctGrad)" opacity="0.5" />
                  <ellipse cx="100" cy="140" rx="20" ry="14" fill="url(#ocGrad)" opacity="0.35" />
                  <defs>
                    <radialGradient id="frGrad">
                      <stop offset="0%" stopColor="#f97316" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient id="tlGrad">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient id="trGrad">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.55" />
                      <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient id="ctGrad">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient id="ocGrad">
                      <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  {/* Labels */}
                  <text x="100" y="42" textAnchor="middle" fill="#1e293b" fontSize="11" fontWeight="bold">额叶</text>
                  <text x="52" y="100" textAnchor="middle" fill="#475569" fontSize="10">左颞叶</text>
                  <text x="148" y="100" textAnchor="middle" fill="#475569" fontSize="10">右颞叶</text>
                  <text x="100" y="125" textAnchor="middle" fill="#475569" fontSize="10">中央区</text>
                  <text x="100" y="160" textAnchor="middle" fill="#64748b" fontSize="10">枕叶</text>
                  {/* Nose */}
                  <ellipse cx="100" cy="5" rx="11" ry="7" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="0.8" />
                </svg>
              </div>
              {/* Legend */}
              <div className="flex-1 space-y-3">
                {[
                  { region: '额叶区域', intensity: '高', color: 'bg-orange-500', desc: '可能与情绪调节和认知负荷变化有关' },
                  { region: '左颞叶', intensity: '中', color: 'bg-amber-500', desc: '情绪与记忆相关脑区活动增强' },
                  { region: '右颞叶', intensity: '中', color: 'bg-amber-500', desc: '社会与情绪信息处理相关' },
                  { region: '中央区', intensity: '中', color: 'bg-blue-500', desc: '感觉运动整合响应' },
                  { region: '枕叶', intensity: '低', color: 'bg-cyan-500', desc: '视觉处理相关，响应较弱' },
                ].map((r) => (
                  <div key={r.region} className="flex items-center gap-3">
                    <span className={`h-3 w-3 flex-shrink-0 rounded-full ${r.color}`} />
                    <span className="text-sm font-medium text-slate-900">{r.region}</span>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      r.intensity === '高' ? 'bg-orange-100 text-orange-700' : r.intensity === '中' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'
                    }`}>{r.intensity}</span>
                    <span className="hidden text-xs text-slate-500 sm:inline">{r.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Right column (1/3) ── */}
        <div className="space-y-6">

          {/* Risk gauge */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-2 text-lg font-semibold text-slate-900">风险等级仪表盘</h2>
            <p className="mb-4 text-sm text-slate-500">AI 预测 STAI-S 分数在风险区间中的位置</p>
            <RiskGauge score={data.report.predictedSTAIS} level={data.report.riskLevel} />
            <p className="mt-3 text-center text-xs text-slate-400">
              风险等级阈值为 Demo 展示规则，实际系统将结合学校样本分布校准。
            </p>
          </div>

          {/* Trend chart */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-slate-900">评估趋势</h2>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trends}>
                  <defs>
                    <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.25} />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis domain={[30, 70]} tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', fontSize: '13px' }} />
                  <Area type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2} fill="url(#trendGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 rounded-lg bg-amber-50 border border-amber-100 p-3">
              <div className="flex items-start gap-2">
                <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-500" />
                <div>
                  <p className="text-sm font-medium text-amber-800">
                    {trends.length >= 2 && trends[trends.length - 1].score > trends[0].score
                      ? '近期状态焦虑水平呈上升趋势'
                      : '近期状态焦虑水平较为稳定'}
                  </p>
                  <p className="mt-0.5 text-xs text-amber-600">建议关注学业压力和睡眠状态。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Explainability ── */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
            <Eye className="h-5 w-5" />
          </div>
          <h2 className="text-lg font-semibold text-slate-900">可解释性分析</h2>
        </div>
        <div className="rounded-xl bg-slate-50 p-5">
          <p className="leading-relaxed text-slate-700">
            模型在本次评估中主要关注
            <span className="font-semibold text-orange-600">额叶</span>、
            <span className="font-semibold text-amber-600">中央区</span>和
            <span className="font-semibold text-amber-600">颞叶</span>
            相关 EEG 特征，其中
            <span className="font-semibold text-orange-600">额叶区域响应增强</span>
            可能与压力任务下的情绪调节和认知负荷变化有关。
          </p>
        </div>
      </div>

      {/* ── Recommendations ── */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <h2 className="text-lg font-semibold text-slate-900">建议与后续步骤</h2>
        </div>
        <div className="space-y-3">
          {[
            data.report.recommendation,
            '建议结合近期学业压力、睡眠情况和人际关系进行综合判断。',
            '若连续多次评估处于中高风险区间，建议纳入持续关注名单。',
          ].map((rec, i) => (
            <div key={i} className="flex items-start gap-3 rounded-lg bg-amber-50/50 px-4 py-3">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-amber-500 text-xs font-bold text-white">
                {i + 1}
              </span>
              <p className="text-sm text-slate-700">{rec}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Disclaimer ── */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-100/60 p-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-500" />
          <div>
            <p className="font-medium text-slate-700">免责声明</p>
            <p className="mt-1 text-sm leading-relaxed text-slate-500">
              本报告仅作为校园心理健康辅助筛查参考，不作为医学诊断依据。最终判断应由专业心理老师结合访谈和量表结果综合完成。
            </p>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="mt-6 flex flex-wrap gap-3 print:hidden">
        <Link
          to="/new-assessment"
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
        >
          <ArrowLeft className="h-4 w-4" />
          返回评估流程
        </Link>
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/25 hover:shadow-lg"
        >
          <Download className="h-4 w-4" />
          导出报告 PDF
        </button>
      </div>
    </div>
  )
}
