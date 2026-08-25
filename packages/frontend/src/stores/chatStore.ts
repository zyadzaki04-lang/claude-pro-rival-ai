import { create } from 'zustand'
import axios from 'axios'
import { Message, Conversation } from '../types'

interface ChatStore {
  messages: Message[]
  currentConversationId: string | null
  isLoading: boolean
  sendMessage: (content: string) => Promise<void>
  clearChat: () => void
  loadConversation: (id: string) => Promise<void>
  deleteConversation: (id: string) => Promise<void>
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  currentConversationId: null,
  isLoading: false,

  sendMessage: async (content: string) => {
    set((state) => ({
      messages: [...state.messages, { id: Date.now().toString(), role: 'user', content }],
      isLoading: true,
    }))

    try {
      const response = await axios.post(`${API_URL}/chat`, { message: content })
      
      set((state) => ({
        messages: [
          ...state.messages,
          {
            id: Date.now().toString(),
            role: 'assistant',
            content: response.data.reply,
          },
        ],
        isLoading: false,
      }))
    } catch (error) {
      console.error('Failed to send message:', error)
      set((state) => ({
        isLoading: false,
      }))
    }
  },

  clearChat: () => set({ messages: [], currentConversationId: null }),

  loadConversation: async (id: string) => {
    try {
      const response = await axios.get(`${API_URL}/conversations/${id}`)
      set({
        messages: response.data.messages,
        currentConversationId: id,
      })
    } catch (error) {
      console.error('Failed to load conversation:', error)
    }
  },

  deleteConversation: async (id: string) => {
    try {
      await axios.delete(`${API_URL}/conversations/${id}`)
      set((state) => ({
        messages: state.currentConversationId === id ? [] : state.messages,
        currentConversationId: state.currentConversationId === id ? null : state.currentConversationId,
      }))
    } catch (error) {
      console.error('Failed to delete conversation:', error)
    }
  },
}))
