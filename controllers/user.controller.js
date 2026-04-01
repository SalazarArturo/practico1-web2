function serveHome(req, res){

   const logError = req.query.error === 'logout' ? 'No se pudo cerrar la sesion, intente nuevamente'
   : null;
    return res.render('logedUserViews/home', {logError});
}

export{serveHome}