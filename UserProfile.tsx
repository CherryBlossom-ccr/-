import { User, Mail, Phone, MapPin, Calendar, Award, Target, Edit, Camera } from 'lucide-react'
import { useEffect, useState } from 'react'
import DataManager from '../utils/dataManager'

export default function UserProfile() {
  const [user, setUser] = useState<any>(null)
  const [stats, setStats] = useState<any[]>([])
  const [achievements, setAchievements] = useState<any[]>([])

  useEffect(() => {
    const dataManager = DataManager.getInstance()
    const userProfile = dataManager.getUserProfile()
    const records = dataManager.getTrainingRecords()
    const achs = dataManager.getAchievements()

    setUser(userProfile)

    const trainingCount = records.length
    const achievementCount = achs.length
    const uniqueDays = new Set(records.map(r => r.date.split('T')[0])).size

    setStats([
      { label: '训练次数', value: trainingCount.toString(), icon: Target },
      { label: '获得成就', value: achievementCount.toString(), icon: Award },
      { label: '训练天数', value: uniqueDays.toString(), icon: Calendar },
    ])

    setAchievements(achs)
  }, [])

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-green-500 h-32"></div>
        <div className="px-6 pb-6">
          <div className="flex items-end -mt-16 mb-4">
            <div className="relative">
              <div className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center text-white text-4xl font-bold border-4 border-white shadow-lg">
                {user.avatar}
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors">
                <Camera className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="ml-6 mb-2">
              <div className="flex items-center space-x-3">
                <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Edit className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <p className="text-gray-600">{user.level}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <User className="w-5 h-5 text-gray-600" />
              <div className="flex-1">
                <p className="text-sm text-gray-500">姓名</p>
                <p className="text-gray-800">{user.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <Mail className="w-5 h-5 text-gray-600" />
              <div className="flex-1">
                <p className="text-sm text-gray-500">邮箱</p>
                <p className="text-gray-800">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <Phone className="w-5 h-5 text-gray-600" />
              <div className="flex-1">
                <p className="text-sm text-gray-500">电话</p>
                <p className="text-gray-800">{user.phone}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <MapPin className="w-5 h-5 text-gray-600" />
              <div className="flex-1">
                <p className="text-sm text-gray-500">位置</p>
                <p className="text-gray-800">{user.location}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <Calendar className="w-5 h-5 text-gray-600" />
              <div className="flex-1">
                <p className="text-sm text-gray-500">加入时间</p>
                <p className="text-gray-800">{user.joinDate}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-6 flex items-center">
          <Award className="w-5 h-5 mr-2 text-orange-600" />
          成就徽章
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((achievement, index) => (
            <div key={index} className="p-4 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg border border-orange-200 text-center">
              <div className="text-4xl mb-2">{achievement.icon}</div>
              <p className="font-semibold text-gray-800 mb-1">{achievement.title}</p>
              <p className="text-xs text-gray-600">{achievement.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
