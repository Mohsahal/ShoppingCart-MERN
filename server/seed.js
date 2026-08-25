const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");

const uri = process.env.MONGO_URL;

const products = [
  // ==================== MEN'S COLLECTION ====================
  {
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop",
    title: "Premium Heavyweight Cotton Tee",
    description: "Tailored from 280 GSM organic combed cotton with a relaxed silhouette and reinforced collar.",
    category: "men",
    brand: "h&m",
    price: 35,
    salePrice: 28,
    totalStock: 120,
    averageReview: 4.8,
  },
  {
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000&auto=format&fit=crop",
    title: "Tech-Fleece Urban Pullover Hoodie",
    description: "Engineered thermal fleece offering lightweight warmth, zippered media pocket, and articulated sleeves.",
    category: "men",
    brand: "nike",
    price: 95,
    salePrice: 79,
    totalStock: 85,
    averageReview: 4.9,
  },
  {
    image: "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?q=80&w=1000&auto=format&fit=crop",
    title: "Vintage Selvedge Denim Trucker Jacket",
    description: "Crafted from authentic 14oz Japanese raw selvedge denim with antique brass hardware and custom stitching.",
    category: "men",
    brand: "levi",
    price: 145,
    salePrice: 120,
    totalStock: 45,
    averageReview: 4.9,
  },
  {
    image: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1000&auto=format&fit=crop",
    title: "Italian Wool Slim-Fit Blazer",
    description: "Super 120s virgin Italian wool tailored with structured soft shoulders, peak lapels, and horn buttons.",
    category: "men",
    brand: "zara",
    price: 220,
    salePrice: 185,
    totalStock: 30,
    averageReview: 4.7,
  },
  {
    image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?q=80&w=1000&auto=format&fit=crop",
    title: "Performance Training Track Jacket",
    description: "Moisture-wicking 4-way stretch fabric with reflective accents and aerodynamic athletic fit.",
    category: "men",
    brand: "puma",
    price: 75,
    salePrice: 59,
    totalStock: 90,
    averageReview: 4.6,
  },
  {
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1000&auto=format&fit=crop",
    title: "511™ Slim Fit All-Weather Chinos",
    description: "Contemporary slim cut woven with stretch twill and water-resistant nano coating for daily commute.",
    category: "men",
    brand: "levi",
    price: 89,
    salePrice: 69,
    totalStock: 110,
    averageReview: 4.7,
  },
  {
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop",
    title: "Monochrome Executive Trench Coat",
    description: "Double-breasted storm-flap trench coat with detachable storm collar and belted waist.",
    category: "men",
    brand: "zara",
    price: 195,
    salePrice: 160,
    totalStock: 25,
    averageReview: 4.8,
  },
  {
    image: "https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?q=80&w=1000&auto=format&fit=crop",
    title: "Tiro Essentials Athletic Joggers",
    description: "Iconic tapered athletic pants with ankle zips, breathable mesh inserts, and zip side pockets.",
    category: "men",
    brand: "adidas",
    price: 65,
    salePrice: 49,
    totalStock: 140,
    averageReview: 4.8,
  },

  // ==================== WOMEN'S COLLECTION ====================
  {
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop",
    title: "Sculpted Silk-Blend Midi Slip Dress",
    description: "Bias-cut lustrous silk-blend midi dress with cowl neckline and adjustable delicate crisscross back straps.",
    category: "women",
    brand: "zara",
    price: 110,
    salePrice: 89,
    totalStock: 65,
    averageReview: 4.9,
  },
  {
    image: "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?q=80&w=1000&auto=format&fit=crop",
    title: "Optime High-Rise Sculpting Leggings",
    description: "Seamless contouring performance tights with squat-proof compression and hidden waistband key pocket.",
    category: "women",
    brand: "adidas",
    price: 70,
    salePrice: 55,
    totalStock: 160,
    averageReview: 4.9,
  },
  {
    image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=1000&auto=format&fit=crop",
    title: "Pure Mongolian Cashmere Mockneck Knit",
    description: "Grade-A 2-ply Mongolian cashmere woven into an ultra-soft relaxed mockneck silhouette.",
    category: "women",
    brand: "h&m",
    price: 160,
    salePrice: 135,
    totalStock: 40,
    averageReview: 4.9,
  },
  {
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000&auto=format&fit=crop",
    title: "Tailored Minimalist Wool Overcoat",
    description: "Double-faced brushed wool blend with clean notched lapels and deep welt pockets.",
    category: "women",
    brand: "zara",
    price: 240,
    salePrice: 199,
    totalStock: 35,
    averageReview: 4.8,
  },
  {
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1000&auto=format&fit=crop",
    title: "Air Crop Quarter-Zip Athleisure Top",
    description: "Lightweight thermal knit crop pullover with thumbholes and breathable underarm vents.",
    category: "women",
    brand: "nike",
    price: 65,
    salePrice: 52,
    totalStock: 95,
    averageReview: 4.7,
  },
  {
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1000&auto=format&fit=crop",
    title: "Ribcage Straight Ankle Jeans",
    description: "Super high-rise vintage silhouette with button fly and authentic non-stretch denim feel.",
    category: "women",
    brand: "levi",
    price: 98,
    salePrice: 78,
    totalStock: 80,
    averageReview: 4.8,
  },
  {
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop",
    title: "Studio Ribbed Seamless Romper",
    description: "Ultra-flattering body-con jumpsuit with square neck and moisture-wicking studio stretch.",
    category: "women",
    brand: "puma",
    price: 75,
    salePrice: 58,
    totalStock: 70,
    averageReview: 4.7,
  },

  // ==================== KIDS' COLLECTION ====================
  {
    image: "https://images.unsplash.com/photo-1519278409-1f56fdda7fe5?q=80&w=1000&auto=format&fit=crop",
    title: "Kids Adventure Club Graphic Tee",
    description: "100% hypoallergenic soft cotton tee featuring vibrant water-based playful graphics.",
    category: "kids",
    brand: "puma",
    price: 26,
    salePrice: 19,
    totalStock: 110,
    averageReview: 4.6,
  },
  {
    image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=1000&auto=format&fit=crop",
    title: "Kids Heritage Denim Overalls",
    description: "Classic durable cotton denim overalls with adjustable buckled straps and multi-tool pockets.",
    category: "kids",
    brand: "levi",
    price: 52,
    salePrice: 39,
    totalStock: 65,
    averageReview: 4.8,
  },
  {
    image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=1000&auto=format&fit=crop",
    title: "Youth Sportswear Fleece Tracksuit Set",
    description: "Cozy fleece matching crewneck sweater and jogger pants designed for all-day playground fun.",
    category: "kids",
    brand: "nike",
    price: 70,
    salePrice: 56,
    totalStock: 80,
    averageReview: 4.9,
  },
  {
    image: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?q=80&w=1000&auto=format&fit=crop",
    title: "Kids Cozy Cable-Knit Hooded Cardigan",
    description: "Chunky soft-knit cardigan with wooden toggle buttons and ribbed cuffs for cool autumn days.",
    category: "kids",
    brand: "h&m",
    price: 42,
    salePrice: 32,
    totalStock: 75,
    averageReview: 4.7,
  },
  {
    image: "https://images.unsplash.com/photo-1560506840-ec148e82a604?q=80&w=1000&auto=format&fit=crop",
    title: "Junior 3-Stripes Athletic Zip Windbreaker",
    description: "Lightweight weather-resistant shell jacket with mesh lining and safety reflective piping.",
    category: "kids",
    brand: "adidas",
    price: 58,
    salePrice: 45,
    totalStock: 90,
    averageReview: 4.8,
  },

  // ==================== FOOTWEAR COLLECTION ====================
  {
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop",
    title: "Air Max Pulse Heritage Edition",
    description: "Point-loaded Air cushioning system combined with durable textile upper and waffle rubber outsole.",
    category: "footwear",
    brand: "nike",
    price: 165,
    salePrice: 139,
    totalStock: 95,
    averageReview: 4.9,
  },
  {
    image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=1000&auto=format&fit=crop",
    title: "Ultraboost Light Carbon Runners",
    description: "Lightest-ever Boost midsole paired with Primeknit+ adaptive upper and Continental™ rubber grip.",
    category: "footwear",
    brand: "adidas",
    price: 190,
    salePrice: 159,
    totalStock: 70,
    averageReview: 4.9,
  },
  {
    image: "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?q=80&w=1000&auto=format&fit=crop",
    title: "Suede Classic XXI Low-Top Sneakers",
    description: "Full suede upper with synthetic lining, debossed gold foil branding, and heritage rubber cupsole.",
    category: "footwear",
    brand: "puma",
    price: 75,
    salePrice: 59,
    totalStock: 130,
    averageReview: 4.6,
  },
  {
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1000&auto=format&fit=crop",
    title: "Leather Cap-Toe Chelsea Boots",
    description: "Full-grain calfskin leather boots with elasticated side gussets and stacked leather heel.",
    category: "footwear",
    brand: "zara",
    price: 140,
    salePrice: 115,
    totalStock: 50,
    averageReview: 4.7,
  },
  {
    image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=1000&auto=format&fit=crop",
    title: "Leather Rugged Worksite Boots",
    description: "Water-resistant tumbled leather upper with Goodyear welt construction and oil-resistant lug sole.",
    category: "footwear",
    brand: "levi",
    price: 135,
    salePrice: 109,
    totalStock: 45,
    averageReview: 4.8,
  },

  // ==================== ACCESSORIES COLLECTION ====================
  {
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
    title: "Chronograph Sapphire Minimalist Watch",
    description: "Surgical-grade 316L stainless steel case, scratch-resistant sapphire crystal, and Japanese quartz movement.",
    category: "accessories",
    brand: "zara",
    price: 185,
    salePrice: 145,
    totalStock: 40,
    averageReview: 4.9,
  },
  {
    image: "https://images.unsplash.com/photo-1590736969955-71cc94801759?q=80&w=1000&auto=format&fit=crop",
    title: "Artisanal Saddle Crossbody Bag",
    description: "Handcrafted top-grain Italian leather with gold-tone turn-lock clasp and modular shoulder strap.",
    category: "accessories",
    brand: "levi",
    price: 125,
    salePrice: 98,
    totalStock: 55,
    averageReview: 4.8,
  },
  {
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1000&auto=format&fit=crop",
    title: "Polarized Aviator Acetate Sunglasses",
    description: "Hand-polished Italian acetate frames with UV400 polarized gradient lenses and reinforced hinges.",
    category: "accessories",
    brand: "h&m",
    price: 65,
    salePrice: 48,
    totalStock: 90,
    averageReview: 4.7,
  },
  {
    image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=1000&auto=format&fit=crop",
    title: "Heritage Full-Grain Leather Bi-Fold Wallet",
    description: "Slimline RFID-protected wallet crafted from vegetable-tanned leather with 8 card slots and bill fold.",
    category: "accessories",
    brand: "levi",
    price: 55,
    salePrice: 42,
    totalStock: 110,
    averageReview: 4.8,
  },
  {
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop",
    title: "Commuter Waterproof Laptop Backpack",
    description: "Ballistic nylon weather-resistant pack featuring 16-inch padded laptop sleeve and ergonomic straps.",
    category: "accessories",
    brand: "nike",
    price: 110,
    salePrice: 89,
    totalStock: 65,
    averageReview: 4.9,
  },
];

async function seedProducts() {
  try {
    if (!uri) {
      throw new Error("MONGO_URL environment variable is not defined in .env");
    }

    await mongoose.connect(uri);
    console.log("Connected to MongoDB successfully.");

    // Clear existing products to prevent duplicates
    const deleteResult = await Product.deleteMany({});
    console.log(`Cleared ${deleteResult.deletedCount} existing products.`);

    // Seed unique, distinct product catalog
    const result = await Product.insertMany(products);
    console.log(`Successfully seeded ${result.length} unique luxury products across all categories.`);

    await mongoose.disconnect();
    console.log("Disconnected gracefully from MongoDB.");
    process.exit(0);
  } catch (err) {
    console.error("Error seeding products:", err);
    process.exit(1);
  }
}

seedProducts();

