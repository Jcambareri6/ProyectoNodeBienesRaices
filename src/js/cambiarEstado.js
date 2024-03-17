(function(){
    let Estado = document.querySelectorAll('.cambiar-estado')
    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
   
    Estado.forEach(boton=>{
        boton.addEventListener('click',CambiarEstadoPropiedad)
    }) 
    async  function  CambiarEstadoPropiedad (e){
        const {propiedadId} = e.target.dataset
        // console.log(propiedadId)
        try {
            const url = `/propiedades/${propiedadId}`
            const respuesta =  await fetch(url,{
                method: 'PUT',
                headers:{
                    'CSRF-Token' : token,
                }
            })
            console.log(respuesta)
             let {resultado} = await respuesta.json()
             if(resultado){
                if(e.target.classList.contains('bg-yellow-100')){
                    e.target.classList.add('bg-green-100', 'text-green-800')
                    e.target.classList.remove('bg-yellow-100', 'text-yellow-800')
                    e.target.textContent= 'Publicado' 
                }else{
                    e.target.classList.add('bg-yellow-100', 'text-yellow-800')
                    e.target.classList.remove('bg-green-100', 'text-green-800')
                    e.target.textContent= 'No Publicado' 
                }
             }

             
         } catch (error) {
            console.log(error)
        }
       

    }
})()