import express from 'express'
import { Controller } from '../controllers/Controller'

const router = express.Router();

const controller : Controller = Controller.getInstance()

router.post(
    '/message',
    controller.Add
)

export { router as add };