// services/horario.service.js
import { createHorario, getHorariosByCanchaId, deleteHorario } from '../repositories/horario.repository.js';
import { getCanchaById } from '../repositories/cancha.repository.js';

// Genera un array con todas las fechas entre dos fechas
function generarFechas(desde, hasta) {
    const fechas = [];
    const fechaActual = new Date(desde);
    const fechaFin = new Date(hasta);

    while (fechaActual <= fechaFin) {
        fechas.push(fechaActual.toISOString().split('T')[0]); // YYYY-MM-DD
        fechaActual.setDate(fechaActual.getDate() + 1);
    }
    return fechas;
}

async function crearHorariosRangoService(canchaId, desde, hasta, hora_inicio, hora_fin) {
    try {
        // Verificar que la cancha existe
        const cancha = await getCanchaById(canchaId);
        if (!cancha) {
            return { success: false, error: 'La cancha no existe' };
        }

        // Validar que desde no sea mayor que hasta
        if (new Date(desde) > new Date(hasta)) {
            return { success: false, error: 'La fecha de inicio no puede ser mayor a la fecha fin' };
        }

        // Validar que hora_inicio no sea mayor que hora_fin
        if (hora_inicio >= hora_fin) {
            return { success: false, error: 'La hora de inicio no puede ser mayor o igual a la hora fin' };
        }

        const fechas = generarFechas(desde, hasta);

        // Crear un horario por cada fecha del rango
        const horariosCreados = await Promise.all(
            fechas.map(fecha =>
                createHorario({
                    cancha_id: canchaId,
                    fecha,
                    hora_inicio,
                    hora_fin,
                    disponible: true
                })
            )
        );

        return {
            success: true,
            cantidad: horariosCreados.length,
            message: `Se crearon ${horariosCreados.length} horarios correctamente`
        };
    } catch (error) {
        throw error;
    }
}

async function getHorariosByCanchaService(canchaId) {
    try {
        const result = await getHorariosByCanchaId(canchaId);
        if (result.length === 0) {
            return { success: false, error: 'Esta cancha no tiene horarios asignados' };
        }
        return { success: true, horarios: result };
    } catch (error) {
        throw error;
    }
}

async function deleteHorarioService(id) {
    try {
        const result = await deleteHorario(id);
        if (!result) {
            return { success: false, error: 'Horario no encontrado' };
        }
        return { success: true, message: 'Horario eliminado correctamente' };
    } catch (error) {
        throw error;
    }
}

export { crearHorariosRangoService, getHorariosByCanchaService, deleteHorarioService };