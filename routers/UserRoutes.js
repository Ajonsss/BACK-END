import * as UserController from '../controllers/UserController.js';
import express from "express";

const userRoutes = express.Router();

userRoutes.post('/register', UserController.register)

export default userRoutes;