/** @type {import('next').NextConfig} */
const path = require("path");

module.exports = {
	reactStrictMode: true,
	images: {
		domains: []
	},
	sassOptions: {
		includePaths: [path.join(__dirname, "styles")]
	}
};
