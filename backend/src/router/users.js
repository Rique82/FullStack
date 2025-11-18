import express, { Router } from "express"
import ControllerUser from '../controller/users.js'
import authMiddleware from "../middleware/auth.js"

//objetivo da rota é disponibilizar o endpoint e jogar para o controller

const router = express.Router()

//api/v1

router.post('/login', ControllerUser.Login)

router.get('/user/context', ControllerUser.FindOne)
router.post('/user/', ControllerUser.Create)
router.put('/user/', ControllerUser.Update)
router.delete('/user/', ControllerUser.Delete)

router.get('/users', ControllerUser.FindAll)
router.get('/user/:id', ControllerUser.FindOne)
router.post('/user/admin', ControllerUser.Create)
router.put('/user/:id', ControllerUser.Update)
router.delete('/user/:id', ControllerUser.Delete)

export default router