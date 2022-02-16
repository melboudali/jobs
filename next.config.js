/** @type {import('next').NextConfig} */
const path = require("path");

module.exports = {
	reactStrictMode: true,
	images: {
		domains: ["dexibell.com"]
	},
	sassOptions: {
		includePaths: [path.join(__dirname, "styles")]
	}
};
