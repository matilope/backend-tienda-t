const {
    Schema,
    model
} = require("mongoose");

const productSchema = new Schema({
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    marca: {
        type: String,
        required: true
    },
    modelo: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    distancia_focal: {
        type: Number,
        required: true
    },
    apertura: {
        type: Number,
        required: true
    },
    image0url: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now
    }
});

module.exports = model('Product', productSchema);