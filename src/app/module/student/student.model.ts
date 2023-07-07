import { Schema, model } from "mongoose";
import { bloodGroup, gender } from "./student.constant";
import { IStudent, StudentModel } from "./student.interface";

export const studentSchema = new Schema<IStudent, StudentModel>({
    id: {
        type: String,
        require: true,
        unique: true
    },
    name: {
        type: {
            firstName: {
                type: String,
                require: true
            },
            middleName: {
                type: String,
            },
            lastName: {
                type: String,
                require: true
            }
        },
        require: true
    },
    dateOfBirth: {
        type: String
    },
    gender: {
        type: String,
        enum: gender
    },
    bloodGroup: {
        type: String,
        enum: bloodGroup
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    contactNo: {
        type: String,
        require: true,
        unique: true
    },
    emergencyContactNo: {
        type: String,
        require: true,
    },
    presentAddress: {
        type: String,
        require: true,
    },
    permanentAddress: {
        type: String,
        require: true,
    },
    guardian: {
        require: true,
        type: {
            fatherName: {
                type: String,
                require: true,
            },
            fatherOccupation: {
                type: String,
                require: true,
            },
            fatherContactNo: {
                type: String,
                require: true,
            },
            motherName: {
                type: String,
                require: true,
            },
            motherOccupation: {
                type: String,
                require: true,
            },
            motherContactNo: {
                type: String,
                require: true,
            }
        }
    },
    localGuardian: {
        require: true,
        type: {
            localGuardianName: {
                type: String,
                require: true,
            },
            localGuardianOccupation: {
                type: String,
                require: true,
            },
            localGuardianContactNo: {
                type: String,
                require: true,
            },
            address: {
                type: String,
                require: true,
            }
        }
    },
    profileImage: {
        type: String,
        // require: true,
    },
    academicFaculty : {
        type : Schema.Types.ObjectId, 
        ref : "AcademicFaculty",
        required : true 
    },
    academicDepartment : {
        type : Schema.Types.ObjectId, 
        ref : "AcademicDepartment",
        required : true 
    },
    academicSemester : {
        type : Schema.Types.ObjectId, 
        ref : "AcademicSemester",
        required : true 
    },
    
},
{
    timestamps: true ,
    toJSON: {
        virtuals: true
    }
})

export const Student = model<IStudent , StudentModel > ('Student', studentSchema)