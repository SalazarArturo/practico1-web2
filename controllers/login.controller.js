/*
const bcrypt = require('bcryptjs');
const db = require('../models');
const Usuarios = db.Usuarios;
*/

/*
    Gabo si ves esto te comento que todo este script va a volar junto con el register.controller 
    siguiendo tu patron condensaremos todo lo que sea login y register en un solo script en este caso el auth.controller.js
*/
/*const postLogin = async (req, res) => {
    const { email, contrasena } = req.body;
    try {
        const usuario = await Usuarios.findOne({ where: { email } });

        if (!usuario) {
            req.flash('error', 'Email o contraseña incorrectos');
            return res.redirect('/auth/login');
        }

        const passwordValida = await bcrypt.compare(contrasena, usuario.contasena);
        if (!passwordValida) {
            req.flash('error', 'Email o contraseña incorrectos');
            return res.redirect('/auth/login');
        }

        // Guardar usuario en sesión (sin la contraseña)
        req.session.user = {
            id:     usuario.id,
            nombre: usuario.nombre,
            email:  usuario.email,
            rol:    usuario.rol
        };

        // Redirigir según rol
        if (usuario.rol === 'admin') {
            return res.redirect('/admin/dashboard');
        }
        return res.redirect('/cliente/canchas');

    } catch (error) {
        console.error(error);
        req.flash('error', 'Error al iniciar sesión');
        res.redirect('/auth/login');
    }
};
*/

