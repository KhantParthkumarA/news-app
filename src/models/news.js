const mongoose = require('mongoose')
const Schema = mongoose.Schema

const newsSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    comments: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        description: { type: String, required: true },
    }]
}, { timestamps: true })

module.exports = mongoose.model('News', newsSchema)