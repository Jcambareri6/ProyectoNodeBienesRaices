import multer from 'multer'
import path from 'path';
import { generarId } from '../helpers/token.js'
const destinoCarpeta = path.resolve('public/uploads/')



const Storage = multer.diskStorage({
    destination: function(req, file, cb) {
        console.log('Estoy dentro de la función de destino del middleware multer');
        cb(null, destinoCarpeta)
    },
    filename: function(req, file, cb) {
        console.log('Estoy dentro de la función de nombre de archivo del middleware multer');
        cb(null, generarId() + path.extname(file.originalname));
    }
});

const Upload = multer({storage: Storage });

console.log("Middleware de Multer configurado correctamente");

export { Storage, Upload };

