const config = require("./config");

const pathPrefix = config.pathPrefix === "/" ? "" : config.pathPrefix;
module.exports = {
  pathPrefix: config.pathPrefix,
  siteMetadata: {
    siteUrl: config.siteUrl + pathPrefix,
    title: config.siteTitle,
    description: config.siteDescription,
    logo: config.siteLogo,
    siteLanguage: config.siteLanguage,
    ogLanguage: config.ogLanguage,
    author: config.author,
    twitter: config.userTwitter,
    facebook: config.ogSiteName,
    fbAppId: config.facebookAppId
  },
  plugins: [
    "gatsby-plugin-emotion",
    "gatsby-plugin-typescript",
    "gatsby-transformer-yaml",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "config",
        path: `${__dirname}/config`
      }
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-plugin-scroll-reveal",
      options: {
        threshold: 0.5,
        once: true
      }
    },
    "gatsby-plugin-sass",
    "gatsby-plugin-smoothscroll",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: config.siteTitle,
        short_name: config.siteTitleShort,
        description: config.siteDescription,
        lang: config.siteLanguage,
        theme_color: config.themeColor,
        display: "standalone",
        icon: "static/logos/favicon.png",
        icon_options: {
          purpose: `maskable`
        },
        start_url: config.startUrl,
        background_color: config.backgroundColor
      }
    },
    "gatsby-plugin-offline"
  ]
};
