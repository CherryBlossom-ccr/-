import { BarChart3, TrendingUp, Target, Activity, Award } from 'lucide-react'
import { useEffect, useState } from 'react'
import DataManager from '../utils/dataManager'

export default function Statistics() {
  const [monthlyData, setMonthlyData] = useState<any[]>([])
  const [skillStats, setSkillStats] = useState<any[]>([])
  const [achievements, setAchievements] = useState<any[]>([])
  const [totalTraining, setTotalTraining] = useState(0)
  const [averageAccuracy, setAverageAccuracy] = useState(0)
  const [trainingHours, setTrainingHours] = useState(0)
  const [achievementCount, setAchievementCount] = useState(0)

  useEffect(() => {
    const dataManager = DataManager.getInstance()
    const monthly = dataManager.getMonthlyData()
    const skills = dataManager.getSkillStats()
    const achs = dataManager.getAchievements()
    const records = dataManager.getTrainingRecords()

    setMonthlyData(monthly)
    setSkillStats(skills)
    setAchievements(achs)

    setTotalTraining(records.length)

    const videoAnalysisRecords = records.filter(r => r.type === '视频分析')
    const accuracySum = videoAnalysisRecords.reduce((sum, r) => sum + r.accuracy, 0)
    const avgAccuracy = videoAnalysisRecords.length > 0 ? accuracySum / videoAnalysisRecords.length : 0
    setAverageAccuracy(Math.round(avgAccuracy))

    const durationSum = records.reduce((sum, r) => {
      const minutes = parseInt(r.duration)
      return sum + (isNaN(minutes) ? 0 : minutes)
    }, 0)
    setTrainingHours(Math.round(durationSum / 60))

    setAchievementCount(achs.length)
  }, [])

  const getBarHeight = (value: number) => {
    return `${(value / 100) * 100}%`
  }

  

  const getSkillColor = (color: string) => {
    switch(color) {
      case 'blue': return 'text-blue-400 bg-blue-500/20'
      case 'green': return 'text-green-400 bg-green-500/20'
      case 'purple': return 'text-purple-400 bg-purple-500/20'
      case 'orange': return 'text-orange-400 bg-orange-500/20'
      default: return 'text-blue-400 bg-blue-500/20'
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card p-6 rounded-xl border border-white/10 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-400">总训练次数</span>
            <div className="p-2 bg-blue-500/20 rounded-full">
              <Activity className="w-5 h-5 text-blue-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white">{totalTraining}</p>
          <p className="text-sm text-green-400 mt-1 flex items-center">
            <TrendingUp className="w-4 h-4 mr-1" />
            新用户
          </p>
        </div>

        <div className="glass-card p-6 rounded-xl border border-white/10 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-400">平均准确度</span>
            <div className="p-2 bg-green-500/20 rounded-full">
              <Target className="w-5 h-5 text-green-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gradient">{averageAccuracy}%</p>
          <p className="text-sm text-green-400 mt-1 flex items-center">
            <TrendingUp className="w-4 h-4 mr-1" />
            持续提升
          </p>
        </div>

        <div className="glass-card p-6 rounded-xl border border-white/10 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-400">训练时长</span>
            <div className="p-2 bg-purple-500/20 rounded-full">
              <BarChart3 className="w-5 h-5 text-purple-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white">{trainingHours}h</p>
          <p className="text-sm text-green-400 mt-1 flex items-center">
            <TrendingUp className="w-4 h-4 mr-1" />
            积累中
          </p>
        </div>

        <div className="glass-card p-6 rounded-xl border border-white/10 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-400">获得成就</span>
            <div className="p-2 bg-orange-500/20 rounded-full">
              <Award className="w-5 h-5 text-orange-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white">{achievementCount}</p>
          <p className="text-sm text-green-400 mt-1 flex items-center">
            <TrendingUp className="w-4 h-4 mr-1" />
            继续努力
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6 rounded-xl border border-white/10 hover:shadow-xl transition-all duration-300">
          <h3 className="text-lg font-semibold mb-6 flex items-center text-gradient">
            <BarChart3 className="w-5 h-5 mr-2 text-blue-400" />
            月度准确度趋势
          </h3>
          <div className="flex items-end justify-between h-64">
            {monthlyData.map((data, index) => (
              <div key={index} className="flex flex-col items-center flex-1 transition-all duration-300 hover:scale-105">
                <div 
                  className="w-full max-w-12 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all duration-1000 ease-out animate-fade-in"
                  style={{ 
                    height: getBarHeight(data.accuracy),
                    animationDelay: `${index * 100}ms`,
                    boxShadow: '0 0 15px rgba(0, 136, 255, 0.3)'
                  }}
                >
                  <div className="text-center text-white text-xs font-medium py-2">
                    {data.accuracy}%
                  </div>
                </div>
                <div className="mt-3 text-xs text-gray-400">{data.month}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6 rounded-xl border border-white/10 hover:shadow-xl transition-all duration-300">
          <h3 className="text-lg font-semibold mb-6 flex items-center text-gradient">
            <Target className="w-5 h-5 mr-2 text-green-400" />
            技能评估
          </h3>
          <div className="space-y-6">
            {skillStats.map((skill, index) => (
              <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-gray-200">{skill.name}</span>
                    <span className={`text-xs px-3 py-1 rounded-full ${getSkillColor(skill.color)}`}>
                      {skill.trend}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-white">{skill.value}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-4 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-1500 ease-out ${getSkillColor(skill.color).replace('text-', 'bg-').replace('bg-', 'bg-gradient-to-r from-').replace('400', '500 to-')}400`}
                    style={{ 
                      width: `${skill.value}%`,
                      boxShadow: `0 0 10px ${skill.color === 'blue' ? '#0088ff' : skill.color === 'green' ? '#00ff88' : skill.color === 'purple' ? '#8800ff' : '#ff8800'}`
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="glass-card p-6 rounded-xl border border-white/10 hover:shadow-xl transition-all duration-300">
        <h3 className="text-lg font-semibold mb-6 flex items-center text-gradient">
          <Award className="w-5 h-5 mr-2 text-orange-400" />
          最近成就
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon
            return (
              <div 
                key={index} 
                className="p-5 bg-gradient-to-br from-orange-500/10 to-yellow-500/10 rounded-xl border border-orange-500/30 hover:bg-gradient-to-br from-orange-500/20 to-yellow-500/20 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-3 bg-orange-500/20 rounded-lg">
                    <Icon className="w-6 h-6 text-orange-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{achievement.title}</p>
                    <p className="text-xs text-gray-400">{achievement.date}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
