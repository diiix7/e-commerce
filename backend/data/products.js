const products = [
  {
    name: "PlayStation 5",
    imageUrl:
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80",
    description:
      "PlayStation 5 (PS5) is a home video game console developed by Sony Interactive Entertainment. Announced in 2019 as the successor to the PlayStation 4, the PS5 was released on November 12, 2020 in Australia, Japan, New Zealand, North America, Singapore, and South Korea, and November 19, 2020 onwards in other major markets except China and India.",
    price: 499,
    countInStock: 15,
    comments: [
      {
        user: "ID_UTILISATEUR_1",
        content: "Super produit, je l'adore !",
        createdAt: new Date("2023-08-03"),
      },
      {
        user: "ID_UTILISATEUR_2",
        content: "Excellent rapport qualité-prix.",
        createdAt: new Date("2023-08-02"),
      },
    ],
    notes: [
      {
        user: "ID_UTILISATEUR_1",
        value: 3,
        createdAt: new Date("2023-08-03"),
      },
      {
        user: "ID_UTILISATEUR_2",
        value: 5,
        createdAt: new Date("2023-08-02"),
      },
    ],
    promotion: [
      {
        promoValue: false,
        discount: 10,
        newPrice: 449.1,
      }
    ],
  },
];

module.exports = products;
