import express from 'express';
import UserController from '../controllers/UserController';
import { validateRegister } from '../middlewares/validation';

const router = express.Router();

router.get('/', (req, res, next) => {
  res.json({
    status: 'success',
    message: 'Welcome to komicle app'
  });
});

router.post('/register', validateRegister, UserController.register);


router.all('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: '404 Page not found'
  });
});

export default router;
