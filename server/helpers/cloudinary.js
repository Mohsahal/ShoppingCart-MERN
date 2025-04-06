const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
  cloud_name: "da22ruwaj",
  api_key: "874716844227183",
  api_secret: "txj97RtYTwUGvNtkyoLU_sH3rGs", // Use only the secret key
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return result;
}

module.exports = { upload, imageUploadUtil };