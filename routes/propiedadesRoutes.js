import express from 'express'
import {admin,crear,Guardar,agregarImagen,AlmacenarImagen,editar,GuardarCambios,eliminarPropiedad,mostrarPropiedad} from '../Controllers/propiedadesController.js'
import { body } from 'express-validator'
import ProtegerRuta from '../middleware/protegerRuta.js'
import {  Upload } from '../middleware/subirImg.js';






const router = express.Router()

router.get('/mis-propiedades', ProtegerRuta, admin)
router.get('/propiedades/crear', ProtegerRuta,crear )
router.post('/propiedades/crear',ProtegerRuta,
body('Titulo').notEmpty().withMessage('El titulo no puede estar vacio'),
body('Desc').notEmpty().withMessage('La descripcion es obligatoria').isLength({max:200}).withMessage('La descripcion es muy larga'),
body('Categoria').isNumeric().withMessage('Seleccione una categoria'),
body('Precio').isNumeric().withMessage('Seleccione una Precio'),
body('Habitaciones').isNumeric().withMessage('Seleccione la  cantidad de habitaciones'),
body('Estacionamiento').isNumeric().withMessage('Seleccione la  cantidad de Estacionamiento'),
body('Banios').isNumeric().withMessage('Seleccione la cantidad de baños '),
 Guardar)
 router.get('/propiedades/agregar-imagen/:id',  ProtegerRuta,agregarImagen)
 router.post('/propiedades/agregar-imagen/:id', ProtegerRuta, Upload.single('Img'),AlmacenarImagen);
 router.get('/propiedades/editar-propiedad/:id',ProtegerRuta,editar )
 router.post('/propiedades/editar-propiedad/:id',ProtegerRuta,
body('Titulo').notEmpty().withMessage('El titulo no puede estar vacio'),
body('Desc').notEmpty().withMessage('La descripcion es obligatoria').isLength({max:200}).withMessage('La descripcion es muy larga'),
body('Categoria').isNumeric().withMessage('Seleccione una categoria'),
body('Precio').isNumeric().withMessage('Seleccione una Precio'),
body('Habitaciones').isNumeric().withMessage('Seleccione la  cantidad de habitaciones'),
body('Estacionamiento').isNumeric().withMessage('Seleccione la  cantidad de Estacionamiento'),
body('Banios').isNumeric().withMessage('Seleccione la cantidad de baños '),
 GuardarCambios)
 router.post('/propiedades/eliminar-propiedad/:id',ProtegerRuta,eliminarPropiedad)
 
//AREA PUBLICA
router.get('/propiedades/mostrar-propiedad/:id', mostrarPropiedad)

 



export default router