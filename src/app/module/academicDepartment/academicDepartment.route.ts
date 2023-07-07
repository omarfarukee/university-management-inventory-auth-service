import express from 'express'
import validateRequest from '../../middleweres/validateRequest'
import { AcademicDepartmentController } from './academicDepartment.controller'
import { AcademicDepartmentValidation } from './academicDepartment.validation'




const router = express.Router()

router.post('/create-department', 
validateRequest(AcademicDepartmentValidation.createAcademicDepartmentZodSchema),
AcademicDepartmentController.createDepartment
)

router.get('/:id', AcademicDepartmentController.getSingleDepartment)

router.patch('/:id',validateRequest(AcademicDepartmentValidation.updateAcademicDepartmentZodSchema),
AcademicDepartmentController.getSingleDepartment)

router.delete('/:id', AcademicDepartmentController.getDeleteDepartment)

router.get('/', AcademicDepartmentController.getAllDepartment)

export const AcademicDepartmentRoute = router