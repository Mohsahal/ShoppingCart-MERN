const paypal = require("paypal-rest-sdk");
require("dotenv").config();

paypal.configure({
  mode: process.env.PAYPAL_MODE || "sandbox",           // "sandbox" or "live"
  client_id: process.env.PAYPAL_CLIENT_ID,              // Add valid client ID
  client_secret: process.env.PAYPAL_CLIENT_SECRET       // Add valid secret
});

module.exports = paypal;
