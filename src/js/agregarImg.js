import {Dropzone} from "dropzone";
let  token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
console.log(token)
Dropzone.options.SubirImagen={
    dictDefaultMessage : ' Sube tus imagenes aqui',
    acceptedFiles: '.png,.jpg,.jpeg',
    maxFilesSize:5,
    maxFiles:1,
    parallelUploads:1,
   autoProcessQueue:false,
    addRemoveLinks:true,
    dictRemoveFile: 'borrar archivo ',
    dictMaxFilesExceeded:'el limite es un archivo ',
    headers:{
        'CSRF-Token':token
    },
    paramName:'Img',
    init: function (){
        const dropzone = this
        const BtnPublicar = document.querySelector('#publicar')
        BtnPublicar.addEventListener('click', function() {
            dropzone.processQueue();
            console.log("subido ");
        });
        dropzone.on('queuecomplete', function (){
            if (dropzone.getActiveFiles().length == 0){
                window.location.href='/mis-propiedades'
            }
        })
        
    }
}