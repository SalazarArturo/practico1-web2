import { DataTypes } from "sequelize";

export default (sequelize) => {
    const Horarios = sequelize.define(
        'Horarios',
        {
            // dias_semana: array JSON de días habilitados
            // ej: ["lunes","martes","miercoles","jueves","viernes"]
            dias_semana: {
                type: DataTypes.JSON,
                allowNull: false,
                defaultValue: ["lunes", "martes", "miercoles", "jueves", "viernes"]
            },
            hora_apertura: {
                type: DataTypes.TIME,
                allowNull: false,
                defaultValue: '07:00:00'
            },
            hora_cierre: {
                type: DataTypes.TIME,
                allowNull: false,
                defaultValue: '23:00:00'
            }
        },
    );
    return Horarios;
}
