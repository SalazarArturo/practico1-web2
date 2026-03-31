import { Usuarios } from "./../models/index.js";

async function findUserByEmail(email){
    //mantener el repository lo mas natural posible ... no maneja errores ni nada eso se lo delega al service
    const result = await Usuarios.findOne({where: {email}}); //que es exactamente result ? ... 
    return result;
   
}

async function createUser(userData){
    
    const userCreated = await Usuarios.create(userData);
    return userCreated;
}

export {
    findUserByEmail,
    createUser
}