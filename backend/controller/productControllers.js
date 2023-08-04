const Product = require("../models/Product");

//const Comment = require("../models/Comment");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};


const addCommentToProduct = async (req, res) => {
  const productId = req.params.id;
  const { userId, commentContent } = req.body;
  
  //Pour l'utilisateur authentifié
  //const userId = req.user._id;
  // Supposons que vous avez un middleware qui met à jour req.user avec l'utilisateur actuellement authentifié.
  
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    if (!commentContent || !userId) {
      return res.status(400).json({ message: "Le contenu du commentaire et l'utilisateur sont requis." });
    }

    // Vérifier que product.comments est initialisé comme un tableau vide
    if (!product.comments) {
      product.comments = [];
    }

    const comment = {
      user: userId,
      content: commentContent,
      productId: productId,
    };

    product.comments.push(comment);
    await product.save();

    return res.status(201).json({ message: "Commentaire ajouté avec succès." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de l'ajout du commentaire." });
  }
};



module.exports = {
  getProducts,
  getProductById,
  addCommentToProduct,
};
