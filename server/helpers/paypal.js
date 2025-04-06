const paypal = require("paypal-rest-sdk");


paypal.configure({
  mode: 'sandbox',     // "sandbox" or "live"
  client_id: 'AcFPs5TPRMGznD37gX9368TqM87Mb3IXcqUY2TOt-4O8Tt8KhZN2dJPkcoSBTnfT02h-tusK3uv_3wDf',              // Add valid client ID
  client_secret: 'ELGK50TM8v9ft1BQVkQ4-2iugOJ5br2y7sStVXip-ZL-tFIJ4c52WdxsPKgtXehSADW35qMwER-_Lgcu'      // Add valid secret
});

module.exports = paypal;
