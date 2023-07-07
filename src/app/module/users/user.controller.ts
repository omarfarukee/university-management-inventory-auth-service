import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catches.async';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';
const createStudent = catchAsync(async (req : Request, res: Response) => {

  const { student ,...userData } = req.body
  const result = await UserService.createStudent(student, userData)
sendResponse(res , {
  statusCode : httpStatus.OK , 
  success : true ,
  message : "student Created successfully",
  data : result
})

})

export const usersController = {
  createStudent,
}