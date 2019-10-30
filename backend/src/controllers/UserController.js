const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');
const imgur = require('../services/imgur')

require("../models/user");


function generateToken(params = {}){       
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

const User = mongoose.model("User");


module.exports = {

    async index(req, res){
        const users = await User.find();

        return res.json(users);
    },

    async authenticate(req, res){

        const {email, password} = req.body;

        const user = await User.findOne({email}).select('+password');

        if(!user){
            return res.status(400).send({message: "Usuario não encontrado!"});
        }

        if(!await bcrypt.compare(password, user.password)){
            return res.status(400).send({message: "Senha digitada está incorreta!"})
        }

        user.password = undefined;

        return res.json({
            user, 
            avatar: user.avatar,
            token: generateToken({id: user.id})
        });

    },

    async show(req, res){
        
        try {
            const user = await User.findOne({_id: req.params.id});
            return res.json(user);
        } catch (error) {
            return res.send(error)
        }
 
    },

    async store(req, res){
        const { email } = req.body;
        let avatarlink = null;
        if(await User.findOne({email})){

            return res.status(400).send({message: "usuario já existe"});

        }

        const {username, avatar, description, password} = req.body;

        if(avatar !== null){
            const response = await imgur(avatar);

            if(!response){
                return res.status(400).send({message: "Erro ao salvar imagem de usuario"});
            }

            avatarlink = response.link;
            console.log(avatarlink);
        }

        

        try {
            const user = await User.create({username, avatar: avatarlink, description, email, password});
           
            user.password = undefined;

            return res.json({
                user,
                avatar: user.avatar,
                token: generateToken({id: user.id})
            })

            
        } catch (error) {
            return res.status(401).send({error: "Erro ao criar usuario"})
        }


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