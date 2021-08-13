import React from "react";
import { useStaticQuery, graphql } from "gatsby";

interface AboutData {
  about: {
    title: string;
    content1: string;
    content2: string;
  };
}

const query = graphql`
  query aboutQuery {
    about: aboutYaml {
      title
      content1
      content2
    }
  }
`;

const About: React.FC = ({ children }) => {
  const data: AboutData = useStaticQuery(query);
  return (
    <section id="about" className="section has-text-centered">
      <h1 data-sal="zoom-in" className="title">
        {data.about.title}
      </h1>
      <p data-sal="zoom-in" className="content is-size-6">
        {data.about.content1}
        <br />
        {data.about.content2}
      </p>
      {children}
    </section>
  );
};

export default About;
