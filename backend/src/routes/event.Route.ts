import { Router } from 'express'
import { NewEvent, GetAllEvents } from '../controller/event.controller.js'

const router = Router()

router.post('/', NewEvent)
router.get('/', GetAllEvents)

export default router;