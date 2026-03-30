const bcrypt = require('bcryptjs');
const db = require('../models');
const Usuarios = db.Usuarios;

const getRegister = (req, res) => {
    res.render('auth/register');
};

const postRegister = async (req, res) => {
    const { nombre, email, contrasena } = req.body;
    try {
        // Verificar si el email ya existe
        const existe = await Usuarios.findOne({ where: { email } });
        if (existe) {
            req.flash('error', 'El email ya está registrado');
            return res.redirect('/auth/register');
        }

        // Hashear contraseña
        const hash = await bcrypt.hash(contrasena, 10);

        await Usuarios.create({
            nombre,
            email,
            contasena: hash,  // ojo: así está en tu modelo
            rol: 'cliente'    // por defecto siempre cliente
        });

        req.flash('success', 'Cuenta creada correctamente, iniciá sesión');
        res.redirect('/auth/login');

    } catch (error) {
        console.error(error);
        req.flash('error', 'Error al registrar usuario');
        res.redirect('/auth/register');
    }
};


const logout = (req, res) => {
    req.session.destroy();
    res.redirect('/auth/login');
};


module.exports = { getRegister, postRegister, logout };