/*const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Reseñas = sequelize.define(
        'Reseñas',
        {
            calificacion:{
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            comentario:{
                type: DataTypes.STRING,
                allowNull: true,
            }

        },
    );
    return Reseñas;
};
*/

import { DataTypes } from "sequelize";

export default (sequelize) =>{
    const Resenas = sequelize.define(
        'Resenas',
        {
            calificacion:{
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            comentario:{
                type: DataTypes.STRING,
                allowNull: true,
            }
        },
    );
    return Resenas;
};