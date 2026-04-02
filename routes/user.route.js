import { Router } from "express";
import { isAuthenticated, isAdmin } from "../middlewares/auth.middleware.js";
import { serveHome, getCanchas } from "../controllers/user.controller.js";
import { getCanchas as getCanchasCliente, getResenas } from "../controllers/cliente.controller.js";



const userRoute = Router();

userRoute.get('/home', isAuthenticated, serveHome);
userRoute.get('/admin/canchas', isAuthenticated, isAdmin, getCanchas);
userRoute.get('/admin/canchas/new', isAuthenticated, isAdmin);

userRoute.get('/cliente/canchas', isAuthenticated, getCanchasCliente);
userRoute.get('/cliente/reservas', isAuthenticated, getResenas);
userRoute.get('/cliente/canchas', isAuthenticated, getCanchas);


export default userRoute