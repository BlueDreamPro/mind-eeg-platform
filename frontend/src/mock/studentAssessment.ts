export interface StudentInfo {
  id: string
  grade: string
  major: string
  task: string
  assessmentType: string
  privacy: string
}

export interface EEGFileInfo {
  fileName: string
  sampleRate: string
  channels: string
  duration: string
  phases: string
  status: string
}

export interface SignalQuality {
  quality: string
  missingChannels: number
  artifactRatio: string
  artifactLevel: string
  completeness: string
}

export interface STAISBinding {
  fileName: string
  selfReportScore: number
  status: string
  purpose: string
}

export interface PreprocessingSteps {
  steps: string[]
  modelVersion: string
}

export interface ReportPreview {
  predictedSTAIS: number
  riskLevel: string
  confidence: number
  recommendation: string
}

export interface AssessmentResult {
  reportId: string
  date: string
  student: StudentInfo
  eeg: EEGFileInfo
  signalQuality: SignalQuality
  stais: STAISBinding
  preprocessing: PreprocessingSteps
  report: ReportPreview
}

export const mockAssessments: AssessmentResult[] = [
  {
    reportId: 'R2026001',
    date: '2026-05-30',
    student: {
      id: 'S2026001',
      grade: '大二',
      major: '软件工程',
      task: '限时心算压力任务',
      assessmentType: '状态焦虑评估',
      privacy: '匿名化处理',
    },
    eeg: {
      fileName: 'S2026001_task_eeg.mat',
      sampleRate: '125 Hz',
      channels: '60 channels',
      duration: '8 min 30 s',
      phases: 'Baseline / Arithmetic Task / Recovery',
      status: '格式校验通过',
    },
    signalQuality: {
      quality: '良好',
      missingChannels: 0,
      artifactRatio: '2.8%',
      artifactLevel: '轻度',
      completeness: '98.6%',
    },
    stais: {
      fileName: 'S2026001_STAIS.xlsx',
      selfReportScore: 50,
      status: '已绑定',
      purpose: '模型校准与报告对照',
    },
    preprocessing: {
      steps: [
        '统一物理量纲',
        '重采样至 125Hz',
        '0.5–47Hz 带通滤波',
        'ICA/ASR 去伪迹',
        '球样条插值至 60 通道',
        '加载 mdJPT 预训练模型',
        '计算 STAI-S 预测分数',
        '生成风险等级报告',
      ],
      modelVersion: 'MindEEG-mdJPT-v1.0',
    },
    report: {
      predictedSTAIS: 52,
      riskLevel: '中度风险',
      confidence: 82,
      recommendation: '建议由心理老师进行一次复核访谈',
    },
  },
  {
    reportId: 'R2026002',
    date: '2026-05-29',
    student: {
      id: 'S2026002',
      grade: '大三',
      major: '电子信息工程',
      task: '限时心算压力任务',
      assessmentType: '状态焦虑评估',
      privacy: '匿名化处理',
    },
    eeg: {
      fileName: 'S2026002_task_eeg.mat',
      sampleRate: '125 Hz',
      channels: '60 channels',
      duration: '7 min 45 s',
      phases: 'Baseline / Arithmetic Task / Recovery',
      status: '格式校验通过',
    },
    signalQuality: {
      quality: '良好',
      missingChannels: 0,
      artifactRatio: '1.5%',
      artifactLevel: '轻微',
      completeness: '99.2%',
    },
    stais: {
      fileName: 'S2026002_STAIS.xlsx',
      selfReportScore: 35,
      status: '已绑定',
      purpose: '模型校准与报告对照',
    },
    preprocessing: {
      steps: [
        '统一物理量纲',
        '重采样至 125Hz',
        '0.5–47Hz 带通滤波',
        'ICA/ASR 去伪迹',
        '球样条插值至 60 通道',
        '加载 mdJPT 预训练模型',
        '计算 STAI-S 预测分数',
        '生成风险等级报告',
      ],
      modelVersion: 'MindEEG-mdJPT-v1.0',
    },
    report: {
      predictedSTAIS: 38,
      riskLevel: '低风险',
      confidence: 88,
      recommendation: '当前焦虑风险较低，建议保持定期关注',
    },
  },
  {
    reportId: 'R2026003',
    date: '2026-05-28',
    student: {
      id: 'S2026003',
      grade: '大一',
      major: '计算机科学',
      task: '限时心算压力任务',
      assessmentType: '状态焦虑评估',
      privacy: '匿名化处理',
    },
    eeg: {
      fileName: 'S2026003_task_eeg.edf',
      sampleRate: '125 Hz',
      channels: '64 channels',
      duration: '9 min 10 s',
      phases: 'Baseline / Arithmetic Task / Recovery',
      status: '格式校验通过',
    },
    signalQuality: {
      quality: '一般',
      missingChannels: 2,
      artifactRatio: '5.1%',
      artifactLevel: '中度',
      completeness: '94.9%',
    },
    stais: {
      fileName: 'S2026003_STAIS.xlsx',
      selfReportScore: 62,
      status: '已绑定',
      purpose: '模型校准与报告对照',
    },
    preprocessing: {
      steps: [
        '统一物理量纲',
        '重采样至 125Hz',
        '0.5–47Hz 带通滤波',
        'ICA/ASR 去伪迹',
        '球样条插值至 60 通道',
        '加载 mdJPT 预训练模型',
        '计算 STAI-S 预测分数',
        '生成风险等级报告',
      ],
      modelVersion: 'MindEEG-mdJPT-v1.0',
    },
    report: {
      predictedSTAIS: 65,
      riskLevel: '高风险',
      confidence: 79,
      recommendation: '请优先安排心理老师进行复核访谈',
    },
  },
]

export const trendDataMap: Record<string, { time: string; score: number }[]> = {
  R2026001: [
    { time: '第1次', score: 42 },
    { time: '第2次', score: 48 },
    { time: '第3次', score: 52 },
  ],
  R2026002: [
    { time: '第1次', score: 40 },
    { time: '第2次', score: 37 },
    { time: '第3次', score: 38 },
  ],
  R2026003: [
    { time: '第1次', score: 55 },
    { time: '第2次', score: 60 },
    { time: '第3次', score: 65 },
  ],
}

// Keep backward-compatible export
export const mockAssessment = mockAssessments[0]
export const trendData = trendDataMap.R2026001
