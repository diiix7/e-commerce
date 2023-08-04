const express = require('express')
const {
  addProductInCart,
  deleteProductInCart,
  getCartProducts,
} = require('../controller/cart.controller')
const {verifyUser} = require('../middleware/middleware')
const router = express.Router()

router.get("/getCartProducts", [verifyUser], getCartProducts);
router.post("/addProductInCart", [verifyUser], addProductInCart);
router.delete("/:id/deleteProductInCart", deleteProductInCart);

module.exports = router