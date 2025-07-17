const PortfolioService = require("../services/PortfolioService");

// Create Portfolio
const createPortfolio = async (req, res) => {
  try {
    if (!req.files || !req.files.portfolioImg) {
      return res.status(400).json({ message: "Image file is required" });
    }

    const fileName = req.files.portfolioImg[0].filename;
    const { name, link } = req.body;

    if (!name || !link) {
      return res.status(400).json({ message: "Name and link are required" });
    }

    const portfolio = await PortfolioService.createPortfolio(fileName, name, link);

    res.status(201).json({
      status: "success",
      message: "Portfolio created successfully",
      data: portfolio,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to create portfolio",
      error: error.message,
    });
  }
};

// Get All Portfolios
const getAllPortfolio = async (req, res) => {
  try {
    const portfolios = await PortfolioService.getAllPortfolio();

    return res.status(200).json({
      status: "success",
      message: "Portfolios retrieved successfully",
      data: portfolios,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to retrieve portfolios",
      error: error.message,
    });
  }
};

// Delete Portfolio by ID
const deletePortfolioById = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await PortfolioService.deletePortfolio(id);

    if (!deleted) {
      return res.status(404).json({
        status: "fail",
        message: "Portfolio not found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Portfolio deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to delete portfolio",
      error: error.message,
    });
  }
};

// Update Portfolio by ID
const updatePortfolio = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, link } = req.body;

    let updatedData = { name, link };

    if (req.files && req.files.portfolioImg) {
      updatedData.portfolioImg = req.files.portfolioImg[0].filename;
    }

    const updated = await PortfolioService.updatePortfolio(id, updatedData);

    if (!updated) {
      return res.status(404).json({
        status: "fail",
        message: "Portfolio not found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Portfolio updated successfully",
      data: updated,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to update portfolio",
      error: error.message,
    });
  }
};

module.exports = {
  createPortfolio,
  getAllPortfolio,
  deletePortfolioById,
  updatePortfolio,
};
