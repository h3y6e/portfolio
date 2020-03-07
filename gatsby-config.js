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
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-typescript",
    "gatsby-transformer-yaml",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "config",
        path: `${__dirname}/config`
      }
    },
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: config.googleAnalyticsID
      }
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: config.siteTitle,
        short_name: config.siteTitleShort,
        description: config.siteDescription,
        start_url: config.siteUrl,
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: "standalone",
        icon: "src/favicon.png"
      }
    },
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        google: {
          families: ["Montserrat", "Noto Sans JP", "Fira Code"]
        },
        custom: {
          families: ["Nico Moji"],
          urls: ["https://fonts.googleapis.com/earlyaccess/nicomoji.css"]
        }
      }
    },
    {
      resolve: "gatsby-plugin-scroll-reveal",
      options: {
        threshold: 0.5,
        once: true
      }
    },
    "gatsby-plugin-offline",
    "gatsby-plugin-netlify",
    "gatsby-plugin-sass",
    "gatsby-plugin-remove-trailing-slashes",
    "gatsby-plugin-smoothscroll"
  ]
};
