import{ getAllCanchas} from '../repositories/cancha.repository.js';

async function getAllCanchasService(){
    try {
        const result = await getAllCanchas();
        if(result.length == 0){
            return {
                success: false,
                error: 'No hay canchas registradas todavia'
            }
        }
        return {
            success: true,
            canchas: result
        }
    } catch (error) {
        throw error;
    }
}
export{
    getAllCanchasService
}