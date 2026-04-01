/* 
    esta poja solo se tiene que ejecutar una vez y aparte del servidor 
    por eso lo haremos con un script nuevo del package.json despues de hacerlo nunca mas volver a ejecutar este script
    solo arrancar el servidor con npm run dev 
*/
import bcrypt from 'bcrypt';
import { Usuarios, sequelize } from '../models/index.js';

async function createAdmin() {
    try {
        //aseguramos que existan las tablas
        await sequelize.sync();

        //verificamos si ya existe el admin
        const existingAdmin = await Usuarios.findOne({
            where: { email: 'admin@mail.com' }
        });

        if (existingAdmin) {
            console.log('El admin ya existe');
            return;
        }

        //hasheamos la contraseña
        const hashedPassword = await bcrypt.hash('admin123', 10);

        //creamos al admin
        const admin = await Usuarios.create({
            nombre: 'Admin',
            email: 'admin@mail.com',
            contrasena: hashedPassword,
            rol: 'admin'
        });

        console.log('Admin creado:', admin.toJSON());

    } catch (error) {
        console.error('Error creando admin:', error);
    } finally {
        await sequelize.close(); // cerramos conexion
    }
}

createAdmin();