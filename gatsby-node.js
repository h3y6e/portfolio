exports.createPages = ({ actions }) => {
  const { createRedirect } = actions;
  createRedirect({
    fromPath: "/",
    isPermanent: false,
    toPath: "/c"
  });
};
