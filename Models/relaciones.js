import propiedad from './Propiedad.js'
import Precio from './Precio.js'
import Categoria from './Categoria.js'
import usuario from './UsuarioModel.js'
import Mensaje from './Mensaje.js' 

propiedad.belongsTo(Precio)
propiedad.belongsTo(Categoria)
propiedad.belongsTo(usuario)
propiedad.hasMany(Mensaje) //una propiedad puede tener multiples mensajes
Mensaje.belongsTo(propiedad) // un mensaje tiene una propiedad 
Mensaje.belongsTo(usuario)

export{propiedad,Precio,Categoria,usuario,Mensaje}