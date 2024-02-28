import  bcrypt from 'bcrypt'
const Usuarios = [
    {
        nombre:'joaquin',
        email: 'joaquincambareri@gmail.com',
        confirmado: 1,
        password: bcrypt.hashSync('password',10)
    }
]
export default Usuarios