// import httpStatus from "http-status";
import { SortOrder } from "mongoose";
import { paginationHelper } from "../../../helpers/pagiantionHelper";
import { IGenericResponse } from "../../../interfaceError/common";
import { IPaginationOptions } from "../../../interfaceError/pagination";
import { academicDepartmentSearchableField } from "./academicDepartment.constant";
import { IAcademicDepartment, IAcademicDepartmentFilter } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";
// import ApiError from "../../../error/ApiError";



const createDepartment = async (payload: IAcademicDepartment): Promise<IAcademicDepartment | null> => {

    // if (academicFacultyTitleCodeMapper[payload.title] !== payload.title) {
    //     throw new ApiError(httpStatus.BAD_REQUEST, 'invalid semester')
    // }
    const result = (await AcademicDepartment.create(payload)).populate('academicFaculty');
    return result
}

const getAllDepartment = async (
    filters: IAcademicDepartmentFilter,
    paginationOptions: IPaginationOptions): Promise<IGenericResponse<IAcademicDepartment[]>> => {

    const { searchTerm, ...filtersData } = filters;


    const andConditions = []
    if (searchTerm) {
        andConditions.push({
            $or: academicDepartmentSearchableField.map(field => ({
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

    const result = await AcademicDepartment.find(whereCondition)
        .populate('academicFaculty')
        .sort(sortCondition)
        .skip(skip)
        .limit(limit)

    const total = await AcademicDepartment.countDocuments();

    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result
    }
}


const getSingleDepartment = async (id : string) : Promise<IAcademicDepartment | null> => {
        const result = await  AcademicDepartment.findById(id).populate('academicFaculty')
        return result
}


const getUpdateDepartment= async (id: string, payload : Partial<IAcademicDepartment>) : Promise<IAcademicDepartment | null>   => {

    // if (payload.title && payload.code && academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    //     throw new ApiError(httpStatus.BAD_REQUEST, 'invalid semester code')
    // }
    const result = await AcademicDepartment.findOneAndUpdate({_id : id}, payload , {new : true}).populate('academicFaculty')
        return result
}



const getDeleteDepartment = async (id: string): Promise<IAcademicDepartment | null> => {
    const result = await AcademicDepartment.findByIdAndDelete(id)
        return result
}


export const AcademicDepartmentService = {
    createDepartment,
    getAllDepartment,
    getSingleDepartment,
    getUpdateDepartment,
    getDeleteDepartment
   
}