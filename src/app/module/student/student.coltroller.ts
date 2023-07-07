import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationField } from '../../../constants/paginations';
import catchAsync from '../../../shared/catches.async';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { studentFilterableField } from './student.constant';
import { IStudent } from './student.interface';
import { StudentService } from './student.service';

const getAllStudent = catchAsync(
  async(req : Request, res : Response) =>{
    const filters = pick(req.query, studentFilterableField);
    const paginationOptions = pick(req.query , paginationField)

    console.log(filters);
    
     const result = await StudentService.getAllStudent(
      filters,
      paginationOptions
      );
    sendResponse<IStudent[]>(res , {
    statusCode : httpStatus.OK , 
    success : true ,
    message : "semesters get successfully",
    meta: result.meta ,
    data : result.data
  })
  }
)


const getSingleStudent = catchAsync(

  async (req : Request , res : Response) => {
    const id  = req.params.id 
     const result = await StudentService.getSingleStudent(id) 
     sendResponse<IStudent>(res , {
      statusCode : httpStatus.OK , 
      success : true ,
      message : "single student get successfully",
      data : result
    })

  }

)

const updateStudent = catchAsync (
  async (req : Request , res : Response) => {
    const id  = req.params.id 
    const updateData = req.body
     const result = await StudentService.getUpdateStudent(id,updateData) 
     sendResponse<IStudent>(res , {
      statusCode : httpStatus.OK , 
      success : true ,
      message : "student updated successfully",
      data : result
    })
    
  }
)
const deleteStudent = catchAsync (
  async (req : Request , res : Response) => {
    const id  = req.params.id 
     const result = await StudentService.getDeleteStudent(id) 
     sendResponse<IStudent>(res , {
      statusCode : httpStatus.OK , 
      success : true ,
      message : "student deleted successfully",
      data : result
    })
    
  }
)

export const StudentController = {
  getAllStudent, 
  getSingleStudent,
  updateStudent,
  deleteStudent
}