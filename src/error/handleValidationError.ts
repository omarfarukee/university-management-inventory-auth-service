import mongoose from "mongoose";
import { IGlobalGenericErrorResponse } from "../interfaceError/common";
import { IGlobalGenericError } from "../interfaceError/errorInterface";

const handleValidationError = (err: mongoose.Error.ValidationError) : IGlobalGenericErrorResponse => {
    const errors: IGlobalGenericError[] = Object.values(err.errors).map(
        (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
            return {
                path: el?.path,
                message: el?.message
            };
        }
    );
    const statusCode = 400;
    return {
        statusCode,
        message: 'validation Error',
        errorMessages : errors
    }
};
export default handleValidationError
