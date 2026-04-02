

import { DataTypes } from "sequelize";

export default (sequelize) =>{
    const TipoCancha = sequelize.define(
        'TipoCancha',
        {
            nombre: {
                type: DataTypes.STRING,
                allowNull: false,
            }   
        },
    );
    return TipoCancha;
};