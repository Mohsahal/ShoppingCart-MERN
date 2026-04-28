require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/auth/auth-routes");
const adminProductsRouter = require("./routes/admin/products-routes");
const adminOrdersRouter = require("./routes/admin/orders-routes");

const shopProductsRouter = require("./routes/shop/products-routes");
const shopCartRouter = require("./routes/shop/cart-routes");
const shopAddressRouter = require("./routes/shop/address-routes");
const shopOrderRouter = require("./routes/shop/order-routes");
const shopSearchRouter = require("./routes/shop/search-routes");
const shopReviewRouter = require("./routes/shop/review-routes");

const commonFeatureRouter = require("./routes/common/feature-routes");

//create a database connection -> u can also
//create a separate file for this and then import/use that file here

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

const app = express();
const PORT = process.env.PORT || 5000;

// HEALTH CHECKS - MUST BE AT THE TOP (before CORS and other middleware)
app.get("/", (req, res) => res.status(200).json({ status: "ok", service: "shoppingcart-api", uptime: process.uptime() }));
app.get("/health", (req, res) => res.status(200).json({ status: "ok" }));
app.get("/healthz", (req, res) => res.status(200).json({ status: "ok" }));
app.get("/api/health", (req, res) => res.status(200).json({ status: "ok" }));
// HEAD handler - must send 200 with no body
app.head("/", (req, res) => res.status(200).end());
app.head("/health", (req, res) => res.status(200).end());
app.head("/healthz", (req, res) => res.status(200).end());


app.use(
  cors({
    origin: process.env.CLIENT_BASE_URL,
    methods: ["GET", "POST", "DELETE", "PUT", "HEAD"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrdersRouter);

app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);

app.use("/api/common/feature", commonFeatureRouter);

// 404 Logging Middleware
app.use((req, res) => {
  console.log(`404 Error: ${req.method} ${req.url} - Not Found`);
  res.status(404).json({
    success: false,
    message: "API Route not found",
    requestedUrl: req.url,
    method: req.method
  });
});

app.listen(PORT, () => console.log(`Server is now running on port ${PORT} - Debug active`));
