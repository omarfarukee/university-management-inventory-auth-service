import express from 'express'
import validateRequest from '../../middleweres/validateRequest'
import { StudentController } from './student.coltroller'
import { StudentValidation } from './student.validation'


const router = express.Router()

router.get('/:id', StudentController.getSingleStudent)

router.get('/:id', StudentController.deleteStudent)

router.get('/', StudentController.getAllStudent)


router.post('/:id', 
validateRequest(StudentValidation.updateStudentZodSchema),
StudentController.updateStudent)

export const StudentRoute = router
