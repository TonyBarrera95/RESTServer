const mongoose = require('mongoose')

const dbConection  = async () => {
    try {
        
        await mongoose.connect( process.env.MONGODB_CNN,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log('Base de datos Online, WIIII que teso')

    } catch (error) {
        console.error(error)
        throw new Error('Error al conectar con la base de datos, pailas, mejor se pega un tiro')
    }
}

module.exports = {
    dbConection,
}