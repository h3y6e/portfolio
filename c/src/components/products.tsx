import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Img, { FluidObject } from "gatsby-image"
import styled from "@emotion/styled"

interface ProductData {
  product: {
    nodes: {
      title: string
      content: string
      link: string
      tags: string[]
      code: string
    }[]
  }
  bgImg: {
    childImageSharp: {
      fluid: FluidObject
    }
  }
}

const query = graphql`
  query productQuery {
    product: allProductYaml {
      nodes {
        title
        content
        link
        tags
        code
      }
    }
    bgImg: file(relativePath: { eq: "bg_img3.png" }) {
      childImageSharp {
        fluid(quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`
const Content = styled.p`
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
`
const Products: React.FC = () => {
  const data: ProductData = useStaticQuery(query)
  return (
    <section id="products" className="section">
      <h1 data-sal="zoom-in" className="title has-text-centered">
        Products
      </h1>
      <div className="container">
        <div className="columns is-multiline">
          {data.product.nodes.map(item => (
            <div
              data-sal="zoom-in"
              className="column is-half-tablet is-one-third-desktop is-one-quarter-widescreen is-one-fifth-fullhd"
            >
              <div className="card">
                <div className="card-image">
                  <figure className="image">
                    <Img
                      fluid={data.bgImg.childImageSharp.fluid}
                      alt="project"
                    />
                  </figure>
                </div>
                <div className="card-content">
                  <div className="content">
                    <h4>{item.title}</h4>
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
  )
}

export default Products
