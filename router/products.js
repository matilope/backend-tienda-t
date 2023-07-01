const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/products");
const multipart = require("connect-multiparty");
const multipartMiddleware = multipart();

router.post('/product', multipartMiddleware, ProductController.saveProduct);

router.get('/products/?', ProductController.getProducts);

router.get('/product/:id', ProductController.getProduct);

router.put('/product/:id', multipartMiddleware, ProductController.updateProduct);

router.delete('/product/:id', ProductController.deleteProduct);

module.exports = router;