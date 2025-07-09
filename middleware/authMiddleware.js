import {
  BadRequestError,
  UnauthenticatedError,
} from '../errors/customErrors.js';
import { verifyJWT } from '../utils/tokenUtils.js';

export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;
  //   console.log(token);

  if (!token) {
    throw new UnauthenticatedError('authentication invalid');
  }
  try {
    const { userId, role } = verifyJWT(token);
    const testUser = userId === '686e6d2b2f721d6b5ab3a1cf';
    req.user = { userId, role, testUser };
  } catch (error) {
    throw new UnauthenticatedError('authentication invalid');
  }
  next();
};

export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthenticatedError('not authorized to access this route');
    }

    next();
  };
};

export const checkForTestUser = (req, res, next) => {
  if (req.user.testUser) throw new BadRequestError('Demo User. Read Only!');
  next();
};
