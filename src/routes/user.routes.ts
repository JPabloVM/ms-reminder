import express from 'express';
import { UserController } from '../controllers/user.controller';

const userRoutes = express.Router();

const userControler = new UserController();

userRoutes.post('/users', userControler.create);

userRoutes.get('/users', userControler.get);

userRoutes.get('/users/:id', userControler.getById);

userRoutes.patch('/users/:id', userControler.update);

userRoutes.delete('/users/:id', userControler.delete);

export default userRoutes;
