import {propiedad,Precio,Categoria} from '../Models/relaciones.js'
import { Sequelize } from 'sequelize'
const inicio = async ( req, res) =>{
const [categorias,precios,casas,departamentos] = await Promise.all([
    Categoria.findAll({raw:true}),
    Precio.findAll({raw:true}),
    propiedad.findAll({
        limit:3,
        where:{categoriaId:1},
        include:[{model:Precio}],
        order:[['createdAt', 'DESC']]
    }),
    propiedad.findAll({
        limit:3,
        where:{categoriaId:2},
        include:[
            {model:Precio}
        ],
        order:[['createdAt', 'DESC']]
    })

])
res.render('inicio',{
    pagina: 'Inicio',
    categorias,
    precios,
    casas,
    departamentos,
    csrfToken: req.csrfToken(),
})
}
const Categorias = async ( req, res) =>{
 const {id} = req.params 
  
  const categoria =  await Categoria.findByPk(id)
  if(!categoria){
    res.redirect('/404')
  }
  const propiedades = await propiedad.findAll({
    where:{categoriaId:id},
    include:[{
        model:Precio
    }]
  })
  res.render('Categoria',{
    pagina:`${categoria.nombre}s  en venta `,
    propiedades,
    csrfToken: req.csrfToken(),
  })
}
const Error = async ( req, res) =>{
    res.render('404',{
        pagina: 'No Encontrado',
        csrfToken: req.csrfToken(),
    })
}
const buscador = async ( req, res) =>{
    const {termino } = req.body
    console.log(`termino ${termino}`)
    if(!termino.trim()){
        return res.redirect('back')
    }
    const propiedades = await propiedad.findAll({
        where:{
            titulo:{[Sequelize.Op.like] :'%' + termino + '%' }
        },
        include: [{
            model:Precio
        },]
    })
    res.render('busqueda',{
        pagina:'Resultados de la busqueda',
        propiedades,
        csrfToken: req.csrfToken(),
    })
}

export{ 
    inicio,
    Categorias,
    Error,
    buscador
}