import httpStatus from 'http-status';
import { Schema, model } from 'mongoose';
import ApiError from '../../../error/ApiError';
import { academicSemesterCode, academicSemesterMonths, academicSemesterTitles } from './academicSemester.constant';
import { AcademicSemesterModel, IAcademicSemester } from './academicSemesterInterface';




const academicSemesterSchema = new Schema<IAcademicSemester>(

  {
    title: {
      type: String,
      required: true,
      enum : academicSemesterTitles
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum : academicSemesterCode
    },
    startMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonths
    },
    endMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonths
    },
  },
  {
    timestamps: true,
    toJSON : {
      virtuals: true
    }
  }
)

academicSemesterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemester.findOne({title: this.title , year : this.year})
  if(isExist){
    throw new ApiError(httpStatus.CONFLICT, 'Academic semester is already exist')
  }
  next()
})

export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>('AcademicSemester', academicSemesterSchema)

