const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");
const { validarRol } = require("../helpers/db-validator");

const { usuariosGet, usuariosPut, usuariosDelete, usuariosPost } = require("../controllers/usuarios");

const router = Router();

router.get("/", usuariosGet);

router.put("/", usuariosPut);

router.post("/", [
    check('nombre', "El nombre es obligatorio" ).notEmpty(),
    check('password', "El password es menor a 6 dígitos" ).isLength({ min: 6 }),
    check('correo', "El correo no es valido" ).isEmail(),
    // check('rol', "El rol no es valido" ).isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom( validarRol),
    validarCampos
],usuariosPost);

router.delete("/", usuariosDelete);

module.exports = router;