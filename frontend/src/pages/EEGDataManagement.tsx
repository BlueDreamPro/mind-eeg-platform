// No external icon imports needed — using inline status badges

const records = [
  { id: 'S2026001', file: 'S2026001_task_eeg.mat', size: '42.3 MB', channels: '60 ch', duration: '8 min 30 s', date: '2026-05-28', status: '已分析' },
  { id: 'S2026002', file: 'S2026002_task_eeg.mat', size: '38.7 MB', channels: '60 ch', duration: '7 min 45 s', date: '2026-05-27', status: '已分析' },
  { id: 'S2026003', file: 'S2026003_task_eeg.mat', size: '45.1 MB', channels: '60 ch', duration: '9 min 10 s', date: '2026-05-25', status: '已分析' },
  { id: 'S2026004', file: 'S2026004_task_eeg.edf', size: '51.2 MB', channels: '64 ch', duration: '10 min 00 s', date: '2026-05-24', status: '待处理' },
  { id: 'S2026005', file: 'S2026005_task_eeg.csv', size: '28.9 MB', channels: '32 ch', duration: '6 min 20 s', date: '2026-05-22', status: '已分析' },
]

export default function EEGDataManagement() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900">EEG 数据管理</h1>
            <p className="mt-1 text-slate-500">管理已上传的学生 EEG 脑电数据文件</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-100 text-left text-sm text-slate-500">
                    <th className="px-6 py-4 font-medium">学生编号</th>
                    <th className="px-6 py-4 font-medium">文件名</th>
                    <th className="px-6 py-4 font-medium">文件大小</th>
                    <th className="px-6 py-4 font-medium">通道数</th>
                    <th className="px-6 py-4 font-medium">记录时长</th>
                    <th className="px-6 py-4 font-medium">上传日期</th>
                    <th className="px-6 py-4 font-medium">状态</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((r) => (
                    <tr key={r.id} className="border-b border-slate-50 text-sm hover:bg-slate-50/50">
                      <td className="px-6 py-4 font-medium text-slate-900">{r.id}</td>
                      <td className="px-6 py-4 text-slate-600">{r.file}</td>
                      <td className="px-6 py-4 text-slate-600">{r.size}</td>
                      <td className="px-6 py-4 text-slate-600">{r.channels}</td>
                      <td className="px-6 py-4 text-slate-600">{r.duration}</td>
                      <td className="px-6 py-4 text-slate-600">{r.date}</td>
                      <td className="px-6 py-4">
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          r.status === '已分析' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {r.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
  )
}
