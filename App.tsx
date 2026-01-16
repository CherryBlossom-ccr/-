import { useState, Suspense, lazy, useEffect } from 'react'
import { 
  Activity, 
  Target, 
  Calendar, 
  History, 
  BarChart3, 
  User, 
  Settings as SettingsIcon, 
  Upload, 
  Play, 
  TrendingUp,
  Home,
  BookOpen,
  Bell, 
  Loader2
} from 'lucide-react'
import DataManager from './utils/dataManager'

// 使用懒加载优化性能
const VideoUpload = lazy(() => import('./components/VideoUpload'))
const AnalysisResult = lazy(() => import('./components/AnalysisResult'))
const TrainingPlan = lazy(() => import('./components/TrainingPlan'))
const Dashboard = lazy(() => import('./components/Dashboard'))
const TrainingHistory = lazy(() => import('./components/TrainingHistory'))
const TrainingCalendar = lazy(() => import('./components/TrainingCalendar'))
const Statistics = lazy(() => import('./components/Statistics'))
const UserProfile = lazy(() => import('./components/UserProfile'))
const Settings = lazy(() => import('./components/Settings'))
const WelcomePage = lazy(() => import('./components/WelcomePage'))
const Notification = lazy(() => import('./components/Notification'))
import { useNotifications } from './utils/useNotifications'

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

type ActiveTab = 'dashboard' | 'video-analysis' | 'history' | 'calendar' | 'statistics' | 'profile' | 'settings'

interface MenuItem {
  id: ActiveTab
  label: string
  icon: any
  description: string
}

function App() {
  const [showWelcome, setShowWelcome] = useState(true)
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard')
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [isSidebarHovered, setIsSidebarHovered] = useState(false)
  const { notifications, addNotification, removeNotification } = useNotifications()

  // 检测是否为移动端
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024)
      if (window.innerWidth < 768) {
        setSidebarCollapsed(true)
      } else {
        setSidebarCollapsed(false)
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleEnterApp = () => {
    setShowWelcome(false)
  }

  const menuItems: MenuItem[] = [
    { id: 'dashboard', label: '仪表盘', icon: Home, description: '查看训练概览' },
    { id: 'video-analysis', label: '视频分析', icon: Upload, description: '上传并分析训练视频' },
    { id: 'history', label: '训练历史', icon: History, description: '查看历史训练记录' },
    { id: 'calendar', label: '训练日历', icon: Calendar, description: '查看训练计划安排' },
    { id: 'statistics', label: '数据统计', icon: BarChart3, description: '查看训练数据统计' },
    { id: 'profile', label: '个人档案', icon: User, description: '管理个人信息' },
    { id: 'settings', label: '设置', icon: SettingsIcon, description: '系统设置' },
  ]

  const handleVideoUpload = (file: File) => {
    setVideoFile(file)
    setAnalysisData(null)
  }

  const handleAnalyze = async () => {
    if (!videoFile) return

    setIsAnalyzing(true)
    try {
      const formData = new FormData()
      formData.append('video', videoFile)

      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        setAnalysisData(data)
        
        const dataManager = DataManager.getInstance()
        dataManager.processVideoAnalysis(data)
        
        addNotification('success', '分析完成', `AI分析已完成！整体准确度为 ${data.poseAnalysis.accuracy}%`)
      } else {
        addNotification('error', '分析失败', '服务器错误，请稍后重试')
      }
    } catch (error) {
      console.error('分析失败:', error)
      addNotification('error', '分析失败', '网络错误，请检查您的连接')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Suspense fallback={<LoadingFallback />}>
            <Dashboard />
          </Suspense>
        )
      case 'video-analysis':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Suspense fallback={<LoadingFallback />}>
                <VideoUpload onVideoUpload={handleVideoUpload} videoFile={videoFile} />
              </Suspense>
              
              {videoFile && (
                <div className="glass-card p-6 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-white/10">
                  <h3 className="text-lg font-semibold mb-4 flex items-center text-gradient">
                    <Play className="w-5 h-5 mr-2 green-accent" />
                    视频预览
                  </h3>
                  <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-lg">
                    <video 
                      src={URL.createObjectURL(videoFile)} 
                      controls 
                      className="w-full transition-all duration-300 hover:brightness-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                  <button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className="mt-4 w-full btn-green py-3 px-6 rounded-xl transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-2xl disabled:opacity-70 disabled:transform-none disabled:hover:shadow-lg flex items-center justify-center space-x-2"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="loading-spinner h-5 w-5 border-2 border-black border-t-transparent"></div>
                        <span>分析中...</span>
                      </>
                    ) : (
                      <>
                        <TrendingUp className="w-5 h-5" />
                        <span>开始AI分析</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-6">
              {analysisData && (
                <>
                  <Suspense fallback={<LoadingFallback />}>
                    <AnalysisResult data={analysisData} />
                  </Suspense>
                  <Suspense fallback={<LoadingFallback />}>
                    <TrainingPlan data={analysisData} />
                  </Suspense>
                </>
              )}
              
              {!analysisData && videoFile && (
                <div className="glass-card p-8 rounded-xl border border-white/10 text-center transition-all duration-300">
                  <div className="p-6 bg-green-500/20 rounded-full inline-block mb-5">
                    <Activity className="w-16 h-16 mx-auto text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-200 mb-3">准备分析您的视频</h3>
                  <p className="text-gray-400 mb-2">点击"开始AI分析"按钮</p>
                  <p className="text-sm text-gray-500">系统将分析您的动作并生成个性化训练计划</p>
                  <div className="mt-6 flex justify-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )
      case 'history':
        return (
          <Suspense fallback={<LoadingFallback />}>
            <TrainingHistory />
          </Suspense>
        )
      case 'calendar':
        return (
          <Suspense fallback={<LoadingFallback />}>
            <TrainingCalendar />
          </Suspense>
        )
      case 'statistics':
        return (
          <Suspense fallback={<LoadingFallback />}>
            <Statistics />
          </Suspense>
        )
      case 'profile':
        return (
          <Suspense fallback={<LoadingFallback />}>
            <UserProfile />
          </Suspense>
        )
      case 'settings':
        return (
          <Suspense fallback={<LoadingFallback />}>
            <Settings />
          </Suspense>
        )
      default:
        return (
          <Suspense fallback={<LoadingFallback />}>
            <Dashboard />
          </Suspense>
        )
    }
  }

  // 加载占位符组件
  const LoadingFallback = () => (
    <div className="flex items-center justify-center h-full w-full p-8">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <Loader2 className="w-12 h-12 text-green-400 animate-spin" />
        </div>
        <p className="text-gray-400">加载中...</p>
      </div>
    </div>
  )

  return (
    <div className="h-screen w-screen flex flex-col">
      {showWelcome ? (
        <Suspense fallback={<LoadingFallback />}>
          <WelcomePage onEnter={handleEnterApp} />
        </Suspense>
      ) : (
        <div className="flex h-full overflow-hidden">
          <div className="animated-bg fixed inset-0"></div>
          <aside className={`glass-card flex flex-col fixed left-0 top-0 h-full relative z-30 border-r border-white/5 hover:border-green-500/20 transition-all duration-500 ${(sidebarCollapsed && !isSidebarHovered) ? 'w-20' : 'w-72'} ${isMobile && sidebarCollapsed ? '-translate-x-full' : 'translate-x-0'}`} onMouseEnter={() => setIsSidebarHovered(true)} onMouseLeave={() => setIsSidebarHovered(false)}>
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div className={`flex items-center space-x-3 transition-all duration-300 ${(sidebarCollapsed && !isSidebarHovered) ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
                <div className="p-2 bg-green-500/20 rounded-lg green-glow">
                  <Activity className="w-8 h-8 green-accent" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gradient animate-fade-in">足球教练助手</h1>
                  <p className="text-xs text-gray-400 animate-fade-in-delay">AI训练分析系统</p>
                </div>
              </div>
              <button 
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <span className="block w-5 h-0.5 bg-white mb-1 transition-all"></span>
                  <span className="block w-5 h-0.5 bg-white mb-1 transition-all"></span>
                  <span className="block w-5 h-0.5 bg-white transition-all"></span>
                </div>
              </button>
            </div>

            <nav className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-custom">
              {menuItems.map((item, index) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id)
                      if (isMobile) {
                        setSidebarCollapsed(true)
                      }
                    }}
                    className={`sidebar-item flex items-center transition-all duration-300 transform hover:scale-[1.03] ${activeTab === item.id ? 'active bg-gradient-to-r from-green-500/20 to-transparent border-l-4 border-green-500 shadow-lg' : 'bg-white/5 hover:bg-white/10 hover:border-l-4 hover:border-green-500/50'} ${(sidebarCollapsed && !isSidebarHovered) ? 'justify-center p-4 w-full' : 'w-full flex items-center space-x-4 p-4 rounded-xl'}`}
                    style={{ animationDelay: `${index * 50}ms` }}
                    title={sidebarCollapsed ? `${item.label} - ${item.description}` : undefined}
                  >
                    <div className={`p-2 rounded-lg transition-all duration-300 ${activeTab === item.id ? 'bg-green-500/30' : 'bg-white/5 hover:bg-white/15'}`}>
                      <Icon className={`w-5 h-5 transition-all duration-300 ${activeTab === item.id ? 'green-accent transform scale-125' : 'text-gray-400 hover:text-green-400'}`} />
                    </div>
                    <div className={`text-left flex-1 transition-all duration-300 ${(sidebarCollapsed && !isSidebarHovered) ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
                  <p className={`font-semibold text-sm transition-all duration-300 ${activeTab === item.id ? 'text-white transform translate-x-1' : 'text-gray-300 hover:text-white'}`}>{item.label}</p>
                  <p className="text-xs text-gray-500 transition-all duration-300 opacity-70 hover:opacity-100">{item.description}</p>
                </div>
                    {activeTab === item.id && !sidebarCollapsed && (
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    )}
                  </button>
                )
              })}
            </nav>

            <div className={`p-4 border-t border-white/10 transition-all duration-300 ${(sidebarCollapsed && !isSidebarHovered) ? 'opacity-0 pointer-events-none hidden' : 'opacity-100'}`}>
          <div className="green-bg rounded-xl p-4 text-black hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="w-5 h-5" />
              <span className="font-semibold text-sm">专业版</span>
            </div>
            <p className="text-xs opacity-90 mb-3">解锁更多高级功能和AI分析</p>
            <button className="w-full bg-black text-green-400 text-sm font-semibold py-2.5 rounded-lg hover:bg-gray-900 transition-all duration-300 transform hover:translate-y-[-2px] shadow-lg hover:shadow-xl">
              立即升级
            </button>
          </div>
        </div>
          </aside>

          <main className={`flex-1 flex flex-col relative z-10 ${(sidebarCollapsed && !isSidebarHovered) ? 'ml-20' : 'ml-72'} transition-all duration-500`}>
            <header className="glass-card border-b border-white/10">
              <div className="px-8 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {/* 移动端侧边栏切换按钮 */}
                    <button 
                      onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                      className={`p-2 rounded-full hover:bg-white/10 transition-colors md:hidden`}
                    >
                      <div className="w-5 h-5 flex items-center justify-center">
                        <span className="block w-5 h-0.5 bg-white mb-1 transition-all"></span>
                        <span className="block w-5 h-0.5 bg-white mb-1 transition-all"></span>
                        <span className="block w-5 h-0.5 bg-white transition-all"></span>
                      </div>
                    </button>
                    <div>
                      <h2 className="text-2xl font-bold text-gradient">
                        {menuItems.find(item => item.id === activeTab)?.label}
                      </h2>
                      <p className="text-sm text-gray-400 mt-1">
                        {menuItems.find(item => item.id === activeTab)?.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button className="p-2 hover:bg-white/10 rounded-full transition-colors relative">
                      <Bell className="w-5 h-5 text-gray-400" />
                      {notifications.length > 0 && (
                        <span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full green-glow"></span>
                      )}
                    </button>
                    <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                      <BookOpen className="w-5 h-5 text-gray-400" />
                    </button>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 green-bg rounded-full flex items-center justify-center text-black font-semibold">
                        U
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-white">用户</p>
                        <p className="text-xs text-gray-400">运动员</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </header>

            <div className="flex-1 p-8 overflow-auto scrollbar-custom">
              {renderContent()}
            </div>
          </main>
          
          <Notification notifications={notifications} onRemove={removeNotification} />
        </div>
      )}
    </div>
  )
}

export default App
