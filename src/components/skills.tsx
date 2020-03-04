import React from "react";
import { useStaticQuery, graphql } from "gatsby";

interface SkillsData {
  skills: {
    nodes: {
      langs: string[];
    }[];
  };
}

const query = graphql`
  query skillsQuery {
    skills: allSkillsYaml {
      nodes {
        langs
      }
    }
  }
`;
const Footer: React.FC = () => {
  const data: SkillsData = useStaticQuery(query);
  return (
    <section id="skills" className="section">
      <h1 data-sal="zoom-in" className="title has-text-centered">
        Skills
      </h1>
      <div className="tags is-centered">
        {data.skills.nodes.map(item => (
          <>
            {item.langs.map(lang => (
              <span data-sal="zoom-in" className="tag">{lang}</span>
            ))}
          </>
        ))}
      </div>
    </section>
  );
};

export default Footer;
