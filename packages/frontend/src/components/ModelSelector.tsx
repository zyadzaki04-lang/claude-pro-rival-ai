import { useModelStore } from '../stores/modelStore'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

export default function ModelSelector() {
  const { currentModel, setModel, availableModels } = useModelStore()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition"
      >
        <span className="text-sm font-medium text-white">{currentModel}</span>
        <ChevronDownIcon className="w-4 h-4 text-slate-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-lg z-10">
          {availableModels.map((model) => (
            <button
              key={model}
              onClick={() => {
                setModel(model)
                setIsOpen(false)
              }}
              className={`w-full text-left px-4 py-2 hover:bg-slate-700 transition ${
                currentModel === model ? 'bg-blue-600 text-white' : 'text-slate-300'
              }`}
            >
              {model}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
