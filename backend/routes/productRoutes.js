const express = require("express");
const router = express.Router();
const {verifyUser} = require('../middleware/middleware')
const {
  getProducts,
  getProductById,
  addCommentToProduct,
} = require("../controller/productControllers");


router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/:id/comment", addCommentToProduct);

//Pour ne le permettre qu'à l'utilisateur connecté
//router.post("/:id/comment", [verifyUser], addCommentToProduct);

module.exports = router;
