

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