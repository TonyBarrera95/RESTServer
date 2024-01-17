const {response} = require("express")
const Usuario = require('../models/usuario')

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
    const body = req.body;
    const usuario = Usuario(body);

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