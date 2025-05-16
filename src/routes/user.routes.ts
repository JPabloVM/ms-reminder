import express from 'express';
import { UserController } from '../controllers/user.controller';
import { authenticate, authenticateInternal } from '../middlewares/auth.midleware';

const userRoutes = express.Router();

const userControler = new UserController();

userRoutes.post('/users', authenticateInternal, userControler.create);

userRoutes.get('/users', authenticateInternal, userControler.get);

userRoutes.get('/users/:id', authenticate, userControler.getById);

userRoutes.patch('/users/:id', authenticate, userControler.update);

userRoutes.delete('/users/:id', authenticate, userControler.delete);

export default userRoutes;
