export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp?: Date
}

export interface Conversation {
  id: string
  title: string
  messages: Message[]
  createdAt: Date
  updatedAt: Date
}

export interface User {
  id: string
  email: string
  name: string
}

export interface Model {
  id: string
  name: string
  provider: 'openai' | 'anthropic' | 'huggingface' | 'custom'
  maxTokens: number
  costPer1kTokens: number
}
