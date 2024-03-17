/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/mapaInicio.js":
/*!******************************!*\
  !*** ./src/js/mapaInicio.js ***!
  \******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n(function () {\r\n\r\n    const lat = -38.5680604;\r\n    const lng = -58.7400821;\r\n    let propiedades=[]\r\n\r\n    const mapa = L.map('mapa-inicio').setView([lat, lng], 15);\r\n    const Filtros = {\r\n        Categoria: '',\r\n        Precio: ''\r\n    }\r\n    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {\r\n        attribution: '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors'\r\n    }).addTo(mapa);\r\n    let markers = new L.FeatureGroup().addTo(mapa);\r\n    const FiltroCategorias = document.querySelector('#categorias')\r\n    const FiltroPrecio = document.querySelector('#Precios')\r\n    FiltroCategorias.addEventListener('change', (e) => {\r\n        Filtros.Categoria = +e.target.value\r\n        filtrarPropiedades()\r\n        \r\n\r\n    })\r\n    FiltroPrecio.addEventListener('change', (e) => {\r\n        Filtros.Precio = +e.target.value\r\n      \r\n\r\n    })\r\n\r\n\r\n    const ObtenerPropiedades = async (req, res) => {\r\n        try {\r\n            let url = 'api/propiedades'\r\n            const respuesta = await fetch(url)\r\n             propiedades = await respuesta.json()\r\n            mostrarPropiedades(propiedades)\r\n\r\n        } catch (error) {\r\n            console.log(error)\r\n        }\r\n    }\r\n\r\n    const mostrarPropiedades = propiedades => {\r\n        console.log(propiedades)\r\n        markers.clearLayers()\r\n        propiedades.forEach(propiedad => {\r\n            //agregar los pines \r\n            const marker = new L.marker([propiedad?.lat, propiedad?.lng], {\r\n                autoPan: true,\r\n\r\n            }).addTo(mapa).bindPopup(`\r\n             <h1 class=\" text-xl font-extrabold uppercase my-3\">${propiedad.titulo}</h1>\r\n             <img src=\"/uploads/${propiedad.imagen}\" alt =\"Imagen de la propiedad  ${propiedad.titulo} \">\r\n             <p class=\"text-gray-600 font-bold\">${propiedad.Precio.nombre}</p>\r\n             <p class=\"text-indigo-600 font-bold\">${propiedad.categoria.nombre}</p>\r\n             <a href=\"/propiedades/mostrar-propiedad/${propiedad.id}\" class=\"bg-indigo-600 block p-2 font-bold uppercase\"> Ver Propiedad </a>\r\n            `)\r\n            markers.addLayer(marker)\r\n        });\r\n    }\r\n    const filtrarPropiedades = () => {\r\n        const resultado = propiedades.filter(filtrarPorCategoria).filter(filtrarPorPrecio)\r\n        mostrarPropiedades(resultado)\r\n    } \r\n    const filtrarPorCategoria = ( propiedad ) => { \r\n        return Filtros.Categoria ? propiedad.categoriaId === Filtros.Categoria : propiedad\r\n    }\r\n    const filtrarPorPrecio = ( propiedad ) => { \r\n        return Filtros.Precio ? propiedad.PrecioId === Filtros.Precio : propiedad\r\n    }\r\n    ObtenerPropiedades()\r\n\r\n})()\n\n//# sourceURL=webpack://bienesRaices/./src/js/mapaInicio.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/mapaInicio.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;