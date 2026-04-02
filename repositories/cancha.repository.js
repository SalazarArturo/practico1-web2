import { Canchas } from "./../models/index.js";

async function getAllCanchas(){
    try {
        const canchas = await Canchas.findAll();
        return canchas;
    } catch (error) {
        throw new Error(`Error al traer las canchas: ${error.message}`);
    }
}

async function createCancha(canchaData){
    try {
        const result = await Canchas.create(canchaData);
        return result;
    } catch (error) {
        throw new Error(`Error al crear cancha: ${error}`);
    }
}

async function getCanchaById(id){
    try {
        const result = await Canchas.findOne({where: {id}});
        return result;
    } catch (error) {
        throw new Error(`Error al traer cancha especifica: ${error.message}`);
    }
}

async function updateCancha(id, newData){
    try {
        const result = await Canchas.update(newData, {where: {id}});
        return result;
    } catch (error) {
        throw new Error(`Error al actualizar cancha: ${error.message}`);
    }
}
export{
    getAllCanchas,
    createCancha,
    getCanchaById,
    updateCancha
}