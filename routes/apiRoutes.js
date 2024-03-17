import express from 'express'
import {Propiedades} from '../Controllers/apiController.js'
const router = express.Router()
router.get('/propiedades', Propiedades)

export  default router