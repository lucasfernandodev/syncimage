const mongoose = require('mongoose');


const ImageSchema = new mongoose.Schema({
    user_id: {
        type: String,
        
    },
    image_id: {
        type: String,
        
    },
    title: {
        type: String,
        
    },
    description: {
        type: String,
        
    },
    category: {
        type: String,
        
    },
    privacy: {
        type: String,
        
    },
    size: {
        type: String,
        
    },
    link: {
        type: String,
        
    },
    link_preview: {
        type: String,
        
    },
    type: {
        type: String,
        
    },
    deletehash: {
        type: String,
        
    }
})


mongoose.model('Image', ImageSchema);