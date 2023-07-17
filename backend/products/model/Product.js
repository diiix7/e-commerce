const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true
    },
    countInStock: {
      type: Number,
      required: true
    },
    //POUR UNE IMAGE
    /*
    image: {
      data: Buffer,
      contentType: String,
    }
    */
  },
)

const Product = mongoose.model('products', productSchema)
module.exports = Product
