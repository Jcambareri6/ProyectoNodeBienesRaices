import jwt from 'jsonwebtoken'
 import usuario from '../Models/UsuarioModel.js'

const identificarUsuario = async (req,res,next) =>{
    console.log("entro en el mid y no salgo ")
 
    const {_token} = req.cookies
    console.log(`token ${_token}`)
    if(!_token){
        
        req.usuario = null 
        return next()
    }

    try {
        const decoded = jwt.verify(_token,process.env.JWT_KEY)
        const Usuario =  await usuario.scope('eliminarPassword').findByPk(decoded.id) 
        if(Usuario){
            req.usuario = Usuario

        }else{
            return res.redirect('auth/login')
        }
        return next()

    } catch (error) {
        
        console.log(error)
        return res.clearCookie('_token').redirect('auth/login')
    }

}
export default identificarUsuario
