import { Router } from "express";
import { isAuthenticated, isAdmin } from "../middlewares/auth.middleware.js";

import * as clientController from "../controllers/cliente.controller.js";





const clientRoute = Router();

clientRoute.get('/home', isAuthenticated, clientController.serveHomeCliente);

clientRoute.get('/cliente/canchas', isAuthenticated, clientController.getCanchasCliente);


export default clientRoute