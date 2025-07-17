const PortfolioModel = require("../models/PortfolioModel");

// Create Portfolio
const createPortfolio = async (portfolioImg, name, link) => {
  return PortfolioModel.create({ portfolioImg, name, link });
};

// Get All Portfolio
const getAllPortfolio = async () => {
  return PortfolioModel.find();
};

// Delete Portfolio
const deletePortfolio = async (id) => {
  return PortfolioModel.findByIdAndDelete(id);
};

// Update Portfolio
const updatePortfolio = async (id, updates) => {
  return PortfolioModel.findByIdAndUpdate(id, updates, { new: true });
};

module.exports = {
  createPortfolio,
  getAllPortfolio,
  deletePortfolio,
  updatePortfolio,
};
