const express = require("express")
const router = express.Router()
const { 
    addProduct,
    deleteProduct,
    editProduct,
    addPromotion,
    getCategories,
    addCategoryToProduct,
    getProductsOfCategory,
 } = require("../controller/productsController")
const {verifyAdmin} = require('../../middleware/middleware')

router.post("/addProduct", [verifyAdmin], addProduct)
router.post("/deleteProduct", [verifyAdmin], deleteProduct)
router.post("/:id/editProduct", [verifyAdmin], editProduct)
router.post("/:id/addPromotion", [verifyAdmin], addPromotion)

router.get("/getCategories", getCategories)
router.post("/:id/addCategoryToProduct", addCategoryToProduct)
router.get("/getProductsOfCategory", getProductsOfCategory)


module.exports = router
