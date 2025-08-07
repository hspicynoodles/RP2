// Mongoose user Schema : sole purpose is for backend to know what kind of information to expect 
// store and validate for each user
const mongoose = require("mongoose"); // ✅ This is the correct syntax

const Schema = mongoose.Schema; // create access to mongoose.Schema 

//define what every user in app should look like in database
const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,

    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    datingPreferences: [
        {
            type: String,
        },
    ],

    likedProfiles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    recievedLikes: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true
            },
            image: {
                type: String,
                required: true
            },
            comment: {
                type: String,
            },
        },
    ],
    matches: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    blockedUsers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ]
});

module.exports = mongoose.model("User", userSchema);
