function isAuthenticated(req, res, next){
    
    if(!req.session.user){
        console.log('lo siento choquito, no pasaste');
        return res.redirect('/');
    }
    res.locals.userData = req.session.user;
    res.locals.userRol = req.session.user.rol;
    res.locals.userId = req.session.user.id;

    next();
}

// Verifica si es admin
function isAdmin(req, res, next) {
    if (!req.session.user) {
        return res.redirect("/");
    }
    if (req.session.user.rol !== 'admin') {
        return res.redirect('/user/home?error=unauthorized');
    }
    next();
}


export {isAuthenticated, isAdmin}