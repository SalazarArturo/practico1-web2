
import { getAllCanchasService } from "../services/cliente.service.js";

function serveHomeCliente(req, res) {
    const logError = req.query.error === 'logout'
        ? 'No se pudo cerrar la sesión'
        : req.query.error === 'unauthorized'
        ? 'Acceso denegado'
        : null;

    return res.render('cliente/home', { logError });
}


async function getCanchasCliente(req, res) {
    try {
        const result = await getAllCanchasService();
        if (!result.success) {
            return res.render('cliente/list-canchas', { canchas: [], error: result.error });
        }
        return res.render('cliente/list-canchas', { canchas: result.canchas, error: null });
    } catch (error) {
        return res.render('cliente/list-canchas', { canchas: [], error: 'Error al cargar las canchas' });
    }
}


export{
    serveHomeCliente,
    getCanchasCliente,
}