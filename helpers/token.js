import jwt from 'jsonwebtoken'
 const generarJWT = (id,nombre)  => jwt.sign({id,nombre},process.env.JWT_KEY,{expiresIn:'1d'})
const generarId = () => {
    const timestamp = Date.now().toString(32);
    const randomString = Math.random().toString(32).substring(2);
    return timestamp + randomString;
  };
export{
    generarId,
    generarJWT
}