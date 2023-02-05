exports.createPages = async ({ actions }) => {
  const { createRedirect } = actions;

  createRedirect({
    fromPath: `/.well-known/webfinger?resource=acct:heyhoe@h3y6e.com`,
    toPath: `https://fedibird.com/.well-known/webfinger?resource=acct:h3y6e@fedibird.com`,
    statusCode: 301
  });
};
