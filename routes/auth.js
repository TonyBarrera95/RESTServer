const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");

const { login } = require("../controllers/auth");


const router = Router();

router.post("/login", [
    check('correo','Por favor ingrese un correo valido').isEmail(),
    check('password','Por favor ingrese una password correcto' ).notEmpty(),
    validarCampos
], login);

module.exports = router