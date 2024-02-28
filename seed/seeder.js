import {exit} from 'node:process'
import CategoriasDatos  from "./categoria.js";
import precios from './precio.js';
import db  from "../config/db.js";
 import {Categoria,Precio,usuario} from '../Models/relaciones.js'
import Propiedad from '../Models/Propiedad.js';
import Usuarios from './usuario.js';

const ImportarDatos= async ()=>{
    try {
       await db.authenticate()
       await db.sync()
       await Promise.all([
        Categoria.bulkCreate(CategoriasDatos),
        Precio.bulkCreate(precios),
        usuario.bulkCreate(Usuarios)


   
       ])
       console.log('Datos importados correctamente.')
        exit()


    } catch (error) {
        console.log(error)
        exit(1)
    }
}
 
const eliminarDatos = async () =>{
    try {
        await Promise.all([
         Categoria.destroy({where:{}, truncate:true}),
         Precio.destroy({where:{}, truncate:true}),
         usuario.destroy({where:{}, truncate:true})
         
        ])
         exit()
    } catch (error) {
        console.log(error)
        exit(1)
    }
}
if(process.argv[2]==="-i"){
    ImportarDatos()
}
if(process.argv[2]==="-e"){
    eliminarDatos()
}