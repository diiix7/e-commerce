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
  const id = req.params.id;
  try {
    const { newName, newImageUrl, newDescription, newPrice, newCountInStock, newPromoValue, newDiscount } = req.body;

    // Rechercher le produit par son nom
    const productToUpdate = await Product.findById(id);

    // Vérifier si le produit a été trouvé
    if (!productToUpdate) {
      return res.status(404).json({ error: `Ce produit n'a pas été retrouvé (il n'existe pas)` });
    }

    // Initialiser la promotion s'il n'est pas présent
    if (!productToUpdate.promotion) {
      productToUpdate.promotion = {};
    }

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

    const promoItem = Product.promotion.find((item) => item.promo === "promo");

    // Vérifier si l'élément a été trouvé (non null)
    if (productToUpdate.promotion && productToUpdate.promotion.promo === "promo") {
      // Mettre à jour les autres valeurs lorsque le mot "promo" est trouvé
      if (newPromoValue !== undefined) {
        productToUpdate.promotion.promoValue = newPromoValue;
      }
      if (newDiscount !== undefined) {
        productToUpdate.promotion.discount = newDiscount;
      }
      if (newPromoValue !== undefined && newDiscount !== undefined && newPrice !== undefined) {
        const newPriceWithDiscount = (productToUpdate.price * (100 - newDiscount)) / 100;
        productToUpdate.promotion.newPrice = newPriceWithDiscount;
      }
    }

    await productToUpdate.save();  

    res.status(200).json({ message: 'Produit modifié avec succès'});
  } catch (error) {
    console.error('Error editing product:', error);
    res.status(500).json({ error: 'Une erreur s\'est produite lors de la modification du produit' });
  } 
}

/*
const editProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const { newName, newImageUrl, newDescription, newPrice, newCountInStock, newPromoValue, newDiscount } = req.body;

    // Rechercher le produit par son id
    //const productToUpdate = await Product.findOne({ id: id });

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
    if (newPromoValue !== undefined) {
      updateFields['promotion.promoValue'] = newPromoValue;
    }
    if (newDiscount !== undefined) {
      updateFields['promotion.discount'] = newDiscount;
    }
    if (newPromoValue && newDiscount) {
      updateFields['promotion.newPrice'] = ((newPrice * newDiscount) / 100 );
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
    res.status(500).json({ error: 'Une erreur s\'est produite lors de la modification du produit' });
  }  
};
*/

module.exports = {addProduct, deleteProduct, editProduct};
