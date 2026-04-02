import { Reservas, Canchas, TipoCancha, Usuarios } from '../models/index.js';
import { Op } from 'sequelize';

async function createReserva(data) {
    try {
        return await Reservas.create(data);
    } catch (error) {
        throw new Error(`Error al crear reserva: ${error.message}`);
    }
}

async function getReservasActivasByCancha(cancha_id, fecha) {
    try {
        return await Reservas.findAll({
            where: {
                cancha_id,
                fecha,
                estado: 'confirmada'
            }
        });
    } catch (error) {
        throw new Error(`Error al traer reservas activas: ${error.message}`);
    }
}

async function getReservasByUsuarioId(usuario_id) {
    try {
        return await Reservas.findAll({
            where: { usuario_id },
            include: [
                {
                    model: Canchas,
                    as: 'cancha',
                    include: [{ model: TipoCancha, as: 'tipoCancha' }]
                }
            ],
            order: [['fecha', 'DESC'], ['hora_inicio', 'ASC']]
        });
    } catch (error) {
        throw new Error(`Error al traer reservas del usuario: ${error.message}`);
    }
}

async function getAllReservas() {
    try {
        return await Reservas.findAll({
            include: [
                {
                    model: Canchas,
                    as: 'cancha',
                    include: [{ model: TipoCancha, as: 'tipoCancha' }]
                },
                { model: Usuarios, as: 'usuario' }
            ],
            order: [['fecha', 'DESC'], ['hora_inicio', 'ASC']]
        });
    } catch (error) {
        throw new Error(`Error al traer todas las reservas: ${error.message}`);
    }
}

async function getReservaById(id) {
    try {
        return await Reservas.findOne({
            where: { id },
            include: [{ model: Canchas, as: 'cancha' }]
        });
    } catch (error) {
        throw new Error(`Error al traer la reserva: ${error.message}`);
    }
}

async function updateEstadoReserva(id, estado) {
    try {
        return await Reservas.update({ estado }, { where: { id } });
    } catch (error) {
        throw new Error(`Error al actualizar estado de reserva: ${error.message}`);
    }
}

export {
    createReserva,
    getReservasActivasByCancha,
    getReservasByUsuarioId,
    getAllReservas,
    getReservaById,
    updateEstadoReserva
}
