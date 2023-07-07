import { IGlobalGenericError } from "./errorInterface";

export type IGlobalGenericErrorResponse= {
    statusCode : number  ;
    message : string ;
    errorMessages : IGlobalGenericError[]

}
export type IGenericResponse<T> = {
    meta : {
        page? : number;
        limit? : number ;
        total? : number ;
    }, 
    data : T 
}
