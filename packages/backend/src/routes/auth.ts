import { Router, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { z } from 'zod'

const router = Router()

// Validation schemas
const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
})

router.post('/login', async (req: any, res: Response) => {
  try {
    const { email, password } = LoginSchema.parse(req.body)
    
    // Mock user validation
    const user = {
      id: '123',
      email,
      name: 'Test User',
    }

    // Generate token
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    )

    res.json({ user, token })
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
})

router.post('/register', async (req: any, res: Response) => {
  try {
    const { email, password, name } = RegisterSchema.parse(req.body)
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)
    
    // Create user (mock)
    const user = {
      id: '123',
      email,
      name,
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    )

    res.json({ user, token })
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
})

export default router
