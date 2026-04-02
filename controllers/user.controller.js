import {
    getAllCanchasService,
    getTiposService,
    proccesNewModelDataService,
    editModelService,
    postModelChangesService,
    deleteModelService,
    postNewCanchaService,
    editCanchaService,
    postCanchaDataChangesService
} from "../services/user.service.js";

// controllers/admin.controller.js
import { crearHorariosRangoService, getHorariosByCanchaService, deleteHorarioService } from '../services/horario.service.js';
import { getAllCanchasService, getCanchaByIdService } from '../services/cancha.service.js';




function serveHome(req, res){

    let logError = req.query.error;

    if(logError == 'logout'){
        logError = 'No se pudo cerrar la sesion, intente nuevamente';
    }
    if(logError == 'unauthorized'){
        logError = 'Acceso denegado'
    }
    return res.render('logedUserViews/home', {logError});
}


async function getCanchas(req, res){
    try {
        const result = await getAllCanchasService();
        if(!result.success){
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

async function serveNewCanchaForm(req, res){
    try {
        const result = await getTiposService();
        if(!result.success){
            return res.render('logedUserViews/adminViews/canchas-form', {error: 'No tiene modelos de canchas creados, debe tener alguno para crear canchas'});
        } 
        return res.render('logedUserViews/adminViews/canchas-form',{tipos: result.modelos});     
    } catch (error) {
        console.error(`Error capturado en el controller: ${error}`);
    }
   
}

async function postNewCancha(req, res){
    const {nombre, precio_por_hora, estado} = req.body;

    if(nombre.trim() == ''){
        return res.render('logedUserViews/adminViews/canchas-form', {error: 'No puede dejar este campo vacio'});
    }
     if(precio_por_hora.trim() == ''){
        return res.render('logedUserViews/adminViews/canchas-form', {error: 'No puede dejar este campo vacio'});
    }
     if(estado.trim() == ''){
        return res.render('logedUserViews/adminViews/canchas-form', {error: 'No puede dejar este campo vacio'});
    }
    try {
        const result = await postNewCanchaService({nombre, precio_por_hora, estado});
        if(!result.success){
            return res.render('logedUserViews/adminViews/canchas-form', {error: result.error});
        }
        res.redirect('/user/admin/canchas');
    } catch (error) {
        console.error(`Error capturado en el controller: ${error}`);
    }
}

async function editCancha(req, res){
    const canchaId = req.params.canchaId;
    try {
        const result = await editCanchaService(parseInt(canchaId));
        const tiposResult = await getTiposService();

        if(!result.success){
            return res.render('logedUserViews/adminViews/canchas-dashboard', {error: result.error});
        }

        return res.render('logedUserViews/adminViews/canchas-form',{
            cancha: result.cancha,
            tipos: tiposResult.modelos || [],
            error: null,
            isEdit: true
        });
    } catch (error) {
        console.error(`Error capturado en el controller: ${error}`);
    }
}

async function postCanchaEditChanges(req, res){
    const canchaId = req.params.canchaId;
    const {nombre, precio_por_hora, estado} = req.body;
    try {
        const result = await postCanchaDataChangesService(parseInt(canchaId), {nombre, precio_por_hora, estado});
        if(!result.success){
            return res.render('logedUserViews/adminViews/canchas-form', {})
        }
    } catch (error) {
        
    }

}
async function proccessCanchaTypes(req, res){
    try {
        const result = await getTiposService();
        if(!result.success){
            return res.render('logedUserViews/adminViews/modelos-dashboard',{
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

function serveModeloForm(req, res){
    const error = req.query.error;
    return res.render('logedUserViews/adminViews/modelos-form', {editError: error});
}

async function postModelo(req, res){

    const {nombre} = req.body;

    if(nombre.trim() == ''){
        return res.render('logedUserViews/adminViews/modelos-form', {error: 'No puede dejar este campo vacio'});
    }
    try {
        const result = await proccesNewModelDataService({nombre});
        if(!result.success){
            return res.render('logedUserViews/adminViews/modelos-form', {error: result.error});
        }
        res.redirect('/user/admin/modelos');
    } catch (error) {
        console.error(`Error capturado en el controlador: ${error}`);
    }

}

async function editModel(req, res){

    const modeloId = req.params.modeloId;
    try {
        const result = await editModelService(parseInt(modeloId));
        if(!result.success){
            return res.render('/user/admin/modelos', {error: result.error});
        }

        return res.render('logedUserViews/adminViews/modelos-form',{
            modelo: result.model,
            error: null,
            isEdit: true
        });

    } catch (error) {
        console.error(`Error capturado en el controlador: ${error}`);
    }
}

async function postModelChanges(req, res){

    const modeloId = req.params.modeloId;
    const {nombre} = req.body;

    if(nombre.trim() == ''){
        return res.render('logedUserViews/adminViews/modelos-form',{
            error: 'No puede dejar este campo vacio',
            modelo: {id: modeloId, nombre},
            isEdit: true
        });
    }
    try {
        const result = await postModelChangesService(parseInt(modeloId), {nombre})
        if(!result.success){
            return res.render('logedUserViews/adminViews/modelos-form', {
                error: result.error,
                modelo: {id: modeloId, nombre},
                isEdit: true
            });
        }
        console.log(result.value);
        return res.redirect('/user/admin/modelos');
    } catch (error) {
        console.error(`Error capturado en el controlador: ${error}`);
    }
}

async function deleteModel(req, res){
    const modelId = req.params.modeloId;
    try {
        const result = await deleteModelService(parseInt(modelId));
        if(!result.success){
            return res.render('logedUserViews/adminViews/modelos-dashboard', {error: result.error});
        }
        return res.redirect('/user/admin/modelos');
    } catch (error) {
        console.error(`Error capturado en el controller: ${error}`);
    }
}



// GET /admin/canchas/:id/horarios
async function getHorariosCancha(req, res) {
    try {
        const { id } = req.params;
        const [resultHorarios, resultCancha] = await Promise.all([
            getHorariosByCanchaService(id),
            getCanchaByIdService(id)
        ]);

        return res.render('admin/horarios', {
            horarios: resultHorarios.success ? resultHorarios.horarios : [],
            cancha: resultCancha.success ? resultCancha.cancha : null,
            error: resultHorarios.success ? null : resultHorarios.error
        });
    } catch (error) {
        return res.render('admin/horarios', {
            horarios: [],
            cancha: null,
            error: 'Error al cargar los horarios'
        });
    }
}

// POST /admin/canchas/:id/horarios
async function createHorariosRango(req, res) {
    try {
        const { id } = req.params;
        const { desde, hasta, hora_inicio, hora_fin } = req.body;

        const result = await crearHorariosRangoService(id, desde, hasta, hora_inicio, hora_fin);

        if (!result.success) {
            return res.redirect(`/admin/canchas/${id}/horarios?error=${result.error}`);
        }

        return res.redirect(`/admin/canchas/${id}/horarios?success=${result.message}`);
    } catch (error) {
        return res.redirect(`/admin/canchas/${id}/horarios?error=Error al crear los horarios`);
    }
}

// POST /admin/horarios/:id/delete
async function deleteHorario(req, res) {
    const { id } = req.params;
    const { canchaId } = req.body; // para redirigir de vuelta a la cancha
    try {
        await deleteHorarioService(id);
        return res.redirect(`/admin/canchas/${canchaId}/horarios`);
    } catch (error) {
        return res.redirect(`/admin/canchas/${canchaId}/horarios?error=Error al eliminar`);
    }
}





export{
    serveHome,
    getCanchas,
    serveNewCanchaForm,
    postNewCancha,
    proccessCanchaTypes,
    serveModeloForm,
    postModelo,
    editModel,
    postModelChanges,
    deleteModel,
    editCancha,
    postCanchaEditChanges,
    getHorariosCancha, createHorariosRango, deleteHorario
}