const isGithubActions = process.env.GITHUB_ACTIONS === 'true'
const repo = 'weatherapplications'

/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'export',
	trailingSlash: true,
	images: {
		unoptimized: true
	},
	basePath: isGithubActions ? `/${repo}` : '',
	assetPrefix: isGithubActions ? `/${repo}/` : ''
}

export default nextConfig;
