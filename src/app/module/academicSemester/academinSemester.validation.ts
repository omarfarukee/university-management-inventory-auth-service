import { z } from "zod"
import { academicSemesterCode, academicSemesterMonths } from "./academicSemester.constant"

    const createAcademicSemesterZodSchema = z.object({
      body : z.object({
        title : z.enum(['Autumn','Summer','Fall'], {
        required_error: "title is required"
        }) , 
        year : z.number({
            required_error: "year is required"
        }) ,
        code : z.enum([...academicSemesterCode] as [string, ...string[]]) ,

        startMonth : z.enum ( [...academicSemesterMonths] as [string, ...string[]], {
            required_error: "start month is required"
         }), 
         
         endMonth : z.enum ([...academicSemesterMonths] as [string, ...string[]], {
            required_error: "end month is required"
         }), 
    }),
       
    })

    const updateAcademicSemesterZodSchema = z.object({
      body : z.object({
        title : z.enum(['Autumn','Summer','Fall'], {
        required_error: "title is required"
        }).optional() , 
        year : z.string({
            required_error: "year is required"
        }).optional() ,
        code : z.enum([...academicSemesterCode] as [string, ...string[]]).optional() ,

        startMonth : z.enum ( [...academicSemesterMonths] as [string, ...string[]], {
            required_error: "start month is required"
         }).optional(), 
         
         endMonth : z.enum ([...academicSemesterMonths] as [string, ...string[]], {
            required_error: "end month is required"
         }).optional(), 
    }),
       
    }).refine((data) => (data.body.title && data.body.code) || (!data.body.title && !data.body.code),{
        message : ' either both title and code should be provided'
    }
    )

    export const AcademicSemesterValidation = {
        createAcademicSemesterZodSchema,
        updateAcademicSemesterZodSchema
    }

