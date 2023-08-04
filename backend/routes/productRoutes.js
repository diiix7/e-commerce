const express = require("express");
const router = express.Router();
const {verifyUser} = require('../middleware/middleware')
const {
  getProducts,
  getProductById,
  addCommentToProduct,
  addNoteToProduct,
  getProductComments,
  getProductNotes,
} = require("../controller/productControllers");


router.get("/", getProducts);
router.get("/:id", getProductById);

//Comment routes
router.get("/:id/getProductcomments", getProductComments);
//Pour ne le permettre qu'à l'utilisateur connecté
router.post("/:id/addComment", [verifyUser], addCommentToProduct);

//Note routes
router.get("/:id/getProductNotes", getProductNotes);
//Pour ne le permettre qu'à l'utilisateur connecté
router.post("/:id/addNote", [verifyUser], addNoteToProduct);

module.exports = router;
