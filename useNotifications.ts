import { useState } from 'react'

interface Notification {
  id: string
  type: 'success' | 'error' | 'info'
  title: string
  message: string
  timestamp: Date
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = (type: 'success' | 'error' | 'info', title: string, message: string) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newNotification: Notification = {
      id,
      type,
      title,
      message,
      timestamp: new Date()
    }

    setNotifications((prev) => [newNotification, ...prev])

    // Auto remove after 5 seconds
    setTimeout(() => {
      removeNotification(id)
    }, 5000)
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  return { notifications, addNotification, removeNotification }
}