

import { DataTypes } from "sequelize";

export default (sequelize) =>{
    const Horarios = sequelize.define(
        'Horarios',
        {
            fecha:{
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            hora_inicio:{
                type: DataTypes.TIME,
                allowNull: false,
            },
            hora_fin:{
                type: DataTypes.TIME,
                allowNull: false,
            },
            disponible:{
                type: DataTypes.BOOLEAN,
                allowNull: false,
            }
        },
    );
    return Horarios;
}