// import httpStatus from "http-status";
import { SortOrder } from "mongoose";
// import ApiError from "../../../error/ApiError";
import { paginationHelper } from "../../../helpers/pagiantionHelper";
import { IGenericResponse } from "../../../interfaceError/common";
import { IPaginationOptions } from "../../../interfaceError/pagination";
import { academicFacultySearchableField } from "./academicFaculty.constant";
import { IAcademicFaculty, IAcademicFacultyFilter } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";


const createFaculty = async (payload: IAcademicFaculty): Promise<IAcademicFaculty | null> => {

    // if (academicFacultyTitleCodeMapper[payload.title] !== payload.title) {
    //     throw new ApiError(httpStatus.BAD_REQUEST, 'invalid semester')
    // }
    const result = await AcademicFaculty.create(payload);
    return result
}

const getAllFaculty = async (
    filters: IAcademicFacultyFilter,
    paginationOptions: IPaginationOptions): Promise<IGenericResponse<IAcademicFaculty[]>> => {

    const { searchTerm, ...filtersData } = filters;


    const andConditions = []
    if (searchTerm) {
        andConditions.push({
            $or: academicFacultySearchableField.map(field => ({
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

    const result = await AcademicFaculty.find(whereCondition)
        .sort(sortCondition)
        .skip(skip)
        .limit(limit)

    const total = await AcademicFaculty.countDocuments();

    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result
    }
}


const getSingleFaculty = async (id : string) : Promise<IAcademicFaculty | null> => {
        const result = await  AcademicFaculty.findById(id)
        return result
}


const getUpdateFaculty= async (id: string, payload : Partial<IAcademicFaculty>) : Promise<IAcademicFaculty | null>   => {

    // if (payload.title && payload.code && academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    //     throw new ApiError(httpStatus.BAD_REQUEST, 'invalid semester code')
    // }
    const result = await AcademicFaculty.findOneAndUpdate({_id : id}, payload , {new : true})
        return result
}



const getDeleteFaculty = async (id: string): Promise<IAcademicFaculty | null> => {
    const result = await AcademicFaculty.findByIdAndDelete(id)
        return result
}


export const AcademicFacultyService = {
    createFaculty,
    getAllFaculty,
    getSingleFaculty,
    getUpdateFaculty,
    getDeleteFaculty
   
}