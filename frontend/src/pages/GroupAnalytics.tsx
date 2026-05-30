import {
  Users,
  ShieldCheck,
  AlertTriangle,
  Eye,
} from 'lucide-react'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
} from 'recharts'

const stats = [
  { label: '本月评估人数', value: 326, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: '低风险人数', value: 218, icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: '中度风险人数', value: 86, icon: AlertTriangle, color: 'text-orange-600', bg: 'bg-orange-50' },
  { label: '高风险人数', value: 22, icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50' },
  { label: '需复核人数', value: 31, icon: Eye, color: 'text-violet-600', bg: 'bg-violet-50' },
]

const riskDistribution = [
  { name: '低风险', value: 218, color: '#22c55e' },
  { name: '中度风险', value: 86, color: '#f97316' },
  { name: '高风险', value: 22, color: '#ef4444' },
]

const gradeComparison = [
  { grade: '大一', avgScore: 43, lowRisk: 68, midRisk: 24, highRisk: 5 },
  { grade: '大二', avgScore: 48, lowRisk: 55, midRisk: 32, highRisk: 8 },
  { grade: '大三', avgScore: 50, lowRisk: 52, midRisk: 20, highRisk: 6 },
  { grade: '大四', avgScore: 46, lowRisk: 43, midRisk: 10, highRisk: 3 },
]

const monthlyTrend = [
  { month: '12月', avgScore: 44 },
  { month: '1月', avgScore: 45 },
  { month: '2月', avgScore: 47 },
  { month: '3月', avgScore: 48 },
  { month: '4月', avgScore: 49 },
  { month: '5月', avgScore: 50 },
]

const highRiskList = [
  { id: 'S2026023', grade: '大三', score: 68, risk: '高风险', action: '优先复核' },
  { id: 'S2026047', grade: '大二', score: 65, risk: '高风险', action: '优先复核' },
  { id: 'S2026051', grade: '大一', score: 63, risk: '高风险', action: '建议复核' },
  { id: 'S2026018', grade: '大四', score: 62, risk: '高风险', action: '建议复核' },
  { id: 'S2026009', grade: '大二', score: 61, risk: '高风险', action: '关注跟踪' },
]

const riskBadge = (risk: string) => {
  if (risk === '高风险') return 'bg-red-100 text-red-700 border-red-200'
  return 'bg-orange-100 text-orange-700 border-orange-200'
}

export default function GroupAnalytics() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 lg:text-3xl">群体心理风险趋势分析</h1>
          <p className="mt-2 text-slate-500">
            帮助高校心理健康中心发现群体心理压力变化趋势，辅助制定心理健康教育活动和干预策略。
          </p>
        </div>

        {/* ── Stats cards ── */}
        <div className="mb-8 grid gap-4 sm:grid-cols-5">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.bg} ${s.color}`}>
                  <s.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500">{s.label}</div>
                  <div className="text-2xl font-bold text-slate-900">{s.value}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Charts row ── */}
        <div className="mb-6 grid gap-6 lg:grid-cols-2">
          {/* Risk distribution pie chart */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-1 text-lg font-semibold text-slate-900">风险等级分布</h2>
            <p className="mb-4 text-sm text-slate-500">本月评估学生风险等级比例</p>
            <div className="flex items-center gap-6">
              <div className="h-56 w-56">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={riskDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={90}
                      paddingAngle={3}
                      dataKey="value"
                      stroke="none"
                    >
                      {riskDistribution.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        borderRadius: '12px',
                        border: '1px solid #e2e8f0',
                        fontSize: '13px',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3">
                {riskDistribution.map((d) => (
                  <div key={d.name} className="flex items-center gap-2.5">
                    <span className="h-3 w-3 rounded-full" style={{ backgroundColor: d.color }} />
                    <span className="text-sm text-slate-600">{d.name}</span>
                    <span className="text-sm font-semibold text-slate-900">{d.value}人</span>
                  </div>
                ))}
                <div className="text-xs text-slate-400">
                  总计 {riskDistribution.reduce((a, b) => a + b.value, 0)} 人
                </div>
              </div>
            </div>
          </div>

          {/* Grade comparison bar chart */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-1 text-lg font-semibold text-slate-900">年级对比</h2>
            <p className="mb-4 text-sm text-slate-500">各年级平均 STAI-S 预测分数</p>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={gradeComparison} barSize={48}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="grade" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 80]} tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: '12px',
                      border: '1px solid #e2e8f0',
                      fontSize: '13px',
                    }}
                  />
                  <Bar dataKey="avgScore" fill="#3b82f6" radius={[8, 8, 0, 0]} name="平均 STAI-S 分数" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* ── Monthly trend ── */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-1 text-lg font-semibold text-slate-900">最近 6 个月焦虑风险趋势</h2>
          <p className="mb-4 text-sm text-slate-500">全校学生月均 STAI-S 预测分数变化</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis domain={[40, 55]} tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    fontSize: '13px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="avgScore"
                  stroke="#3b82f6"
                  strokeWidth={2.5}
                  dot={{ fill: '#3b82f6', r: 5, strokeWidth: 0 }}
                  name="月均 STAI-S 分数"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ── High-risk watchlist ── */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-6 py-5">
            <h2 className="text-lg font-semibold text-slate-900">高风险关注列表</h2>
            <p className="mt-1 text-sm text-slate-500">近 30 天评估为高风险的学生（匿名化）</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 text-left text-sm text-slate-500">
                  <th className="px-6 py-3 font-medium">学生编号</th>
                  <th className="px-6 py-3 font-medium">年级</th>
                  <th className="px-6 py-3 font-medium">预测分数</th>
                  <th className="px-6 py-3 font-medium">风险等级</th>
                  <th className="px-6 py-3 font-medium">建议操作</th>
                </tr>
              </thead>
              <tbody>
                {highRiskList.map((student) => (
                  <tr key={student.id} className="border-b border-slate-50 text-sm hover:bg-slate-50/50">
                    <td className="px-6 py-4 font-medium text-slate-900">{student.id}</td>
                    <td className="px-6 py-4 text-slate-600">{student.grade}</td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-red-600">{student.score}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${riskBadge(student.risk)}`}>
                        {student.risk}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-medium text-slate-600">{student.action}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="rounded-2xl border border-slate-200 bg-slate-100/60 p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-500" />
            <div>
              <p className="text-sm leading-relaxed text-slate-500">
                本页面展示数据为 Demo 模拟数据，仅用于系统功能展示。实际应用中，群体趋势分析将基于真实评估数据生成。
                本系统仅用于校园心理健康辅助筛查，不作为医学诊断依据。
              </p>
            </div>
          </div>
        </div>
      </div>
  )
}
