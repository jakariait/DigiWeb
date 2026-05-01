const CaseStudyModel = require("../models/CaseStudyModel");
const fs = require("fs");
const path = require("path");

const createCaseStudy = async (data) => {
  const count = await CaseStudyModel.countDocuments();
  data.order = count;
  const newCaseStudy = new CaseStudyModel(data);
  return await newCaseStudy.save();
};

const getAllCaseStudies = async () => {
  return CaseStudyModel.find()
    .sort({ order: "asc" })
    .select(" -brandWebsite  -businessStarted -description");
};

const getCaseStudyBySlug = async (slug) => {
  return CaseStudyModel.findOne({ slug });
};

const updateCaseStudyBySlug = async (slug, data, newImages) => {
  const caseStudy = await CaseStudyModel.findOne({ slug });
  if (!caseStudy) {
    throw new Error("Case study not found");
  }

  // Handle brandLogo update
  if (newImages.brandLogo) {
    if (caseStudy.brandLogo) {
      const oldImagePath = path.join(
        __dirname,
        "..",
        "uploads",
        caseStudy.brandLogo,
      );
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }
    caseStudy.brandLogo = newImages.brandLogo;
  }

  // Handle caseStudyThumbnail update
  if (newImages.caseStudyThumbnail) {
    if (caseStudy.caseStudyThumbnail) {
      const oldImagePath = path.join(
        __dirname,
        "..",
        "uploads",
        caseStudy.caseStudyThumbnail,
      );
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }
    caseStudy.caseStudyThumbnail = newImages.caseStudyThumbnail;
  }

  // Update other fields
  Object.assign(caseStudy, data);

  return await caseStudy.save();
};

const deleteCaseStudyBySlug = async (slug) => {
  const caseStudy = await CaseStudyModel.findOne({ slug });
  if (caseStudy) {
    if (caseStudy.brandLogo) {
      const imagePath = path.join(
        __dirname,
        "..",
        "uploads",
        caseStudy.brandLogo,
      );
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    if (caseStudy.caseStudyThumbnail) {
      const imagePath = path.join(
        __dirname,
        "..",
        "uploads",
        caseStudy.caseStudyThumbnail,
      );
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
  }
  return CaseStudyModel.findOneAndDelete({ slug });
};

const countCaseStudies = async () => {
  return CaseStudyModel.countDocuments();
};

const updateCaseStudiesOrder = async (orderedIds) => {
  try {
    const promises = orderedIds.map((id, index) => {
      console.log(`Updating case study ${id} to order ${index}`);
      return CaseStudyModel.findByIdAndUpdate(id, { order: index }).exec();
    });
    return await Promise.all(promises);
  } catch (error) {
    if (error.name === "CastError") {
      console.error(`Invalid ID format received: ${error.value}`);
      throw new Error(`Invalid ID format: ${error.value}`);
    }
    throw error;
  }
};

module.exports = {
  createCaseStudy,
  getAllCaseStudies,
  getCaseStudyBySlug,
  updateCaseStudyBySlug,
  deleteCaseStudyBySlug,
  countCaseStudies,
  updateCaseStudiesOrder,
};
