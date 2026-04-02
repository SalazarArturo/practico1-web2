import { Horarios, Canchas } from '../models/index.js';
import { Op } from 'sequelize';

async function createHorario(data) {
    try {
        return await Horarios.create(data);
    } catch (error) {
        throw new Error(`Error al crear horario: ${error.message}`);
    }
}

async function getHorariosByCanchaId(canchaId) {
    try {
        return await Horarios.findAll({
            where: { cancha_id: canchaId }
        });
    } catch (error) {
        throw new Error(`Error al traer horarios: ${error.message}`);
    }
}

async function deleteHorario(id) {
    try {
        const horario = await Horarios.findByPk(id);
        if (!horario) return null;
        await horario.destroy();
        return true;
    } catch (error) {
        throw new Error(`Error al eliminar horario: ${error.message}`);
    }
}

export { createHorario, getHorariosByCanchaId, deleteHorario };