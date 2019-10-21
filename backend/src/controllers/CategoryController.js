const mongoose = require('mongoose');
require("../models/Category");

const Category = mongoose.model("Category");

module.exports = {
    async index(req, res){
        const category = await Category.find();

        return res.status(201).json(category);
    },

    async show(req, res){

        try{
            const category = await Category.findOne({user_id: req.params.id});
            if(!category){
                return res.status(200).json({category: null});
            }

            return res.json(category);
        }
        catch(error){
            return res.status(400).send({message: "Erro na requisição"});
        }
        


    },

    async store(req, res){

        const  category = await Category.create(req.body)

        return res.status(201).json(category);
    },

    async update(req, res){
        const category = await Category.findOneAndUpdate(req.params.id, req.body, {new: true})

        return res.json(category)
    }
}