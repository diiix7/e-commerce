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
    //Pour ne le permettre qu'à l'utilisateur connecté
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
    //Pour ne le permettre qu'à l'utilisateur connecté
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
  //Editable qie par l'Admin
  //le newPrice n'est pas éditable par l'Admin,
  //si le produit est en promotion et que le discount est entré, le newPrice est automatiquement calculé
  // promotion: [{
  //   promoValue: Boolean,
  //   discount: Number,
  //   newPrice: Number,
  // }]
  promotion: [{
    _id: false, // Auto-generation d'id par MongoDB désactive
    promoValue: {
      type: Boolean,
      required: true,
      default: false,
    },
    discount: {
      type: Number,
      default: 0,
    },
    newPrice: {
      type: Number,
      default: null,
    },
  }]
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;
