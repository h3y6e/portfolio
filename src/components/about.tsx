import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "@emotion/styled"

interface AboutData {
  about: {
    title: string
    content1: string
    content2: string
  }
}

const query = graphql`
  query aboutQuery {
    about: aboutYaml {
      title
      content1
      content2
    }
  }
`

const Br = styled.br`
  @media (max-width: 70rem) {
    display: none;
  }
`

const About: React.FC = ({ children }) => {
  const data: AboutData = useStaticQuery(query)
  return (
    <section id="about" className="section has-text-centered">
      <h1 data-sal="zoom-in" className="title">
        {data.about.title}
      </h1>
      <p data-sal="zoom-in" className="content">
        {data.about.content1}
        <Br/>
        {data.about.content2}
      </p>
      {children}
    </section>
  )
}

export default About
