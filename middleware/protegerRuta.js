import  Jwt  from 'jsonwebtoken'
import { usuario} from '../Models/relaciones.js'
const ProtegerRuta = async ( req,res,next) => {
// verificar si hay un token 
  const {_token } = req.cookies

  if(!_token){

    return res.redirect('/auth/login')
  }
   // comprobar el token 
 try {
    const decoded = Jwt.verify(_token,process.env.JWT_KEY)
    console.log("hola")
    const Usuario =  await usuario.scope('eliminarPassword').findByPk(decoded.id)
   
    // almacenar el usuario en el request 
    if(Usuario){
        console.log("hay usuario")
        req.usuario = Usuario

    }else{
        console.log(" no hay usuario")
        return res.redirect('/auth/login')
    }
   
    return  next ()
 } catch (error) {
   console.log(error)
    return res.clearCookie('_token').redirect('/auth/login')
  }

   
   

 
}
export default ProtegerRuta