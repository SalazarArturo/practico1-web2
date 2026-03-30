const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Canchas = sequelize.define(
        'Canchas',
        {
            nombre: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            precio_por_hora:{
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            estado:{
                type: DataTypes.STRING,
                allowNull: false,

            }
            
        },
    );
    return Canchas;
};