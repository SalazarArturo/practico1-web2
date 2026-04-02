import {
    createReserva,
    getReservasActivasByCancha,
    getReservasByUsuarioId,
    getAllReservas,
    getReservaById,
    updateEstadoReserva
} from '../repositories/reservas.repository.js';
import { getHorarioByCancha } from '../repositories/horario.repository.js';
import { getCanchaById } from '../repositories/cancha.repository.js';

const DIAS_MAP = {
    0: 'domingo',
    1: 'lunes',
    2: 'martes',
    3: 'miercoles',
    4: 'jueves',
    5: 'viernes',
    6: 'sabado'
};

// Convierte "08:00" o "08:00:00" a minutos desde medianoche
function horaAMinutos(hora) {
    const partes = hora.split(':');
    return parseInt(partes[0]) * 60 + parseInt(partes[1]);
}

async function crearReservaService(usuario_id, cancha_id, fecha, hora_inicio, hora_fin) {
    try {
        // 1. Verificar que la cancha existe
        const cancha = await getCanchaById(cancha_id);
        if (!cancha) return { success: false, error: 'La cancha no existe' };
        if (cancha.estado !== 'activa') return { success: false, error: 'La cancha no está activa' };

        // 2. Verificar que la fecha no es pasada
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        const fechaReserva = new Date(fecha + 'T00:00:00');
        if (fechaReserva < hoy) {
            return { success: false, error: 'No podés reservar en una fecha pasada' };
        }

        // 3. Verificar que el día de la semana está habilitado
        const diaSemana = DIAS_MAP[fechaReserva.getDay()];
        const disponibilidad = await getHorarioByCancha(cancha_id);
        if (!disponibilidad) {
            return { success: false, error: 'Esta cancha no tiene disponibilidad configurada' };
        }
        if (!disponibilidad.dias_semana.includes(diaSemana)) {
            return { success: false, error: `Esta cancha no está disponible los ${diaSemana}s` };
        }

        // 4. Verificar que el horario solicitado está dentro del rango habilitado
        const minInicio = horaAMinutos(hora_inicio);
        const minFin = horaAMinutos(hora_fin);
        const minApertura = horaAMinutos(disponibilidad.hora_apertura);
        const minCierre = horaAMinutos(disponibilidad.hora_cierre);

        if (minInicio < minApertura || minFin > minCierre) {
            return {
                success: false,
                error: `La cancha solo está disponible de ${disponibilidad.hora_apertura.slice(0,5)} a ${disponibilidad.hora_cierre.slice(0,5)}`
            };
        }

        // 5. Verificar mínimo 1 hora
        if (minFin - minInicio < 60) {
            return { success: false, error: 'La reserva debe ser de mínimo 1 hora' };
        }

        // 6. Verificar que no haya solapamiento con otras reservas
        const reservasExistentes = await getReservasActivasByCancha(cancha_id, fecha);
        for (const r of reservasExistentes) {
            const rInicio = horaAMinutos(r.hora_inicio);
            const rFin = horaAMinutos(r.hora_fin);
            // Hay solapamiento si: nuevo_inicio < existente_fin && nuevo_fin > existente_inicio
            if (minInicio < rFin && minFin > rInicio) {
                return {
                    success: false,
                    error: `La cancha ya está reservada de ${r.hora_inicio.slice(0,5)} a ${r.hora_fin.slice(0,5)} ese día`
                };
            }
        }

        // 7. Crear la reserva
        const reserva = await createReserva({
            usuario_id,
            cancha_id,
            fecha,
            hora_inicio,
            hora_fin,
            estado: 'confirmada'
        });

        return { success: true, reserva };
    } catch (error) {
        throw error;
    }
}

// Devuelve los bloques ya reservados para una cancha en una fecha dada
async function getReservasDiaService(cancha_id, fecha) {
    try {
        const reservas = await getReservasActivasByCancha(cancha_id, fecha);
        return { success: true, reservas };
    } catch (error) {
        throw error;
    }
}

async function getMisReservasService(usuario_id) {
    try {
        const result = await getReservasByUsuarioId(usuario_id);
        return { success: true, reservas: result };
    } catch (error) {
        throw error;
    }
}

async function cancelarReservaService(reserva_id, usuario_id) {
    try {
        const reserva = await getReservaById(reserva_id);
        if (!reserva) return { success: false, error: 'Reserva no encontrada' };
        if (reserva.usuario_id !== usuario_id) {
            return { success: false, error: 'No tenés permiso para cancelar esta reserva' };
        }
        if (reserva.estado === 'cancelada') {
            return { success: false, error: 'La reserva ya está cancelada' };
        }
        await updateEstadoReserva(reserva_id, 'cancelada');
        return { success: true, message: 'Reserva cancelada correctamente' };
    } catch (error) {
        throw error;
    }
}

async function getAllReservasService() {
    try {
        const result = await getAllReservas();
        return { success: true, reservas: result };
    } catch (error) {
        throw error;
    }
}

async function cambiarEstadoReservaService(reserva_id, estado) {
    try {
        const reserva = await getReservaById(reserva_id);
        if (!reserva) return { success: false, error: 'Reserva no encontrada' };
        await updateEstadoReserva(reserva_id, estado);
        return { success: true, message: 'Estado actualizado correctamente' };
    } catch (error) {
        throw error;
    }
}

export {
    crearReservaService,
    getReservasDiaService,
    getMisReservasService,
    cancelarReservaService,
    getAllReservasService,
    cambiarEstadoReservaService
}
