import React, { useState, useCallback } from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import styled from "@emotion/styled"

interface NavigationData {
  navigation: {
    nodes: {
      name: string
      link: string
    }[]
  }
}

const query = graphql`
  query NavigationQuery {
    navigation: allNavigationYaml {
      nodes {
        name
        link
      }
    }
  }
`

const Nav = styled.nav`
  &.is-transparent {
    background-color: transparent;
  }
`

const pathPrefix: string = require("../../config").pathPrefix

const Navbar: React.FC = () => {
  const data: NavigationData = useStaticQuery(query)

  const [isActive, setState] = useState(false)
  const handleClick = useCallback(() => setState(!isActive), [isActive])

  return (
    <Nav
      className={`navbar is-fixed-top is-family-monospace ${
        isActive ? "" : "is-transparent"
      }`}
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link data-sal="slide-right" className="navbar-item" to={pathPrefix}>
          a5e.be/c
        </Link>
        <a
          role="button"
          className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
          aria-label="menu"
          aria-expanded="false"
          onClick={handleClick}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div className={`navbar-menu ${isActive ? "is-active" : ""}`}>
        <div className="navbar-end">
          {data.navigation.nodes.map((item, index) => (
            <Link
              data-sal="slide-left"
              data-sal-delay={100 * index}
              className="navbar-item"
              to={pathPrefix + item.link}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </Nav>
  )
}

export default Navbar
