import { Router } from "express";
import * as authC from './../controllers/auth.controller.js';
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const authRouter = Router();


authRouter.get('/', authC.getLogin);
authRouter.post('/login', authC.postLogin);
authRouter.get('/register', authC.getRegister);
authRouter.post('/register', authC.postNewUser);
authRouter.post('/logout', isAuthenticated, authC.logout);


export default authRouter;
