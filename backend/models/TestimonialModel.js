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

const TestimonialModel = mongoose.model("Testimonial", DataSchema);

module.exports = TestimonialModel;