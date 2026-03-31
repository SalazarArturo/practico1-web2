import { Sequelize } from 'sequelize';

//configuramos sqlite
export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite',
    define: {
        underscored: true //  esto hace que todas las FK sean snake_case
    }
});

try {
    await sequelize.authenticate();
    console.log('Conexion exitosa');
} catch (error) {
    console.error('Error de conexion', error);
}