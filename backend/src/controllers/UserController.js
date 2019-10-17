const mongoose = require('mongoose');
require("../models/user");

const User = mongoose.model("User");
module.exports = {
    async index(req, res){
        const users = await User.find();

        return res.json(users);
    },

    async show(req, res){
        const user = await User.findOne({name: req.params.id});

        return res.json(user);
    },

    async store(req, res){
        const { email } = req.body;

        if(await User.findOne({email})){

            return res.status(400).send({message: "usuario já existe"});

        }

        const user = await User.create(req.body);

        user.password == undefined;

        return res.json(user)
    },

    async update(req, res){
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})

        return res.json(user)
    },

    async destroy(res, req){
        await User.findByIdAndRemove(req.params.id);

        return res.json({message: "sucess"})
    }
}