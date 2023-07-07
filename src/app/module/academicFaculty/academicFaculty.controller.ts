import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationField } from '../../../constants/paginations';
import catchAsync from '../../../shared/catches.async';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { academicFacultySearchableField } from './academicFaculty.constant';
import { IAcademicFaculty } from './academicFaculty.interface';
import { AcademicFacultyService } from './academicFaculty.service';



const createFaculty = catchAsync(async (req : Request, res : Response) => {


  const { ...academicFacultyData } = req.body
  const result = await AcademicFacultyService.createFaculty(academicFacultyData)
 
  sendResponse(res , {
    statusCode : httpStatus.OK , 
    success : true ,
    message : "academic semester is Created successfully",
    data : result
  })
})

const getAllFaculty = catchAsync(
  async(req : Request, res : Response) =>{
    const filters:any= pick(req.query, academicFacultySearchableField);
    const paginationOptions = pick(req.query , paginationField)

    console.log(filters);
    
     const result = await AcademicFacultyService.getAllFaculty(
      filters,
      paginationOptions
      );
    sendResponse<IAcademicFaculty[]>(res , {
    statusCode : httpStatus.OK , 
    success : true ,
    message : "semesters get successfully",
    meta: result.meta ,
    data : result.data
  })
  }
)


const getSingleFaculty = catchAsync(

  async (req : Request , res : Response) => {
    const id  = req.params.id 
     const result = await AcademicFacultyService.getSingleFaculty(id) 
     sendResponse<IAcademicFaculty>(res , {
      statusCode : httpStatus.OK , 
      success : true ,
      message : "single semesters get successfully",
      data : result
    })

  }

)

const getUpdateFaculty = catchAsync (
  async (req : Request , res : Response) => {
    const id  = req.params.id 
    const updateData = req.body
     const result = await AcademicFacultyService.getUpdateFaculty(id,updateData) 
     sendResponse<IAcademicFaculty>(res , {
      statusCode : httpStatus.OK , 
      success : true ,
      message : "Faculty updated successfully",
      data : result
    })
    
  }
)
const getDeleteFaculty = catchAsync (
  async (req : Request , res : Response) => {
    const id  = req.params.id 
     const result = await AcademicFacultyService.getDeleteFaculty(id) 
     sendResponse<IAcademicFaculty>(res , {
      statusCode : httpStatus.OK , 
      success : true ,
      message : "Faculty deleted successfully",
      data : result
    })
    
  }
)

export const AcademicFacultyController = {
  createFaculty,
  getAllFaculty, 
  getSingleFaculty,
  getUpdateFaculty,
  getDeleteFaculty
}