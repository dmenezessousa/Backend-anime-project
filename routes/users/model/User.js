const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {type: String},
    lastName: {type:String},
    userName:{type: String, unique: true},
    email: {type: String, unique: true},
    password:{type: String},
    animeHistory:[{type: mongoose.Schema.ObjectId, ref: "anime"}],
    mangaHistory:[{type: mongoose.Schema.ObjectId, ref: "manga"}],
},{
    timestamps: true,
});

module.exports = mongoose.model("user", userSchema);

