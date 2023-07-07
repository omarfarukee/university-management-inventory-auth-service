import httpStatus from 'http-status';
import ApiError from '../../../error/ApiError';
import { User } from '../users/user.model';
import { ILoginUser } from './auth.intreface';

const loginUser = async (payload: ILoginUser) => {
  const { id, password } = payload;

  const user = new User();

  const isUserExist = await user.isUserExist(id);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user dose not exist!');
  }

  if (
    isUserExist?.password &&
    !(await user?.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'password in incorrect!');
  }
  return;
};

export const AuthService = {
  loginUser,
};
