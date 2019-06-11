import validator from 'validator';
import { errorResponse } from '../helpers/response';

/**
 * @description - check users register details
 *
 * @param {object} req - HTTP Request
 * @param {object} res - HTTP Response
 * @param {object} next
 *
 * @returns
 */
export const validateRegister = (req, res, next) => {
  const {
    username, email, password
  } = req.body;
  const statusCode = 422;

  if (!email) {
    errorResponse(res, statusCode, 'The email field is required');
  } else if (email && !validator.isEmail(email)) {
    errorResponse(res, statusCode, 'The email is invalid');
  } else if (!username) {
    errorResponse(res, statusCode, 'The username field is required');
  } else if (typeof (username) !== 'string') {
    errorResponse(res, statusCode, 'The username is invalid');
  } else if (!password || (password && validator.isEmpty(password.trim()))) {
    errorResponse(res, statusCode, 'The password field is required');
  } else if (password.length < 8) {
    errorResponse(res, statusCode, 'The password must be at least 8 characters long');
  } else {
    return next();
  }
};
