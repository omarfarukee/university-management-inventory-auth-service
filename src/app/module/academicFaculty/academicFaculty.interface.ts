import { Model } from "mongoose";





export type IAcademicFacultyTitles = string

export type IAcademicFaculty = {
    title : IAcademicFacultyTitles;
};

export type AcademicFacultyModel = Model<IAcademicFaculty> ;



export type IAcademicFacultyFilter = {
  searchTerm : string 
}