const { response } = require("express");


const login = (req, res = response)=> {

    res.json({
        msg: "Bienvenido"
    })
}

module.exports = {
    login,
}