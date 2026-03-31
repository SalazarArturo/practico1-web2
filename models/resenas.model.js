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
    const Resehas = sequelize.define(
        'Resehas',
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
    return Resehas;
};