import { Router } from 'express'
import { NewEvent, GetAllEvents, GetEventbyId } from '../controller/event.controller.js'

const router = Router()

router.post('/', NewEvent)
router.get('/', GetAllEvents)
router.get('/:id', GetEventbyId)

export default router;