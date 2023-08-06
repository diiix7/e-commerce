const express = require('express')
//const multer = require('multer');
const Product = require('../model/Product');
const Category = require("../../models/Category")
//POUR ENREGISTRER UNE IMAGE
/*
// Configuration de multer pour gérer les téléchargements d'images
// Stocker l'image en tant que buffer en mémoire
const storage = multer.memoryStorage();
const upload = multer({ storage });
*/

const addProduct = async (req, res) => {
  const { name, imageUrl, description, price, countInStock } = req.body;  
  try {

    // Vérifier si une image a été téléchargée
    // if (!req.file) {
    //   return res.status(400).json({ error: 'Veuillez télécharger une image' });
    // }

    // Récupérer les données binaires de l'image depuis le buffer
    // const imageBuffer = req.file.buffer;
    // const contentType = req.file.mimetype;

    await Product.create({...req.body});

    res.status(201).send('Produit enregistré avec succès');

  } catch (error) {
    console.log('Erreur lors de l\'ajout du produit :', error);
    res.status(500).json({ error: 'Une erreur s\'est produite lors de l\'ajout du produit' });
  }
}


const deleteProduct = async (req, res) => {
  const { name } = req.body;
  try {
    // Recherche du produit par son nom
    const product = await Product.findOne({ name: name });

    // Vérification si le produit existe
    if (!product) {
      return res.status(404).json({ error: "Ce produit n'existe pas" });
    }

    // Suppression du produit
    await product.remove();

    res.status(200).json({ message: 'Produit supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Une erreur s\'est produite lors de la suppression du produit' });
  }
}

const editProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const { newName, newImageUrl, newDescription, newPrice, newCountInStock} = req.body;

    // Construire l'objet des nouvelles valeurs à mettre à jour
    const updateFields = {};
    if (newName) {
      updateFields.name = newName;
    }
    if (newImageUrl) {
      updateFields.imageUrl = newImageUrl;
    }
    if (newDescription) {
      updateFields.description = newDescription;
    }
    if (newPrice) {
      updateFields.price = newPrice;
    }
    if (newCountInStock) {
      updateFields.countInStock = newCountInStock;
    }

    // Mettre à jour le produit et récupérer le produit mis à jour
    const updatedProduct = await Product.findOneAndUpdate({ _id: id }, updateFields, { new: true });

    // Vérifier si le produit a été trouvé
    if (!updatedProduct) {
      return res.status(404).json({ error: `Ce produit n'a pas été retrouvé (il n'existe pas)` });
    }

    res.status(200).json({ message: 'Produit modifié avec succès' });
  } catch (error) {
    console.error('Error editing product:', error);
    res.status(500).json({ error: 'An error occurred while editing the product' });
  }  
};


const addPromotion = async (req, res) => {
  const productId = req.params.id;
  const { newPromoValue, newDiscount } = req.body;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: `Product not found` });
    }

    if (!product.promotion) {
      product.promotion = [];
    }

    const priceAfterPromo = product.price - (product.price * (newDiscount / 100));

    const promo = {
      promoValue: newPromoValue,
      discount: newDiscount,
      newPrice: priceAfterPromo,
    };

    product.promotion.push(promo);
    const a = await product.save();

    res.status(200).json({ message: 'Promotion status modified successfully' });
  } catch (error) {
    console.error('Error editing product:', error);
    res.status(500).json({ error: 'An error occurred while modifying the product' });
  }
};


const getCategories = async (req, res) => {
  
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while retrieving the categories' });
  }
};


const addCategoryToProduct = async (req, res) => {
  const id = req.params.id;
  const { categoryName, categoryDescription } = req.body;

  try {

    const product = await Product.findOne({ id });

    const cat = {
      productId: id,
      categoryName: categoryName,
      categoryDescription: categoryDescription,
    }

    if (categoryName && categoryDescription) {
      await Category.create(cat);
    }

    res.status(200).json({ message: 'Product\'s category edited successfully' });
  } catch (error) {
    console.error('Error editing product:', error);
    res.status(500).json({ error: 'An error occurred while editing the category of the product' });
  }
};



const getProductsOfCategory = async (req, res) => {
  const productId = req.params.id;
  const { newPromoValue, newDiscount } = req.body;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: `Product not found` });
    }

    if (!product.promotion) {
      product.promotion = [];
    }

    const priceAfterPromo = product.price - (product.price * (newDiscount / 100));

    const promo = {
      promoValue: newPromoValue,
      discount: newDiscount,
      newPrice: priceAfterPromo,
    };

    product.promotion.push(promo);
    const a = await product.save();

    res.status(200).json({ message: 'Promotion status modified successfully' });
  } catch (error) {
    console.error('Error editing product:', error);
    res.status(500).json({ error: 'An error occurred while modifying the product' });
  }
};









module.exports = {addProduct, deleteProduct, editProduct, addPromotion, getCategories, addCategoryToProduct, getProductsOfCategory};
