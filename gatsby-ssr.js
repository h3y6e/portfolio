const config = require("./config");

exports.onRenderBody = ({ setHtmlAttributes }) => {
  setHtmlAttributes({ lang: config.siteLanguage });
};
