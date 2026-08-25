import { Router, Response } from 'express'
import { AuthRequest } from '../middleware/auth.js'

const router = Router()

router.get('/', async (req: AuthRequest, res: Response) => {
  // Get all conversations for user
  res.json({ conversations: [] })
})

router.get('/:id', async (req: AuthRequest, res: Response) => {
  const { id } = req.params
  // Get specific conversation
  res.json({ messages: [] })
})

router.delete('/:id', async (req: AuthRequest, res: Response) => {
  const { id } = req.params
  // Delete conversation
  res.json({ success: true })
})

export default router
