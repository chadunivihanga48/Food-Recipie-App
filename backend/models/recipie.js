const mongoose = require("mongoose")

const recipieSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    ingredients: {
        type: Array,
        required: true
    },
    instructions: {
        type: String,
        required: true
    },
    time: {
        type: String,
        
    },
    coverImage: {
        type: String,
        },

    createdBy: {
        ype: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {timeStamps: true})

module.exports = mongoose.model("Recipies", recipieSchema)