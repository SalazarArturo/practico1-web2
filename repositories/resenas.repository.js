import { Resenas, Usuarios, Canchas, Reservas, Horarios } from '../models/index.js';

async function createResena(data) {
    try {
        const result = await Resenas.create(data);
        return result;
    } catch (error) {
        throw new Error(`Error al crear reseña: ${error.message}`);
    }
}

async function getResenasByCanchaId(cancha_id) {
    try {
        const result = await Resenas.findAll({
            where: { cancha_id },
            include: [{ model: Usuarios, as: 'usuario', attributes: ['nombre'] }],
            order: [['createdAt', 'DESC']]
        });
        return result;
    } catch (error) {
        throw new Error(`Error al traer reseñas de la cancha: ${error.message}`);
    }
}

async function getAllResenas() {
    try {
        const result = await Resenas.findAll({
            include: [
                { model: Usuarios, as: 'usuario', attributes: ['nombre', 'email'] },
                { model: Canchas, as: 'cancha', attributes: ['nombre'] }
            ],
            order: [['createdAt', 'DESC']]
        });
        return result;
    } catch (error) {
        throw new Error(`Error al traer todas las reseñas: ${error.message}`);
    }
}

async function findResenaByUsuarioAndCancha(usuario_id, cancha_id) {
    try {
        const result = await Resenas.findOne({ where: { usuario_id, cancha_id } });
        return result;
    } catch (error) {
        throw new Error(`Error al buscar reseña: ${error.message}`);
    }
}

export {
    createResena,
    getResenasByCanchaId,
    getAllResenas,
    findResenaByUsuarioAndCancha
}
