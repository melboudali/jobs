/** @type {import('next').NextConfig} */
const path = require("path");

module.exports = {
	reactStrictMode: true,
	images: {
		domains: ["inkbotdesign.com", "1000logos.net"]
	},
	sassOptions: {
		includePaths: [path.join(__dirname, "styles")]
	}
};
