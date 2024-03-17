import {DataTypes} from 'sequelize'
import db from '../config/db.js'
import bcrypt from 'bcrypt'
 
const usuario = db.define('usuarios',{
    nombre: {
        type: DataTypes.STRING,
        allowNull:false
    },
    email: {
        type: DataTypes.STRING,
        allowNull:false
    },
    password: {
        type: DataTypes.STRING,
        allowNull:false
    },
    token: DataTypes.STRING,
    confirmado: DataTypes.BOOLEAN
    

},{
    hooks: {
        // hashear password
        beforeCreate: async function (usuario) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(usuario.password, salt);
            usuario.password = hashedPassword;
        }
    },
    scopes:{
        eliminarPassword : {
            attributes:{
                exclude:['password','token','confirmado','createdAt','updatedAt']
            }
        }
    }
})
usuario.prototype.passwordVerify = function (password) {
    return bcrypt.compareSync(password, this.password);
}

export default usuario