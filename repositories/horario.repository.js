import { Horarios, Canchas } from '../models/index.js';

// Crear o actualizar la disponibilidad de una cancha
async function upsertHorarioCancha(cancha_id, data) {
    try {
        const existente = await Horarios.findOne({ where: { cancha_id } });
        if (existente) {
            await existente.update(data);
            return existente;
        }
        return await Horarios.create({ cancha_id, ...data });
    } catch (error) {
        throw new Error(`Error al guardar disponibilidad: ${error.message}`);
    }
}

async function getHorarioByCancha(cancha_id) {
    try {
        return await Horarios.findOne({ where: { cancha_id } });
    } catch (error) {
        throw new Error(`Error al traer disponibilidad: ${error.message}`);
    }
}

async function deleteHorarioByCancha(cancha_id) {
    try {
        const h = await Horarios.findOne({ where: { cancha_id } });
        if (!h) return null;
        await h.destroy();
        return true;
    } catch (error) {
        throw new Error(`Error al eliminar disponibilidad: ${error.message}`);
    }
}

export {
    upsertHorarioCancha,
    getHorarioByCancha,
    deleteHorarioByCancha
}
