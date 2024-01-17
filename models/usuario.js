const {Schema, model } = require('mongoose')

const usuarioSchema = Schema({
    nombre: {
        type: String,
        require: [true, 'El nombre es obligatorio'],
    },
    correo: {
        type: String,
        require: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        require: [true, 'La contraseña es obligatorio'],
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        require: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        require: true,
    },
    google: {
        type: Boolean,
        require: true,
    },
}) 

module.exports = model('Usuario', usuarioSchema )