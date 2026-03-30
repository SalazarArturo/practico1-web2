const { Sequelize } = require('sequelize');

// Config SQLite
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite',
    define: {
        underscored: true  // ← esto hace que todas las FK sean snake_case
    }
});

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });

module.exports = {
    sequelize, Sequelize
}