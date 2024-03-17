import { unlink } from "node:fs/promises";
import { validationResult } from "express-validator";
import { Precio, Categoria, propiedad, Mensaje, usuario} from "../Models/relaciones.js";
import {EsVendedor,formatearFecha} from "../helpers/index.js";
import { Console } from "node:console";


// import Propiedad from "../Models/Propiedad.js

const admin = async (req, res) => {

    //leer query String 
    console.log(req.query)
    const { pagina: paginaActual } = req.query
    const expresion = /^[0-9]$/
    if (!expresion.test(paginaActual)) {
        console.log(`pagina actual ${paginaActual}`)
        return res.redirect('/mis-propiedades?pagina=1')
    }
    try {
        const { id } = req.usuario;
        const Limit = 3
        const offset = ((paginaActual * Limit) - Limit)
        const [propiedades,total] = await Promise.all([
            propiedad.findAll({
                limit: Limit,
                offset,
                where: {
                    usuarioId: id,
                },
                include: [
                    {
                        model: Categoria,
                        as: "categoria",
                    },
                    {
                        model: Precio,
                    },
                    {
                        model:Mensaje
                    }
                ],
            }),
            propiedad.count({
                where:{
                    usuarioId: id
                }
            })

        ]);
        res.render("propiedades/admin", {
            pagina: "Mis Propiedades",
            csrfToken: req.csrfToken(),
            propiedades,
            CantPaginas: Math.ceil(total/Limit),  //math ceil redondea para arriba
            paginaActual: Number(paginaActual),
            total,
            offset,
            Limit
           
        });
    } catch (error) {
        console.log(error)
    }

};
const crear = async (req, res) => {
    const [categorias, precios] = await Promise.all([
        Categoria.findAll(),
        Precio.findAll(),
    ]);
    res.render("propiedades/crear", {
        pagina: "Crear Propiedad",

        csrfToken: req.csrfToken(),
        categorias: categorias,
        precios: precios,
        datos: {},
    });
};
const Guardar = async (req, res) => {
    let resultado = validationResult(req);
    console.log(resultado.array());

    if (!resultado.isEmpty()) {
        console.log("llegue");
        const [categorias, precios] = await Promise.all([
            Categoria.findAll(),
            Precio.findAll(),
        ]);

        return res.render("propiedades/crear", {
            pagina: "Crear Propiedad",

            csrfToken: req.csrfToken(),
            categorias: categorias,
            precios: precios,
            errores: resultado.array(),
            datos: req.body,
        });
    }
    console.log("cuerpo del request ");
    console.log(req.body);
    // crear propiedad
    const {
        Titulo,
        Desc,
        Habitaciones,
        Estacionamiento,
        Banios: banios,
        calle,
        lat,
        longitud,
        Precio: PrecioId,
        Categoria: categoriaId,
    } = req.body;
    console.log("Valor de precioId:", PrecioId);
    const { id: usuarioId } = req.usuario;
    try {
        const PropiedadGuardada = await propiedad.create({
            titulo: Titulo,
            descripcion: Desc,
            habitaciones: Habitaciones,
            estacionamiento: Estacionamiento,
            toilette: banios,
            calle,
            lat,
            lng: longitud,
            imagen: "",
            PrecioId,
            categoriaId,
            usuarioId,
        });

        const { id } = PropiedadGuardada;

        res.redirect(`/propiedades/agregar-imagen/${id}`);
    } catch (error) {
        console.log(error);
    }
};
const validarPropiedad = (propiedad) => {
    return propiedad && !propiedad.publicado;
};

const agregarImagen = async (req, res) => {
    //validar que la propiedad existe
    const { id } = req.params;
    const Propiedad = await propiedad.findByPk(id);
    const isValidProperty = await validarPropiedad(Propiedad);
    if (!isValidProperty) {
        return res.redirect("/mis-propiedades");
    }
    // validar que la propiedad pertenezca al usuario
    console.log("usuario almacenado" + req.usuario);
    if (req.usuario.id.toString() !== Propiedad.usuarioId.toString()) {
        return res.redirect("/mis-propiedades");
    }
    res.render("propiedades/agregar-imagen", {
        pagina: `Agregar Imagen: ${Propiedad.titulo}`,
        csrfToken: req.csrfToken(),
        Propiedad,
    });
};
const AlmacenarImagen = async (req, res, next) => {
    const { id } = req.params;
    const Propiedad = await propiedad.findByPk(id);
    const isValidProperty = validarPropiedad(Propiedad);

    if (!isValidProperty) {
        return res.redirect("/mis-propiedades");
    }
    // validar que la propiedad pertenezca al usuario

    if (req.usuario.id.toString() !== Propiedad.usuarioId.toString()) {
        return res.redirect("/mis-propiedades");
    }
    try {
        Propiedad.imagen = req.file.filename;
        Propiedad.publicado = true;
        await Propiedad.save();
        next();
    } catch (error) {
        console.log(error);
    }
};
const editar = async (req, res) => {
    const { id } = req.params;
    const Propiedad = await propiedad.findByPk(id);

    if (!Propiedad) {
        return res.redirect("/mis-propiedades");
    }
    if (req.usuario.id.toString() !== Propiedad.usuarioId.toString()) {
        return res.redirect("/mis-propiedades");
    }
    const [categorias, precios] = await Promise.all([
        Categoria.findAll(),
        Precio.findAll(),
    ]);
    res.render("propiedades/editar", {
        pagina: `Editar Propiedad: ${Propiedad.titulo}`,
        csrfToken: req.csrfToken(),
        categorias: categorias,
        precios: precios,
        datos: Propiedad,
    });
};
const GuardarCambios = async (req, res) => {
    let resultado = validationResult(req);
    console.log(resultado.array());

    if (!resultado.isEmpty()) {
        console.log("llegue");
        const [categorias, precios] = await Promise.all([
            Categoria.findAll(),
            Precio.findAll(),
        ]);
        return res.render("propiedades/editar", {
            pagina: `Editar Propiedad: ${propiedad.titulo}`,

            csrfToken: req.csrfToken(),
            categorias: categorias,
            precios: precios,
            errores: resultado.array(),
            datos: req.body,
        });
    }
    const { id } = req.params;
    const Propiedad = await propiedad.findByPk(id);
    // const isValidProperty =  validarPropiedad(Propiedad);

    if (!Propiedad) {
        console.log("no autorizado");
        return res.redirect("/mis-propiedades");
    }
    if (req.usuario.id.toString() !== Propiedad.usuarioId.toString()) {
        console.log("no autorizado usuario incorrecto ");
        return res.redirect("/mis-propiedades");
    }
    try {
        console.log(req.body);
        const {
            Titulo: titulo,
            Desc,
            Habitaciones: habitaciones,
            Estacionamiento: estacionamiento,
            Banios: toilette,
            calle,
            lat,
            longitud: lng,
            Precio: PrecioId,
            Categoria: categoriaId,
        } = req.body;
        Propiedad.set({
            titulo,
            descripcion: Desc,
            habitaciones,
            estacionamiento,
            toilette, // Usar el alias 'toilette' en lugar de 'Toilette'
            calle,
            lat,
            lng,
            PrecioId,
            categoriaId,
        });
        console.log("estoy por guardar los cambios ..... ");
        await Propiedad.save();
        res.redirect("/mis-propiedades");
    } catch (error) {
        console.log("estoy en el error" + error);
    }
};

const eliminarPropiedad = async (req, res) => {
    const { id } = req.params;
    const Propiedad = await propiedad.findByPk(id);

    if (!Propiedad) {
        return res.redirect("/mis-propiedades");
    }
    if (req.usuario.id.toString() !== Propiedad.usuarioId.toString()) {
        return res.redirect("/mis-propiedades");
    }
    //eliminar img
    console.log(Propiedad);

    await unlink(`public/uploads/${Propiedad.imagen}`);
    await Propiedad.destroy();
    res.redirect("/mis-propiedades");
};
// Modificar Estado Propiedad 
const ModificarEstadoPropiedad = async (req,res) =>{
    const { id } = req.params;
    const Propiedad = await propiedad.findByPk(id);

    if (!Propiedad) {
        return res.redirect("/mis-propiedades");
    }
    if (req.usuario.id.toString() !== Propiedad.usuarioId.toString()) {
        return res.redirect("/mis-propiedades");
    }
    Propiedad.publicado = ! Propiedad.publicado
    await Propiedad.save()

     return res.json({
        resultado:'ok'
     })
}
const mostrarPropiedad = async (req, res) => {
    
    const { id } = req.params

    const Propiedad = await propiedad.findByPk(id, {
        include: [
            {
                model: Categoria,
                as: "categoria",
            },
            {
                model: Precio,
            },
        ],
    })
    if (!Propiedad || ! Propiedad.publicado) {
        console.log('redireccione ')
        res.redirect('/404')
        return 
    }
    console.log(`soy vendedor ${EsVendedor(req.usuario?.id, Propiedad.usuarioId)}`)
    res.render('propiedades/mostrar', {
        Propiedad,
        pagina: Propiedad.titulo,
        csrfToken: req.csrfToken(),
        usuario: req.usuario,
        vendedor: EsVendedor(req.usuario?.id, Propiedad.usuarioId)

    })
}
const enviarMensaje = async (req,res) =>{
    const { id } = req.params

    const Propiedad = await propiedad.findByPk(id, {
        include: [
            {
                model: Categoria,
                as: "categoria",
            },
            {
                model: Precio,
            },
        ],
    })
    if (!Propiedad) {
        console.log('redireccione ')
        res.redirect('/404')
        return 
    }
    let resultado = validationResult(req);
    console.log(resultado.array());

    if (!resultado.isEmpty()) {
         return res.render('propiedades/mostrar', {
            Propiedad,
            pagina: Propiedad.titulo,
            csrfToken: req.csrfToken(),
            usuario: req.usuario,
            vendedor: EsVendedor(req.usuario?.id, Propiedad.usuarioId),
            errores: resultado.array()
    
        })
    }
    const {mensaje}= req.body
    const {id:propiedadeId} = req.params
    const {id:usuarioId} = req.usuario

    await Mensaje.create({
        nombre:mensaje,
        propiedadeId,
        usuarioId
    })

    res.redirect('/')
}
//leer mensajes recibidos 
const verMensajes = async (req,res) =>{
    const { id } = req.params;
    const Propiedad = await propiedad.findByPk(id,
        {include: [   
            {
                model:Mensaje,
                include:[{model:usuario.scope('eliminarPassword')}]
            }
        ],
    });

    if (!Propiedad) {
        return res.redirect("/mis-propiedades");
    }
    if (req.usuario.id.toString() !== Propiedad.usuarioId.toString()) {
        return res.redirect("/mis-propiedades");
    }
    console.log(Propiedad.Mensajes)
    res.render("propiedades/mensajes",{
        pagina:'Mensajes',
        mensajes: Propiedad.Mensajes,
        formatearFecha
    })
}

export {
    admin,
    crear,
    Guardar,
    agregarImagen,
    AlmacenarImagen,
    editar,
    GuardarCambios,
    eliminarPropiedad,
    mostrarPropiedad,
    enviarMensaje,
    verMensajes,
    ModificarEstadoPropiedad
};
