import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middleweres/globalErrorHandler';
// import { AcademicSemesterRoute } from './app/module/academicSemester/academicSemester.route'
// import { UserRoute } from './app/module/users/user.route'
import router from './app/routs';

const app: Application = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/', router);

app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'not found ',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'api not found ....',
      },
    ],
  });
  next();
});

export default app;
