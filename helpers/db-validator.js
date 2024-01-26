
const Role = require("../models/role")
const Usuario = require("../models/usuario")


// Validar el rol del usuario
const validarRol = async (rol = "") => {
    const existeRole = await Role.findOne({ rol });
    if (!existeRole) {
        throw new Error(`El rol ${rol} no existe en la base de datos`)
    }
}

// Validar si el correo existe en la base de datos
const validarExisteEmail = async(correo = "" ) => {
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo ${correo} ya está registado en nuestra base de datos`)
        
    }
}

// Validar si el correo existe en la base de datos
const validarExisteID = async(id ) => {
    const existeId = await Usuario.findById(id);
    if (!existeId) {
        throw new Error(`El ID "${id}" no existe en nuestra base de datos`)
        
    }
}


module.exports = {
    validarRol,
    validarExisteEmail,
    validarExisteID,
}