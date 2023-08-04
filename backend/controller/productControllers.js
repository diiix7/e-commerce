const Product = require("../models/Product");
const { ObjectId } = require('mongoose');

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

  //Pour l'utilisateur authentifié
  const userId = req.user._id;
  const commentContent = req.body.commentContent;
 
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    if (!commentContent) {
      return res.status(400).json({ message: "Enter a comment to publish." });
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

    return res.status(201).json({ message: "Comment added." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while adding the comment." });
  }
};

const getProductComments = async (req, res) => {
  const productId = req.params.id;

  try {
      const product = await Product.findById(productId)
      .populate('comments.User', 'fullName');

    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    // Liste des commentaires associés au produit
    const comments = product.comments;

    return res.status(200).json({ comments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while retrieving comments." });
  }
};

const addNoteToProduct = async (req, res) => {
  const productId = req.params.id;

  //Pour l'utilisateur authentifié
  const userId = req.user._id;
  const noteValue = req.body.noteValue;
 
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    if (!noteValue) {
      return res.status(400).json({ message: "Add a note to publish." });
    }

    // Vérifier que product.comments est initialisé comme un tableau vide
    if (!product.notes) {
      product.notes = [];
    }

    const note = {
      user: userId,
      value: noteValue,
      productId: productId,
    };

    product.notes.push(note);
    await product.save();

    return res.status(201).json({ message: "Note added." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while adding the note." });
  }
};

const getProductNotes = async (req, res) => {
  const productId = req.params.id;

  try {
      const product = await Product.findById(productId)
      .populate('notes.User', 'fullName'); // Remplacez 'username' par le champ que vous voulez afficher de l'utilisateur

    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    // Liste des notes associées au produit
    const notes = product.notes;

    return res.status(200).json({ notes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while retrieving notes." });
  }
};


module.exports = {
  getProducts,
  getProductById,
  addCommentToProduct,
  addNoteToProduct,
  getProductComments,
  getProductNotes,
};
