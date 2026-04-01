function isAuthenticated(req, res, next){
    
    if(!req.session.user){
        console.log('lo siento choquito, no pasaste');
        return res.redirect('/');
    }
    res.locals.userData = req.session.user; //hacemos esto para que en el ejs tengamos directamente los datos de la sesion del usuario sin tener que especificarlas en los controller cuando queramos renderizar algo
    next();
}

export {isAuthenticated}