import { CheckCircle, AlertCircle, Activity, Target } from 'lucide-react'

interface AnalysisData {
  poseAnalysis: {
    accuracy: number
    issues: string[]
    improvements: string[]
  }
  movementAnalysis: {
    speed: number
    balance: number
    coordination: number
  }
  recommendations: string[]
}

interface AnalysisResultProps {
  data: AnalysisData
}

export default function AnalysisResult({ data }: AnalysisResultProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400'
    if (score >= 60) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-500/20'
    if (score >= 60) return 'bg-yellow-500/20'
    return 'bg-red-500/20'
  }

  return (
    <div className="glass-card p-6 rounded-xl border border-white/10 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <h2 className="text-xl font-semibold mb-6 flex items-center text-gradient">
        <Activity className="w-6 h-6 mr-2 green-accent" />
        AI分析结果
      </h2>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-gray-300 font-medium">整体准确度</span>
          <span className={`text-2xl font-bold ${getScoreColor(data.poseAnalysis.accuracy)} green-glow`}>
            {data.poseAnalysis.accuracy}%
          </span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-4 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-1000 ease-out ${getScoreBg(data.poseAnalysis.accuracy)}`}
            style={{ width: `${data.poseAnalysis.accuracy}%`, boxShadow: `0 0 15px ${getScoreColor(data.poseAnalysis.accuracy).replace('text-', 'rgba(').replace('-', ',').replace('00', ', 0.6)')}` }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <Target className="w-6 h-6 text-blue-400" />
          </div>
          <p className="text-sm text-gray-400 mb-1">速度</p>
          <p className={`text-xl font-bold ${getScoreColor(data.movementAnalysis.speed)}`}>
            {data.movementAnalysis.speed}
          </p>
        </div>
        <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <Activity className="w-6 h-6 text-purple-400" />
          </div>
          <p className="text-sm text-gray-400 mb-1">平衡</p>
          <p className={`text-xl font-bold ${getScoreColor(data.movementAnalysis.balance)}`}>
            {data.movementAnalysis.balance}
          </p>
        </div>
        <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <CheckCircle className="w-6 h-6 text-green-400" />
          </div>
          <p className="text-sm text-gray-400 mb-1">协调</p>
          <p className={`text-xl font-bold ${getScoreColor(data.movementAnalysis.coordination)}`}>
            {data.movementAnalysis.coordination}
          </p>
        </div>
      </div>

      {data.poseAnalysis.issues.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold text-white mb-3 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2 text-red-400" />
            需要改进的问题
          </h3>
          <ul className="space-y-3">
            {data.poseAnalysis.issues.map((issue, index) => (
              <li key={index} className="flex items-start p-3 bg-red-500/10 rounded-lg border border-red-500/20 hover:bg-red-500/20 transition-colors">
                <span className="text-red-400 mr-3 mt-1">•</span>
                <span className="text-sm text-gray-300">{issue}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {data.poseAnalysis.improvements.length > 0 && (
        <div>
          <h3 className="font-semibold text-white mb-3 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
            改进建议
          </h3>
          <ul className="space-y-3">
            {data.poseAnalysis.improvements.map((improvement, index) => (
              <li key={index} className="flex items-start p-3 bg-green-500/10 rounded-lg border border-green-500/20 hover:bg-green-500/20 transition-colors">
                <span className="text-green-400 mr-3 mt-1">✓</span>
                <span className="text-sm text-gray-300">{improvement}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
