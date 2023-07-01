const User = require("../models/user");
const bcrypt = require("bcryptjs");

const controller = {
    register: async (req, res) => {
        try {
            let { name, email, password } = req.body;
            password = await bcrypt.hash(password, 12);
            const user = new User({ name, email, password });
            const result = await user.save();
            if (result) {
                return res.status(200).send({
                    status: "Success",
                    result
                });
            }
        }
        catch (err) {
            return res.status(500).send({
                status: "Error",
                message: "Ha ocurrido un error"
            });
        }
    },
    getUsers: async (req, res) => {
        try {
            const users = await User.find({}).sort({
                _id: "desc"
            });
            return res.status(200).send({
                status: "Success",
                users
            });
        } catch (err) {
            return res.status(500).send({
                status: "Error",
                message: "Ha ocurrido un error"
            });
        }
    },
    getUser: async (req, res) => {
        try {
            const id = req.params.id;
            const user = await User.findById(id);
            return res.status(200).send({
                status: "Success",
                user
            });
        } catch (err) {
            return res.status(500).send({
                status: "Error",
                message: "Ha ocurrido un error"
            });
        }
    },
    login: async (req, res) => {
        try {
            const body = req.body;
            const data = await User.findOne({ email: body.email });
            if (data) {
                let passwordCheck = await bcrypt.compare(body.password, data.password);
                if (passwordCheck) {
                    res.status(200).send({ message: "Autenticado" });
                } else {
                    res.status(401).send({ message: "Contraseña inválida" });
                }
            } else {
                return res.status(404).send({
                    status: "Error",
                    message: "Usuario no encontrado"
                });
            }
        }
        catch (err) {
            return res.status(500).send({
                status: "Error",
                message: "Ha ocurrido un error"
            });
        }
    }
};

module.exports = controller;