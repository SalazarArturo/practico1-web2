import { findUserByEmail, createUser } from "../repositories/user.repository.js";
import bcrypt from 'bcrypt';

async function processUserCredentialsService(userCredentials){
    try {
        const result = await findUserByEmail(userCredentials.email);
        if(!result){
            return {
                success: false,
                error: 'Usuario o contraseña incorrectos'
            };
        }
        const compareResult = await bcrypt.compare(userCredentials.password, result.contrasena);
        if(!compareResult){
            return {
                success: false,
                error: 'Usuario o contraseña incorrectos'
            }
        }
        return{
            success: true,
            userData: {
                id: result.id,
                nombre: result.nombre,
                email: result.email,
                rol: result.rol
            }
        }
        /*
            si se encontro coincidencias ahora deberiamos comparar passwords con nuestro modulo bcrypt 
            y si estas coinciden pues deberiamos darle una sesion al usuario, el docente pide que sea con el mismo 
            express. Creo que este framework cuenta con algo llamado express-sessions ? eso deberiamos manejarlo aqui o 
            en el controller ? 
        */

    } catch (error) {
        throw new Error(`Error al buscar el usuario: ${error.message}`);
    }
}

async function processNewUserCredentialsService(credentials){
    try {
        const hashedPassword = await bcrypt.hash(credentials.password, 10);

        const parsedCredentials = {
            nombre: credentials.username,
            email: credentials.email,
            contrasena: hashedPassword,
            rol: 'cliente'
        } 

        const result = await createUser(parsedCredentials);
        if(!result){
            return {
                success: false,
                error: 'No se pudo crear el usuario, intente nuevamente.'
            }
        }
        return{
            success: true,
            newUserData:{
                id: result.id,
                username: result.nombre,
                email: result.email,
                rol: result.rol
            }
        }
    } catch (error) {
        throw new Error(`Error al insertar un nuevo usuario: ${error.message}`);
    }
}

export {
    processUserCredentialsService,
    processNewUserCredentialsService
}