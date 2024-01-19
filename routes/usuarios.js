const { Router } = require("express");
const { usuariosGet, usuariosPut, usuariosDelete, usuariosPost } = require("../controllers/usuarios");
const { check } = require("express-validator");

const router = Router();

router.get("/", usuariosGet);

router.put("/", usuariosPut);

router.post("/", [
    check('correo', "papi, q'ubo pues, pongame un correo valido y no esa mierda que escribió ahí " ).isEmail(),
],usuariosPost);

router.delete("/", usuariosDelete);

module.exports = router;