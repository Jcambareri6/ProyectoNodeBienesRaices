import propiedad from './Propiedad.js'
import Precio from './Precio.js'
import Categoria from './Categoria.js'
import usuario from './UsuarioModel.js'
propiedad.belongsTo(Precio)
propiedad.belongsTo(Categoria)
propiedad.belongsTo(usuario)

export{propiedad,Precio,Categoria,usuario}