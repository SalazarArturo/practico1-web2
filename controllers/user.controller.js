import {
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
} from '../services/user.service.js';

import { guardarDisponibilidadService, getDisponibilidadService, eliminarDisponibilidadService } from '../services/horario.service.js';
import { getCanchaByIdService } from '../services/cancha.service.js';
import { getAllReservasService, cambiarEstadoReservaService } from '../services/reserva.service.js';
import { getAllResenasService } from '../services/resena.service.js';

function serveHome(req, res) {
    let logError = req.query.error;
    if (logError == 'logout') {
        logError = 'No se pudo cerrar la sesion, intente nuevamente';
    }
    if (logError == 'unauthorized') {
        logError = 'Acceso denegado';
    }
    return res.render('logedUserViews/home', { logError });
}

// ─── CANCHAS ────────────────────────────────────────────────────────────────

async function getCanchas(req, res) {
    try {
        const result = await getAllCanchasService();
        if (!result.success) {
            return res.render('logedUserViews/adminViews/canchas-dashboard', {
                canchas: [],
                error: result.error
            });
        }
        return res.render('logedUserViews/adminViews/canchas-dashboard', {
            canchas: result.canchas,
            error: null
        });
    } catch (error) {
        return res.render('logedUserViews/adminViews/canchas-dashboard', {
            canchas: [],
            error: 'Error al cargar las canchas'
        });
    }
}

async function serveNewCanchaForm(req, res) {
    try {
        const result = await getTiposService();
        if (!result.success) {
            return res.render('logedUserViews/adminViews/canchas-form', {
                tipos: [],
                error: 'No tiene modelos de canchas creados, debe tener alguno para crear canchas'
            });
        }
        return res.render('logedUserViews/adminViews/canchas-form', { tipos: result.modelos, error: null });
    } catch (error) {
        console.error(`Error capturado en el controller: ${error}`);
    }
}

async function postNewCancha(req, res) {
    const { nombre, precio_por_hora, estado, tipo_cancha_id } = req.body;

    if (!nombre || nombre.trim() == '') {
        const tiposResult = await getTiposService();
        return res.render('logedUserViews/adminViews/canchas-form', {
            tipos: tiposResult.modelos || [],
            error: 'El nombre no puede estar vacío'
        });
    }
    try {
        const result = await postNewCanchaService({ nombre, precio_por_hora, estado, tipo_cancha_id });
        if (!result.success) {
            const tiposResult = await getTiposService();
            return res.render('logedUserViews/adminViews/canchas-form', {
                tipos: tiposResult.modelos || [],
                error: result.error
            });
        }
        return res.redirect('/user/admin/canchas');
    } catch (error) {
        console.error(`Error capturado en el controller: ${error}`);
    }
}

async function editCancha(req, res) {
    const canchaId = req.params.canchaId;
    try {
        const result = await editCanchaService(parseInt(canchaId));
        const tiposResult = await getTiposService();

        if (!result.success) {
            return res.redirect('/user/admin/canchas');
        }

        return res.render('logedUserViews/adminViews/canchas-form', {
            cancha: result.cancha,
            tipos: tiposResult.modelos || [],
            error: null,
            isEdit: true
        });
    } catch (error) {
        console.error(`Error capturado en el controller: ${error}`);
    }
}

async function postCanchaEditChanges(req, res) {
    const canchaId = req.params.canchaId;
    const { nombre, precio_por_hora, estado, tipo_cancha_id } = req.body;
    try {
        const result = await postCanchaDataChangesService(parseInt(canchaId), {
            nombre, precio_por_hora, estado, tipo_cancha_id
        });
        if (!result.success) {
            const tiposResult = await getTiposService();
            return res.render('logedUserViews/adminViews/canchas-form', {
                tipos: tiposResult.modelos || [],
                error: result.error,
                isEdit: true
            });
        }
        return res.redirect('/user/admin/canchas');
    } catch (error) {
        console.error(`Error capturado en el controller: ${error}`);
    }
}

async function deleteCancha(req, res) {
    const canchaId = req.params.canchaId;
    try {
        await deleteCanchaService(parseInt(canchaId));
        return res.redirect('/user/admin/canchas');
    } catch (error) {
        console.error(`Error capturado en el controller: ${error}`);
        return res.redirect('/user/admin/canchas');
    }
}

// ─── TIPOS / MODELOS ─────────────────────────────────────────────────────────

async function proccessCanchaTypes(req, res) {
    try {
        const result = await getTiposService();
        if (!result.success) {
            return res.render('logedUserViews/adminViews/modelos-dashboard', {
                modelos: [],
                error: result.error
            });
        }
        return res.render('logedUserViews/adminViews/modelos-dashboard', {
            modelos: result.modelos,
            error: null
        });
    } catch (error) {
        return res.render('logedUserViews/adminViews/modelos-dashboard', {
            modelos: [],
            error: 'Error al cargar los modelos'
        });
    }
}

function serveModeloForm(req, res) {
    const error = req.query.error;
    return res.render('logedUserViews/adminViews/modelos-form', { editError: error });
}

async function postModelo(req, res) {
    const { nombre } = req.body;
    if (!nombre || nombre.trim() == '') {
        return res.render('logedUserViews/adminViews/modelos-form', { error: 'No puede dejar este campo vacio' });
    }
    try {
        const result = await proccesNewModelDataService({ nombre });
        if (!result.success) {
            return res.render('logedUserViews/adminViews/modelos-form', { error: result.error });
        }
        return res.redirect('/user/admin/modelos');
    } catch (error) {
        console.error(`Error capturado en el controlador: ${error}`);
    }
}

async function editModel(req, res) {
    const modeloId = req.params.modeloId;
    try {
        const result = await editModelService(parseInt(modeloId));
        if (!result.success) {
            return res.redirect('/user/admin/modelos');
        }
        return res.render('logedUserViews/adminViews/modelos-form', {
            modelo: result.model,
            error: null,
            isEdit: true
        });
    } catch (error) {
        console.error(`Error capturado en el controlador: ${error}`);
    }
}

async function postModelChanges(req, res) {
    const modeloId = req.params.modeloId;
    const { nombre } = req.body;

    if (!nombre || nombre.trim() == '') {
        return res.render('logedUserViews/adminViews/modelos-form', {
            error: 'No puede dejar este campo vacio',
            modelo: { id: modeloId, nombre },
            isEdit: true
        });
    }
    try {
        const result = await postModelChangesService(parseInt(modeloId), { nombre });
        if (!result.success) {
            return res.render('logedUserViews/adminViews/modelos-form', {
                error: result.error,
                modelo: { id: modeloId, nombre },
                isEdit: true
            });
        }
        return res.redirect('/user/admin/modelos');
    } catch (error) {
        console.error(`Error capturado en el controlador: ${error}`);
    }
}

async function deleteModel(req, res) {
    const modelId = req.params.modeloId;
    try {
        const result = await deleteModelService(parseInt(modelId));
        if (!result.success) {
            return res.redirect('/user/admin/modelos?error=' + result.error);
        }
        return res.redirect('/user/admin/modelos');
    } catch (error) {
        console.error(`Error capturado en el controller: ${error}`);
    }
}

// ─── HORARIOS ────────────────────────────────────────────────────────────────

async function getHorariosCancha(req, res) {
    try {
        const { canchaId } = req.params;
        const [resultDisponibilidad, resultCancha] = await Promise.all([
            getDisponibilidadService(canchaId),
            getCanchaByIdService(canchaId)
        ]);

        return res.render('logedUserViews/adminViews/horarios-dashboard', {
            horario: resultDisponibilidad.horario || null,
            cancha: resultCancha.success ? resultCancha.cancha : null,
            success: req.query.success || null,
            error: req.query.error || null
        });
    } catch (error) {
        return res.render('logedUserViews/adminViews/horarios-dashboard', {
            horario: null,
            cancha: null,
            error: 'Error al cargar la disponibilidad',
            success: null
        });
    }
}

async function createHorariosRango(req, res) {
    try {
        const { canchaId } = req.params;
        let { dias_semana, hora_apertura, hora_cierre } = req.body;

        // dias_semana puede llegar como string (1 día) o array (varios)
        if (!dias_semana) dias_semana = [];
        if (!Array.isArray(dias_semana)) dias_semana = [dias_semana];

        const result = await guardarDisponibilidadService(canchaId, dias_semana, hora_apertura, hora_cierre);

        if (!result.success) {
            return res.redirect(`/user/admin/canchas/${canchaId}/horarios?error=${encodeURIComponent(result.error)}`);
        }
        return res.redirect(`/user/admin/canchas/${canchaId}/horarios?success=${encodeURIComponent(result.message)}`);
    } catch (error) {
        const { canchaId } = req.params;
        return res.redirect(`/user/admin/canchas/${canchaId}/horarios?error=${encodeURIComponent('Error al guardar disponibilidad')}`);
    }
}

async function deleteHorario(req, res) {
    const { canchaId } = req.body || {};
    return res.redirect(`/user/admin/canchas/${canchaId || ''}/horarios`);
}

// ─── RESERVAS (admin) ────────────────────────────────────────────────────────

async function getAllReservas(req, res) {
    try {
        const result = await getAllReservasService();
        return res.render('logedUserViews/adminViews/reservas-dashboard', {
            reservas: result.reservas,
            error: null
        });
    } catch (error) {
        return res.render('logedUserViews/adminViews/reservas-dashboard', {
            reservas: [],
            error: 'Error al cargar las reservas'
        });
    }
}

async function postCambiarEstadoReserva(req, res) {
    const { reservaId } = req.params;
    const { estado } = req.body;
    try {
        await cambiarEstadoReservaService(parseInt(reservaId), estado);
        return res.redirect('/user/admin/reservas');
    } catch (error) {
        return res.redirect('/user/admin/reservas?error=Error al actualizar');
    }
}

// ─── RESEÑAS (admin) ─────────────────────────────────────────────────────────

async function getAllResenas(req, res) {
    try {
        const result = await getAllResenasService();
        return res.render('logedUserViews/adminViews/resenas-dashboard', {
            resenas: result.resenas,
            error: null
        });
    } catch (error) {
        return res.render('logedUserViews/adminViews/resenas-dashboard', {
            resenas: [],
            error: 'Error al cargar las reseñas'
        });
    }
}

export {
    serveHome,
    getCanchas,
    serveNewCanchaForm,
    postNewCancha,
    editCancha,
    postCanchaEditChanges,
    deleteCancha,
    proccessCanchaTypes,
    serveModeloForm,
    postModelo,
    editModel,
    postModelChanges,
    deleteModel,
    getHorariosCancha,
    createHorariosRango,
    deleteHorario,
    getAllReservas,
    postCambiarEstadoReserva,
    getAllResenas
}
