interface TrainingRecord {
  id: string
  date: string
  type: string
  duration: string
  accuracy: number
  status: 'completed' | 'incomplete'
}

interface TrainingSession {
  id: string
  day: string
  date: string
  type: string
  time: string
  duration: string
  status: 'completed' | 'upcoming' | 'missed'
}

interface MonthlyData {
  month: string
  accuracy: number
  sessions: number
}

interface SkillStat {
  name: string
  value: number
  trend: string
  color: string
}

interface Achievement {
  title: string
  date: string
  icon: string
}

interface UserProfile {
  name: string
  email: string
  phone: string
  location: string
  joinDate: string
  level: string
  avatar: string
}

interface DashboardStats {
  weeklyTraining: number
  averageAccuracy: number
  trainingHours: number
  planCompletion: number
}

interface TrainingGoals {
  videoAnalysis: { current: number; target: number }
  strengthTraining: { current: number; target: number }
  agilityTraining: { current: number; target: number }
}

class DataManager {
  private static instance: DataManager
  private data: {
    trainingRecords: TrainingRecord[]
    trainingSessions: TrainingSession[]
    monthlyData: MonthlyData[]
    skillStats: SkillStat[]
    achievements: Achievement[]
    userProfile: UserProfile
    dashboardStats: DashboardStats
    trainingGoals: TrainingGoals
  }

  private constructor() {
    this.data = this.initializeData()
  }

  public static getInstance(): DataManager {
    if (!DataManager.instance) {
      DataManager.instance = new DataManager()
    }
    return DataManager.instance
  }

  private initializeData() {
    const today = new Date()
    // const joinDate = new Date('2023-06-15')

    return {
      trainingRecords: this.generateInitialTrainingRecords(today),
      trainingSessions: this.generateInitialTrainingSessions(today),
      monthlyData: this.generateInitialMonthlyData(),
      skillStats: this.generateInitialSkillStats(),
      achievements: this.generateInitialAchievements(today),
      userProfile: {
        name: '用户',
        email: 'user@example.com',
        phone: '+86 138****8888',
        location: '北京市',
        joinDate: '2023-06-15',
        level: '初级运动员',
        avatar: 'U',
      },
      dashboardStats: {
        weeklyTraining: 0,
        averageAccuracy: 0,
        trainingHours: 0,
        planCompletion: 0,
      },
      trainingGoals: {
        videoAnalysis: { current: 0, target: 5 },
        strengthTraining: { current: 0, target: 4 },
        agilityTraining: { current: 0, target: 3 },
      },
    }
  }

  private generateInitialTrainingRecords(today: Date): TrainingRecord[] {
    const records: TrainingRecord[] = []
    const trainingTypes = ['视频分析', '力量训练', '敏捷训练', '平衡训练', '综合训练']

    for (let i = 0; i < 8; i++) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]
      const type = trainingTypes[i % trainingTypes.length]

      records.push({
        id: `record-${i}`,
        date: dateStr,
        type: type,
        duration: `${Math.floor(Math.random() * 40) + 10}分钟`,
        accuracy: type === '视频分析' ? Math.floor(Math.random() * 20) + 70 : 0,
        status: 'completed',
      })
    }

    return records
  }

  private generateInitialTrainingSessions(today: Date): TrainingSession[] {
    const sessions: TrainingSession[] = []
    const trainingTypes = ['速度训练', '平衡与协调', '综合训练', '力量训练']

    for (let i = 0; i < 5; i++) {
      const date = new Date(today)
      date.setDate(date.getDate() + i * 2)
      const dayNames = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
      const day = dayNames[date.getDay()]
      const month = date.getMonth() + 1
      const dayOfMonth = date.getDate()

      sessions.push({
        id: `session-${i}`,
        day: day,
        date: `${month}月${dayOfMonth}日`,
        type: trainingTypes[i % trainingTypes.length],
        time: '18:00',
        duration: `${Math.floor(Math.random() * 30) + 45}分钟`,
        status: i === 0 ? 'completed' : 'upcoming',
      })
    }

    return sessions
  }

  private generateInitialMonthlyData(): MonthlyData[] {
    const months = ['8月', '9月', '10月', '11月', '12月', '1月']
    return months.map((month, index) => ({
      month,
      accuracy: 70 + index * 2 + Math.floor(Math.random() * 5),
      sessions: 12 + index * 2 + Math.floor(Math.random() * 3),
    }))
  }

  private generateInitialSkillStats(): SkillStat[] {
    return [
      { name: '速度', value: 65, trend: '+0%', color: 'blue' },
      { name: '平衡', value: 68, trend: '+0%', color: 'green' },
      { name: '协调', value: 62, trend: '+0%', color: 'purple' },
      { name: '力量', value: 70, trend: '+0%', color: 'orange' },
    ]
  }

  private generateInitialAchievements(_today: Date): Achievement[] {
    return [
      {
        title: '首次使用',
        date: '2023-06-15',
        icon: '🎉',
      },
    ]
  }

  public getTrainingRecords(): TrainingRecord[] {
    return this.data.trainingRecords
  }

  public addTrainingRecord(record: Omit<TrainingRecord, 'id'>): void {
    const newRecord: TrainingRecord = {
      ...record,
      id: `record-${Date.now()}`,
    }
    this.data.trainingRecords.unshift(newRecord)
    this.updateDashboardStats()
  }

  public getTrainingSessions(): TrainingSession[] {
    return this.data.trainingSessions
  }

  public addTrainingSession(session: Omit<TrainingSession, 'id'>): void {
    const newSession: TrainingSession = {
      ...session,
      id: `session-${Date.now()}`,
    }
    this.data.trainingSessions.push(newSession)
  }

  public updateTrainingSessionStatus(id: string, status: TrainingSession['status']): void {
    const session = this.data.trainingSessions.find(s => s.id === id)
    if (session) {
      session.status = status
      if (status === 'completed') {
        this.updateDashboardStats()
      }
    }
  }

  public getMonthlyData(): MonthlyData[] {
    return this.data.monthlyData
  }

  public updateMonthlyData(accuracy: number): void {
    const currentMonth = new Date().toLocaleDateString('zh-CN', { month: 'long' })
    const monthData = this.data.monthlyData.find(m => m.month === currentMonth)
    if (monthData) {
      monthData.accuracy = Math.round((monthData.accuracy * monthData.sessions + accuracy) / (monthData.sessions + 1))
      monthData.sessions += 1
    }
  }

  public getSkillStats(): SkillStat[] {
    return this.data.skillStats
  }

  public updateSkillStats(analysisData: any): void {
    if (analysisData.movementAnalysis) {
      const { speed, balance, coordination } = analysisData.movementAnalysis
      this.data.skillStats[0].value = Math.round(speed)
      this.data.skillStats[1].value = Math.round(balance)
      this.data.skillStats[2].value = Math.round(coordination)
    }
  }

  public getAchievements(): Achievement[] {
    return this.data.achievements
  }

  public addAchievement(achievement: Achievement): void {
    this.data.achievements.unshift(achievement)
  }

  public getUserProfile(): UserProfile {
    return this.data.userProfile
  }

  public updateUserProfile(updates: Partial<UserProfile>): void {
    this.data.userProfile = { ...this.data.userProfile, ...updates }
  }

  public getDashboardStats(): DashboardStats {
    return this.data.dashboardStats
  }

  private updateDashboardStats(): void {
    const today = new Date()
    const weekAgo = new Date(today)
    weekAgo.setDate(weekAgo.getDate() - 7)

    const weeklyRecords = this.data.trainingRecords.filter(
      record => new Date(record.date) >= weekAgo
    )

    const videoAnalysisRecords = weeklyRecords.filter(r => r.type === '视频分析')
    const accuracySum = videoAnalysisRecords.reduce((sum, r) => sum + r.accuracy, 0)
    const avgAccuracy = videoAnalysisRecords.length > 0 ? accuracySum / videoAnalysisRecords.length : 0

    const durationSum = weeklyRecords.reduce((sum, r) => {
      const minutes = parseInt(r.duration)
      return sum + (isNaN(minutes) ? 0 : minutes)
    }, 0)

    this.data.dashboardStats = {
      weeklyTraining: weeklyRecords.length,
      averageAccuracy: Math.round(avgAccuracy),
      trainingHours: Math.round(durationSum / 60 * 10) / 10,
      planCompletion: Math.round((weeklyRecords.length / 12) * 100),
    }
  }

  public getTrainingGoals(): TrainingGoals {
    return this.data.trainingGoals
  }

  public updateTrainingGoals(type: keyof TrainingGoals): void {
    if (this.data.trainingGoals[type]) {
      this.data.trainingGoals[type].current += 1
    }
  }

  public checkAndAwardAchievements(): void {
    const stats = this.getDashboardStats()
    const records = this.getTrainingRecords()

    if (stats.weeklyTraining >= 7 && !this.data.achievements.find(a => a.title === '连续训练7天')) {
      this.addAchievement({
        title: '连续训练7天',
        date: new Date().toISOString().split('T')[0],
        icon: '🔥',
      })
    }

    if (stats.averageAccuracy >= 80 && !this.data.achievements.find(a => a.title === '准确度超过80%')) {
      this.addAchievement({
        title: '准确度超过80%',
        date: new Date().toISOString().split('T')[0],
        icon: '🎯',
      })
    }

    if (records.length >= 50 && !this.data.achievements.find(a => a.title === '完成50次训练')) {
      this.addAchievement({
        title: '完成50次训练',
        date: new Date().toISOString().split('T')[0],
        icon: '⭐',
      })
    }
  }

  public processVideoAnalysis(analysisData: any): void {
    const today = new Date()
    const dateStr = today.toISOString().split('T')[0]

    this.addTrainingRecord({
      date: dateStr,
      type: '视频分析',
      duration: '15分钟',
      accuracy: analysisData.poseAnalysis?.accuracy || 75,
      status: 'completed',
    })

    this.updateSkillStats(analysisData)
    this.updateMonthlyData(analysisData.poseAnalysis?.accuracy || 75)
    this.updateTrainingGoals('videoAnalysis')
    this.checkAndAwardAchievements()
  }

  public getAllData() {
    return this.data
  }
}

export default DataManager