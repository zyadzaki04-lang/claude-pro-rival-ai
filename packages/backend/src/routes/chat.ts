import { Router, Response } from 'express'
import { AuthRequest } from '../middleware/auth.js'
import { ChatService } from '../services/chatService.js'

const router = Router()
const chatService = new ChatService()

router.post('/', async (req: AuthRequest, res: Response) => {
  const { message, model } = req.body
  const userId = req.userId!

  if (!message) {
    return res.status(400).json({ error: 'Message is required' })
  }

  try {
    const reply = await chatService.processMessage(message, model || 'gpt-4-turbo', userId)
    res.json({ reply, model })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

export default router
