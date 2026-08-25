import { Bars3Icon } from '@heroicons/react/24/solid'
import { useState, useRef, useEffect } from 'react'
import { useChatStore } from '../stores/chatStore'
import ChatInput from '../components/ChatInput'
import MessageList from '../components/MessageList'
import ModelSelector from '../components/ModelSelector'

export default function ChatPage() {
  const { messages, isLoading, sendMessage, clearChat } = useChatStore()
  const [input, setInput] = useState('')
  const [isSidebar, setIsSidebar] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return
    
    await sendMessage(input)
    setInput('')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700 bg-slate-900">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsSidebar(!isSidebar)}
            className="p-2 hover:bg-slate-800 rounded-lg transition"
          >
            <Bars3Icon className="w-6 h-6 text-slate-400" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-white">Claude Rival ✨</h1>
            <p className="text-sm text-slate-400">Advanced AI Assistant</p>
          </div>
        </div>
        <ModelSelector />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="text-5xl mb-4">🤖</div>
            <h2 className="text-2xl font-bold text-white mb-2">Welcome!</h2>
            <p className="text-slate-400 max-w-md">Start a conversation with your advanced AI assistant powered by cutting-edge LLMs.</p>
          </div>
        ) : (
          <MessageList messages={messages} />
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-slate-700 bg-slate-900">
        <ChatInput 
          value={input}
          onChange={setInput}
          onSend={handleSend}
          onKeyPress={handleKeyPress}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}
