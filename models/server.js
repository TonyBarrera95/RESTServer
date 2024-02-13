const express = require("express");
const cors = require("cors");
const { dbConection } = require('../DataBase/config')

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT
    this.usuariosPath = '/api/usuarios'
    this.authPath = '/api/auth'

    //Conectar con la base de datos
    this.conectarDB()
    // Middlewares
    this.middlewares()

    // Las rutas del APP son 
    this.routes()
  }

  async conectarDB(){
    await dbConection() 
  }

  

  routes() {

    this.app.use( this.authPath, require('../routes/auth'))
    this.app.use( this.usuariosPath, require('../routes/usuarios'))

  }

  middlewares(){
    //cors
    this.app.use(cors())

    // lectura y parseo de body
    this.app.use(express.json())

    // Directorio publico
    this.app.use(express.static('public'))
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("El server está ON en el puertillo:", this.port);
    });
  }
}

module.exports = {
    Server,
}