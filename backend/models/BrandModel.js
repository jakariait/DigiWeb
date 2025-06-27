const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    imgSrc: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const BrandModel = mongoose.model("Brand", DataSchema);

module.exports = BrandModel;