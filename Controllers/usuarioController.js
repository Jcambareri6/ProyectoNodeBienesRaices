"use strict"
import usuario from '../Models/UsuarioModel.js'
import Usuario from '../Models/UsuarioModel.js'
import { generarId, generarJWT } from '../helpers/token.js'
import bcrypt from 'bcrypt'
import { emailRegistro,EmailolvidePassword} from '../helpers/email.js'


import { check, validationResult } from 'express-validator';

// Resto del código...


const FormularioLogin = (req, res) => {
    res.render('auth/login', {
        pagina: "Iniciar Sesion",
        csrfToken: req.csrfToken()
    })
}
const autenticar = async (req,res) =>{
    await check('email').isEmail().withMessage(' email invalido').run(req)
    await check('password').notEmpty().withMessage('el password es obligatorio ').run(req)
    let resultado = validationResult(req)
    if (!resultado.isEmpty()) {

        return res.render('auth/login', {
            pagina: 'Iniciar Sesion',
            csrfToken: req.csrfToken(),
            errores: resultado.array(),
            
        })
    }
    const {email, password} = req.body
     const Usuario =  await usuario.findOne({ where: { email } })
     console.log(Usuario)
     if (! Usuario){
        return res.render('auth/login', {
            pagina: 'Iniciar Sesion',
            csrfToken: req.csrfToken(),
            errores: [{msg:"el usuario no existe"}]
            
        })
     }
     if (! Usuario.confirmado){
        return res.render('auth/login', {
            pagina: 'Iniciar Sesion',
            csrfToken: req.csrfToken(),
            errores: [{msg:" tu cuenta no esta confirmada"}]
            
        })
     }
     if(!Usuario.passwordVerify(password)){
        return res.render('auth/login', {
            pagina: 'Iniciar Sesion',
            csrfToken: req.csrfToken(),
            errores: [{msg:" El password es incorrecto"}]
            
        })
     }
     const JWT = generarJWT( Usuario.id, Usuario.nombre)
    
     console.log(JWT)
      return res.cookie('_token',JWT,{
        httpOnly: true,
        // secure: true
      }).redirect('/mis-propiedades')

}
const formularioRegistro = (req, res) => {

    res.render('auth/register', {
        pagina: "crear Cuenta",
        csrfToken: req.csrfToken(),
    })
}
const cerrarSesion = async (req,res) =>{
    return res.clearCookie('_token').status(200).redirect('/auth/login')
}
const registrar = async (req, res) => {
    await check('nombre').notEmpty().withMessage('el nombre es obligatorio').run(req)
    await check('email').isEmail().withMessage(' email invalido').run(req)
    await check('password').isLength({ min: 6 }).withMessage('El Password tiene que tener minimo 6 caracteres').run(req)
    await check('repetir_password').equals(req.body.password).withMessage('los password no son iguales').run(req)
    let resultado = validationResult(req)
    
    //verificar que el resultado no esta vacio 
    if (!resultado.isEmpty()) {

        return res.render('auth/register', {
            pagina: 'Crear Cuenta',
            csrfToken: req.csrfToken(),
            errores: resultado.array(),
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email
            }
        })
    }
    //destructurar el request 
    const { nombre, email, password } = req.body
    //verificar que el usuario no este duplicado 
    const existeusuario = await usuario.findOne({ where: { email } })
    if (existeusuario) {
        return res.render('auth/register', {
            pagina: 'Crear Cuenta',
            errores: [{ msg: 'el usuario ya esta registrado' }],
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email
            }
        })
    }


    const NuevoUsuario = await usuario.create({
        nombre,
        email,
        password,
        token: generarId()
    })
    //ENVIAR EMAIL DE CONFITMACION DE CUENTA 
    emailRegistro({
        nombre: NuevoUsuario.nombre,
        email: NuevoUsuario.email,
        token: NuevoUsuario.token
    })

    res.render('templates/mensaje', {
        pagina: 'cuenta creada correctamente',
        mensaje: 'hemos enviado un Email de confirmacion, confirme su cuenta'
    })
}
const formularioPaswordOlvidado = (req, res) => {
    res.render('auth/olvide-password', {
        pagina: "recupera tu acceso a bienes Raices",
        csrfToken: req.csrfToken()

    })
}

//funcion que comprueba una cuenta 
const comprobar = async (req, res) => {
    const { token } = req.params

    const usuarioToken = await usuario.findOne({ where: { token } })
    if (!usuarioToken) {

        res.render('auth/confirmar-cuenta', {
            pagina: 'error al confirmar la cuenta',
            mensaje: 'hubo un error al confirmar tu cuenta',
            error: true
        })
    }
    // console.log(usuarioToken)
     usuarioToken.token= null;
     usuarioToken.confirmado= true;
     usuarioToken.save()

    res.render('auth/confirmar-cuenta', {
        pagina: 'cuenta confirmada',
        mensaje: 'la cuenta se confirmó correctamente',
    });
}
const resetPassword= async (req,res)=>{
    
    await check('email').isEmail().withMessage(' email invalido').run(req)

    let resultado = validationResult(req)

    //verificar que el resultado no esta vacio 
    if (!resultado.isEmpty()) {

        return res.render('auth/olvide-password', {
            pagina: 'recupera tu cuenta',
            csrfToken: req.csrfToken(),
            errores: resultado.array(),
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email
            }
        })
    }
    const {email}= req.body
    const usuarioExistente = await usuario.findOne({ where: { email } })
  
    if (! usuarioExistente) {
        return res.render('auth/olvide-password', {
            pagina: 'recupera tu cuenta ',
            errores: [{ msg: 'el usuario no existe' }],
            csrfToken: req.csrfToken()
         
        })
    }

    usuarioExistente.token= generarId()
    await usuarioExistente.save()
 //enviar email 
 EmailolvidePassword({
    nombre: usuarioExistente.nombre,
    email: usuarioExistente.email,
    token: usuarioExistente.token
 })
 
 //renderizar un mensaje 
 res.render('templates/mensaje',{
    pagina:'reestablece tu password',
    mensaje:'Hemos enviado un email con las indicaciones para recuperar tu password'
    

 })

} 
const comprobarToken = async (req,res)=>{
     console.log("hola")
    const {token} = req.params
    const usuarioTok = await usuario.findOne({where:{token}})
    if(! usuarioTok){
        res.render('auth/confirmar-cuenta', {
            pagina: 'error al restablecer tu password',
            mensaje: 'error al restablecer tu password',
            error: true
        })
    }
    res.render('auth/reset-password',{
        pagina: 'reestablece tu password',
        csrfToken: req.csrfToken()
        
        
    })


}
const nuevoPassword =  async (req,res)=>{
    await check('password').isLength({ min: 6 }).withMessage('El Password tiene que tener minimo 6 caracteres').run(req)
    let resultado = validationResult(req)
    
    //verificar que el resultado no esta vacio 
    if (!resultado.isEmpty()) {

        return res.render('auth/reset-password', {
            pagina: 'reestablece tu password',
            csrfToken: req.csrfToken(),
            errores: resultado.array(),
          
        })
    }
    const {token} = req.params
    const {password}= req.body
    const Usuario = await usuario.findOne({where:{token}})
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    Usuario.password = hashedPassword;
    Usuario.token= null
    await Usuario.save()
    res.render('auth/confirmar-cuenta',{
        pagina:'Password Reestablecido',
        mensaje:'El password se guardo correctamente'
    })
}


export {
    FormularioLogin,
    autenticar,
    cerrarSesion,
    formularioRegistro,
    registrar,
    formularioPaswordOlvidado,
    comprobar,
    resetPassword,
    comprobarToken,
    nuevoPassword

}