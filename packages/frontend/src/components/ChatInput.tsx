import { PaperAirplaneIcon } from '@heroicons/react/24/solid'

interface ChatInputProps {
  value: string
  onChange: (value: string) => void
  onSend: () => void
  onKeyPress: (e: React.KeyboardEvent) => void
  isLoading: boolean
}

export default function ChatInput({ value, onChange, onSend, onKeyPress, isLoading }: ChatInputProps) {
  return (
    <div className="flex gap-3">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={onKeyPress}
        placeholder="Type your message... (Shift+Enter for new line)"
        disabled={isLoading}
        className="flex-1 bg-slate-800 text-white placeholder-slate-500 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        rows={3}
      />
      <button
        onClick={onSend}
        disabled={isLoading || !value.trim()}
        className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg p-3 font-semibold transition flex items-center justify-center"
      >
        <PaperAirplaneIcon className="w-5 h-5" />
      </button>
    </div>
  )
}
