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
  const handleScroll = (): void => {
    const offset =
      window.pageYOffset ||
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    if (offset > window.innerHeight) {
      if (onTop) setOnTop(false);
      return;
    }
    setOnTop(true);
  };

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return (): void => document.removeEventListener("scroll", handleScroll);
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
          className="navbar-item has-text-weight-semibold is-size-6"
          onClick={(): void => {
            scrollTo("#top");
            setIsActive(false);
          }}
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
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </div>
      <div className={`navbar-menu ${isActive ? "is-active" : ""}`}>
        <div className="navbar-end">
          {data.navigation.nodes.map((item, index) => (
            <a
              data-sal="slide-left"
              data-sal-delay={100 * index}
              className="navbar-item"
              onClick={(): void => {
                scrollTo(item.link);
                setIsActive(false);
              }}
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </Nav>
  );
};

export default Navbar;
