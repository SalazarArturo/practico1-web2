import { processUserCredentials } from "../services/auth.service.js";

function getLogin(req, res){
    return res.render('init');
}

function getRegister(req, res){
    return res.render('new-user-form');
}

async function postLogin(req, res){

    const {email, password} = req.body;
    const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/; //expresion regular para validar un formato de correo valido
    /*
        estas validaciones del formulario puede ir en una funcion aparte que podriamos importar aqui
        o si estamos vagos lo dejamos asi xd
    */ 
    if(email.trim() == ''){
        return res.render('init', {emailError: 'No puede dejar este campo vacio'});
    }
    if(!emailRegex.test(email)){
        return res.render('init', {emailError: 'Debe ingresar un correo valido'});
    }
    if(password.trim() == ''){
        return res.render('init', {passwordError: 'No puede dejar este campo vacio'});
    }

    //si llegamos hasta aqui es que el usuario inserto datos validos para procesar

    try {
        const result = await processUserCredentials({email, password});
        if(!result.success){
            return res.render('init',{loginError: result.error});
        }
        //si llegamos aqui pues sus credenciales son los correctos, le damos sesion
    } catch (error) {
        
    }
}
export{
    getLogin,
    getRegister
}