const mongoose = require("mongoose");

const connection = async () => {

    try {
        await mongoose.connect("mongodb+srv://admin:!123Friends@cluster0.hpqftkg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

        console.log("Conectado correctamente a bd: mi_redsocial");

    } catch (error) {
        console.log(error);
        throw new Error("No se ha podido conectar a la base de datos !!");
    }

}

module.exports = connection;
