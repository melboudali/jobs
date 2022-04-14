/** @type {import('next').NextConfig} */
const path = require("path");

module.exports = {
   reactStrictMode: true,
   images: {
      domains: ["inkbotdesign.com", "1000logos.net", "static.remove.bg", "cdn-icons-png.flaticon.com"],
   },
   sassOptions: {
      includePaths: [path.join(__dirname, "styles")],
   },
};
