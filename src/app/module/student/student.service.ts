import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../error/ApiError';
import { paginationHelper } from '../../../helpers/pagiantionHelper';
import { IGenericResponse } from '../../../interfaceError/common';
import { IPaginationOptions } from '../../../interfaceError/pagination';
import { studentSearchableField } from './student.constant';
import { IStudent, IStudentFilter } from './student.interface';
import { Student } from './student.model';


const getAllStudent = async (
    filters: IStudentFilter,
    paginationOptions: IPaginationOptions): Promise<IGenericResponse<IStudent[]>> => {

    const { searchTerm, ...filtersData } = filters;


    const andConditions = []
    if (searchTerm) {
        andConditions.push({
            $or: studentSearchableField.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i'
                }
            }))
        })
    }

    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value
            }))
        })
    }

    const { page, limit, skip, sortBy, sortOrder } = paginationHelper.calculatePagination(paginationOptions)

    const sortCondition: { [key: string]: SortOrder } = {}
    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder
    }

    const whereCondition = andConditions.length > 0 ? { $and: andConditions } : {}

    const result = await Student.find(whereCondition)
        .populate('academicSemester')
        .populate('academicDepartment')
        .populate('academicFaculty')
        .sort(sortCondition)
        .skip(skip)
        .limit(limit)

    const total = await Student.countDocuments(whereCondition);

    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result
    }
}

const getSingleStudent = async (id: string): Promise<IStudent | null> => {
    const result = await Student.findById(id)
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty')
        return result
}

const getUpdateStudent= async (id: string, payload : Partial<IStudent>) : 
 Promise<IStudent | null>  => {

    const isExist = Student.findOne({id}) 
    if(!isExist){
        throw new ApiError(httpStatus.NOT_FOUND, 'student not found')
    }

    const {name , guardian, localGuardian , ...studentData } = payload

    const updateStudentData  : Partial <IStudent>= {...studentData} 

    if(name && Object.keys(name).length > 0) {
        Object.keys(name).forEach(key =>{
            const nameKey = `name.${key}`;
            (updateStudentData as any )[nameKey] = name [key as keyof typeof name]
        })
    }

    if(guardian && Object.keys(guardian).length > 0) {
        Object.keys(guardian).forEach(key =>{
            const guardianKey = `guardian.${key}`;
            (updateStudentData as any )[guardianKey] = guardian [key as keyof typeof guardian]
        })
    }

    if(localGuardian && Object.keys(localGuardian).length > 0) {
        Object.keys(localGuardian).forEach(key =>{
            const localGuardianKey = `localGuardian.${key}`;
            (updateStudentData as any )[localGuardianKey] = localGuardian [key as keyof typeof localGuardian]
        })
    }
    
    const result = await Student.findOneAndUpdate({id}, updateStudentData , {new : true
    })
     return result
}


const getDeleteStudent = async (id: string): Promise<IStudent | null> => {
    const result = await Student.findByIdAndDelete(id)
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty')
        return result
}


export const StudentService = {
    
    getAllStudent,
    getSingleStudent,
    getUpdateStudent,
    getDeleteStudent
}