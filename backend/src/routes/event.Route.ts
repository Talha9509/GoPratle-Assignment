import { Router } from 'express'
import { NewEvent } from '../controller/event.controller.js'

const router = Router()

router.post('/', NewEvent)

export default router;