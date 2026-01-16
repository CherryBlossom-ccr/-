interface AppSettings {
  theme: 'light' | 'dark' | 'system'
  language: 'zh-CN' | 'en' | 'ja'
  notifications: {
    trainingReminder: boolean
    achievementNotification: boolean
    weeklyReport: boolean
  }
  trainingGoals: {
    weeklyTrainingTarget: number
    accuracyTarget: number
  }
  privacy: {
    shareData: boolean
    analyticsEnabled: boolean
  }
}

class SettingsManager {
  private static instance: SettingsManager
  private settings: AppSettings
  private readonly STORAGE_KEY = 'soccer_coach_settings'

  private constructor() {
    this.settings = this.loadSettings() || this.getDefaultSettings()
  }

  public static getInstance(): SettingsManager {
    if (!SettingsManager.instance) {
      SettingsManager.instance = new SettingsManager()
    }
    return SettingsManager.instance
  }

  private getDefaultSettings(): AppSettings {
    return {
      theme: 'light',
      language: 'zh-CN',
      notifications: {
        trainingReminder: true,
        achievementNotification: true,
        weeklyReport: false,
      },
      trainingGoals: {
        weeklyTrainingTarget: 12,
        accuracyTarget: 80,
      },
      privacy: {
        shareData: false,
        analyticsEnabled: true,
      },
    }
  }

  private loadSettings(): AppSettings | null {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY)
      if (saved) {
        return JSON.parse(saved)
      }
    } catch (error) {
      console.error('Failed to load settings:', error)
    }
    return null
  }

  private saveSettings(): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.settings))
    } catch (error) {
      console.error('Failed to save settings:', error)
    }
  }

  public getSettings(): AppSettings {
    return { ...this.settings }
  }

  public updateTheme(theme: AppSettings['theme']): void {
    this.settings.theme = theme
    this.saveSettings()
    this.applyTheme()
  }

  public updateLanguage(language: AppSettings['language']): void {
    this.settings.language = language
    this.saveSettings()
  }

  public updateNotificationSetting(key: keyof AppSettings['notifications'], value: boolean): void {
    this.settings.notifications[key] = value
    this.saveSettings()
  }

  public updateTrainingGoal(key: keyof AppSettings['trainingGoals'], value: number): void {
    this.settings.trainingGoals[key] = value
    this.saveSettings()
  }

  public updatePrivacySetting(key: keyof AppSettings['privacy'], value: boolean): void {
    this.settings.privacy[key] = value
    this.saveSettings()
  }

  public resetSettings(): void {
    this.settings = this.getDefaultSettings()
    this.saveSettings()
    this.applyTheme()
  }

  public exportSettings(): string {
    return JSON.stringify(this.settings, null, 2)
  }

  public importSettings(settingsJson: string): boolean {
    try {
      const parsed = JSON.parse(settingsJson)
      this.settings = { ...this.getDefaultSettings(), ...parsed }
      this.saveSettings()
      this.applyTheme()
      return true
    } catch (error) {
      console.error('Failed to import settings:', error)
      return false
    }
  }

  private applyTheme(): void {
    const root = document.documentElement
    const theme = this.settings.theme

    if (theme === 'dark') {
      root.classList.add('dark')
    } else if (theme === 'light') {
      root.classList.remove('dark')
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      if (prefersDark) {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }
    }
  }

  public getTheme(): AppSettings['theme'] {
    return this.settings.theme
  }

  public getLanguage(): AppSettings['language'] {
    return this.settings.language
  }
}

export default SettingsManager