const mongoose = require("mongoose");

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
    /*
    //Pour exécuter npm run data:import
    user: {
      type: String,
      required: true,
    },
    */
    //Pour ne le permettre qu'à l'utilisateur connecté
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Référence au modèle User
      required: true,
    },
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
    /*
    //Pour exécuter npm run data:import
    user: {
      type: String,
      required: true,
    },
    */
    //Pour ne le permettre qu'à l'utilisateur connecté
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Référence au modèle User
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    }
  }]
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;
