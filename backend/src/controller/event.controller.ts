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

export const GetAllEvents = async (req: Request, res: Response) => {
  try {
    const events = await EventBase.find()
    console.log(events)
    return res.json({ events })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const GetEventbyId = async (req: Request, res: Response) => {
  try {
    const eventId = req.params.id
    const event = await (EventBase as any).findById(eventId)
    console.log(event)
    return res.json({ event })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
