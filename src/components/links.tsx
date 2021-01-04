import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library, IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faTwitter,
  faInstagram,
  faGithub,
  faAmazon
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPenNib } from "@fortawesome/free-solid-svg-icons";

library.add(faTwitter, faInstagram, faGithub, faAmazon);
library.add(faEnvelope, faPenNib);

interface LinksData {
  links: {
    nodes: {
      title: string;
      link: string;
      color: string;
      icon: IconProp;
    }[];
  };
}

const query = graphql`
  query linksQuery {
    links: allLinksYaml {
      nodes {
        title
        link
        color
        icon
      }
    }
  }
`;

const Button = styled.a(props => ({
  backgroundColor: props.color
}));

const Links: React.FC = () => {
  const data: LinksData = useStaticQuery(query);
  return (
    <div className="buttons is-centered">
      {data.links.nodes.map(item => (
        <Button
          data-sal="slide-up"
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          color={item.color}
          className="button has-text-white is-rounded"
        >
          <span className="icon">
            <FontAwesomeIcon icon={item.icon} size="1x" />
          </span>
          <span>{item.title}</span>
        </Button>
      ))}
    </div>
  );
};

export default Links;
