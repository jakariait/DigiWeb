const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    portfolioImg: { type: String, required: true },
    name: { type: String, required: true },
    link: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const PortfolioModel = mongoose.model("Portfolio", DataSchema);

module.exports = PortfolioModel;