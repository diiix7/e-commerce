const express = require('express')
//const multer = require('multer');
const Product = require('../model/Product');
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
  const { name } = req.body;
  try {
    const { newName, newImageUrl, newDescription, newPrice, newCountInStock } = req.body;

    // Vérifier si le nom du produit est fourni dans la requête
    if (!newName) {
      return res.status(400).json({ error: 'Veuillez entrer le nom du produit que vous souhaitez modifier' });
    }

    // Rechercher le produit par son nom
    const productToUpdate = await Product.findOne({ name: name });

    // Vérifier si le produit a été trouvé
    if (!productToUpdate) {
      return res.status(404).json({ error: `Le produit avec le nom '${name}' n'a pas été trouvé (il n'existe pas)` });
    }
    else {
      // Mettre à jour les informations du produit avec les nouvelles valeurs (si fournies)
      if (newName) {
        productToUpdate.name = newName;
      }
      if (newImageUrl) {
        productToUpdate.imageUrl = newImageUrl;
      }
      if (newDescription) {
        productToUpdate.description = newDescription;
      }
      if (newPrice) {
        productToUpdate.price = newPrice;
      }
      if (newCountInStock) {
        productToUpdate.countInStock = newCountInStock;
      }

      await productToUpdate.save();
    }

    res.status(200).json({ message: 'Produit modifié avec succès'});
  } catch (error) {
    res.status(500).json({ error: 'Une erreur s\'est produite lors de la modification du produit' });
  }
}

module.exports = {addProduct, deleteProduct, editProduct};
