const mongoose = require('mongoose');


const CategorySchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    category: {
        type: [],
        required: true
    }
})


mongoose.model('Category', CategorySchema);