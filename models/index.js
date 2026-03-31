//const { sequelize } = require('../config/db.config');
import {sequelize} from './../config/db.config.js' //importamos nuestro objeto sequelize para inicializar los modelos de las tablas

/*const Canchas = require('./canchas.model')(sequelize);
const Usuarios = require('./usuarios.model')(sequelize);
const Reservas = require('./reservas.model')(sequelize);
const TipoCancha = require('./tipo_cancha.model')(sequelize);
const Reseñas = require('./reseñas.model')(sequelize);
const Horarios =  require('./horarios.model')(sequelize);
*/

/*
    aqui tenemos las funciones que nos retornan los modelos  para ello hacemos la llamada de estas funciones 
    apoyandonos de nuestro objeto sequelize
*/
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

// Canchas → Horarios (una cancha tiene muchos horarios)
Canchas.hasMany(Horarios,  { foreignKey: 'cancha_id', as: 'horarios' });
Horarios.belongsTo(Canchas, { foreignKey: 'cancha_id', as: 'cancha' });

// Horarios → Reservas (un horario puede tener una reserva)
Horarios.hasOne(Reservas,   { foreignKey: 'horario_id', as: 'reserva' });
Reservas.belongsTo(Horarios, { foreignKey: 'horario_id', as: 'horario' });

// Usuarios → Reservas
Usuarios.hasMany(Reservas,  { foreignKey: 'usuario_id', as: 'reservas' });
Reservas.belongsTo(Usuarios, { foreignKey: 'usuario_id', as: 'usuario' });

// Usuarios → Reseñas
Usuarios.hasMany(Resenas,  { foreignKey: 'usuario_id', as: 'resenas' });
Resenas.belongsTo(Usuarios, { foreignKey: 'usuario_id', as: 'usuario' });

// Canchas → Reseñas  (FK consistente: cancha_id en ambos lados)
Canchas.hasMany(Resenas,  { foreignKey: 'cancha_id', as: 'resenas' });
Resenas.belongsTo(Canchas, { foreignKey: 'cancha_id', as: 'cancha' });


export{
    Canchas,
    Usuarios,
    Reservas,
    TipoCancha,
    Resenas,
    Horarios,
    sequelize
}