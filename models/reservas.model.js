import { DataTypes } from "sequelize";

export default (sequelize) => {
    const Reservas = sequelize.define(
        'Reservas',
        {
            fecha: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            hora_inicio: {
                type: DataTypes.TIME,
                allowNull: false,
            },
            hora_fin: {
                type: DataTypes.TIME,
                allowNull: false,
            },
            estado: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 'confirmada'
            }
        },
    );
    return Reservas;
}
