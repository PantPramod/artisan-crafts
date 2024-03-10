/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol:'https',
                hostname:'cdn.staticans.com'
            }
        ]
    }
}

module.exports = nextConfig
