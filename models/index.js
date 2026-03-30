const { sequelize } = require('../config/db.config');

const Canchas = require('./canchas.model')(sequelize);
const Usuarios = require('./usuarios.model')(sequelize);
const Reservas = require('./reservas.model')(sequelize);
const TipoCancha = require('./tipo_cancha.model')(sequelize);
const Reseñas = require('./reseñas.model')(sequelize);
const Horarios =  require('./horarios.model')(sequelize);


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
Usuarios.hasMany(Reseñas,  { foreignKey: 'usuario_id', as: 'reseñas' });
Reseñas.belongsTo(Usuarios, { foreignKey: 'usuario_id', as: 'usuario' });

// Canchas → Reseñas  (FK consistente: cancha_id en ambos lados)
Canchas.hasMany(Reseñas,  { foreignKey: 'cancha_id', as: 'reseñas' });
Reseñas.belongsTo(Canchas, { foreignKey: 'cancha_id', as: 'cancha' });


module.exports = {
    Canchas,
    Usuarios,
    Reservas,
    TipoCancha,
    Reseñas,
    sequelize,
    Sequelize: sequelize.Sequelize
};