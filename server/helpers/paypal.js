const paypal = require("paypal-rest-sdk");


paypal.configure({
  mode: 'sandbox',     // "sandbox" or "live"
  client_id:process.env.PAYPAL_CLIENT_ID,              // Add valid client ID
  client_secret:process.env.PAYPAL_CLIENT_SECRET      // Add valid secret
});

module.exports = paypal;
