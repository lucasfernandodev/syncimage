const mongoose = require('mongoose');
const axios = require('axios');
require("../models/Image");

const Image = mongoose.model("Image");

module.exports = {
       async store(req, res){

        const base_URL = 'https://api.imgur.com/3/image';
        const headers = {
            headers: {
                'Authorization': 'Client-ID 0399bf5f8db335f'
            }
        }

        const info = req.body.info
        const base64 = req.body.image;
      

        if(!info.title || info.title === null || typeof(info.title) === undefined || info.title === ''){
            return res.status(400).json({message : 'Erro: campos invalidos'});
        }

        if(!info.description || info.description === null || typeof(info.description) === undefined || info.description === ''){
            return res.status(400).json({message : 'Erro: campos invalidos'});
        }

        if(!info.privacy || info.privacy === null || typeof(info.privacy) === undefined || info.privacy === ''){
            return res.status(400).json({message : 'Erro: campos invalidos'});
        }

        if(!info.category || info.category === null || typeof(info.category) === undefined || info.category === ''){
            return res.status(400).json({message : 'Erro: campos invalidos'});
        }

        
        try {
            response = await axios.post(base_URL, {'image': base64}, headers);
        } catch (error) {
            return res.status(400).send(`Falha ao fazer o upload da imagem no imgur. ${error}`);
        }

        const resData = response.data.data
        console.log(response);

        const itemData = {
            'user_id': info.user_id,
            'title': info.title,
            'description': info.description,
            'privacy': info.privacy,
            'category': info.category,
            'link': resData.link,
            'type': resData.type,
            'deleteHash' : resData.deletehash,
            'size': resData.size
        }
        
        const storeImageData = await Image.create(itemData)

        return res.status(201).json(storeImageData);
    },

    async index(req, res){
        const img = await Image.find();

        return res.json(img);
    },

    async show(req, res){
        const image = await Image.find({user_id: req.params.id});

        return res.json(image);
    },

 
}