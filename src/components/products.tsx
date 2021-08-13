import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import styled from "@emotion/styled";

interface ProductsData {
  products: {
    nodes: {
      title: string;
      content: string;
      link: string;
      img: {
        childImageSharp: {
          gatsbyImageData: IGatsbyImageData;
        };
      };
      tags: string[];
      code: string;
    }[];
  };
}

const query = graphql`
  query productsQuery {
    products: allProductsYaml {
      nodes {
        title
        content
        link
        img {
          childImageSharp {
            gatsbyImageData(
              layout: FULL_WIDTH
              formats: [AUTO, WEBP, AVIF]
              placeholder: BLURRED
            )
          }
        }
        tags
        code
      }
    }
  }
`;

const Content = styled.p`
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
`;

const Products: React.FC = () => {
  const data: ProductsData = useStaticQuery(query);
  return (
    <section id="products" className="section">
      <h1 data-sal="zoom-in" className="title has-text-centered">
        Products
      </h1>
      <div className="container">
        <div className="columns is-multiline is-mobile">
          {data.products.nodes.map(item => (
            <div
              data-sal="zoom-in"
              className="column is-half-mobile is-one-third-tablet is-one-quarter-widescreen is-one-fifth-fullhd"
            >
              <div className="card">
                <div className="card-image">
                  <figure className="image">
                    <GatsbyImage
                      image={item.img.childImageSharp.gatsbyImageData}
                      alt="product images"
                    />
                  </figure>
                </div>
                <div className="card-content">
                  <div className="content">
                    <a
                      className="is-size-5 has-text-grey-dark has-text-weight-semibold"
                      href={item.link}
                    >
                      {item.title}
                    </a>
                    <Content>{item.content}</Content>
                  </div>
                  <div className="tile is-ancestor">
                    <div className="tags tile is-child">
                      {item.tags.map(tag => (
                        <span className="tag is-primary is-light">{tag}</span>
                      ))}
                    </div>
                    {item.code && (
                      <a className="tag is-link is-light" href={item.code}>
                        code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
