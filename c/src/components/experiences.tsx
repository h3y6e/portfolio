import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import styled from "@emotion/styled"

interface ExperienceData {
  experience: {
    nodes: {
      date: string
      title: string
      content: string
      link: string
      color: string
    }[]
  }
}

const query = graphql`
  query ExperienceQuery {
    experience: allExperienceYaml {
      nodes {
        date
        title
        content
        link
        color
      }
    }
  }
`

const Content = styled.p`
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
`

const Experience: React.FC = () => {
  const data: ExperienceData = useStaticQuery(query)
  return (
    <section id="experiences" className="section">
      <h1 data-sal="zoom-in" className="title has-text-centered">Experiences</h1>
      <div className="timeline is-centered">
        {data.experience.nodes.map(item => (
          <div data-sal="slide-up" className="timeline-item">
            <div className={`timeline-marker is-${item.color}`}></div>
            <div className="timeline-content">
              <p className="heading">{item.date}</p>
              <a className="is-size-5 has-text-grey-dark has-text-weight-semibold" href={item.link}>
                {item.title}
                </a>
              <Content>{item.content}</Content>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Experience
