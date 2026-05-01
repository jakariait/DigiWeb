const CaseStudyService = require("../services/CaseStudyService");

const createCaseStudy = async (req, res) => {
  try {
    const {
      brandTitle,
      brandWebsite,
      founder,
      businessStarted,
      industry,
      title,
      keyResults,
      description,
    } = req.body;

    let brandLogo, caseStudyThumbnail;
    if (req.files) {
      if (req.files.brandLogo) {
        brandLogo = req.files.brandLogo[0].filename;
      }
      if (req.files.caseStudyThumbnail) {
        caseStudyThumbnail = req.files.caseStudyThumbnail[0].filename;
      }
    }

    const caseStudy = await CaseStudyService.createCaseStudy({
      brandLogo,
      caseStudyThumbnail,
      brandTitle,
      brandWebsite,
      founder,
      businessStarted,
      industry,
      title,
      keyResults,
      description,
    });

    res.status(201).json({
      success: true,
      message: "Case study created successfully",
      data: caseStudy,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to create case study",
        error: error.message,
      });
  }
};

const getAllCaseStudies = async (req, res) => {
  try {
    const caseStudies = await CaseStudyService.getAllCaseStudies();
    const totalCaseStudies = await CaseStudyService.countCaseStudies(); // Get total count
    res.status(200).json({
      success: true,
      message: "Case studies retrieved successfully",
      data: caseStudies,
      total: totalCaseStudies, // Include total count
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to retrieve case studies",
        error: error.message,
      });
  }
};

const getCaseStudyBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const caseStudy = await CaseStudyService.getCaseStudyBySlug(slug);
    if (!caseStudy) {
      return res
        .status(404)
        .json({ success: false, message: "Case study not found" });
    }
    res.status(200).json({
      success: true,
      message: "Case study retrieved successfully",
      data: caseStudy,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to retrieve case study",
        error: error.message,
      });
  }
};

const updateCaseStudyBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const data = req.body;
    const newImages = {};

    if (req.files) {
      if (req.files.brandLogo) {
        newImages.brandLogo = req.files.brandLogo[0].filename;
      }
      if (req.files.caseStudyThumbnail) {
        newImages.caseStudyThumbnail = req.files.caseStudyThumbnail[0].filename;
      }
    }

    const updatedCaseStudy = await CaseStudyService.updateCaseStudyBySlug(
      slug,
      data,
      newImages,
    );

    if (!updatedCaseStudy) {
      return res
        .status(404)
        .json({ success: false, message: "Case study not found" });
    }
    res.status(200).json({
      success: true,
      message: "Case study updated successfully",
      data: updatedCaseStudy,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to update case study",
        error: error.message,
      });
  }
};

const deleteCaseStudyBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const deletedCaseStudy = await CaseStudyService.deleteCaseStudyBySlug(slug);
    if (!deletedCaseStudy) {
      return res
        .status(404)
        .json({ success: false, message: "Case study not found" });
    }
    res.status(200).json({
      success: true,
      message: "Case study deleted successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to delete case study",
        error: error.message,
      });
  }
};

const updateCaseStudiesOrder = async (req, res) => {
  console.log("Received request to reorder case studies:", req.body);
  try {
    const { orderedIds } = req.body; // Array of _id strings
    if (!orderedIds || !Array.isArray(orderedIds)) {
      console.error("Validation failed: orderedIds is missing or not an array");
      return res
        .status(400)
        .json({ success: false, message: "Missing or invalid orderedIds" });
    }
    await CaseStudyService.updateCaseStudiesOrder(orderedIds);
    console.log("Successfully reordered case studies.");
    res.status(200).json({
      success: true,
      message: "Case studies order updated successfully",
    });
  } catch (error) {
    console.error("Error updating case studies order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update case studies order",
      error: error.message,
    });
  }
};

module.exports = {
  createCaseStudy,
  getAllCaseStudies,
  getCaseStudyBySlug,
  updateCaseStudyBySlug,
  deleteCaseStudyBySlug,
  updateCaseStudiesOrder,
};
