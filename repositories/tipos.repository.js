import { where } from "sequelize";
import { TipoCancha } from "./../models/index.js";

async function getAllTipos(){
    try {
        const result = await TipoCancha.findAll();
        return result;
    } catch (error) {
        throw new Error(`Error al traer los tipos de cancha: ${error.message}`);    
    }
   
}

async function createModel(data){
    try {
        const result = await TipoCancha.create(data);
        return result;
    } catch (error) {
        throw new Error(`Error al crear un modelo de cancha: ${error.message}`);
    }
}

async function getModelById(id){
    try {
        const result = await TipoCancha.findOne({where:{id}});
        return result;
    } catch (error) {
        throw new Error(`Error al buscar modelo especifico: ${error.message}`);
    }
}

async function updateModel(id, newData){
    try {
        const result = await TipoCancha.update(newData, {where: {id}});
        return result;
    } catch (error) {
        throw new Error(`Error al actualizar el modelo de cancha: ${error.message}`);
    }
}

async function deleteModel(id){
    try {
        const result = await TipoCancha.destroy({where: {id}});
        return result;
    } catch (error) {
        throw new Error(`Error al eliminar modelo: ${error.message}`);
    }
}
export {
    getAllTipos,
    createModel,
    getModelById,
    updateModel,
    deleteModel
}