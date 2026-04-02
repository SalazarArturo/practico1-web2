import { sequelize } from './../config/db.config.js';

import CanchasModel from './canchas.model.js'; 
import UsuariosModel from './usuarios.model.js';
import ReservasModel from './reservas.model.js';
import TipoCanchaModel from './tipo_cancha.model.js';
import ResenasModel from './resenas.model.js';
import HorariosModel from './horarios.model.js';

const Canchas = CanchasModel(sequelize);
const Usuarios = UsuariosModel(sequelize);
const Reservas = ReservasModel(sequelize);
const TipoCancha = TipoCanchaModel(sequelize);
const Resenas = ResenasModel(sequelize);
const Horarios = HorariosModel(sequelize);

// Tipo de cancha → Canchas
TipoCancha.hasMany(Canchas,  { foreignKey: 'tipo_cancha_id', as: 'canchas' });
Canchas.belongsTo(TipoCancha, { foreignKey: 'tipo_cancha_id', as: 'tipoCancha' });

// Canchas → Horarios de disponibilidad (una cancha tiene una configuración de disponibilidad)
Canchas.hasOne(Horarios,  { foreignKey: 'cancha_id', as: 'horario' });
Horarios.belongsTo(Canchas, { foreignKey: 'cancha_id', as: 'cancha' });

// Canchas → Reservas
Canchas.hasMany(Reservas, { foreignKey: 'cancha_id', as: 'reservas' });
Reservas.belongsTo(Canchas, { foreignKey: 'cancha_id', as: 'cancha' });

// Usuarios → Reservas
Usuarios.hasMany(Reservas,  { foreignKey: 'usuario_id', as: 'reservas' });
Reservas.belongsTo(Usuarios, { foreignKey: 'usuario_id', as: 'usuario' });

// Usuarios → Reseñas
Usuarios.hasMany(Resenas,  { foreignKey: 'usuario_id', as: 'resenas' });
Resenas.belongsTo(Usuarios, { foreignKey: 'usuario_id', as: 'usuario' });

// Canchas → Reseñas
Canchas.hasMany(Resenas,  { foreignKey: 'cancha_id', as: 'resenas' });
Resenas.belongsTo(Canchas, { foreignKey: 'cancha_id', as: 'cancha' });

export {
    Canchas,
    Usuarios,
    Reservas,
    TipoCancha,
    Resenas,
    Horarios,
    sequelize
}
