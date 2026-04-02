
import { getAllCanchasService } from "../services/user.service.js";

function serveHomeCliente(req, res){

    let logError = req.query.error;

    if(logError == 'logout'){
        logError = 'No se pudo cerrar la sesion, intente nuevamente';
    }
    if(logError == 'unauthorized'){
        logError = 'Acceso denegado'
    }
   /*const logError = req.query.error === 'logout' ? 'No se pudo cerrar la sesion, intente nuevamente'
   : null;*/
    return res.render('logedUserViews/home', {logError});
}

//controllers de admin
async function getCanchasCliente(req, res){
    try {
        const result = await getAllCanchasService();
        if(!result.success){
            return res.render('cliente/list-canchas', {
                canchas: [],
                error: result.error
            });
        }
        return res.render('cliente/list-canchas', {
            canchas: result.canchas,
            error: null
        });
    } catch (error) {
        return res.render('cliente/list-canchas', { 
            canchas: [],
            error: 'Error al cargar las canchas'
        });
    }
}
async function getCanchas2Clientes(req, res){
    try {
        const result = await getAllCanchasService();
        if(!result.success){
            return res.render('cliente/list-canchas', {
                canchas: [],
                error: result.error
            });
        }
        return res.render('cliente/list-canchas', {
            canchas: result.canchas,
            error: null
        });
    } catch (error) {
        return res.render('cliente/list-canchas', { 
            canchas: [],
            error: 'Error al cargar las canchas'
        });
    }
}


async function getReservas(req, res){
    try {
        const result = await getAllCanchasService();
        if(!result.success){
            return res.render('cliente/list-canchas', {
                canchas: [],
                error: result.error
            });
        }
        return res.render('cliente/list-canchas', {
            canchas: result.canchas,
            error: null
        });
    } catch (error) {
        return res.render('cliente/list-canchas', { 
            canchas: [],
            error: 'Error al cargar las canchas'
        });
    }
}

export{
    serveHomeCliente,
    getCanchasCliente,
    getCanchas2Clientes,
    getReservas
}