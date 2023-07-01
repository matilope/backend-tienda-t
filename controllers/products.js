const Product = require("../models/product");
const cloudinary = require("cloudinary").v2;
cloudinary.config({ cloud_name: process.env.CLOUD_NAME, api_key: process.env.API_KEY, api_secret: process.env.API_SECRET });

const controller = {
    saveProduct: async (req, res) => {
        let {
            titulo,
            descripcion,
            marca,
            modelo,
            precio,
            distancia_focal,
            apertura
        } = req.body;
        try {
            let products = new Product();
            products.titulo = titulo;
            products.descripcion = descripcion;
            products.marca = marca;
            products.modelo = modelo;
            products.precio = precio;
            products.distancia_focal = distancia_focal;
            products.apertura = apertura;
            const image = await cloudinary.uploader.upload(req.files.image0url.path);
            products.image0url = image.secure_url;
            let product = await products.save();
            if (product) {
                return res.status(200).send({
                    status: "Success",
                    product
                });
            }
        } catch (err) {
            return res.status(500).send({
                status: "Error",
                message: "Ha ocurrido un error"
            });
        }
    },
    getProducts: async (req, res) => {
        try {
            let products = await Product.find({}).sort({
                _id: "desc"
            });
            return res.status(200).send({
                status: "Success",
                products
            });
        } catch (err) {
            return res.status(500).send({
                status: "Error",
                message: "Ha ocurrido un error"
            });
        }
    },
    getProduct: async (req, res) => {
        try {
            let id = req.params.id;
            if (!id || id == null) {
                return res.status(404).send({
                    status: "Error",
                    message: "No existe el producto"
                });
            }
            let product = await Product.findById(id);
            return res.status(200).send({
                status: "Success",
                product
            });
        } catch (err) {
            return res.status(500).send({
                status: "Error",
                message: "Ha ocurrido un error"
            });
        }
    },
    updateProduct: async (req, res) => {
        let productId = req.params.id;
        let body = req.body;
        let imageData = await Product.findById(productId);
        if (req.files?.image0url) {
            let dataLength = imageData.image0url.split(".");
            let imageName = dataLength[dataLength.length - 2].split("/").pop()
            await cloudinary.uploader.destroy(imageName);
            const image = await cloudinary.uploader.upload(req.files.image0url.path);
            body.image0url = image.secure_url;
        }
        try {
            let updateUser = await Product.findOneAndUpdate({
                _id: productId
            }, body);
            return res.status(200).send({
                status: 'Success',
                updateUser
            });
        } catch (err) {
            return res.status(500).send({
                status: "Error",
                message: "Ha ocurrido un error"
            })
        }
    },
    deleteProduct: async (req, res) => {
        let productId = req.params.id;
        try {
            let imageData = await Product.findById(productId);
            let dataLength = imageData.image0url.split(".");
            let imageName = dataLength[dataLength.length - 2].split("/").pop()
            await cloudinary.uploader.destroy(imageName);
            let deleteProduct = await Product.findOneAndDelete({
                _id: productId
            });
            return res.status(200).send({
                status: 'Success',
                deleteProduct
            });
        } catch (err) {
            return res.status(500).send({
                status: "Error",
                message: "Ha ocurrido un error"
            })
        }
    }
};

module.exports = controller;