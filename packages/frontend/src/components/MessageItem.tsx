import { Message } from '../types'
import ReactMarkdown from 'react-markdown'
import { CheckCircleIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

interface MessageItemProps {
  message: Message
}

export default function MessageItem({ message }: MessageItemProps) {
  const [copied, setCopied] = useState(false)
  const isUser = message.role === 'user'

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-2xl px-4 py-3 rounded-lg ${
          isUser
            ? 'bg-blue-600 text-white'
            : 'bg-slate-800 text-slate-100'
        }`}
      >
        <ReactMarkdown className="prose prose-invert max-w-none">
          {message.content}
        </ReactMarkdown>
        
        {!isUser && (
          <button
            onClick={handleCopy}
            className="mt-2 flex items-center gap-2 text-xs text-slate-400 hover:text-slate-200 transition"
          >
            {copied ? (
              <>
                <CheckCircleIcon className="w-4 h-4" />
                Copied!
              </>
            ) : (
              <>
                <DocumentDuplicateIcon className="w-4 h-4" />
                Copy
              </>
            )}
          </button>
        )}
      </div>
    </div>
  )
}
