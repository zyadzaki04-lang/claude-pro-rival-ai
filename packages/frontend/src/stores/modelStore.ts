import { create } from 'zustand'

interface ModelStore {
  currentModel: string
  availableModels: string[]
  setModel: (model: string) => void
}

export const useModelStore = create<ModelStore>((set) => ({
  currentModel: 'gpt-4-turbo',
  availableModels: [
    'gpt-4-turbo',
    'gpt-4',
    'claude-3-opus',
    'claude-3-sonnet',
    'llama-2-70b',
    'mixtral-8x7b',
  ],
  setModel: (model: string) => set({ currentModel: model }),
}))
