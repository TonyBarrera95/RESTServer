const {response} = require("express")
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario');

const usuariosGet = async (req, res = response ) => {
    const {limite = 5, desde = 0} = req.query;
    const query = {estado : true};

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ])
       
    res.json({
        total,
        usuarios,
    });
}

const usuariosPut = async (req, res =  response) => {
    const { id } = req.params;
    const {password, correo, _id, estado, google, ...resto} = req.body;

    if( password ) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt) 
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto)
    res.json({
        usuario,
    });
}

const usuariosPost =  async (req, res = response) => {


    const {nombre, correo, password, rol} = req.body;
    const usuario = Usuario({nombre, correo, password, rol});

    // Encriptar el password

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt)

    // Guardar en la base de datos
    await usuario.save();
    
    res.json({
        usuario
    });
}

const usuariosDelete = async (req, res) => {
    const {id} = req.params;
  
    // eliminar fisicamente:
    // const usuario = await Usuario.findByIdAndDelete( id );

    // desactivar usuario:
    const usuario = await Usuario.findByIdAndUpdate(id, {estado : false});

    res.json(usuario);
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}