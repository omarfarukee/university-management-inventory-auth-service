import { ZodError, ZodIssue } from 'zod';
import { IGlobalGenericErrorResponse } from '../interfaceError/common';
import { IGlobalGenericError } from '../interfaceError/errorInterface';

const handleZodError = (error : ZodError) : IGlobalGenericErrorResponse=>{
const errors: IGlobalGenericError[] = error.issues.map((issue : ZodIssue) => {
    return{
       path:  issue?.path[issue.path.length-1] ,
       message : issue?.message
    }   
})

    const statusCode = 400
    return {
        statusCode, 
        message: 'Validation error' ,
        errorMessages : errors
    }
}

export default handleZodError