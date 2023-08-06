const mongoose = require("mongoose");
const User = require("./User")

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  countInStock: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  comments: [{
    //Pour exécuter npm run data:import
    user: {
      type: String,
      required: true,
    },
    /*
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Référence au modèle User
      required: true,
    },
    */
    content: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    }
  }],
  notes: [{
    //Pour exécuter npm run data:import
    user: {
      type: String,
      required: true,
    },
    /*
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Référence au modèle User
      required: true,
    },
    */
    value: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    }
  }],
  promotion: [{
    promoValue: {
      type: Boolean,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    newPrice: {
      type: Number,
      required: true,
    },
  }],
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;
