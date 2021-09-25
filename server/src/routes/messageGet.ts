import express from 'express'
import { Controller } from '../controllers/Controller'

const router = express.Router();

const controller : Controller = Controller.getInstance()

router.get(
    '/message/:id',
    controller.Get
)

export { router as get };