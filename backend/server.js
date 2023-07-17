require("dotenv").config();
const express = require("express");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
const adminRoute = require("./admin/route/adminRoute")
const productsRoutes = require("./products/routes/productRoutes")
//const multer = require('multer');
const { connectDB } = require("./config/db");
const cors = require("cors");

connectDB();

const app = express();

app.use(express.json());
app.use(cors());

//POUR ENREGISTRER UNE IMAGE
/*
// Configuration de multer pour gérer les téléchargements d'images
// Stocker l'image en tant que buffer en mémoire
//const storage = multer.memoryStorage();
//const upload = multer({ storage });

// Utilisation du middleware pour toutes les routes qui gèrent les téléchargements
// 'image' doit correspondre à l'attribut "name" du champ de téléchargement dans le formulaire
//app.use(upload.single('image'));
*/


app.get("/", (req, res) => {
  res.json({ message: "API running..." });
});

app.use("/api/products", productRoutes);
app.use("/api/user", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/admin", adminRoute);

//admin functions
app.use("/api/product", productsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
