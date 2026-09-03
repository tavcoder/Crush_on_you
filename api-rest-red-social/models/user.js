const { Schema, model } = require("mongoose");

const UserSchema = Schema({
    name: {
        type: String,
        required: true
    },
    surname: String,
    nick: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    city: String,
    country: String,
    interests: [String],

    profileDetails: {
        bio: String,
        education: String,
        languages: String,
        smoke: String,
        drink: String,
    },
    role: {
        type: String,
        default: "role_user"
    },
    bookmarks: [{
        type: Schema.ObjectId,
        ref: "Publication"
    }],
    image: {
        type: String,
        default: "default.png"
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = model("User", UserSchema, "users");
// Coleccion: users