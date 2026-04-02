import {
    createResena,
    getResenasByCanchaId,
    getAllResenas,
    findResenaByUsuarioAndCancha
} from '../repositories/resenas.repository.js';
import { getReservasByUsuarioId } from '../repositories/reservas.repository.js';

async function crearResenaService(usuario_id, cancha_id, calificacion, comentario) {
    try {
        // Verificar que el usuario tuvo una reserva confirmada en esa cancha y que ya pasó
        const reservas = await getReservasByUsuarioId(usuario_id);
        const hoy = new Date();
        const tuvoReservaCompletada = reservas.some(r => {
            const esDeEstaCancha = r.horario?.cancha?.id === parseInt(cancha_id);
            const yaFue = new Date(r.horario?.fecha) < hoy;
            const confirmada = r.estado === 'confirmada';
            return esDeEstaCancha && yaFue && confirmada;
        });

        if (!tuvoReservaCompletada) {
            return { success: false, error: 'Solo podés reseñar canchas donde hayas tenido una reserva completada' };
        }

        const yaReseno = await findResenaByUsuarioAndCancha(usuario_id, cancha_id);
        if (yaReseno) {
            return { success: false, error: 'Ya dejaste una reseña para esta cancha' };
        }

        const resena = await createResena({ usuario_id, cancha_id, calificacion, comentario });
        return { success: true, resena };
    } catch (error) {
        throw error;
    }
}

async function getResenasByCanchaService(cancha_id) {
    try {
        const result = await getResenasByCanchaId(cancha_id);
        return { success: true, resenas: result };
    } catch (error) {
        throw error;
    }
}

async function getAllResenasService() {
    try {
        const result = await getAllResenas();
        return { success: true, resenas: result };
    } catch (error) {
        throw error;
    }
}

export {
    crearResenaService,
    getResenasByCanchaService,
    getAllResenasService
}
