import React from "react";
import { useStaticQuery, graphql } from "gatsby";

interface SkillsData {
  skills: {
    nodes: {
      category: string;
      contents: string[];
    }[];
  };
}

const query = graphql`
  query skillsQuery {
    skills: allSkillsYaml {
      nodes {
        category
        contents
      }
    }
  }
`;
const Footer: React.FC = () => {
  const data: SkillsData = useStaticQuery(query);
  return (
    <section id="skills" className="section has-text-centered">
      <h1 data-sal="zoom-in" className="title">
        Skills
      </h1>
      {data.skills.nodes.map(item => (
        <>
          <p data-sal="zoom-in" className="content is-size-5">
            {item.category}:
          </p>
          <div className="tags is-centered">
            {item.contents.map(content => (
              <span data-sal="zoom-in" className="tag">
                {content}
              </span>
            ))}
          </div>
        </>
      ))}
    </section>
  );
};

export default Footer;
