import express from 'express'
import {   inicio,  Categorias, Error,  buscador} from '../Controllers/appController.js'

const router = express.Router()

// pagina de inicio 
router.get('/',inicio)
//pagina 404 
router.get('/404', Error)

// categorias 
router.get('/categorias/:id', Categorias)

// buscador 
router.post('/buscador', buscador)
export default router 
