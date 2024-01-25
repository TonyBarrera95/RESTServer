
const Role = require("../models/role")


const validarRol = async (rol = "")=> {
    const existeRole = await Role.findOne({ rol });
    if (!existeRole){
        throw new Error(`El rol ${ rol} no existe en la base de datos`)
    }
}

module.exports = {
    validarRol
}