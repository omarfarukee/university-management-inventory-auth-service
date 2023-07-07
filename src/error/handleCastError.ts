import mongoose from "mongoose";
import { IGlobalGenericError } from "../interfaceError/errorInterface";

const handleCastError = (error : mongoose.Error.CastError) =>{
     
    const errors : IGlobalGenericError[] = [
         {
          path : error.path ,
        message : 'invalid id'
        }
    ]
       
      

    

    const statusCode = 400 ;
    return {
        statusCode, 
        message : 'cast error', 
        errorMessages : errors
    }
}
export default handleCastError