(function() {
    const lat =  document.querySelector('#lat').value || -38.5680604;
    const lng = document.querySelector('#lng').value || -58.7400821;
    const mapa = L.map('mapa').setView([lat, lng ], 15);
    let marker;
    // utilizar provider y geocoder 
    const  geoCoder = L.esri.Geocoding.geocodeService()
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);
     // pin de ubicacion 
        marker=  new L.marker([lat,lng],{
            draggable:true,
            autoPan:true
        }).addTo(mapa)
     // datos de ubicacion
    marker.on('moveend', function(e){
        marker= e.target
        const posicion = marker.getLatLng();
        mapa.panTo(new L.LatLng(posicion.lat,posicion.lng))

        // obtener info de las calles 
        geoCoder.reverse().latlng(posicion,13).run(function(error,resultado){
            console.log(resultado)
            marker.bindPopup(resultado.address.LongLabel)

            // llenar campos 
            document.querySelector('.calle').textContent= resultado?.address?.Address ?? ''
            document.querySelector('#calle').value= resultado?.address?.Address ?? ''
            document.querySelector('#lat').value= resultado?.latlng?.lat ?? ''
            document.querySelector('#lng').value= resultado?.latlng?.lng ?? ''

        })
    })


})()