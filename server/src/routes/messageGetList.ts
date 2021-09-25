import express from 'express'
import { Controller } from '../controllers/Controller'

const router = express.Router();

const controller : Controller = Controller.getInstance()

router.get(
    '/messages',
    controller.GetList
)

export { router as getList };