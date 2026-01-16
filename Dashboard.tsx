import { Activity, TrendingUp, Target, Calendar, Award, Clock } from 'lucide-react'
import { useEffect, useState } from 'react'
import DataManager from '../utils/dataManager'

export default function Dashboard() {
  const [stats, setStats] = useState([
    { label: '本周训练', value: '0', unit: '次', icon: Activity },
    { label: '平均准确度', value: '0', unit: '%', icon: Target },
    { label: '训练时长', value: '0', unit: '小时', icon: Clock },
    { label: '完成计划', value: '0', unit: '%', icon: Award },
  ])
  const [recentActivities, setRecentActivities] = useState<any[]>([])
  const [upcomingTraining, setUpcomingTraining] = useState<any[]>([])
  const [trainingGoals, setTrainingGoals] = useState<any>(null)

  useEffect(() => {
    const dataManager = DataManager.getInstance()
    const dashboardStats = dataManager.getDashboardStats()
    const trainingRecords = dataManager.getTrainingRecords()
    const trainingSessions = dataManager.getTrainingSessions()
    const goals = dataManager.getTrainingGoals()

    setStats([
      { label: '本周训练', value: dashboardStats.weeklyTraining.toString(), unit: '次', icon: Activity },
      { label: '平均准确度', value: dashboardStats.averageAccuracy.toString(), unit: '%', icon: Target },
      { label: '训练时长', value: dashboardStats.trainingHours.toString(), unit: '小时', icon: Clock },
      { label: '完成计划', value: dashboardStats.planCompletion.toString(), unit: '%', icon: Award },
    ])

    setRecentActivities(trainingRecords.slice(0, 4).map(record => ({
      date: getRelativeDate(record.date),
      type: record.type,
      result: record.accuracy > 0 ? `准确度 ${record.accuracy}%` : '完成训练',
      status: record.status,
    })))

    setUpcomingTraining(trainingSessions.slice(0, 3).map(session => ({
      day: session.day,
      date: session.date,
      type: session.type,
      time: session.time,
    })))

    setTrainingGoals(goals)
  }, [])

  const getRelativeDate = (dateStr: string): string => {
    const date = new Date(dateStr)
    const today = new Date()
    const diffTime = today.getTime() - date.getTime()
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return '今天'
    if (diffDays === 1) return '昨天'
    if (diffDays === 2) return '2天前'
    if (diffDays === 3) return '3天前'
    return dateStr
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="stat-card p-6 card-hover">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-500/20 rounded-lg">
                  <Icon className="w-6 h-6 green-accent" />
                </div>
                <TrendingUp className="w-5 h-5 green-accent" />
              </div>
              <p className="text-3xl font-bold text-white">
                {stat.value}
                <span className="text-lg font-normal text-gray-400 ml-1">{stat.unit}</span>
              </p>
              <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Activity className="w-5 h-5 mr-2 green-accent" />
            <span className="text-white">最近活动</span>
          </h3>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full green-glow"></div>
                  <div>
                    <p className="font-medium text-white">{activity.type}</p>
                    <p className="text-sm text-gray-400">{activity.date}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-300">{activity.result}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2 green-accent" />
            <span className="text-white">即将到来的训练</span>
          </h3>
          <div className="space-y-4">
            {upcomingTraining.map((training, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex flex-col items-center justify-center">
                    <span className="text-xs text-green-400">{training.day}</span>
                    <span className="text-sm font-bold text-green-400">{training.date.split('月')[1]}</span>
                  </div>
                  <div>
                    <p className="font-medium text-white">{training.type}</p>
                    <p className="text-sm text-gray-400">{training.date}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-300">{training.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Target className="w-5 h-5 mr-2 green-accent" />
          <span className="text-white">本周训练目标</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {trainingGoals && (
            <>
              <div className="p-4 bg-white/5 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-white">视频分析</span>
                  <span className="text-sm green-accent">{trainingGoals.videoAnalysis.current}/{trainingGoals.videoAnalysis.target}</span>
                </div>
                <div className="progress-bar h-2">
                  <div className="progress-bar-fill" style={{ width: `${(trainingGoals.videoAnalysis.current / trainingGoals.videoAnalysis.target) * 100}%` }}></div>
                </div>
              </div>
              <div className="p-4 bg-white/5 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-white">力量训练</span>
                  <span className="text-sm green-accent">{trainingGoals.strengthTraining.current}/{trainingGoals.strengthTraining.target}</span>
                </div>
                <div className="progress-bar h-2">
                  <div className="progress-bar-fill" style={{ width: `${(trainingGoals.strengthTraining.current / trainingGoals.strengthTraining.target) * 100}%` }}></div>
                </div>
              </div>
              <div className="p-4 bg-white/5 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-white">敏捷训练</span>
                  <span className="text-sm green-accent">{trainingGoals.agilityTraining.current}/{trainingGoals.agilityTraining.target}</span>
                </div>
                <div className="progress-bar h-2">
                  <div className="progress-bar-fill" style={{ width: `${(trainingGoals.agilityTraining.current / trainingGoals.agilityTraining.target) * 100}%` }}></div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}