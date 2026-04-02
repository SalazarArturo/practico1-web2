import { getAllCanchasService, getCanchaByIdService } from '../services/cancha.service.js';
import { getDisponibilidadService } from '../services/horario.service.js';
import {
    crearReservaService,
    getMisReservasService,
    cancelarReservaService,
    getReservasDiaService
} from '../services/reserva.service.js';
import { crearResenaService, getResenasByCanchaService } from '../services/resena.service.js';

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

async function getReservasCanchaCliente(req, res) {
    const { canchaId } = req.params;
    try {
        const [resultCancha, resultDisponibilidad, resultResenas] = await Promise.all([
            getCanchaByIdService(canchaId),
            getDisponibilidadService(canchaId),
            getResenasByCanchaService(canchaId)
        ]);

        if (!resultCancha.success) return res.redirect('/cliente/canchas');

        return res.render('cliente/reservar-cancha', {
            cancha: resultCancha.cancha,
            disponibilidad: resultDisponibilidad.horario || null,
            resenas: resultResenas.resenas,
            success: req.query.success || null,
            error: req.query.error || null
        });
    } catch (error) {
        return res.redirect('/cliente/canchas');
    }
}

// API endpoint: devuelve los bloques reservados de una cancha para una fecha
async function getReservasDia(req, res) {
    const { canchaId } = req.params;
    const { fecha } = req.query;
    try {
        if (!fecha) return res.json({ reservas: [] });
        const result = await getReservasDiaService(parseInt(canchaId), fecha);
        return res.json({ reservas: result.reservas });
    } catch (error) {
        return res.status(500).json({ error: 'Error al consultar reservas' });
    }
}

async function postCrearReserva(req, res) {
    const { cancha_id, fecha, hora_inicio, hora_fin } = req.body;
    const usuario_id = res.locals.userId;
    try {
        const result = await crearReservaService(
            usuario_id,
            parseInt(cancha_id),
            fecha,
            hora_inicio,
            hora_fin
        );
        if (!result.success) {
            return res.redirect(`/cliente/canchas/${cancha_id}/reservar?error=${encodeURIComponent(result.error)}`);
        }
        return res.redirect(`/cliente/reservas?success=${encodeURIComponent('¡Reserva confirmada! ' + fecha + ' de ' + hora_inicio + ' a ' + hora_fin)}`);
    } catch (error) {
        return res.redirect(`/cliente/canchas/${cancha_id}/reservar?error=${encodeURIComponent('Error al crear la reserva')}`);
    }
}

async function getMisReservas(req, res) {
    const usuario_id = res.locals.userId;
    try {
        const result = await getMisReservasService(usuario_id);
        return res.render('cliente/historialReservas', {
            reservas: result.reservas,
            success: req.query.success || null,
            error: req.query.error || null
        });
    } catch (error) {
        return res.render('cliente/historialReservas', {
            reservas: [],
            success: null,
            error: 'Error al cargar tus reservas'
        });
    }
}

async function postCancelarReserva(req, res) {
    const { reservaId } = req.params;
    const usuario_id = res.locals.userId;
    try {
        const result = await cancelarReservaService(parseInt(reservaId), usuario_id);
        if (!result.success) {
            return res.redirect(`/cliente/reservas?error=${encodeURIComponent(result.error)}`);
        }
        return res.redirect('/cliente/reservas?success=Reserva cancelada correctamente');
    } catch (error) {
        return res.redirect('/cliente/reservas?error=Error al cancelar la reserva');
    }
}

async function postCrearResena(req, res) {
    const { cancha_id, calificacion, comentario } = req.body;
    const usuario_id = res.locals.userId;
    try {
        const result = await crearResenaService(usuario_id, parseInt(cancha_id), parseInt(calificacion), comentario);
        if (!result.success) {
            return res.redirect(`/cliente/canchas/${cancha_id}/reservar?error=${encodeURIComponent(result.error)}`);
        }
        return res.redirect(`/cliente/canchas/${cancha_id}/reservar?success=Reseña enviada correctamente`);
    } catch (error) {
        return res.redirect(`/cliente/canchas/${cancha_id}/reservar?error=Error al enviar la reseña`);
    }
}

export {
    serveHomeCliente,
    getCanchasCliente,
    getReservasCanchaCliente,
    getReservasDia,
    postCrearReserva,
    getMisReservas,
    postCancelarReserva,
    postCrearResena
}
