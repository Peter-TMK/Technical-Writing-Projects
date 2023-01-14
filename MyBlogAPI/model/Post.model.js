const mongoose = require('mongoose')

const Schema = mongoose.Schema
const PostSchema = new Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String },
    tags: { type: Array },
    state: { type: String, enum: ['draft', 'published'], default: 'draft'},
    read_count: { type: Number, default: 0 },
    reading_time: { type: Number },
    body: { type: String, required: true },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true});

// compiling the model
module.exports = mongoose.model("Post", PostSchema)
