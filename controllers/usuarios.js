const {response} = require("express")
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario');
const { validationResult } = require("express-validator");

const usuariosGet = (req, res = response ) => {
    res.json({
        msg: 'get API'
    });
}

const usuariosPut = (req, res =  response) => {
    res.json({
        msg: 'get PUT'
    });
}

const usuariosPost =  async (req, res = response) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(400).json(errors)
    }


    const {nombre, correo, password, rol} = req.body;
    const usuario = Usuario({nombre, correo, password, rol});

    //   Verificar si el correo existe

    const existeEmail = await Usuario.findOne({correo});
    if ( existeEmail ){
        return res.status(400).json({
            msg: 'Mi rey, lo siento pero ese correo ya está registrado :('
        })
    }

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