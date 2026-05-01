const mongoose = require("mongoose");
const slugify = require("slugify");

const DataSchema = mongoose.Schema(
  {
    brandLogo: String,
    brandTitle: String,
    brandWebsite: String,
    founder: String,
    businessStarted: String,
    industry: String,
    title: String,
    slug: {
      type: String,
      unique: true,
    },
    keyResults: String,
    description: String,
    caseStudyThumbnail: String,
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

DataSchema.pre("save", async function (next) {
  if (this.isModified("title")) {
    let slug = slugify(this.title, { lower: true, strict: true });
    let counter = 2;
    let existingCaseStudy = await this.constructor.findOne({ slug: slug });
    while (existingCaseStudy) {
      slug = `${slugify(this.title, { lower: true, strict: true })}-${counter}`;
      existingCaseStudy = await this.constructor.findOne({ slug: slug });
      counter++;
    }
    this.slug = slug;
  }
  next();
});

const CaseStudyModel = mongoose.model("CaseStudy", DataSchema);

module.exports = CaseStudyModel;
