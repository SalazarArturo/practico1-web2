import { getAllCanchas, createCancha, getCanchaById, updateCancha, deleteCancha } from '../repositories/cancha.repository.js';
import { getAllTipos, createModel, getModelById, updateModel, deleteModel } from '../repositories/tipos.repository.js';

async function getAllCanchasService() {
    try {
        const result = await getAllCanchas();
        if (result.length == 0) {
            return { success: false, error: 'No hay canchas registradas todavia' }
        }
        return { success: true, canchas: result }
    } catch (error) {
        throw error;
    }
}

async function getTiposService() {
    try {
        const result = await getAllTipos();
        if (result.length == 0) {
            return { success: false, error: 'No tiene modelos de cancha registrado todavia' }
        }
        return { success: true, modelos: result }
    } catch (error) {
        throw error;
    }
}

async function proccesNewModelDataService(data) {
    try {
        const result = await createModel(data);
        if (!result) {
            return { success: false, error: 'No se pudo crear el modelo, intente nuevamente.' }
        }
        return { success: true, modelo: result }
    } catch (error) {
        throw error;
    }
}

async function editModelService(modeloId) {
    try {
        const result = await getModelById(modeloId);
        if (!result) {
            return { success: false, error: 'No se encontro el modelo' }
        }
        return { success: true, model: result }
    } catch (error) {
        throw error;
    }
}

async function postModelChangesService(modelId, newData) {
    try {
        const result = await updateModel(modelId, newData);
        if (!result) {
            return { success: false, error: 'Error al actualizar el modelo' }
        }
        return { success: true, value: result }
    } catch (error) {
        throw error;
    }
}

async function deleteModelService(modelId) {
    try {
        const result = await deleteModel(modelId);
        if (!result) {
            return { success: false, error: 'Error al eliminar modelo, intente nuevamente.' }
        }
        return { success: true, message: 'Modelo eliminado correctamente' }
    } catch (error) {
        throw error;
    }
}

async function postNewCanchaService(canchaData) {
    try {
        const result = await createCancha(canchaData);
        if (!result) {
            return { success: false, error: 'Error al crear nueva cancha, intente nuevamente' }
        }
        return { success: true, cancha: result }
    } catch (error) {
        throw error;
    }
}

async function editCanchaService(canchaId) {
    try {
        const result = await getCanchaById(canchaId);
        if (!result) {
            return { success: false, error: 'No se pudo obtener la cancha' }
        }
        return { success: true, cancha: result }
    } catch (error) {
        throw error;
    }
}

async function postCanchaDataChangesService(canchaId, newData) {
    try {
        const result = await updateCancha(canchaId, newData);
        if (!result) {
            return { success: false, error: 'No se pudo actualizar la cancha' }
        }
        return { success: true, message: 'cancha actualizada correctamente' }
    } catch (error) {
        throw error;
    }
}

async function deleteCanchaService(canchaId) {
    try {
        const result = await deleteCancha(canchaId);
        if (!result) {
            return { success: false, error: 'No se pudo eliminar la cancha' }
        }
        return { success: true, message: 'Cancha eliminada correctamente' }
    } catch (error) {
        throw error;
    }
}

export {
    getAllCanchasService,
    getTiposService,
    proccesNewModelDataService,
    editModelService,
    postModelChangesService,
    deleteModelService,
    postNewCanchaService,
    editCanchaService,
    postCanchaDataChangesService,
    deleteCanchaService
}
