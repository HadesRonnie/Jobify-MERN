import { body, param, validationResult } from 'express-validator';
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from '../errors/customErrors.js';
import { JOB_STATUS, JOB_TYPE } from '../utils/constants.js';
import mongoose from 'mongoose';
import Job from '../models/JobModel.js';
import User from '../models/UserModel.js';

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      // console.log(errors);

      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        console.log(errorMessages);

        if (errorMessages[0].startsWith('no job')) {
          throw new NotFoundError(errorMessages);
        }
        if (errorMessages[0].startsWith('not authorized')) {
          throw new UnauthorizedError('not authorized to access this route');
        }

        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateJobInput = withValidationErrors([
  body('company')
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage('Please provide a company name.'),
  body('position')
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage('Please provide a position name.'),
  body('jobLocation')
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage('Please provide a job location.'),
  body('jobStatus')
    .isIn(Object.values(JOB_STATUS))
    .withMessage('invalid status value'),
  body('jobType').isIn(Object.values(JOB_TYPE)).withMessage('invalid Job Type'),
]);

export const validateIdParam = withValidationErrors([
  param('id').custom(async (value, { req }) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) throw new Error('invalid MongoDB id');
    const job = await Job.findById(value);
    if (!job) throw new Error(`no job with id ${value}`);
    const isAdmin = req.user.role === 'admin';
    const isOwner = req.user.userId === job.createdBy.toString();
    if (!isAdmin && !isOwner)
      throw new Error('not authorized to access this route');
  }),
]);

export const validateRegisterInput = withValidationErrors([
  body('name').trim().notEmpty().withMessage('name is required'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format.')
    .custom(async (email) => {
      const isEmailPresent = await User.findOne({ email });
      if (isEmailPresent) {
        throw new Error('email already exists');
      }
    }),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('password is required')
    .isLength({ min: 8 })
    .withMessage('password must be at least 8 characters long'),
  body('location').trim().notEmpty().withMessage('location is required'),
  body('lastName').trim().notEmpty().withMessage('last name is required'),
]);

export const validateLoginInput = withValidationErrors([
  body('email')
    .trim()
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('Invalid Format'),
  body('password').trim().notEmpty().withMessage('password is required'),
]);

export const validateUpdateUserInput = withValidationErrors([
  body('name').trim().notEmpty().withMessage('name is required'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format.')
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user && user._id.toString() !== req.user.userId) {
        throw new Error('email already exists');
      }
    }),
  body('location').trim().notEmpty().withMessage('location is required'),
  body('lastName').trim().notEmpty().withMessage('last name is required'),
]);
