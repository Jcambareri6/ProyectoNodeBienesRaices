import path from 'path'
  export default {
    mode: 'development',
    entry:{
      mapa: './src/js/mapa.js',
      agregarImg:'./src/js/agregarImg.js',
      mostrarMapa:'./src/js/MostrarMapa.js',
      mapaInicio:'./src/js/mapaInicio.js',
      cambiarEstado:'./src/js/cambiarEstado.js'
    },
    output:{
      filename: '[name].js',
      path: path.resolve('public/js')
    }

}