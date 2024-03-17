"use strict"
// const express = require ('express')
import express from 'express';
import csurf from 'csurf'
import cookieParser from 'cookie-parser'
import usuarioRouter from './routes/usuarioRouter.js'
import propiedadesRoutes from './routes/propiedadesRoutes.js'
import appRoutes from './routes/appRoutes.js'
import apiRoutes from './routes/apiRoutes.js'
import db from './config/db.js'



// crea la app 
const app = express()
// conexion a bd 
try {
    await db.authenticate();
    db.sync()
    console.log("conexion correcta");
} catch (error) {
    console.log(error)
}
//habilitar lectura de datos desde el formulario
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use (csurf({ cookie: true }));





// habilitar pug
app.set('view engine','pug')

//dond estan las vistas 
app.set('views','./views')

//carpeta publica 
app.use(express.static('public'))

let user= "joaquin"
//definir un puerto y arrancar el proyecto 
const port =  process.env.PORT || 3000
app.use('/',appRoutes)
app.use('/auth', usuarioRouter)
app.use('/',propiedadesRoutes)
app.use('/api',apiRoutes)


app.listen(port, () =>{
    console.log(`hola soy ${user} `)
 })


