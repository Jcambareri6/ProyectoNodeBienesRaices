import express from 'express';
import { FormularioLogin, autenticar,formularioRegistro, registrar,formularioPaswordOlvidado,comprobar,resetPassword,comprobarToken,nuevoPassword} from '../Controllers/usuarioController.js';

const router= express.Router()
let user= "joaquin"
router.get('/login',FormularioLogin)
router.post('/login',autenticar)

router.get('/registrarse',formularioRegistro)


router.post('/registrarse',registrar)


router.get('/comprobar/:token', comprobar)

router.get('/olvide-password',formularioPaswordOlvidado)
router.post('/olvide-password',resetPassword)
router.get('/olvide-password/:token', comprobarToken)
 router.post('/olvide-password/:token', nuevoPassword)

export default  router 