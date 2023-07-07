import express from 'express'
import validateRequest from '../../middleweres/validateRequest'
import { AcademicFacultyController } from './academicFaculty.controller'
import { AcademicFacultyValidation } from './academicFaculty.validation'


const router = express.Router()

router.post('/create-faculty', 
validateRequest(AcademicFacultyValidation.createAcademicFacultyZodSchema),
AcademicFacultyController.createFaculty
)

router.get('/:id', AcademicFacultyController.getSingleFaculty)

router.patch('/:id',validateRequest(AcademicFacultyValidation.updateAcademicFacultyZodSchema),
AcademicFacultyController.getUpdateFaculty)

router.delete('/:id', AcademicFacultyController.getDeleteFaculty)

router.get('/', AcademicFacultyController.getAllFaculty)

export const AcademicFacultyRoute = router