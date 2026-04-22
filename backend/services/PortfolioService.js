const PortfolioModel = require("../models/PortfolioModel");

// Create Portfolio
const createPortfolio = async (portfolioImg, name, link) => {
  const maxOrder = await PortfolioModel.findOne().sort({ order: -1 });
  const newOrder = maxOrder ? maxOrder.order + 1 : 0;
  return PortfolioModel.create({ portfolioImg, name, link, order: newOrder });
};

// Get All Portfolio
const getAllPortfolio = async () => {
  return PortfolioModel.find().sort({ order: 1, createdAt: 1 });
};

// Delete Portfolio
const deletePortfolio = async (id) => {
  return PortfolioModel.findByIdAndDelete(id);
};

// Update Portfolio
const updatePortfolio = async (id, updates) => {
  return PortfolioModel.findByIdAndUpdate(id, updates, { new: true });
};

// Reorder Portfolio
const reorderPortfolio = async (portfolioIds) => {
  const updates = portfolioIds.map((id, index) => ({
    updateOne: {
      filter: { _id: id },
      update: { order: index },
    },
  }));
  return PortfolioModel.bulkWrite(updates);
};

module.exports = {
  createPortfolio,
  getAllPortfolio,
  deletePortfolio,
  updatePortfolio,
  reorderPortfolio,
};
