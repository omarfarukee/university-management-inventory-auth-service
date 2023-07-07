import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationField } from '../../../constants/paginations';
import catchAsync from '../../../shared/catches.async';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { academicDepartmentSearchableField } from './academicDepartment.constant';
import { IAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartmentService } from './academicDepartment.sercice';



const createDepartment = catchAsync(async (req : Request, res : Response) => {


  const { ...academicDepartmentData } = req.body
  const result = await AcademicDepartmentService.createDepartment(academicDepartmentData)
 
  sendResponse(res , {
    statusCode : httpStatus.OK , 
    success : true ,
    message : "academic department is Created successfully",
    data : result
  })
})

const getAllDepartment = catchAsync(
  async(req : Request, res : Response) =>{
    const filters:any= pick(req.query, academicDepartmentSearchableField);
    const paginationOptions = pick(req.query , paginationField)

    console.log(filters);
    
     const result = await AcademicDepartmentService.getAllDepartment(
      filters,
      paginationOptions
      );
    sendResponse<IAcademicDepartment[]>(res , {
    statusCode : httpStatus.OK , 
    success : true ,
    message : "all department get successfully",
    meta: result.meta ,
    data : result.data
  })
  }
)


const getSingleDepartment = catchAsync(

  async (req : Request , res : Response) => {
    const id  = req.params.id 
     const result = await AcademicDepartmentService.getSingleDepartment(id) 
     sendResponse<IAcademicDepartment>(res , {
      statusCode : httpStatus.OK , 
      success : true ,
      message : "single department get successfully",
      data : result
    })

  }

)

const getUpdateDepartment = catchAsync (
  async (req : Request , res : Response) => {
    const id  = req.params.id 
    const updateData = req.body
     const result = await AcademicDepartmentService.getUpdateDepartment(id,updateData) 
     sendResponse<IAcademicDepartment>(res , {
      statusCode : httpStatus.OK , 
      success : true ,
      message : "department updated successfully",
      data : result
    })
    
  }
)
const getDeleteDepartment = catchAsync (
  async (req : Request , res : Response) => {
    const id  = req.params.id 
     const result = await AcademicDepartmentService.getDeleteDepartment(id) 
     sendResponse<IAcademicDepartment>(res , {
      statusCode : httpStatus.OK , 
      success : true ,
      message : "department deleted successfully",
      data : result
    })
    
  }
)

export const AcademicDepartmentController = {
  createDepartment,
  getAllDepartment, 
  getSingleDepartment,
  getUpdateDepartment,
  getDeleteDepartment
}