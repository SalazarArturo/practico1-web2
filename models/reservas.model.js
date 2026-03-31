/*const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Reservas = sequelize.define(
        'Reservas',
        {
           
            
            estado:{
                type: DataTypes.STRING,
                allowNull: false,
            }
        },
    );
    return Reservas;
};
*/

import { DataTypes } from "sequelize";

export default (sequelize) =>{
    const Reservas = sequelize.define(
        'Reservas',
        {
            estado:{
                type: DataTypes.STRING,
                allowNull: false,
            }
        },
    );
    return Reservas;
}