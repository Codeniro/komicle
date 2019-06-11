/* eslint-disable no-unneeded-ternary */
import jwt from 'jsonwebtoken';
import { hashPassword } from '../helpers/encrypt';
import Model from '../models';
import { errorResponse } from '../helpers/response';

require('dotenv').config();

const { User } = Model;

export default class UserController {
  static async register(req, res) {
    try {
      const {
        email, username, password, role
      } = req.body;

      const emailMatch = await User.findOne({
        where: { email: email.toLowerCase() }
      });

      if (emailMatch) {
        return errorResponse(res, 409, 'Account already exists');
      }

      const hashedPassword = hashPassword(password);
      const newUser = await User.create({
        email: email.toLowerCase(),
        username,
        password: hashedPassword,
        role
      });

      const token = jwt.sign(
        { id: newUser.id, role: newUser.role }, process.env.SECRET, { expiresIn: '24h' }
      );
      return res.status(201).json({
        status: 'success',
        message: 'Registration was successful',
        user: {
          id: newUser.id,
          email: newUser.email,
          username: newUser.username,
          role: newUser.role
        },
        token
      });
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }
}
