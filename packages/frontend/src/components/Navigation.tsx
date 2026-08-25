import { Link, useLocation } from 'react-router-dom'
import { ChatBubbleLeftIcon, DocumentTextIcon, Cog6ToothIcon, PlusIcon } from '@heroicons/react/24/outline'
import { useChatStore } from '../stores/chatStore'

export default function Navigation() {
  const location = useLocation()
  const { clearChat } = useChatStore()

  const isActive = (path: string) => location.pathname === path

  const navItems = [
    { path: '/', icon: ChatBubbleLeftIcon, label: 'New Chat' },
    { path: '/conversations', icon: DocumentTextIcon, label: 'Conversations' },
    { path: '/settings', icon: Cog6ToothIcon, label: 'Settings' },
  ]

  return (
    <nav className="w-64 bg-slate-900 border-r border-slate-700 flex flex-col p-4 space-y-4">
      <button 
        onClick={clearChat}
        className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
      >
        <PlusIcon className="w-5 h-5" />
        New Chat
      </button>

      <div className="space-y-2">
        {navItems.map(({ path, icon: Icon, label }) => (
          <Link
            key={path}
            to={path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              isActive(path)
                ? 'bg-blue-600 text-white'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Icon className="w-5 h-5" />
            {label}
          </Link>
        ))}
      </div>

      <div className="flex-1" />

      <div className="border-t border-slate-700 pt-4">
        <div className="text-xs text-slate-500">
          <p>v1.0.0</p>
          <p>© 2024</p>
        </div>
      </div>
    </nav>
  )
}
