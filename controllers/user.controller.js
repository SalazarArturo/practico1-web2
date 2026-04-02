import { getAllCanchasService } from "../services/user.service.js";

function serveHome(req, res){

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
function serveNewCanchaForm(req, res){
    return res.render('logedUserViews/adminViews/canchas-form');
}
export{
    serveHome,
    getCanchas,
    serveNewCanchaForm
}