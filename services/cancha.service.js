import { getAllCanchas, getCanchaById } from '../repositories/cancha.repository.js';

async function getAllCanchasService() {
    try {
        const result = await getAllCanchas();
        if (result.length === 0) {
            return { success: false, error: 'No hay canchas registradas todavia' };
        }
        return { success: true, canchas: result };
    } catch (error) {
        throw error;
    }
}

async function getCanchaByIdService(id) {
    try {
        const result = await getCanchaById(id);
        if (!result) {
            return { success: false, error: 'Cancha no encontrada' };
        }
        return { success: true, cancha: result };
    } catch (error) {
        throw error;
    }
}

export {
    getAllCanchasService,
    getCanchaByIdService
}
