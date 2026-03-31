import { findUserByEmail } from "../repositories/user.repository.js";
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
        const compareResult = await bcrypt.compare(userCredentials.password, result.contasena);
        if(!compareResult){
            return {
                success: false,
                error: 'Usuario o contraseña incorrectos'
            }
        }
        return{
            success: true,
            userData: result
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

export {
    processUserCredentialsService
}