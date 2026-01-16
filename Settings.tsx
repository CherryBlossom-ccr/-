import { 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Target, 
  Download, 
  Upload, 
  Trash2, 
  Save,
  RotateCcw,
  CheckCircle
} from 'lucide-react'
import { useState, useEffect } from 'react'
import SettingsManager from '../utils/settingsManager'

export default function Settings() {
  const [settings, setSettings] = useState<any>(null)
  const [showSaveSuccess, setShowSaveSuccess] = useState(false)
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [showClearConfirm, setShowClearConfirm] = useState(false)
  const [weeklyTarget, setWeeklyTarget] = useState(12)
  const [accuracyTarget, setAccuracyTarget] = useState(80)

  useEffect(() => {
    const settingsManager = SettingsManager.getInstance()
    const currentSettings = settingsManager.getSettings()
    setSettings(currentSettings)
    setWeeklyTarget(currentSettings.trainingGoals.weeklyTrainingTarget)
    setAccuracyTarget(currentSettings.trainingGoals.accuracyTarget)
  }, [])

  const handleThemeChange = (theme: 'light' | 'dark' | 'system') => {
    const settingsManager = SettingsManager.getInstance()
    settingsManager.updateTheme(theme)
    setSettings({ ...settings, theme })
  }

  const handleLanguageChange = (language: 'zh-CN' | 'en' | 'ja') => {
    const settingsManager = SettingsManager.getInstance()
    settingsManager.updateLanguage(language)
    setSettings({ ...settings, language })
  }

  const handleNotificationToggle = (key: string, value: boolean) => {
    const settingsManager = SettingsManager.getInstance()
    settingsManager.updateNotificationSetting(key as any, value)
    setSettings({
      ...settings,
      notifications: { ...settings.notifications, [key]: value }
    })
  }

  const handlePrivacyToggle = (key: string, value: boolean) => {
    const settingsManager = SettingsManager.getInstance()
    settingsManager.updatePrivacySetting(key as any, value)
    setSettings({
      ...settings,
      privacy: { ...settings.privacy, [key]: value }
    })
  }

  const handleSaveSettings = () => {
    const settingsManager = SettingsManager.getInstance()
    settingsManager.updateTrainingGoal('weeklyTrainingTarget', weeklyTarget)
    settingsManager.updateTrainingGoal('accuracyTarget', accuracyTarget)
    setShowSaveSuccess(true)
    setTimeout(() => setShowSaveSuccess(false), 3000)
  }

  const handleExportSettings = () => {
    const settingsManager = SettingsManager.getInstance()
    const settingsJson = settingsManager.exportSettings()
    const blob = new Blob([settingsJson], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'soccer-coach-settings.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImportSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        const settingsManager = SettingsManager.getInstance()
        const success = settingsManager.importSettings(content)
        if (success) {
          const newSettings = settingsManager.getSettings()
          setSettings(newSettings)
          setWeeklyTarget(newSettings.trainingGoals.weeklyTrainingTarget)
          setAccuracyTarget(newSettings.trainingGoals.accuracyTarget)
          setShowSaveSuccess(true)
          setTimeout(() => setShowSaveSuccess(false), 3000)
        }
      }
      reader.readAsText(file)
    }
  }

  const handleResetSettings = () => {
    const settingsManager = SettingsManager.getInstance()
    settingsManager.resetSettings()
    const newSettings = settingsManager.getSettings()
    setSettings(newSettings)
    setWeeklyTarget(newSettings.trainingGoals.weeklyTrainingTarget)
    setAccuracyTarget(newSettings.trainingGoals.accuracyTarget)
    setShowResetConfirm(false)
    setShowSaveSuccess(true)
    setTimeout(() => setShowSaveSuccess(false), 3000)
  }

  const handleClearData = () => {
    localStorage.clear()
    sessionStorage.clear()
    setShowClearConfirm(false)
    window.location.reload()
  }

  if (!settings) {
    return <div className="flex items-center justify-center h-64">加载中...</div>
  }

  return (
    <div className="space-y-6">
      {showSaveSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 z-50 animate-pulse">
          <CheckCircle className="w-5 h-5" />
          <span>设置已保存</span>
        </div>
      )}

      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-6 flex items-center">
          <Palette className="w-5 h-5 mr-2 green-accent" />
          <span className="text-white">外观设置</span>
        </h3>
        <div className="space-y-4">
          <div className="p-4 bg-white/5 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-white">主题</p>
                <p className="text-sm text-gray-400">选择您喜欢的主题颜色</p>
              </div>
              <div className="flex space-x-2">
                {(['light', 'dark', 'system'] as const).map((theme) => (
                  <button
                    key={theme}
                    onClick={() => handleThemeChange(theme)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      settings.theme === theme
                        ? 'btn-green'
                        : 'input-dark hover:bg-white/10'
                    }`}
                  >
                    {theme === 'light' && '浅色'}
                    {theme === 'dark' && '深色'}
                    {theme === 'system' && '跟随系统'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 bg-white/5 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-white">语言</p>
                <p className="text-sm text-gray-400">选择界面显示语言</p>
              </div>
              <select
                value={settings.language}
                onChange={(e) => handleLanguageChange(e.target.value as any)}
                className="input-dark px-4 py-2 rounded-lg text-sm focus:outline-none"
              >
                <option value="zh-CN">简体中文</option>
                <option value="en">English</option>
                <option value="ja">日本語</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-6 flex items-center">
          <Bell className="w-5 h-5 mr-2 green-accent" />
          <span className="text-white">通知设置</span>
        </h3>
        <div className="space-y-4">
          <div className="p-4 bg-white/5 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-white">训练提醒</p>
                <p className="text-sm text-gray-400">在训练开始前收到提醒</p>
              </div>
              <button
                onClick={() => handleNotificationToggle('trainingReminder', !settings.notifications.trainingReminder)}
                className={`toggle-switch ${settings.notifications.trainingReminder ? 'active' : ''}`}
              >
              </button>
            </div>
          </div>

          <div className="p-4 bg-white/5 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-white">成就通知</p>
                <p className="text-sm text-gray-400">获得新成就时发送通知</p>
              </div>
              <button
                onClick={() => handleNotificationToggle('achievementNotification', !settings.notifications.achievementNotification)}
                className={`toggle-switch ${settings.notifications.achievementNotification ? 'active' : ''}`}
              >
              </button>
            </div>
          </div>

          <div className="p-4 bg-white/5 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-white">每周报告</p>
                <p className="text-sm text-gray-400">每周发送训练报告</p>
              </div>
              <button
                onClick={() => handleNotificationToggle('weeklyReport', !settings.notifications.weeklyReport)}
                className={`toggle-switch ${settings.notifications.weeklyReport ? 'active' : ''}`}
              >
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-6 flex items-center">
          <Target className="w-5 h-5 mr-2 green-accent" />
          <span className="text-white">训练目标</span>
        </h3>
        <div className="space-y-4">
          <div className="p-4 bg-white/5 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-white">每周训练目标</p>
                <p className="text-sm text-gray-400">设置每周计划完成的训练次数</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setWeeklyTarget(Math.max(1, weeklyTarget - 1))}
                  className="w-8 h-8 input-dark rounded-lg flex items-center justify-center hover:bg-white/10"
                >
                  -
                </button>
                <input
                  type="number"
                  value={weeklyTarget}
                  onChange={(e) => setWeeklyTarget(Math.max(1, parseInt(e.target.value) || 1))}
                  className="input-dark w-20 px-3 py-2 text-center"
                />
                <button
                  onClick={() => setWeeklyTarget(weeklyTarget + 1)}
                  className="w-8 h-8 input-dark rounded-lg flex items-center justify-center hover:bg-white/10"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white/5 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-white">准确度目标</p>
                <p className="text-sm text-gray-400">设置视频分析的准确度目标（%）</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setAccuracyTarget(Math.max(50, accuracyTarget - 5))}
                  className="w-8 h-8 input-dark rounded-lg flex items-center justify-center hover:bg-white/10"
                >
                  -
                </button>
                <input
                  type="number"
                  value={accuracyTarget}
                  onChange={(e) => setAccuracyTarget(Math.max(50, Math.min(100, parseInt(e.target.value) || 50)))}
                  className="input-dark w-20 px-3 py-2 text-center"
                />
                <button
                  onClick={() => setAccuracyTarget(Math.min(100, accuracyTarget + 5))}
                  className="w-8 h-8 input-dark rounded-lg flex items-center justify-center hover:bg-white/10"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-6 flex items-center">
          <Shield className="w-5 h-5 mr-2 green-accent" />
          <span className="text-white">隐私设置</span>
        </h3>
        <div className="space-y-4">
          <div className="p-4 bg-white/5 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-white">数据共享</p>
                <p className="text-sm text-gray-400">允许匿名共享训练数据以改进服务</p>
              </div>
              <button
                onClick={() => handlePrivacyToggle('shareData', !settings.privacy.shareData)}
                className={`toggle-switch ${settings.privacy.shareData ? 'active' : ''}`}
              >
              </button>
            </div>
          </div>

          <div className="p-4 bg-white/5 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-white">使用分析</p>
                <p className="text-sm text-gray-400">帮助我们了解如何使用应用</p>
              </div>
              <button
                onClick={() => handlePrivacyToggle('analyticsEnabled', !settings.privacy.analyticsEnabled)}
                className={`toggle-switch ${settings.privacy.analyticsEnabled ? 'active' : ''}`}
              >
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-6 flex items-center">
          <Globe className="w-5 h-5 mr-2 green-accent" />
          <span className="text-white">数据管理</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={handleExportSettings}
            className="flex items-center space-x-3 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-left"
          >
            <Download className="w-5 h-5 green-accent" />
            <div>
              <p className="font-medium text-white">导出设置</p>
              <p className="text-sm text-gray-400">下载您的设置文件</p>
            </div>
          </button>

          <label className="flex items-center space-x-3 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-left cursor-pointer">
            <Upload className="w-5 h-5 green-accent" />
            <div>
              <p className="font-medium text-white">导入设置</p>
              <p className="text-sm text-gray-400">从文件导入设置</p>
            </div>
            <input
              type="file"
              accept=".json"
              onChange={handleImportSettings}
              className="hidden"
            />
          </label>

          <button
            onClick={() => setShowResetConfirm(true)}
            className="flex items-center space-x-3 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-left"
          >
            <RotateCcw className="w-5 h-5 text-orange-400" />
            <div>
              <p className="font-medium text-white">重置设置</p>
              <p className="text-sm text-gray-400">恢复默认设置</p>
            </div>
          </button>

          <button
            onClick={() => setShowClearConfirm(true)}
            className="flex items-center space-x-3 p-4 bg-red-500/10 rounded-lg hover:bg-red-500/20 transition-colors text-left"
          >
            <Trash2 className="w-5 h-5 text-red-400" />
            <div>
              <p className="font-medium text-red-400">清除所有数据</p>
              <p className="text-sm text-red-300">删除所有本地数据</p>
            </div>
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={() => setShowResetConfirm(true)}
          className="flex items-center space-x-2 text-gray-400 hover:text-white font-medium"
        >
          <RotateCcw className="w-5 h-5" />
          <span>重置为默认</span>
        </button>
        <button
          onClick={handleSaveSettings}
          className="btn-green px-6 py-3 rounded-lg font-medium"
        >
          <Save className="w-5 h-5" />
          <span>保存设置</span>
        </button>
      </div>

      {showResetConfirm && (
        <div className="modal-overlay fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-content rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center space-x-3 mb-4">
              <RotateCcw className="w-8 h-8 text-orange-400" />
              <h3 className="text-xl font-bold text-white">确认重置设置</h3>
            </div>
            <p className="text-gray-400 mb-6">
              此操作将把所有设置恢复为默认值。此操作不可撤销。
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 px-4 py-2 input-dark rounded-lg text-gray-300 hover:bg-white/10 font-medium"
              >
                取消
              </button>
              <button
                onClick={handleResetSettings}
                className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium"
              >
                确认重置
              </button>
            </div>
          </div>
        </div>
      )}

      {showClearConfirm && (
        <div className="modal-overlay fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-content rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center space-x-3 mb-4">
              <Trash2 className="w-8 h-8 text-red-400" />
              <h3 className="text-xl font-bold text-white">确认清除数据</h3>
            </div>
            <p className="text-gray-400 mb-6">
              此操作将删除所有本地数据，包括训练记录、设置和用户信息。此操作不可撤销。
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 px-4 py-2 input-dark rounded-lg text-gray-300 hover:bg-white/10 font-medium"
              >
                取消
              </button>
              <button
                onClick={handleClearData}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-medium"
              >
                确认清除
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}