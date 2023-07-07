import { z } from 'zod';
import { bloodGroup, gender } from '../student/student.constant';

const createUserZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),

    student: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'first name is required',
        }),
        middleName: z.string().optional(),
        lastName: z.string({
          required_error: 'lase name is required',
        }),
      }),

      dateOfBirth: z.string({
        required_error: 'date of birth is required',
      }),

      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: 'gender is required',
      }),

      bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),

      email: z
        .string({
          required_error: 'email is required',
        })
        .email(),

      contactNo: z.string({
        required_error: 'contact number is required',
      }),

      emergencyContactNo: z.string({
        required_error: 'emergency contact number is required',
      }),

      presentAddress: z.string({
        required_error: 'present address is required',
      }),

      permanentAddress: z.string({
        required_error: 'permanent address is required',
      }),

      academicSemester: z.string({
        required_error: 'academic Semester is required',
      }),

      academicFaculty: z.string({
        required_error: 'academic faculty is required',
      }),

      academicDepartment: z.string({
        required_error: 'academic department is required',
      }),

      guardian: z.object({
        fatherName: z.string({
          required_error: 'father name is required',
        }),

        fatherOccupation: z.string({
          required_error: '  father Occupation is required',
        }),

        fatherContactNo: z.string({
          required_error: '  father ContactNo is required',
        }),
        motherName: z.string({
          required_error: 'mother name is required',
        }),

        motherOccupation: z.string({
          required_error: '  mother Occupation is required',
        }),

        motherContactNo: z.string({
          required_error: '  mother ContactNo is required',
        }),
      }),

      profileImage: z.string().optional(),
    }),
  }),
});

export const UserValidation = {
  createUserZodSchema,
};
