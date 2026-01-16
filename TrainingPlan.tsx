import { Calendar, Clock, Target, TrendingUp, CheckCircle } from 'lucide-react'

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

interface TrainingPlanProps {
  data: AnalysisData
}

export default function TrainingPlan({ data }: TrainingPlanProps) {
  const trainingPlan = {
    phase: '基础训练阶段',
    duration: '4周',
    sessions: [
      {
        day: '周一',
        focus: '速度训练',
        exercises: [
          { name: '冲刺跑', duration: '10分钟', sets: '3组' },
          { name: '敏捷梯训练', duration: '15分钟', sets: '2组' },
          { name: '变向跑', duration: '10分钟', sets: '3组' }
        ]
      },
      {
        day: '周三',
        focus: '平衡与协调',
        exercises: [
          { name: '单腿站立', duration: '5分钟', sets: '4组' },
          { name: '平衡球训练', duration: '15分钟', sets: '3组' },
          { name: '核心稳定性', duration: '10分钟', sets: '2组' }
        ]
      },
      {
        day: '周五',
        focus: '综合训练',
        exercises: [
          { name: '技术动作练习', duration: '20分钟', sets: '1组' },
          { name: '模拟比赛', duration: '15分钟', sets: '1组' },
          { name: '拉伸放松', duration: '10分钟', sets: '1组' }
        ]
      }
    ],
    tips: data.recommendations
  }

  return (
    <div className="glass-card p-6 rounded-xl border border-white/10 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <h2 className="text-xl font-semibold mb-6 flex items-center text-gradient">
        <Calendar className="w-6 h-6 mr-2 green-accent" />
        个性化训练计划
      </h2>

      <div className="flex items-center space-x-4 mb-6 p-4 bg-blue-500/10 rounded-xl border border-blue-500/30">
        <div className="p-3 bg-blue-500/20 rounded-full">
          <Target className="w-10 h-10 text-blue-400" />
        </div>
        <div>
          <p className="font-semibold text-gray-200">{trainingPlan.phase}</p>
          <p className="text-sm text-gray-400">训练周期: {trainingPlan.duration}</p>
        </div>
      </div>

      <div className="space-y-5">
        {trainingPlan.sessions.map((session, index) => (
          <div key={index} className="border border-white/10 rounded-xl p-5 bg-white/5 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-200 text-lg">{session.day}</h3>
              <span className="text-sm text-blue-400 bg-blue-500/20 px-4 py-1 rounded-full border border-blue-500/30">
                {session.focus}
              </span>
            </div>
            <div className="space-y-3">
              {session.exercises.map((exercise, exIndex) => (
                <div key={exIndex} className="flex items-center justify-between text-sm p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="p-1 bg-green-500/20 rounded-full">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    </div>
                    <span className="text-gray-300">{exercise.name}</span>
                  </div>
                  <div className="flex items-center space-x-5 text-gray-400">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span>{exercise.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-gray-500" />
                      <span>{exercise.sets}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {trainingPlan.tips.length > 0 && (
        <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
          <h3 className="font-semibold text-gray-200 mb-3 flex items-center">
            <Target className="w-5 h-5 mr-2 text-yellow-400" />
            教练建议
          </h3>
          <ul className="space-y-3">
            {trainingPlan.tips.map((tip, index) => (
              <li key={index} className="flex items-start text-sm text-gray-300 p-3 bg-yellow-500/5 rounded-lg border border-yellow-500/20 hover:bg-yellow-500/10 transition-colors">
                <span className="text-yellow-400 mr-3 mt-1">💡</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
