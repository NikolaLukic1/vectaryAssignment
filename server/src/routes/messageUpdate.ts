import express from 'express'
import { Controller } from '../controllers/Controller'

const router = express.Router();

const controller : Controller = Controller.getInstance()

router.put(
    '/message/:id',
    controller.Edit
)

export { router as edit };