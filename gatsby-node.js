const config = require("./config")

exports.createPages = ({ actions }) => {
  const { createRedirect } = actions;
  createRedirect({
    fromPath: config.siteUrl,
    toPath: config.siteUrl + config.pathPrefix,
    redirectInBrowser: true,
    isPermanent: true
  });
};
