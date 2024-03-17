import {propiedad,Precio,Categoria}  from '../Models/relaciones.js'
const Propiedades = async (req,res) => {

const propiedades = await propiedad.findAll({
    include:[
        {model:Precio},
        {model:Categoria}
    ]
})

 res.json(propiedades)
}
export  {
    Propiedades
}