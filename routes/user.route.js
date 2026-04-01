import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { serveHome } from "../controllers/user.controller.js";
const userRoute = Router();

userRoute.get('/home', isAuthenticated, serveHome);

export default userRoute