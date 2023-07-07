import { Model, Types } from "mongoose"
import { IAcademicDepartment } from "../academicDepartment/academicDepartment.interface"
import { IAcademicFaculty } from "../academicFaculty/academicFaculty.interface"
import { IAcademicSemester } from "../academicSemester/academicSemesterInterface"


export type UserName = {
    firstName : string
    middleName : string
    lastName : string
}
export type guardian = {
    fatherName : string ;
    fatherOccupation: string ;
    fatherContactNo: string ;
    motherName : string ;
    motherOccupation: string ;
    motherContactNo: string ;

}


export type localGuardian = {
    localGuardianName: string ;
    localGuardianOccupation:string ;
    localGuardianContactNo: string ;
    address : string
}

export type IStudent = {
    id:string ;
    name : UserName ;
    gender : 'male' | 'female' ;
    dateOfBirth : string ;
    bloodGroup?: 'A+'| 'A-'| 'B+'| 'B-'| 'AB+'| 'AB-'| 'O+'| 'O-';
    email : string ;
    contactNo : string ;
    emergencyContactNo : string ; 
    presentAddress: string ;
    permanentAddress: string ;
    guardian : guardian ;
    localGuardian: localGuardian ;
    academicFaculty : Types.ObjectId | IAcademicFaculty ;
    academicDepartment : Types.ObjectId | IAcademicDepartment; 
    academicSemester : Types.ObjectId | IAcademicSemester ;
    profileImage? : string
} 

export type StudentModel = Model<IStudent, Record<string , unknown >> ;


export type IStudentFilter = {
    searchTerm?: string ,
    id? : string,
    bloodGroup?: string,
    email?:string,
    contactNo?:string 
  }