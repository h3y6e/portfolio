import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import styled from "@emotion/styled"

interface ExperiencesData {
  experiences: {
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
  query ExperiencesQuery {
    experiences: allExperiencesYaml {
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

const Experiences: React.FC = () => {
  const data: ExperiencesData = useStaticQuery(query)
  return (
    <section id="experiences" className="section">
      <h1 data-sal="zoom-in" className="title has-text-centered">Experiences</h1>
      <div className="timeline is-centered">
        {data.experiences.nodes.map(item => (
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

export default Experiences
