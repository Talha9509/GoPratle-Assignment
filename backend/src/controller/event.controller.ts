import { type Request, type Response } from 'express'
import { EventBase } from '../schema/eventSchema.js'

export const NewEvent = async (req: Request, res: Response) => {
  try {
    const event = await EventBase.create(req.body)
    console.log(event)
    return res.json({ message: 'Event created', event: event })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

