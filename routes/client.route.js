import { Router } from 'express';
import { isAuthenticated } from '../middlewares/auth.middleware.js';
import {
    serveHomeCliente,
    getCanchasCliente,
    getReservasCanchaCliente,
    getReservasDia,
    postCrearReserva,
    getMisReservas,
    postCancelarReserva,
    postCrearResena
} from '../controllers/cliente.controller.js';

const clientRoute = Router();

clientRoute.get('/home', isAuthenticated, serveHomeCliente);
clientRoute.get('/canchas', isAuthenticated, getCanchasCliente);
clientRoute.get('/canchas/:canchaId/reservar', isAuthenticated, getReservasCanchaCliente);
clientRoute.get('/canchas/:canchaId/reservas-dia', isAuthenticated, getReservasDia);
clientRoute.post('/reservas', isAuthenticated, postCrearReserva);
clientRoute.get('/reservas', isAuthenticated, getMisReservas);
clientRoute.post('/reservas/:reservaId/cancelar', isAuthenticated, postCancelarReserva);
clientRoute.post('/resenas', isAuthenticated, postCrearResena);

export default clientRoute;
