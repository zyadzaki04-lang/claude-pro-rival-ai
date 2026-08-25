import OpenAI from 'openai'
import Anthropic from '@anthropic-ai/sdk'

export class ChatService {
  private openaiClient: OpenAI
  private anthropicClient: Anthropic

  constructor() {
    this.openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
    this.anthropicClient = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    })
  }

  async processMessage(message: string, model: string, userId: string): Promise<string> {
    console.log(`Processing message for user ${userId} with model ${model}`)

    if (model.startsWith('gpt')) {
      return this.processWithOpenAI(message, model)
    } else if (model.startsWith('claude')) {
      return this.processWithAnthropic(message, model)
    } else {
      return 'I am a mock response from the AI assistant.'
    }
  }

  private async processWithOpenAI(message: string, model: string): Promise<string> {
    try {
      const response = await this.openaiClient.chat.completions.create({
        model,
        messages: [{ role: 'user', content: message }],
        max_tokens: 1000,
      })
      return response.choices[0].message.content || 'No response'
    } catch (error) {
      console.error('OpenAI error:', error)
      return 'Error processing with OpenAI'
    }
  }

  private async processWithAnthropic(message: string, model: string): Promise<string> {
    try {
      const response = await this.anthropicClient.messages.create({
        model,
        max_tokens: 1000,
        messages: [{ role: 'user', content: message }],
      })
      return response.content[0].type === 'text' ? response.content[0].text : 'No response'
    } catch (error) {
      console.error('Anthropic error:', error)
      return 'Error processing with Anthropic'
    }
  }
}
