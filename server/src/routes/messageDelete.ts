import express from 'express'
import { Controller } from '../controllers/Controller'

const router = express.Router();

const controller : Controller = Controller.getInstance()

router.delete(
    '/message/:id',
    controller.Delete
)

export { router as deleteOne };