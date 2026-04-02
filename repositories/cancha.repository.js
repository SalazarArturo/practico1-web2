import { Canchas, TipoCancha } from '../models/index.js';

async function getAllCanchas() {
    try {
        const canchas = await Canchas.findAll({
            include: [{ model: TipoCancha, as: 'tipoCancha' }]
        });
        return canchas;
    } catch (error) {
        throw new Error(`Error al traer las canchas: ${error.message}`);
    }
}

async function createCancha(canchaData) {
    try {
        const result = await Canchas.create(canchaData);
        return result;
    } catch (error) {
        throw new Error(`Error al crear cancha: ${error}`);
    }
}

async function getCanchaById(id) {
    try {
        const result = await Canchas.findOne({
            where: { id },
            include: [{ model: TipoCancha, as: 'tipoCancha' }]
        });
        return result;
    } catch (error) {
        throw new Error(`Error al traer cancha especifica: ${error.message}`);
    }
}

async function updateCancha(id, newData) {
    try {
        const result = await Canchas.update(newData, { where: { id } });
        return result;
    } catch (error) {
        throw new Error(`Error al actualizar cancha: ${error.message}`);
    }
}

async function deleteCancha(id) {
    try {
        const result = await Canchas.destroy({ where: { id } });
        return result;
    } catch (error) {
        throw new Error(`Error al eliminar cancha: ${error.message}`);
    }
}

export {
    getAllCanchas,
    createCancha,
    getCanchaById,
    updateCancha,
    deleteCancha
}
