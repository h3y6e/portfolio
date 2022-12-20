import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import styled from "@emotion/styled";

interface HeroData {
  hero: {
    name: string;
    desc: string;
    bgImg: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData;
      };
    };
    icon: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData;
      };
    };
  };
}

const query = graphql`
  query HeroQuery {
    hero: heroYaml {
      name
      desc
      bgImg {
        childImageSharp {
          gatsbyImageData(quality: 90, layout: FULL_WIDTH)
        }
      }
      icon {
        childImageSharp {
          gatsbyImageData(quality: 90, layout: FULL_WIDTH)
        }
      }
    }
  }
`;

const Header = styled.header`
  .header-bg {
    width: 50vw;
    height: 100vh;
    right: 0;
    @media (max-width: 70rem) {
      width: 100vw;
    }
  }

  .circle {
    z-index: 1;
    border-radius: 50%;
  }

  h1 {
    font-family: "Nico Moji";
  }
`;

const Hero: React.FC = () => {
  const data: HeroData = useStaticQuery(query);
  return (
    <Header>
      <section id="top" className="hero is-fullheight">
        <div className="hero-body">
          <GatsbyImage
            image={data.hero.bgImg.childImageSharp.gatsbyImageData}
            className="header-bg"
            alt="hero image"
            style={{ position: "absolute" }}
          />
          <div className="container">
            <figure
              data-sal="slide-right"
              data-sal-delay="100"
              className="image is-128x128"
            >
              <GatsbyImage
                image={data.hero.icon.childImageSharp.gatsbyImageData}
                alt="heyhoe"
                className="circle"
              />
            </figure>
            <h1
              data-sal="slide-right"
              data-sal-delay="200"
              className="title is-1 has-text-weight-light"
            >
              {data.hero.name}
            </h1>
            <h2
              data-sal="slide-right"
              data-sal-delay="300"
              className="subtitle is-4"
            >
              {data.hero.desc}
            </h2>
          </div>
        </div>
      </section>
    </Header>
  );
};

export default Hero;
