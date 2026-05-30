# 心脑智评 MindEEG 后端 API 交接文档

## 1. 概述

本文档定义心脑智评 MindEEG 平台的后端 API 接口规范，用于前端与后端（Python + FastAPI）的对接开发。

### 1.1 技术选型建议

| 组件 | 推荐方案 |
|---|---|
| Web 框架 | FastAPI (Python 3.10+) |
| 数据库 | PostgreSQL 15+ |
| 文件存储 | MinIO / 本地文件系统 (开发阶段) |
| 异步任务 | Celery + Redis / FastAPI BackgroundTasks |
| 认证 | JWT (python-jose) |
| EEG 处理 | MNE-Python, NumPy, SciPy |
| 模型推理 | PyTorch / ONNX Runtime |

### 1.2 基础信息

```
Base URL:  http://localhost:8000/api/v1
Content-Type: application/json
文件上传: multipart/form-data
认证方式: Bearer Token (JWT)
```

### 1.3 通用约定

- 所有响应包裹在统一结构中：
```json
{
  "code": 0,
  "message": "success",
  "data": { ... }
}
```
- 列表接口统一使用分页：
```json
{
  "code": 0,
  "data": {
    "items": [...],
    "total": 326,
    "page": 1,
    "page_size": 20
  }
}
```
- 时间格式：ISO 8601 (`2026-05-30T10:30:00+08:00`)
- 学生身份始终匿名化，API 中只使用学生编号（如 `S2026001`），不传输真实姓名

---

## 2. 认证模块 `POST /auth`

### 2.1 登录

```
POST /api/v1/auth/login
```

**Request:**
```json
{
  "username": "counselor_zhang",
  "password": "********"
}
```

**Response:**
```json
{
  "code": 0,
  "data": {
    "access_token": "eyJhbGciOi...",
    "token_type": "bearer",
    "expires_in": 7200,
    "user": {
      "id": "U001",
      "username": "counselor_zhang",
      "role": "counselor",
      "display_name": "张老师"
    }
  }
}
```

### 2.2 获取当前用户信息

```
GET /api/v1/auth/me
Headers: Authorization: Bearer <token>
```

**Response:** 同 `user` 对象。

### 2.3 刷新 Token

```
POST /api/v1/auth/refresh
```

---

## 3. 总览 / Dashboard `GET /dashboard`

### 3.1 系统概览统计

```
GET /api/v1/dashboard/overview
```

**Response:**
```json
{
  "code": 0,
  "data": {
    "total_assessments_month": 326,
    "low_risk_count": 218,
    "medium_risk_count": 86,
    "high_risk_count": 22,
    "pending_review_count": 31,
    "completed_reports": 295,
    "active_students": 312,
    "model_version": "MindEEG-mdJPT-v1.0",
    "last_training_date": "2026-05-15"
  }
}
```

---

## 4. 学生管理 `GET/POST /students`

> 所有学生信息均为匿名化处理，仅使用编号标识。

### 4.1 学生列表

```
GET /api/v1/students?page=1&page_size=20&grade=大二&major=软件工程
```

**Response:**
```json
{
  "code": 0,
  "data": {
    "items": [
      {
        "id": "S2026001",
        "grade": "大二",
        "major": "软件工程",
        "created_at": "2026-03-15T10:00:00+08:00",
        "assessment_count": 3,
        "latest_risk_level": "中度风险"
      }
    ],
    "total": 326,
    "page": 1,
    "page_size": 20
  }
}
```

### 4.2 创建学生

```
POST /api/v1/students
```

**Request:**
```json
{
  "grade": "大二",
  "major": "软件工程"
}
```

**Response:**
```json
{
  "code": 0,
  "data": {
    "id": "S2026006",
    "grade": "大二",
    "major": "软件工程",
    "created_at": "2026-05-30T15:00:00+08:00"
  }
}
```

### 4.3 学生详情

```
GET /api/v1/students/{student_id}
```

**Response:**
```json
{
  "code": 0,
  "data": {
    "id": "S2026001",
    "grade": "大二",
    "major": "软件工程",
    "created_at": "2026-03-15T10:00:00+08:00",
    "assessments": [
      {
        "assessment_id": "A2026001",
        "date": "2026-05-30",
        "predicted_stais": 52,
        "self_report_stais": 50,
        "risk_level": "中度风险",
        "confidence": 82
      }
    ]
  }
}
```

---

## 5. EEG 数据管理 `GET/POST/DELETE /eeg`

### 5.1 EEG 文件列表

```
GET /api/v1/eeg?page=1&page_size=20&status=已分析
```

**Response:**
```json
{
  "code": 0,
  "data": {
    "items": [
      {
        "id": "EEG2026001",
        "student_id": "S2026001",
        "file_name": "S2026001_task_eeg.mat",
        "file_size": 44300000,
        "sample_rate": 125,
        "channels": 60,
        "duration_seconds": 510,
        "phases": ["Baseline", "Arithmetic Task", "Recovery"],
        "status": "analyzed",
        "uploaded_at": "2026-05-28T10:00:00+08:00"
      }
    ],
    "total": 45,
    "page": 1,
    "page_size": 20
  }
}
```

### 5.2 上传 EEG 文件

```
POST /api/v1/eeg/upload
Content-Type: multipart/form-data
```

**Request fields:**
| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `file` | File | 是 | EEG 文件 (.mat/.csv/.edf/.set) |
| `student_id` | string | 是 | 学生编号 |

**Response:**
```json
{
  "code": 0,
  "data": {
    "id": "EEG2026006",
    "student_id": "S2026001",
    "file_name": "S2026001_task_eeg.mat",
    "file_size": 44300000,
    "sample_rate": 125,
    "channels": 60,
    "duration_seconds": 510,
    "status": "uploaded",
    "uploaded_at": "2026-05-30T15:10:00+08:00"
  }
}
```

### 5.3 EEG 文件详情

```
GET /api/v1/eeg/{eeg_id}
```

**Response:**
```json
{
  "code": 0,
  "data": {
    "id": "EEG2026001",
    "student_id": "S2026001",
    "file_name": "S2026001_task_eeg.mat",
    "file_size": 44300000,
    "sample_rate": 125,
    "channels": 60,
    "duration_seconds": 510,
    "phases": ["Baseline", "Arithmetic Task", "Recovery"],
    "status": "analyzed",
    "signal_quality": {
      "quality": "良好",
      "missing_channels": 0,
      "artifact_ratio": 2.8,
      "artifact_level": "轻度",
      "completeness": 98.6
    },
    "uploaded_at": "2026-05-28T10:00:00+08:00"
  }
}
```

### 5.4 删除 EEG 文件

```
DELETE /api/v1/eeg/{eeg_id}
```

---

## 6. 信号质量检测 `POST /signal-quality`

### 6.1 执行信号质量检测

```
POST /api/v1/signal-quality/check/{eeg_id}
```

**Response:**
```json
{
  "code": 0,
  "data": {
    "eeg_id": "EEG2026001",
    "quality": "良好",
    "missing_channels": 0,
    "artifact_ratio": 2.8,
    "artifact_level": "轻度",
    "completeness": 98.6,
    "checked_at": "2026-05-30T15:12:00+08:00"
  }
}
```

---

## 7. STAI-S 量表管理 `GET/POST /stais`

### 7.1 绑定 STAI-S 量表

```
POST /api/v1/stais/bind
```

**Request:**
```json
{
  "student_id": "S2026001",
  "self_report_score": 50,
  "scale_file": "S2026001_STAIS.xlsx"
}
```

或者直接上传 Excel 文件并解析：

```
POST /api/v1/stais/upload
Content-Type: multipart/form-data

Fields:
  file: S2026001_STAIS.xlsx
  student_id: S2026001
```

**Response:**
```json
{
  "code": 0,
  "data": {
    "id": "STAI2026001",
    "student_id": "S2026001",
    "file_name": "S2026001_STAIS.xlsx",
    "self_report_score": 50,
    "status": "已绑定",
    "created_at": "2026-05-30T15:20:00+08:00"
  }
}
```

### 7.2 查看 STAI-S 记录

```
GET /api/v1/stais/{stais_id}
```

---

## 8. 评估任务 `GET/POST /assessments`

### 8.1 创建评估任务

```
POST /api/v1/assessments
```

**Request:**
```json
{
  "student_id": "S2026001",
  "eeg_id": "EEG2026001",
  "stais_id": "STAI2026001",
  "task_type": "限时心算压力任务",
  "assessment_type": "状态焦虑评估"
}
```

**Response:**
```json
{
  "code": 0,
  "data": {
    "id": "A2026006",
    "student_id": "S2026001",
    "status": "created",
    "created_at": "2026-05-30T15:30:00+08:00"
  }
}
```

### 8.2 评估任务列表

```
GET /api/v1/assessments?page=1&page_size=20&student_id=S2026001&status=completed
```

### 8.3 评估任务详情

```
GET /api/v1/assessments/{assessment_id}
```

**Response:**
```json
{
  "code": 0,
  "data": {
    "id": "A2026001",
    "student_id": "S2026001",
    "eeg_id": "EEG2026001",
    "stais_id": "STAI2026001",
    "task_type": "限时心算压力任务",
    "assessment_type": "状态焦虑评估",
    "status": "completed",
    "progress": {
      "current_step": 5,
      "steps": [
        { "name": "统一物理量纲", "status": "done" },
        { "name": "重采样至 125Hz", "status": "done" },
        { "name": "0.5–47Hz 带通滤波", "status": "done" },
        { "name": "ICA/ASR 去伪迹", "status": "done" },
        { "name": "球样条插值至 60 通道", "status": "done" },
        { "name": "加载 mdJPT 预训练模型", "status": "done" },
        { "name": "计算 STAI-S 预测分数", "status": "done" },
        { "name": "生成风险等级报告", "status": "done" }
      ]
    },
    "created_at": "2026-05-28T08:00:00+08:00",
    "completed_at": "2026-05-28T08:05:30+08:00"
  }
}
```

### 8.4 启动 AI 分析

```
POST /api/v1/assessments/{assessment_id}/run
```

触发后台异步任务：EEG 预处理 → mdJPT 模型推理 → STAI-S 预测 → 风险等级判断 → 报告生成。

**Response (立即返回):**
```json
{
  "code": 0,
  "data": {
    "assessment_id": "A2026006",
    "status": "processing",
    "started_at": "2026-05-30T15:32:00+08:00"
  }
}
```

### 8.5 轮询分析进度

```
GET /api/v1/assessments/{assessment_id}/progress
```

**Response (进行中):**
```json
{
  "code": 0,
  "data": {
    "assessment_id": "A2026006",
    "status": "processing",
    "current_step": 4,
    "steps": [
      { "name": "统一物理量纲", "status": "done" },
      { "name": "重采样至 125Hz", "status": "done" },
      { "name": "0.5–47Hz 带通滤波", "status": "done" },
      { "name": "ICA/ASR 去伪迹", "status": "running" },
      { "name": "球样条插值至 60 通道", "status": "pending" },
      { "name": "加载 mdJPT 预训练模型", "status": "pending" },
      { "name": "计算 STAI-S 预测分数", "status": "pending" },
      { "name": "生成风险等级报告", "status": "pending" }
    ]
  }
}
```

---

## 9. 评估报告 `GET /reports`

### 9.1 获取评估报告

```
GET /api/v1/reports/{assessment_id}
```

**Response:**
```json
{
  "code": 0,
  "data": {
    "report_id": "R2026001",
    "assessment_id": "A2026001",
    "model_version": "MindEEG-mdJPT-v1.0",
    "generated_at": "2026-05-30T09:00:00+08:00",
    "student": {
      "id": "S2026001",
      "grade": "大二",
      "major": "软件工程",
      "task": "限时心算压力任务",
      "assessment_type": "状态焦虑评估",
      "privacy": "匿名化处理"
    },
    "eeg_info": {
      "file_name": "S2026001_task_eeg.mat",
      "sample_rate": 125,
      "channels": 60,
      "duration_seconds": 510,
      "phases": ["Baseline", "Arithmetic Task", "Recovery"]
    },
    "signal_quality": {
      "quality": "良好",
      "artifact_ratio": 2.8,
      "completeness": 98.6
    },
    "results": {
      "predicted_stais": 52,
      "self_report_stais": 50,
      "risk_level": "中度风险",
      "risk_score_range": "40–59",
      "confidence": 82
    },
    "brain_regions": [
      { "region": "额叶", "intensity": "高", "description": "情绪调节和认知负荷" },
      { "region": "左颞叶", "intensity": "中", "description": "情绪与记忆相关" },
      { "region": "右颞叶", "intensity": "中", "description": "社会与情绪信息处理" },
      { "region": "中央区", "intensity": "中", "description": "感觉运动整合" },
      { "region": "枕叶", "intensity": "低", "description": "视觉处理" }
    ],
    "explanation": "模型在本次评估中主要关注额叶、中央区和颞叶相关 EEG 特征，其中额叶区域响应增强可能与压力任务下的情绪调节和认知负荷变化有关。",
    "recommendations": [
      "建议由心理老师进行一次复核访谈。",
      "建议结合近期学业压力、睡眠情况和人际关系进行综合判断。",
      "若连续多次评估处于中高风险区间，建议纳入持续关注名单。"
    ],
    "eeg_waveform_url": "/api/v1/reports/A2026001/waveform.png",
    "brain_heatmap_url": "/api/v1/reports/A2026001/heatmap.png"
  }
}
```

### 9.2 获取评估趋势

```
GET /api/v1/reports/trends/{student_id}
```

**Response:**
```json
{
  "code": 0,
  "data": {
    "student_id": "S2026001",
    "trends": [
      { "date": "2026-05-15", "assessment_id": "A2026001", "predicted_stais": 42 },
      { "date": "2026-05-22", "assessment_id": "A2026002", "predicted_stais": 48 },
      { "date": "2026-05-30", "assessment_id": "A2026003", "predicted_stais": 52 }
    ],
    "trend_direction": "上升",
    "trend_note": "近期状态焦虑水平呈上升趋势，建议关注学业压力和睡眠状态。"
  }
}
```

### 9.3 导出报告 PDF

```
GET /api/v1/reports/{assessment_id}/export?format=pdf
```

返回 PDF 文件流。

### 9.4 报告列表

```
GET /api/v1/reports?page=1&page_size=20&risk_level=高风险&student_id=S2026001
```

---

## 10. 群体趋势分析 `GET /analytics`

### 10.1 群体统计概览

```
GET /api/v1/analytics/group/overview?month=2026-05
```

**Response:**
```json
{
  "code": 0,
  "data": {
    "period": "2026-05",
    "total_assessments": 326,
    "low_risk_count": 218,
    "medium_risk_count": 86,
    "high_risk_count": 22,
    "pending_review_count": 31,
    "risk_distribution": {
      "low_risk_pct": 66.9,
      "medium_risk_pct": 26.4,
      "high_risk_pct": 6.7
    }
  }
}
```

### 10.2 风险等级分布

```
GET /api/v1/analytics/group/risk-distribution?month=2026-05
```

**Response:**
```json
{
  "code": 0,
  "data": [
    { "level": "低风险", "count": 218, "color": "#22c55e" },
    { "level": "中度风险", "count": 86, "color": "#f97316" },
    { "level": "高风险", "count": 22, "color": "#ef4444" }
  ]
}
```

### 10.3 年级对比

```
GET /api/v1/analytics/group/grade-comparison?month=2026-05
```

**Response:**
```json
{
  "code": 0,
  "data": [
    { "grade": "大一", "avg_stais": 43, "low_risk": 68, "medium_risk": 24, "high_risk": 5 },
    { "grade": "大二", "avg_stais": 48, "low_risk": 55, "medium_risk": 32, "high_risk": 8 },
    { "grade": "大三", "avg_stais": 50, "low_risk": 52, "medium_risk": 20, "high_risk": 6 },
    { "grade": "大四", "avg_stais": 46, "low_risk": 43, "medium_risk": 10, "high_risk": 3 }
  ]
}
```

### 10.4 月度趋势

```
GET /api/v1/analytics/group/monthly-trend?months=6
```

**Response:**
```json
{
  "code": 0,
  "data": [
    { "month": "2025-12", "avg_stais": 44 },
    { "month": "2026-01", "avg_stais": 45 },
    { "month": "2026-02", "avg_stais": 47 },
    { "month": "2026-03", "avg_stais": 48 },
    { "month": "2026-04", "avg_stais": 49 },
    { "month": "2026-05", "avg_stais": 50 }
  ]
}
```

### 10.5 高风险关注列表

```
GET /api/v1/analytics/group/high-risk-list?page=1&page_size=20
```

**Response:**
```json
{
  "code": 0,
  "data": {
    "items": [
      {
        "student_id": "S2026023",
        "grade": "大三",
        "latest_predicted_stais": 68,
        "risk_level": "高风险",
        "assessment_date": "2026-05-29",
        "recommended_action": "优先复核"
      }
    ],
    "total": 22,
    "page": 1,
    "page_size": 20
  }
}
```

---

## 11. 模型训练 `GET /model`

### 11.1 训练状态

```
GET /api/v1/model/training-status
```

**Response:**
```json
{
  "code": 0,
  "data": {
    "current_version": "MindEEG-mdJPT-v1.0",
    "stages": [
      { "name": "DASPS 预训练", "status": "done", "description": "焦虑诱发 EEG 表征学习", "completed_at": "2026-04-01" },
      { "name": "SAM40 预训练", "status": "done", "description": "压力与认知任务 EEG 表征学习", "completed_at": "2026-04-10" },
      { "name": "EEGMAT 预训练", "status": "done", "description": "心算任务 EEG 表征学习", "completed_at": "2026-04-18" },
      { "name": "DEAP 预训练", "status": "done", "description": "多维情绪 EEG 表征学习", "completed_at": "2026-04-25" },
      { "name": "mdJPT 联合预训练", "status": "done", "description": "CDA + ISA Loss 对齐", "completed_at": "2026-05-05" },
      { "name": "本校 STAI-S 微调", "status": "active", "description": "RMSE + Ordinal Loss", "started_at": "2026-05-10" },
      { "name": "模型评估与验证", "status": "pending", "description": "留一被试交叉验证" }
    ],
    "metrics": {
      "pretraining_datasets": 4,
      "finetuning_dataset": "本校 STAI-S EEG",
      "input_channels": 60,
      "sample_rate": 125,
      "validation_rmse": 6.42,
      "validation_accuracy": 78.5
    }
  }
}
```

### 11.2 模型版本列表

```
GET /api/v1/model/versions
```

---

## 12. 系统设置 `GET/PUT /settings`

### 12.1 获取设置

```
GET /api/v1/settings
```

**Response:**
```json
{
  "code": 0,
  "data": {
    "notifications": {
      "high_risk_email": true,
      "weekly_group_report": true,
      "training_complete_alert": true
    },
    "privacy": {
      "encryption": "AES-256",
      "anonymization": true,
      "data_retention_eeg_days": 365,
      "data_retention_report_days": 0
    },
    "backup": {
      "auto_backup": true,
      "backup_interval_hours": 24
    },
    "accounts": {
      "counselor_count": 3,
      "admin_count": 1
    }
  }
}
```

### 12.2 更新设置

```
PUT /api/v1/settings
```

**Request:** 同上述结构的部分字段。

---

## 13. 数据模型汇总

### 13.1 枚举值

| 字段 | 可选值 |
|---|---|
| `role` | `admin`, `counselor` |
| `eeg_status` | `uploaded`, `validating`, `validated`, `analyzing`, `analyzed`, `error` |
| `assessment_status` | `created`, `eeg_uploaded`, `stais_bound`, `processing`, `completed`, `failed` |
| `risk_level` | `低风险`, `中度风险`, `高风险` |
| `signal_quality` | `优秀`, `良好`, `一般`, `较差` |
| `artifact_level` | `无`, `轻微`, `轻度`, `中度`, `严重` |
| `training_status` | `pending`, `active`, `done`, `failed` |

### 13.2 核心数据表结构建议

```
students
  id (PK), grade, major, created_at

eeg_files
  id (PK), student_id (FK), file_name, file_path, file_size,
  sample_rate, channels, duration_seconds, phases (JSON),
  status, uploaded_at

signal_quality
  id (PK), eeg_id (FK), quality, missing_channels,
  artifact_ratio, artifact_level, completeness, checked_at

stais_records
  id (PK), student_id (FK), file_name, self_report_score,
  status, created_at

assessments
  id (PK), student_id (FK), eeg_id (FK), stais_id (FK),
  task_type, assessment_type, status, started_at, completed_at

assessment_progress
  id (PK), assessment_id (FK), step_name, status, updated_at

reports
  id (PK), assessment_id (FK), report_id (unique),
  model_version, predicted_stais, risk_level, confidence,
  explanation, recommendations (JSON), brain_regions (JSON),
  generated_at

assessment_trends
  id (PK), student_id (FK), assessment_id (FK),
  predicted_stais, date

model_versions
  id (PK), version, status, metrics (JSON), created_at

model_training_stages
  id (PK), version_id (FK), name, status, description,
  started_at, completed_at
```

---

## 14. 错误码

| Code | HTTP Status | 说明 |
|---|---|---|
| 0 | 200 | 成功 |
| 1001 | 400 | 请求参数错误 |
| 1002 | 404 | 资源不存在 |
| 1003 | 409 | 资源状态冲突（如重复操作） |
| 1004 | 413 | 文件过大 |
| 1005 | 415 | 不支持的文件格式 |
| 2001 | 401 | 未认证 |
| 2002 | 403 | 权限不足 |
| 2003 | 401 | Token 已过期 |
| 3001 | 500 | EEG 预处理失败 |
| 3002 | 500 | 模型推理失败 |
| 3003 | 500 | 文件解析失败 |
| 4001 | 503 | 模型未就绪 |
| 4002 | 503 | GPU 资源不足 |

---

## 15. 前端对接指引

### 15.1 当前 mock 数据切换

在 `src/services/api.ts` 中，`USE_MOCK` 标志控制数据来源：

```typescript
// 当前开发阶段
const USE_MOCK = true

// 接入后端后
const USE_MOCK = false
const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api/v1'
```

### 15.2 前端需要新增的调用

| 前端功能 | 对应 API | 位置 |
|---|---|---|
| Dashboard 统计 | `GET /dashboard/overview` | `src/pages/Dashboard.tsx` |
| 新建评估 - 上传 EEG | `POST /eeg/upload` | `src/pages/NewAssessment.tsx` |
| 新建评估 - 启动分析 | `POST /assessments/{id}/run` | `src/pages/NewAssessment.tsx` |
| 新建评估 - 轮询进度 | `GET /assessments/{id}/progress` | `src/pages/NewAssessment.tsx` |
| EEG 数据列表 | `GET /eeg` | `src/pages/EEGDataManagement.tsx` |
| 报告 - 切换报告 | `GET /reports?student_id=` | `src/pages/Report.tsx` |
| 报告 - 加载报告 | `GET /reports/{assessment_id}` | `src/pages/Report.tsx` |
| 报告 - 趋势数据 | `GET /reports/trends/{student_id}` | `src/pages/Report.tsx` |
| 群体分析 - 全部 | `GET /analytics/group/*` | `src/pages/GroupAnalytics.tsx` |
| 模型状态 | `GET /model/training-status` | `src/pages/ModelTraining.tsx` |
| 系统设置 | `GET/PUT /settings` | `src/pages/SystemSettings.tsx` |

### 15.3 文件上传处理

前端上传示例：
```typescript
const formData = new FormData()
formData.append('file', eegFile)
formData.append('student_id', studentId)

const response = await fetch('/api/v1/eeg/upload', {
  method: 'POST',
  headers: { 'Authorization': `Bearer ${token}` },
  body: formData,
})
```

### 15.4 进度轮询

分析任务启动后，前端应每隔 2 秒轮询进度直到完成：
```typescript
const pollProgress = async (assessmentId: string) => {
  const interval = setInterval(async () => {
    const res = await fetch(`/api/v1/assessments/${assessmentId}/progress`)
    const { data } = await res.json()
    if (data.status === 'completed') {
      clearInterval(interval)
      // 跳转报告页
    } else if (data.status === 'failed') {
      clearInterval(interval)
      // 显示错误
    }
  }, 2000)
}
```

---

## 16. 实施优先级

| 优先级 | 模块 | 说明 |
|---|---|---|
| P0 | 认证模块 | 登录和 Token 管理，所有 API 的前置依赖 |
| P0 | EEG 上传 + 信号质量检测 | 核心数据入口 |
| P0 | STAI-S 绑定 | 量表数据入口 |
| P0 | 评估任务 + AI 分析 | 核心业务闭环 |
| P0 | 评估报告 | 核心输出 |
| P1 | 学生管理 | 报告和趋势的基础 |
| P1 | 评估趋势 | 个体纵向对比 |
| P1 | Dashboard 总览 | 管理视角 |
| P2 | 群体趋势分析 | 数据聚合统计 |
| P2 | 模型训练状态 | 模型管理 |
| P2 | 系统设置 | 配置管理 |
| P3 | PDF 导出 | 报告导出功能 |

---

## 17. 安全注意事项

1. **认证**：所有 API（除登录外）必须在 Header 中携带有效 JWT Token
2. **文件上传**：限制文件大小（建议 ≤ 100MB），校验文件类型白名单
3. **匿名化**：API 响应中不应包含学生真实姓名，仅使用编号
4. **数据加密**：EEG 文件和量表数据在存储时应加密（AES-256）
5. **访问控制**：心理老师只能查看自己负责的学生，管理员可查看全部
6. **速率限制**：登录接口应限制尝试频率，防止暴力破解
7. **日志审计**：记录所有报告查看和导出的操作日志
