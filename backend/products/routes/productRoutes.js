const express = require("express")
const router = express.Router()
const { addProduct, deleteProduct, editProduct } = require("../controller/productsController")
const {verifyAdmin} = require('../../middleware/middleware')

router.post("/addProduct", [verifyAdmin], addProduct)
router.post("/deleteProduct", [verifyAdmin], deleteProduct)
router.post("/:id/editProduct", [verifyAdmin], editProduct)

module.exports = router
