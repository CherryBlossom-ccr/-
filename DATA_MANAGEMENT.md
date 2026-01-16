# 数据管理系统使用说明

## 概述

足球教练助手应用使用 `DataManager` 单例类来统一管理所有仪表盘数据。该系统确保数据的一致性和实时更新。

## 核心功能

### 1. 数据初始化

应用启动时，`DataManager` 会自动初始化以下数据：

- **训练记录**：生成最近8天的训练记录
- **训练会话**：生成未来5个训练计划
- **月度数据**：生成过去6个月的训练统计
- **技能评估**：初始化基础技能数据（速度、平衡、协调、力量）
- **成就系统**：初始化"首次使用"成就
- **用户档案**：初始化默认用户信息

### 2. 数据结构

#### 训练记录 (TrainingRecord)
```typescript
interface TrainingRecord {
  id: string
  date: string
  type: string
  duration: string
  accuracy: number
  status: 'completed' | 'incomplete'
}
```

#### 训练会话 (TrainingSession)
```typescript
interface TrainingSession {
  id: string
  day: string
  date: string
  type: string
  time: string
  duration: string
  status: 'completed' | 'upcoming' | 'missed'
}
```

#### 月度数据 (MonthlyData)
```typescript
interface MonthlyData {
  month: string
  accuracy: number
  sessions: number
}
```

#### 技能评估 (SkillStat)
```typescript
interface SkillStat {
  name: string
  value: number
  trend: string
  color: string
}
```

#### 成就 (Achievement)
```typescript
interface Achievement {
  title: string
  date: string
  icon: string
}
```

#### 用户档案 (UserProfile)
```typescript
interface UserProfile {
  name: string
  email: string
  phone: string
  location: string
  joinDate: string
  level: string
  avatar: string
}
```

## 使用方法

### 获取 DataManager 实例

```typescript
import DataManager from './utils/dataManager'

const dataManager = DataManager.getInstance()
```

### 主要 API 方法

#### 1. 训练记录管理

```typescript
// 获取所有训练记录
const records = dataManager.getTrainingRecords()

// 添加新的训练记录
dataManager.addTrainingRecord({
  date: '2024-01-08',
  type: '视频分析',
  duration: '15分钟',
  accuracy: 82,
  status: 'completed'
})
```

#### 2. 训练会话管理

```typescript
// 获取所有训练会话
const sessions = dataManager.getTrainingSessions()

// 添加新的训练会话
dataManager.addTrainingSession({
  day: '周一',
  date: '1月15日',
  type: '速度训练',
  time: '18:00',
  duration: '60分钟',
  status: 'upcoming'
})

// 更新训练会话状态
dataManager.updateTrainingSessionStatus('session-1', 'completed')
```

#### 3. 月度数据管理

```typescript
// 获取月度数据
const monthlyData = dataManager.getMonthlyData()

// 更新月度数据（通常在视频分析后自动调用）
dataManager.updateMonthlyData(85)
```

#### 4. 技能评估管理

```typescript
// 获取技能评估数据
const skillStats = dataManager.getSkillStats()

// 更新技能评估（通常在视频分析后自动调用）
dataManager.updateSkillStats({
  movementAnalysis: {
    speed: 78,
    balance: 82,
    coordination: 75
  }
})
```

#### 5. 成就管理

```typescript
// 获取所有成就
const achievements = dataManager.getAchievements()

// 添加新成就
dataManager.addAchievement({
  title: '连续训练7天',
  date: '2024-01-08',
  icon: '🔥'
})

// 检查并颁发成就（通常在训练后自动调用）
dataManager.checkAndAwardAchievements()
```

#### 6. 用户档案管理

```typescript
// 获取用户档案
const userProfile = dataManager.getUserProfile()

// 更新用户档案
dataManager.updateUserProfile({
  name: '新用户名',
  email: 'newemail@example.com'
})
```

#### 7. 仪表盘统计

```typescript
// 获取仪表盘统计数据
const stats = dataManager.getDashboardStats()

// stats 包含：
// - weeklyTraining: 本周训练次数
// - averageAccuracy: 平均准确度
// - trainingHours: 训练时长
// - planCompletion: 计划完成百分比
```

#### 8. 训练目标管理

```typescript
// 获取训练目标
const goals = dataManager.getTrainingGoals()

// 更新训练目标进度
dataManager.updateTrainingGoals('videoAnalysis')
dataManager.updateTrainingGoals('strengthTraining')
dataManager.updateTrainingGoals('agilityTraining')
```

#### 9. 视频分析处理

```typescript
// 处理视频分析结果（自动更新所有相关数据）
dataManager.processVideoAnalysis({
  poseAnalysis: {
    accuracy: 85,
    issues: ['膝盖内扣'],
    improvements: ['加强腿部力量训练']
  },
  movementAnalysis: {
    speed: 78,
    balance: 82,
    coordination: 75
  },
  recommendations: ['建议增加平衡训练']
})
```

## 数据流程

### 视频分析流程

1. 用户上传视频
2. 系统调用后端API进行分析
3. 分析完成后调用 `processVideoAnalysis()`
4. 自动执行以下操作：
   - 添加训练记录
   - 更新技能评估
   - 更新月度数据
   - 更新训练目标进度
   - 检查并颁发成就

### 训练完成流程

1. 完成训练会话
2. 调用 `updateTrainingSessionStatus()`
3. 自动更新仪表盘统计

## 组件集成

所有仪表盘组件都已集成 `DataManager`：

- **Dashboard**：显示实时统计数据和训练目标
- **TrainingHistory**：显示训练记录列表
- **TrainingCalendar**：显示训练计划和统计
- **Statistics**：显示月度趋势和技能评估
- **UserProfile**：显示用户信息和成就

## 成就系统

系统会自动检查以下成就：

1. **连续训练7天**：当周训练次数达到7次
2. **准确度超过80%**：平均准确度达到80%
3. **完成50次训练**：总训练次数达到50次

## 注意事项

1. **单例模式**：`DataManager` 使用单例模式，确保全局只有一个实例
2. **实时更新**：数据更新后，所有使用该数据的组件会自动重新渲染
3. **数据持久化**：当前版本数据存储在内存中，刷新页面会重置为初始数据
4. **扩展性**：可以轻松添加新的数据类型和管理方法

## 示例代码

### 在组件中使用 DataManager

```typescript
import { useEffect, useState } from 'react'
import DataManager from '../utils/dataManager'

export default function MyComponent() {
  const [records, setRecords] = useState([])

  useEffect(() => {
    const dataManager = DataManager.getInstance()
    setRecords(dataManager.getTrainingRecords())
  }, [])

  const handleAddRecord = () => {
    const dataManager = DataManager.getInstance()
    dataManager.addTrainingRecord({
      date: new Date().toISOString().split('T')[0],
      type: '力量训练',
      duration: '45分钟',
      accuracy: 0,
      status: 'completed'
    })
    
    // 重新获取数据
    setRecords(dataManager.getTrainingRecords())
  }

  return (
    <div>
      <button onClick={handleAddRecord}>添加训练记录</button>
      {/* 显示记录 */}
    </div>
  )
}
```

## 未来改进

1. **数据持久化**：添加 localStorage 或后端数据库支持
2. **数据同步**：实现多设备数据同步
3. **数据导出**：支持导出训练数据为 CSV 或 PDF
4. **高级分析**：添加更多数据分析和可视化功能
5. **自定义目标**：允许用户设置个性化训练目标