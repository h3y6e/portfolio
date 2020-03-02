exports.createPages = ({ actions }) => {
  const { createRedirect } = actions;
  createRedirect({
    fromPath: "/",
    toPath: "/c",
    redirectInBrowser: true,
    isPermanent: true
  });
};
