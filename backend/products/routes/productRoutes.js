const express = require("express")
const router = express.Router()
const { addProduct, deleteProduct, editProduct } = require("../controller/productsController")

router.post("/addProduct", addProduct)
router.post("/deleteProduct", deleteProduct)
router.get("/editProduct", editProduct)

module.exports = router
