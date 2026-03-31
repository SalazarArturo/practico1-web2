/*
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
*/
import { Router } from "express";
import * as authC from './../controllers/auth.controller.js';

const authRouter = Router();


authRouter.get('/', authC.getLogin);
//authRouter.post('/login',   authController.postLogin);
authRouter.get('/register', authC.getRegister);
//authRouter.post('/register', authController.postRegister);
//authRouter.get('/logout',   authController.logout);


export default authRouter;
