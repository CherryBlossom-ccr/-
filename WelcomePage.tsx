import { useState, useEffect } from 'react'
import { Trophy, Trophy as Cup } from 'lucide-react'

interface Goal {
  id: number
  player: string
  time: string
  match: string
  description: string
}

export default function WelcomePage({ onEnter }: { onEnter: () => void }) {
  const [showEnterButton, setShowEnterButton] = useState(false)
  const [, setCurrentGoalIndex] = useState(0)

  const goals: Goal[] = [
    {
      id: 1,
      player: '梅西',
      time: '2022年世界杯决赛',
      match: '阿根廷 vs 法国',
      description: '梅西世界杯决赛精彩进球',
    },
    {
      id: 2,
      player: 'C罗',
      time: '2018年世界杯',
      match: '葡萄牙 vs 西班牙',
      description: 'C罗倒挂金球精彩时刻',
    },
    {
      id: 3,
      player: '内马尔',
      time: '2014年世界杯',
      match: '德国 vs 阿根廷',
      description: '内马尔世界杯决赛绝杀进球',
    },
    {
      id: 4,
      player: '姆巴佩',
      time: '2018年世界杯',
      match: '法国 vs 克罗地亚',
      description: '姆巴佩世界杯决赛精彩进球',
    },
    {
      id: 5,
      player: '贝克汉姆',
      time: '2001年世界杯',
      match: '英格兰 vs 阿根廷',
      description: '贝克汉姆任意球经典时刻',
    },
  ]

  useEffect(() => {
    const showButtonTimer = setTimeout(() => {
      setShowEnterButton(true)
    }, 2000)

    return () => clearTimeout(showButtonTimer)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGoalIndex((prev) => (prev < goals.length - 1 ? prev + 1 : 0))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleEnter = () => {
    setTimeout(() => {
      onEnter()
    }, 500)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-green-950 to-black"></div>
      
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-green-500/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-radial from-green-400/10 via-transparent to-transparent" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl mx-4">
        <div className="mb-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Trophy className="w-12 h-12 text-green-400 green-glow" />
            <Cup className="w-12 h-12 text-green-400 green-glow" />
          </div>
          <h1 className="text-4xl font-bold text-gradient mb-3 tracking-wider">
            足球教练助手
          </h1>
          <p className="text-lg text-gray-300 mb-1"></p>
          <p className="text-xs text-gray-400"></p>
        </div>

        <div className="relative w-full">
          <div className="w-[600px] h-[350px] bg-black/80 rounded-2xl overflow-hidden border-2 border-green-500/30 shadow-2xl green-border mx-auto">
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-green-900/30 via-transparent to-green-900/30">
              <div className="text-center">
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-40 h-40 rounded-full bg-green-500/10 animate-ping"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-green-500/20 animate-ping" style={{ animationDelay: '0.5s' }}></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-green-500/30 animate-ping" style={{ animationDelay: '1s' }}></div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-50"></div>
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-50"></div>
            </div>

            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>

          <div className="flex justify-center space-x-2 mb-8">
            <div className="w-1 h-1 bg-green-500/50 rounded-full"></div>
            <div className="w-1 h-1 bg-green-500/50 rounded-full"></div>
            <div className="w-1 h-1 bg-green-500/50 rounded-full"></div>
          </div>

          {showEnterButton && (
            <button
              onClick={handleEnter}
              className="btn-green px-12 py-4 rounded-xl text-xl font-semibold flex items-center space-x-3 floating-element"
            >
              <span>进入应用</span>
            </button>
          )}

          <div className="text-center">
            <p className="text-gray-500 text-sm">点击进入按钮开始您的训练之旅</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-8 right-8 flex justify-between items-center text-gray-500 text-sm">
        <p>© 2024 足球教练助手</p>
        <p>AI驱动 · 专业训练</p>
      </div>

      <div className="absolute top-8 left-8 right-8 flex justify-center space-x-4">
        <div className="w-3 h-3 bg-green-400/30 rounded-full animate-pulse"></div>
        <div className="w-3 h-3 bg-green-400/30 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="w-3 h-3 bg-green-400/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
    </div>
  )
}