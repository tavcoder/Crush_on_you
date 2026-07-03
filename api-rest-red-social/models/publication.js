// models/publication.js
const { Schema, model } = require("mongoose");

const PublicationSchema = Schema({
    user: {
        type: Schema.ObjectId,
        ref: "User"
    },
    text: {
        type: String,
        required: true
    },
    file: String,
    created_at: {
        type: Date,
        default: Date.now
    },
    likes: [{
        type: Schema.ObjectId,
        ref: "User"
    }],
    comments: [{
        user: { type: Schema.ObjectId, ref: "User" },
        text: String,
        created_at: { type: Date, default: Date.now }
    }]
});

module.exports = model("Publication", PublicationSchema, "publications");
