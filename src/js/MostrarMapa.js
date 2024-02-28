(function(){
 let Latitud = document.querySelector('#lat').textContent
 let Longitud = document.querySelector('#lng').textContent
 let mapa= L.map('mapa').setView([Latitud,Longitud],16)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);

    L.marker([Latitud,Longitud]).addTo(mapa)

})()