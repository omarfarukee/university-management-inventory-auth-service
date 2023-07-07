import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationField } from '../../../constants/paginations';
import catchAsync from '../../../shared/catches.async';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { academicSemesterFilterableField } from './academicSemester.constant';
import { AcademicSemesterService } from './academicSemester.service';
import { IAcademicSemester } from './academicSemesterInterface';


const createSemester = catchAsync(async (req : Request, res : Response) => {


  const { ...academicSemesterData } = req.body
  const result = await AcademicSemesterService.createSemester(academicSemesterData)
 
  sendResponse(res , {
    statusCode : httpStatus.OK , 
    success : true ,
    message : "academic semester is Created successfully",
    data : result
  })
})

const getAllSemester = catchAsync(
  async(req : Request, res : Response) =>{
    const filters:any= pick(req.query, academicSemesterFilterableField);
    const paginationOptions = pick(req.query , paginationField)

    console.log(filters);
    
     const result = await AcademicSemesterService.getAllSemesters(
      filters,
      paginationOptions
      );
    sendResponse<IAcademicSemester[]>(res , {
    statusCode : httpStatus.OK , 
    success : true ,
    message : "semesters get successfully",
    meta: result.meta ,
    data : result.data
  })
  }
)


const getSingleSemester = catchAsync(

  async (req : Request , res : Response) => {
    const id  = req.params.id 
     const result = await AcademicSemesterService.getSingleSemester(id) 
     sendResponse<IAcademicSemester>(res , {
      statusCode : httpStatus.OK , 
      success : true ,
      message : "single semesters get successfully",
      data : result
    })

  }

)

const updateSemester = catchAsync (
  async (req : Request , res : Response) => {
    const id  = req.params.id 
    const updateData = req.body
     const result = await AcademicSemesterService.getUpdateSemester(id,updateData) 
     sendResponse<IAcademicSemester>(res , {
      statusCode : httpStatus.OK , 
      success : true ,
      message : "semester updated successfully",
      data : result
    })
    
  }
)
const deleteSemester = catchAsync (
  async (req : Request , res : Response) => {
    const id  = req.params.id 
     const result = await AcademicSemesterService.getDeleteSemester(id) 
     sendResponse<IAcademicSemester>(res , {
      statusCode : httpStatus.OK , 
      success : true ,
      message : "semester deleted successfully",
      data : result
    })
    
  }
)

export const AcademicSemesterController = {
  createSemester,
  getAllSemester, 
  getSingleSemester,
  updateSemester,
  deleteSemester
}