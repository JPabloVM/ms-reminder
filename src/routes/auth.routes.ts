import express from 'express';
import { AuthController } from '../controllers/auth.controller';

const authRoutes = express.Router();

const authControler = new AuthController();

authRoutes.post('/auth/login', authControler.login);

export default authRoutes;
