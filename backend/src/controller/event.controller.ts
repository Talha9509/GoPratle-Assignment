import { type Request, type Response } from 'express'
import Event from '../schema/eventSchema.js'
import { EventPayloadSchema } from '../types/eventTypes.js'

export const NewEvent = async (req: Request, res: Response) => {
  try {
    console.log(req.body)
    const validatedData = EventPayloadSchema.safeParse(req.body)
    console.log(validatedData)
    if(!validatedData.success){
      return res.status(422).json({ message: "Invalid Inputs" })
    }
    const event = await Event.create(validatedData.data)
    console.log(event)
    return res.json({ message: 'Event created', event: event })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const GetAllEvents = async (req: Request, res: Response) => {
  try {
    const events = await Event.find()
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
    const event = await (Event as any).findById(eventId)
    console.log(event)
    return res.json({ event })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
