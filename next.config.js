/** @type {import('next').NextConfig} */
const nextConfig = {
	// experimental: {
	// 	serverActions: true,
	// },
	images: {
		remotePatterns: [
			// {
			// 	protocol: "https",
			// 	hostname: "files.cdn.printful.com",
			// 	pathname: "**",
			// },
			{
				protocol: "https",
				hostname: "firebasestorage.googleapis.com",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "media.discordapp.net",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "cdn.discordapp.com",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "lh3.googleusercontent.com",
				pathname: "**",
			},
		],
		// domains: [
		// 	"files.cdn.printful.com",
		// 	"firebasestorage.googleapis.com",
		// 	"media.discordapp.net",
		// 	"cdn.discordapp.com",
		// 	"lh3.googleusercontent.com",
		// ],
	},
};

module.exports = nextConfig;
