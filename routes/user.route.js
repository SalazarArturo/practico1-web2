import { Router } from 'express';
import { isAuthenticated, isAdmin } from '../middlewares/auth.middleware.js';
import {
    serveHome,
    getCanchas,
    serveNewCanchaForm,
    postNewCancha,
    editCancha,
    postCanchaEditChanges,
    deleteCancha,
    proccessCanchaTypes,
    serveModeloForm,
    postModelo,
    editModel,
    postModelChanges,
    deleteModel,
    getHorariosCancha,
    createHorariosRango,
    deleteHorario,
    getAllReservas,
    postCambiarEstadoReserva,
    getAllResenas
} from '../controllers/user.controller.js';

const userRoute = Router();

userRoute.get('/home', isAuthenticated, serveHome);

// Canchas
userRoute.get('/admin/canchas', isAuthenticated, isAdmin, getCanchas);
userRoute.get('/admin/canchas/new', isAuthenticated, isAdmin, serveNewCanchaForm);
userRoute.post('/admin/canchas', isAuthenticated, isAdmin, postNewCancha);
userRoute.get('/admin/canchas/:canchaId/edit', isAuthenticated, isAdmin, editCancha);
userRoute.post('/admin/canchas/:canchaId/edit', isAuthenticated, isAdmin, postCanchaEditChanges);
userRoute.post('/admin/canchas/:canchaId/delete', isAuthenticated, isAdmin, deleteCancha);

// Horarios
userRoute.get('/admin/canchas/:canchaId/horarios', isAuthenticated, isAdmin, getHorariosCancha);
userRoute.post('/admin/canchas/:canchaId/horarios', isAuthenticated, isAdmin, createHorariosRango);
userRoute.post('/admin/horarios/:horarioId/delete', isAuthenticated, isAdmin, deleteHorario);

// Tipos / Modelos
userRoute.get('/admin/modelos', isAuthenticated, isAdmin, proccessCanchaTypes);
userRoute.get('/admin/modelos/new', isAuthenticated, isAdmin, serveModeloForm);
userRoute.post('/admin/modelos', isAuthenticated, isAdmin, postModelo);
userRoute.get('/admin/modelos/:modeloId/edit', isAuthenticated, isAdmin, editModel);
userRoute.post('/admin/modelos/:modeloId/edit', isAuthenticated, isAdmin, postModelChanges);
userRoute.post('/admin/modelos/:modeloId/delete', isAuthenticated, isAdmin, deleteModel);

// Reservas admin
userRoute.get('/admin/reservas', isAuthenticated, isAdmin, getAllReservas);
userRoute.post('/admin/reservas/:reservaId/estado', isAuthenticated, isAdmin, postCambiarEstadoReserva);

// Reseñas admin
userRoute.get('/admin/resenas', isAuthenticated, isAdmin, getAllResenas);

export default userRoute;
