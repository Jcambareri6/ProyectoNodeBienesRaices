(function () {

    const lat = -38.5680604;
    const lng = -58.7400821;
    let propiedades=[]

    const mapa = L.map('mapa-inicio').setView([lat, lng], 15);
    const Filtros = {
        Categoria: '',
        Precio: ''
    }
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);
    let markers = new L.FeatureGroup().addTo(mapa);
    const FiltroCategorias = document.querySelector('#categorias')
    const FiltroPrecio = document.querySelector('#Precios')
    FiltroCategorias.addEventListener('change', (e) => {
        Filtros.Categoria = +e.target.value
        filtrarPropiedades()
        

    })
    FiltroPrecio.addEventListener('change', (e) => {
        Filtros.Precio = +e.target.value
      

    })


    const ObtenerPropiedades = async (req, res) => {
        try {
            let url = 'api/propiedades'
            const respuesta = await fetch(url)
             propiedades = await respuesta.json()
            mostrarPropiedades(propiedades)

        } catch (error) {
            console.log(error)
        }
    }

    const mostrarPropiedades = propiedades => {
        console.log(propiedades)
        markers.clearLayers()
        propiedades.forEach(propiedad => {
            //agregar los pines 
            const marker = new L.marker([propiedad?.lat, propiedad?.lng], {
                autoPan: true,

            }).addTo(mapa).bindPopup(`
             <h1 class=" text-xl font-extrabold uppercase my-3">${propiedad.titulo}</h1>
             <img src="/uploads/${propiedad.imagen}" alt ="Imagen de la propiedad  ${propiedad.titulo} ">
             <p class="text-gray-600 font-bold">${propiedad.Precio.nombre}</p>
             <p class="text-indigo-600 font-bold">${propiedad.categoria.nombre}</p>
             <a href="/propiedades/mostrar-propiedad/${propiedad.id}" class="bg-indigo-600 block p-2 font-bold uppercase"> Ver Propiedad </a>
            `)
            markers.addLayer(marker)
        });
    }
    const filtrarPropiedades = () => {
        const resultado = propiedades.filter(filtrarPorCategoria).filter(filtrarPorPrecio)
        mostrarPropiedades(resultado)
    } 
    const filtrarPorCategoria = ( propiedad ) => { 
        return Filtros.Categoria ? propiedad.categoriaId === Filtros.Categoria : propiedad
    }
    const filtrarPorPrecio = ( propiedad ) => { 
        return Filtros.Precio ? propiedad.PrecioId === Filtros.Precio : propiedad
    }
    ObtenerPropiedades()

})()