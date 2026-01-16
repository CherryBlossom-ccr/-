import { History, Play, Calendar, Filter } from 'lucide-react'
import { useEffect, useState } from 'react'
import DataManager from '../utils/dataManager'

interface TrainingRecord {
  id: string
  date: string
  type: string
  duration: string
  accuracy: number
  status: 'completed' | 'incomplete'
}

export default function TrainingHistory() {
  const [records, setRecords] = useState<TrainingRecord[]>([])
  const [totalTraining, setTotalTraining] = useState(0)
  const [averageAccuracy, setAverageAccuracy] = useState(0)
  const [monthlyTraining, setMonthlyTraining] = useState(0)

  useEffect(() => {
    const dataManager = DataManager.getInstance()
    const trainingRecords = dataManager.getTrainingRecords()
    setRecords(trainingRecords)
    setTotalTraining(trainingRecords.length)

    const videoAnalysisRecords = trainingRecords.filter(r => r.type === '视频分析')
    const accuracySum = videoAnalysisRecords.reduce((sum, r) => sum + r.accuracy, 0)
    const avgAccuracy = videoAnalysisRecords.length > 0 ? accuracySum / videoAnalysisRecords.length : 0
    setAverageAccuracy(Math.round(avgAccuracy))

    const today = new Date()
    const currentMonth = today.getMonth()
    const monthlyRecords = trainingRecords.filter(r => new Date(r.date).getMonth() === currentMonth)
    setMonthlyTraining(monthlyRecords.length)
  }, [])

  const getStatusColor = (status: string) => {
    return status === 'completed' ? 'text-green-600 bg-green-100' : 'text-yellow-600 bg-yellow-100'
  }

  const getStatusText = (status: string) => {
    return status === 'completed' ? '已完成' : '未完成'
  }

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 80) return 'text-green-600'
    if (accuracy >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="bg-white rounded-lg shadow-md px-6 py-4">
            <p className="text-sm text-gray-600">总训练次数</p>
            <p className="text-2xl font-bold text-gray-800">{totalTraining}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md px-6 py-4">
            <p className="text-sm text-gray-600">平均准确度</p>
            <p className="text-2xl font-bold text-gray-800">{averageAccuracy}%</p>
          </div>
          <div className="bg-white rounded-lg shadow-md px-6 py-4">
            <p className="text-sm text-gray-600">本月训练</p>
            <p className="text-2xl font-bold text-gray-800">{monthlyTraining}</p>
          </div>
        </div>
        <button className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <Filter className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">筛选</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold flex items-center">
            <History className="w-5 h-5 mr-2 text-blue-600" />
            训练记录
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">日期</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">类型</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">时长</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">准确度</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {records.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-sm text-gray-900">{record.date}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{record.type}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Play className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-sm text-gray-900">{record.duration}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {record.accuracy > 0 ? (
                      <span className={`text-sm font-semibold ${getAccuracyColor(record.accuracy)}`}>
                        {record.accuracy}%
                      </span>
                    ) : (
                      <span className="text-sm text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                      {getStatusText(record.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      查看详情
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">显示 1-{records.length} 条，共 {totalTraining} 条记录</p>
        <div className="flex items-center space-x-2">
          <button className="px-4 py-2 bg-white rounded-lg shadow-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            上一页
          </button>
          <button className="px-4 py-2 bg-blue-600 rounded-lg shadow-md text-sm font-medium text-white hover:bg-blue-700">
            1
          </button>
          <button className="px-4 py-2 bg-white rounded-lg shadow-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            2
          </button>
          <button className="px-4 py-2 bg-white rounded-lg shadow-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            3
          </button>
          <button className="px-4 py-2 bg-white rounded-lg shadow-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            下一页
          </button>
        </div>
      </div>
    </div>
  )
}
