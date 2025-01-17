const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");
const { validarRol, validarExisteEmail, validarExisteID } = require("../helpers/db-validator");

const { usuariosGet, usuariosPut, usuariosDelete, usuariosPost } = require("../controllers/usuarios");

const router = Router();

router.get("/", usuariosGet);

router.put("/:id",[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(validarExisteID),
    check('rol').custom( validarRol),
    validarCampos
], usuariosPut);

router.post("/", [
    check('nombre', "El nombre es obligatorio" ).notEmpty(),
    check('password', "El password es menor a 6 dígitos" ).isLength({ min: 6 }),
    check('correo', "El correo no es valido" ).isEmail(),
    check('correo').custom(validarExisteEmail),
    // check('rol', "El rol no es valido" ).isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom( validarRol),
    validarCampos
],usuariosPost);

router.delete("/:id", [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(validarExisteID),
    validarCampos
],usuariosDelete);

module.exports = router;