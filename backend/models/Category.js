const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema(
  {
    productId: {
      type: String,
    },
    categoryName: {
      type: String,
      required: true,
    },
    categoryDescription: {
      type: String,
      required: true,
    },
  },
)

const Category = mongoose.model('category', categorySchema)
module.exports = Category