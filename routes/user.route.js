import { Router } from "express";
import { isAuthenticated, isAdmin } from "../middlewares/auth.middleware.js";
import {
    getHorariosCancha,
    createHorariosRango,
    deleteHorario,
    serveHome,
    getCanchas,
    serveNewCanchaForm,
    proccessCanchaTypes,
    serveModeloForm,
    postModelo,
    editModel,
    postModelChanges,
    deleteModel,
    postNewCancha,
    editCancha,
    postCanchaEditChanges
} from "../controllers/user.controller.js";

const userRoute = Router();

userRoute.get('/home', isAuthenticated, serveHome);

userRoute.get('/admin/canchas', isAuthenticated, isAdmin, getCanchas);
userRoute.get('/admin/canchas/new', isAuthenticated, isAdmin, serveNewCanchaForm); 
userRoute.post('/admin/canchas', isAuthenticated, isAdmin, postNewCancha);
userRoute.get('/admin/canchas/:canchaId/edit', isAuthenticated, isAdmin, editCancha);
userRoute.post('/admin/canchas/:canchaId', isAuthenticated, isAdmin, postCanchaEditChanges);

userRoute.get('/admin/modelos', isAuthenticated, isAdmin, proccessCanchaTypes);
userRoute.get('/admin/modelos/new', isAuthenticated, isAdmin, serveModeloForm);
userRoute.post('/admin/modelos', isAuthenticated, isAdmin, postModelo);
userRoute.get('/admin/modelos/:modeloId/edit', isAuthenticated, isAdmin, editModel);
userRoute.post('/admin/modelos/:modeloId', isAuthenticated, isAdmin, postModelChanges); //este es posterar los cambios en el modelo xddd
userRoute.post('/admin/modelos/:modeloId/delete', isAuthenticated, isAdmin, deleteModel);

// Horarios
adminRoute.get('/canchas/:id/horarios', isAuthenticated, isAdmin, getHorariosCancha);
adminRoute.post('/canchas/:id/horarios', isAuthenticated, isAdmin, createHorariosRango);
adminRoute.post('/horarios/:id/delete',  isAuthenticated, isAdmin, deleteHorario);


export default userRoute