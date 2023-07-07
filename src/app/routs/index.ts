import express from 'express';
import { AcademicDepartmentRoute } from '../module/academicDepartment/academicDepartment.route';
import { AcademicFacultyRoute } from '../module/academicFaculty/academicFaculty.route';
import { AcademicSemesterRoute } from '../module/academicSemester/academicSemester.route';
import { AdminRoutes } from '../module/admin/admin.route';
import { AuthRoutes } from '../module/auth/auth.route';
import { FacultyRoutes } from '../module/faculty/faculty.route';
import { StudentRoute } from '../module/student/student.route';
import { UserRoute } from '../module/users/user.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoute,
  },
  {
    path: '/academic-semester',
    route: AcademicSemesterRoute,
  },
  {
    path: '/academic-faculty',
    route: AcademicFacultyRoute,
  },
  {
    path: '/academic-department',
    route: AcademicDepartmentRoute,
  },
  {
    path: '/students',
    route: StudentRoute,
  },
  {
    path: '/faculties',
    route: FacultyRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
