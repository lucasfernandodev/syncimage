const mongoose = require('mongoose');
const axios = require('axios');
require("../models/Category");

const Category = mongoose.model("Category");

module.exports = {
    async index(req, res){
        const category = await Category.find();

        return res.status(201).json(category);
    },

    async store(req, res){

        const  category = await Category.create(req.body)

        return res.status(201).json(category);
    },

    async update(req, res){
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, {new: true})

        return res.json(category)
    }
}