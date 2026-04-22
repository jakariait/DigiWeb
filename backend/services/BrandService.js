const CarouselModel = require("../models/BrandModel");

const createCarousel = async (imgSrc) => {
  const maxOrder = await CarouselModel.findOne().sort({ order: -1 });
  const newOrder = maxOrder ? maxOrder.order + 1 : 0;
  return await CarouselModel.create({ imgSrc, order: newOrder });
};

const getAllCarousels = async () => {
  return await CarouselModel.find().sort({ order: 1 });
};

const deleteCarousel = async (id) => {
  return await CarouselModel.findByIdAndDelete(id);
};

const reorderCarousel = async (carouselIds) => {
  const updates = carouselIds.map((id, index) => ({
    updateOne: {
      filter: { _id: id },
      update: { order: index },
    },
  }));
  return await CarouselModel.bulkWrite(updates);
};

module.exports = {
  createCarousel,
  getAllCarousels,
  deleteCarousel,
  reorderCarousel,
};