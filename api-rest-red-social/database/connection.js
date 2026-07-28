const mongoose = require("mongoose");
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const connection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Conectado correctamente a bd: mi_redsocial");
    } catch (error) {
        console.log(error);
        throw new Error("No se ha podido conectar a la base de datos !!");
    }
}

module.exports = connection;