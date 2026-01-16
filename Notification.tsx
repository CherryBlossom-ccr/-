import { CheckCircle, X, AlertCircle, Bell } from 'lucide-react'

interface Notification {
  id: string
  type: 'success' | 'error' | 'info'
  title: string
  message: string
  timestamp: Date
}

interface NotificationProps {
  notifications: Notification[]
  onRemove: (id: string) => void
}

export default function Notification({ notifications, onRemove }: NotificationProps) {
  return (
    <div className="fixed top-6 right-6 z-50">
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`notification-${notification.type} p-4 rounded-xl shadow-lg transform transition-all duration-500 ease-in-out border-l-4 animate-fade-in`}
            style={{
              borderColor: notification.type === 'success' ? '#00ff88' : notification.type === 'error' ? '#ff4444' : '#0088ff',
              backgroundColor: notification.type === 'success' ? 'rgba(0, 255, 136, 0.1)' : notification.type === 'error' ? 'rgba(255, 68, 68, 0.1)' : 'rgba(0, 136, 255, 0.1)',
              boxShadow: notification.type === 'success' ? '0 4px 15px rgba(0, 255, 136, 0.3)' : notification.type === 'error' ? '0 4px 15px rgba(255, 68, 68, 0.3)' : '0 4px 15px rgba(0, 136, 255, 0.3)'
            }}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                {notification.type === 'success' && (
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                )}
                {notification.type === 'error' && (
                  <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
                )}
                {notification.type === 'info' && (
                  <Bell className="w-5 h-5 text-blue-400 mt-0.5" />
                )}
                <div>
                  <h3 className="font-semibold text-white mb-1">{notification.title}</h3>
                  <p className="text-sm text-gray-300">{notification.message}</p>
                </div>
              </div>
              <button
                onClick={() => onRemove(notification.id)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

