const {response} = require("express")
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario');

const usuariosGet = (req, res = response ) => {
    res.json({
        msg: 'get API'
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

const usuariosDelete = (req, res) => {
    res.json({
        msg: 'get DELETE'
    });
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}