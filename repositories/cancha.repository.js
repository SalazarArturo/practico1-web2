import { Canchas } from "./../models/index.js";

async function getAllCanchas(){
    try {
        const canchas = await Canchas.findAll();
        return canchas;
    } catch (error) {
        throw new Error(`Error al traer las canchas: ${error.message}`);
    }
}

export{
    getAllCanchas
}