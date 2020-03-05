import React, { useState, useCallback, useEffect } from "react";
import { graphql, useStaticQuery } from "gatsby";
import scrollTo from "gatsby-plugin-smoothscroll";
import styled from "@emotion/styled";

interface NavigationData {
  navigation: {
    nodes: {
      name: string;
      link: string;
    }[];
  };
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
`;

const Nav = styled.nav`
  &.is-transparent {
    background-color: transparent;
  }
`;

const Strong = styled.strong`
  color: #2aa298;
`;

const Navbar: React.FC = () => {
  const data: NavigationData = useStaticQuery(query);

  const [isActive, setIsActive] = useState(false);
  const handleClick = useCallback(() => setIsActive(!isActive), [isActive]);

  const [onTop, setOnTop] = useState(true);
  const handleScroll = () => {
    const offset =
      window.pageYOffset ||
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    if (offset > window.innerHeight) {
      onTop && setOnTop(false);
      return false;
    }
    setOnTop(true);
  };

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  });

  return (
    <Nav
      className={`navbar is-fixed-top is-family-monospace ${
        isActive || !onTop ? "" : "is-transparent"
      }`}
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a
          data-sal="slide-right"
          className="navbar-item has-text-weight-semibold"
          onClick={() => scrollTo("#top")}
        >
          a5e<Strong>.</Strong>be<Strong>/</Strong>c
        </a>
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
            <a
              data-sal="slide-left"
              data-sal-delay={100 * index}
              className="navbar-item"
              onClick={handleClick}
            >
              <div onClick={() => scrollTo(item.link)}>{item.name}</div>
            </a>
          ))}
        </div>
      </div>
    </Nav>
  );
};

export default Navbar;
