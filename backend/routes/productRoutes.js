const express = require("express");
const router = express.Router();
const {verifyUser} = require('../middleware/middleware')
const {
  getProducts,
  getProductById,
  addCommentToProduct,
  addNoteToProduct,
} = require("../controller/productControllers");


router.get("/", getProducts);
router.get("/:id", getProductById);
//Pour ne le permettre qu'à l'utilisateur connecté
router.post("/:id/comment", [verifyUser], addCommentToProduct);
//Pour ne le permettre qu'à l'utilisateur connecté
router.post("/:id/note", [verifyUser], addNoteToProduct);

module.exports = router;
