const mongoose = require("mongoose");

const mangaSchema = new mongoose.Schema({
    title:{type: String},
    mangaPoster:{ type: String},
    mangaID:{type: String},
    mangaOwner:{type: mongoose.Schema.ObjectId, ref: "user"},
},{timestamps : true,});

module.exports = mongoose.model("manga", mangaSchema);