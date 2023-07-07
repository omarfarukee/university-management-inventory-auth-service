import httpStatus from 'http-status';
import { Schema, model } from 'mongoose';
import ApiError from '../../../error/ApiError';
// import { academicFacultyTitles } from './academicFaculty.constant';
import { AcademicFacultyModel, IAcademicFaculty } from './academicFaculty.interface';




const academicFacultySchema = new Schema<IAcademicFaculty>(

  {
    title: {
      type: String,
      required: true,
      unique: true
    }
  },
  {
    timestamps: true,
    toJSON : {
      virtuals: true
    }
  }
)

academicFacultySchema.pre('save', async function (next) {
  const isExist = await AcademicFaculty.findOne({title: this.title})
  if(isExist){
    throw new ApiError(httpStatus.CONFLICT, 'Academic Faculty is already exist')
  }
  next()
})

export const AcademicFaculty = model<IAcademicFaculty, AcademicFacultyModel>('AcademicFaculty', academicFacultySchema)

