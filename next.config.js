// const withTM = require("next-transpile-modules")(["three"])

// @ts-check
const { withBlitz } = require("@blitzjs/next")

/*
const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
})
*/

/**
 * @type {import('@blitzjs/next').BlitzConfig}
 **/

const config = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fs-thb01.getcourse.ru",
        port: "",
        pathname: "/fileservice/file/thumbnail/h/**",
      },
      {
        protocol: "https",
        hostname: "fs-thb02.getcourse.ru",
        port: "",
        pathname: "/fileservice/file/thumbnail/h/**",
      },
      {
        protocol: "https",
        hostname: "fs-thb03.getcourse.ru",
        port: "",
        pathname: "/fileservice/file/thumbnail/h/**",
      },
      {
        protocol: "https",
        hostname: "tailwindui.com",
        port: "",
        pathname: "/img/**",
      },
      {
        protocol: "https",
        hostname: "flagcdn.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  distDir: process.env.BUILD_DIR || ".next",
  experimental: {
    mdxRs: true,
    instrumentationHook: true,
  },
  // pageExtensions: ["ts", "tsx", "md", "mdx"],
  /*
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config
    // config.externals = [ nodeExternals() ]
    return config
  },
  */
}

module.exports = withBlitz(config)

/*
module.exports = (phase) => {
  if (phase.indexOf("build") === -1) {
    // setTimeout(() => {
    //   void axios.get(process.env.SITE_URL + "/api/queues/?secret=1ee1a")
    // }, 5000)
  }
  return withTM(withBlitz(withMDX(config)))
}
*/
