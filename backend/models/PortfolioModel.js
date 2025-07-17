const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    portfolioImg: { type: String, required: true },
    name: { type: String, required: true },
    link: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const PortfolioModel = mongoose.model("Portfolio", DataSchema);

module.exports = PortfolioModel;