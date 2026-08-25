import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import ChatPage from './pages/ChatPage'
import ConversationsPage from './pages/ConversationsPage'
import ModelSettings from './pages/ModelSettings'
import Navigation from './components/Navigation'
import { useAuthStore } from './stores/authStore'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const { user, initializeAuth } = useAuthStore()

  useEffect(() => {
    initializeAuth().finally(() => setIsLoading(false))
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-slate-950">
      <Navigation />
      <main className="flex-1 overflow-hidden">
        <Routes>
          <Route path="/" element={<ChatPage />} />
          <Route path="/conversations" element={<ConversationsPage />} />
          <Route path="/settings" element={<ModelSettings />} />
        </Routes>
      </main>
    </div>
  )
}
