import {
    upsertHorarioCancha,
    getHorarioByCancha,
    deleteHorarioByCancha
} from '../repositories/horario.repository.js';
import { getCanchaById } from '../repositories/cancha.repository.js';

const DIAS_VALIDOS = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];

async function guardarDisponibilidadService(canchaId, dias_semana, hora_apertura, hora_cierre) {
    try {
        const cancha = await getCanchaById(canchaId);
        if (!cancha) return { success: false, error: 'La cancha no existe' };

        if (!Array.isArray(dias_semana) || dias_semana.length === 0) {
            return { success: false, error: 'Debe seleccionar al menos un día' };
        }
        for (const d of dias_semana) {
            if (!DIAS_VALIDOS.includes(d)) {
                return { success: false, error: `Día inválido: ${d}` };
            }
        }
        if (hora_apertura >= hora_cierre) {
            return { success: false, error: 'La hora de apertura debe ser menor a la hora de cierre' };
        }

        const horario = await upsertHorarioCancha(canchaId, { dias_semana, hora_apertura, hora_cierre });
        return { success: true, horario, message: 'Disponibilidad guardada correctamente' };
    } catch (error) {
        throw error;
    }
}

async function getDisponibilidadService(canchaId) {
    try {
        const horario = await getHorarioByCancha(canchaId);
        return { success: true, horario };
    } catch (error) {
        throw error;
    }
}

async function eliminarDisponibilidadService(canchaId) {
    try {
        const result = await deleteHorarioByCancha(canchaId);
        if (!result) return { success: false, error: 'No hay disponibilidad configurada' };
        return { success: true, message: 'Disponibilidad eliminada' };
    } catch (error) {
        throw error;
    }
}

export {
    guardarDisponibilidadService,
    getDisponibilidadService,
    eliminarDisponibilidadService
}
