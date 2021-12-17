const mongoose = require("mongoose");

const animeSchema = new mongoose.Schema(
  {
    title: { type: String },
    animePoster: { type: String },
    animeID: { type: String },
    animeOwner: { type: mongoose.Schema.ObjectId, ref: "user" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("anime", animeSchema);
