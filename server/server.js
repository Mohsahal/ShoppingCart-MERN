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

// Health check middleware — app.use() runs BEFORE any route matching,
// handles ALL HTTP methods (GET, HEAD, OPTIONS, etc.) for health endpoints.
app.use(function healthCheck(req, res, next) {
  const healthPaths = ["/", "/health", "/healthz", "/api/health"];
  if (healthPaths.indexOf(req.path) !== -1) {
    console.log(`Health check OK: ${req.method} ${req.path}`);
    if (req.method === "HEAD") return res.status(200).end();
    return res.status(200).json({
      status: "ok",
      service: "shoppingcart-api",
      uptime: process.uptime(),
    });
  }
  next();
});

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
