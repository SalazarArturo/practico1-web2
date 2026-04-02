import { Router } from "express";
import { isAuthenticated, isAdmin } from "../middlewares/auth.middleware.js";
import { serveHome, getCanchas, serveNewCanchaForm } from "../controllers/user.controller.js";
import * as clientController from "../controllers/cliente.controller.js";



const userRoute = Router();

userRoute.get('/home', isAuthenticated, serveHome);
userRoute.get('/admin/canchas', isAuthenticated, isAdmin, getCanchas);
userRoute.get('/admin/canchas/new', isAuthenticated, isAdmin, serveNewCanchaForm); //aqui el controller

userRoute.get('/cliente/canchas', isAuthenticated, clientController.getCanchasCliente);
userRoute.get('/cliente/reservas', isAuthenticated, clientController.getReservas);
userRoute.get('/cliente/canchas', isAuthenticated, clientController.getCanchas2Clientes);


export default userRoute