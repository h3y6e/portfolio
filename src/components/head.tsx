import React from "react";
import { useStaticQuery, graphql } from "gatsby";

interface TData {
  site: {
    siteMetadata: {
      siteUrl: string;
      title: string;
      description: string;
      image: string;
      siteLanguage: string;
      ogLanguage: string;
      twitter: string;
      facebook: string;
      fbAppId: string;
    };
  };
}

const query = graphql`
  query HelmetQuery {
    site {
      siteMetadata {
        siteUrl
        title
        description
        image: logo
        siteLanguage
        ogLanguage
        twitter
        facebook
        fbAppId
      }
    }
  }
`;

const Head: React.FC = () => {
  const {
    site: {
      siteMetadata: {
        siteUrl,
        title,
        description,
        image,
        ogLanguage,
        twitter,
        facebook,
        fbAppId
      }
    }
  }: TData = useStaticQuery(query);

  return (
    <>
      <title>{title}</title>
      {/* meta */}
      <meta name="description" content={description} />
      <meta name="image" content={image} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {/* ogp */}
      <meta property="og:locale" content={ogLanguage} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={description} />
      {/* twitter */}
      <meta name="twitter:site" content={twitter} />
      <meta name="twitter:card" content="summary" />
      {/* facebook */}
      <meta property="og:site_name" content={facebook} />
      <meta property="fb:app_id" content={fbAppId} />
    </>
  );
};

export { Head };
