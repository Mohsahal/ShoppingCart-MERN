const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");

const uri = process.env.MONGO_URL;

const products = [
  // Men's Clothing
  {
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop",
    title: "Classic White T-Shirt",
    description: "A premium cotton essential for everyday wear. Lightweight, breathable, and versatile.",
    category: "men",
    brand: "h&m",
    price: 25,
    salePrice: 19,
    totalStock: 150,
    averageReview: 4.5,
  },
  {
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000&auto=format&fit=crop",
    title: "Urban Hoodie",
    description: "Comfortable and stylish hoodie perfect for the city streets.",
    category: "men",
    brand: "nike",
    price: 85,
    salePrice: 65,
    totalStock: 120,
    averageReview: 4.8,
  },
  {
    image: "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?q=80&w=1000&auto=format&fit=crop",
    title: "Slim Fit Denim Jacket",
    description: "Classic denim jacket with a modern slim fit.",
    category: "men",
    brand: "levi",
    price: 110,
    salePrice: 0,
    totalStock: 50,
    averageReview: 4.7,
  },
  
  // Women's Clothing
  {
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop",
    title: "Elegant Summer Dress",
    description: "Flowy, lightweight summer dress with floral patterns.",
    category: "women",
    brand: "zara",
    price: 75,
    salePrice: 60,
    totalStock: 80,
    averageReview: 4.6,
  },
  {
    image: "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?q=80&w=1000&auto=format&fit=crop",
    title: "Athletic Leggings",
    description: "High-waisted compression leggings for workouts and lounging.",
    category: "women",
    brand: "adidas",
    price: 55,
    salePrice: 45,
    totalStock: 200,
    averageReview: 4.9,
  },
  {
    image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=1000&auto=format&fit=crop",
    title: "Oversized Cashmere Sweater",
    description: "Luxurious and warm cashmere sweater for cold days.",
    category: "women",
    brand: "h&m",
    price: 130,
    salePrice: 0,
    totalStock: 40,
    averageReview: 4.8,
  },
  
  // Kids
  {
    image: "https://images.unsplash.com/photo-1519278409-1f56fdda7fe5?q=80&w=1000&auto=format&fit=crop",
    title: "Kids Graphic T-Shirt",
    description: "Fun and colorful graphic tee for kids.",
    category: "kids",
    brand: "puma",
    price: 20,
    salePrice: 15,
    totalStock: 100,
    averageReview: 4.3,
  },
  {
    image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=1000&auto=format&fit=crop",
    title: "Kids Denim Overalls",
    description: "Durable and adorable denim overalls for playtime.",
    category: "kids",
    brand: "levi",
    price: 45,
    salePrice: 35,
    totalStock: 60,
    averageReview: 4.6,
  },
  
  // Footwear
  {
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop",
    title: "Air Max Sneakers",
    description: "Iconic sneakers with maximum cushioning.",
    category: "footwear",
    brand: "nike",
    price: 150,
    salePrice: 130,
    totalStock: 90,
    averageReview: 4.9,
  },
  {
    image: "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?q=80&w=1000&auto=format&fit=crop",
    title: "Classic Canvas Shoes",
    description: "Versatile canvas shoes for an easy-going style.",
    category: "footwear",
    brand: "puma",
    price: 60,
    salePrice: 0,
    totalStock: 150,
    averageReview: 4.4,
  },
  
  // Accessories
  {
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
    title: "Minimalist Watch",
    description: "A sleek and elegant timepiece for any occasion.",
    category: "accessories",
    brand: "zara",
    price: 120,
    salePrice: 95,
    totalStock: 45,
    averageReview: 4.7,
  },
  {
    image: "https://images.unsplash.com/photo-1590736969955-71cc94801759?q=80&w=1000&auto=format&fit=crop",
    title: "Leather Crossbody Bag",
    description: "Premium leather bag with adjustable strap.",
    category: "accessories",
    brand: "levi",
    price: 85,
    salePrice: 70,
    totalStock: 60,
    averageReview: 4.8,
  },
];

async function seedProducts() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB.");
    
    const result = await Product.insertMany(products);
    console.log(`Successfully seeded ${result.length} products.`);
    
    await mongoose.disconnect();
    console.log("Disconnected.");
  } catch (err) {
    console.error("Error seeding products:", err);
    process.exit(1);
  }
}

seedProducts();
