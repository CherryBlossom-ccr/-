import { Calendar as CalendarIcon, Clock, Target, CheckCircle, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import DataManager from '../utils/dataManager'

interface TrainingSession {
  id: string
  day: string
  date: string
  type: string
  time: string
  duration: string
  status: 'completed' | 'upcoming' | 'missed'
}

export default function TrainingCalendar() {
  const [sessions, setSessions] = useState<TrainingSession[]>([])
  const [completedCount, setCompletedCount] = useState(0)
  const [upcomingCount, setUpcomingCount] = useState(0)
  const [totalHours, setTotalHours] = useState(0)

  useEffect(() => {
    const dataManager = DataManager.getInstance()
    const trainingSessions = dataManager.getTrainingSessions()
    setSessions(trainingSessions)

    const completed = trainingSessions.filter(s => s.status === 'completed').length
    const upcoming = trainingSessions.filter(s => s.status === 'upcoming').length
    setCompletedCount(completed)
    setUpcomingCount(upcoming)

    const completedSessions = trainingSessions.filter(s => s.status === 'completed')
    const hours = completedSessions.reduce((sum, s) => {
      const minutes = parseInt(s.duration)
      return sum + (isNaN(minutes) ? 0 : minutes)
    }, 0)
    setTotalHours(Math.round(hours / 60 * 10) / 10)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-600 border-green-200'
      case 'upcoming':
        return 'bg-blue-100 text-blue-600 border-blue-200'
      case 'missed':
        return 'bg-red-100 text-red-600 border-red-200'
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return '已完成'
      case 'upcoming':
        return '即将开始'
      case 'missed':
        return '已错过'
      default:
        return '未知'
    }
  }

  const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  const currentMonth = new Date().toLocaleDateString('zh-CN', { month: 'long', year: 'numeric' })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{currentMonth}</h2>
          <p className="text-sm text-gray-500">训练计划安排</p>
        </div>
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">添加训练</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <CalendarIcon className="w-5 h-5 mr-2 text-blue-600" />
            本月训练日历
          </h3>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {weekDays.map((day) => (
              <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 31 }, (_, i) => {
              const day = i + 1
              const hasTraining = [1, 3, 5, 8, 10, 12, 15, 17, 19, 22, 24, 26, 29, 31].includes(day)
              const isToday = day === new Date().getDate()
              return (
                <div
                  key={day}
                  className={`
                    aspect-square flex items-center justify-center rounded-lg text-sm font-medium cursor-pointer transition-colors
                    ${isToday ? 'bg-blue-600 text-white' : 'hover:bg-gray-100 text-gray-700'}
                    ${hasTraining && !isToday ? 'bg-blue-50 text-blue-600' : ''}
                  `}
                >
                  {day}
                </div>
              )
            })}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Target className="w-5 h-5 mr-2 text-green-600" />
            本周训练统计
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-gray-700">已完成</span>
              </div>
              <span className="text-lg font-bold text-green-600">{completedCount}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">即将开始</span>
              </div>
              <span className="text-lg font-bold text-blue-600">{upcomingCount}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">总训练时长</span>
              </div>
              <span className="text-lg font-bold text-gray-600">{totalHours}h</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold flex items-center">
            <CalendarIcon className="w-5 h-5 mr-2 text-purple-600" />
            近期训练安排
          </h3>
        </div>
        <div className="divide-y">
          {sessions.map((session) => (
            <div key={session.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-lg flex flex-col items-center justify-center">
                    <span className="text-xs text-blue-600">{session.day}</span>
                    <span className="text-xl font-bold text-blue-600">{session.date.split('月')[1]}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{session.type}</p>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {session.time}
                      </span>
                      <span className="flex items-center">
                        <Target className="w-4 h-4 mr-1" />
                        {session.duration}
                      </span>
                    </div>
                  </div>
                </div>
                <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(session.status)}`}>
                  {getStatusText(session.status)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
