/*const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Usuarios = sequelize.define(
        'Usuarios',
        {
            nombre: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            contasena:{
                type: DataTypes.STRING,
                allowNull: false,
            },
            rol:{
                type: DataTypes.STRING,
                allowNull: false,
            }
        },
    );
    return Usuarios;
};*/

import { DataTypes } from "sequelize";

export default (sequelize) =>{
    const Usuarios = sequelize.define(
        'Usuarios',
        {
            nombre: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            contrasena:{
                type: DataTypes.STRING,
                allowNull: false,
            },
            rol:{
                type: DataTypes.STRING,
                allowNull: false,
            }
        },
    );
    return Usuarios;
};