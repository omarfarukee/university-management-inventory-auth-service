import express from 'express'
import validateRequest from '../../middleweres/validateRequest'
import { usersController } from './user.controller'
import { UserValidation } from './user.validation'

const router = express.Router()

router.post('/create-student', 
validateRequest(UserValidation.createUserZodSchema),
usersController.createStudent)

export const UserRoute = router
