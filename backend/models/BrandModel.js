const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    imgSrc: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const BrandModel = mongoose.model("Brand", DataSchema);

module.exports = BrandModel;