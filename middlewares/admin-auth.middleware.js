function isAdmin(req, res, next){
    if(req.session.user.rol !== 'admin'){
        return res.status(403).send('Acceso denegado');
    }
    next();
}