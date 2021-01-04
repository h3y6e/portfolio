import React from "react";
import styled from "@emotion/styled";

const Br = styled.br`
  @media (min-width: 70rem) {
    display: none;
  }
`;

const Footer: React.FC = () => (
  <footer className="footer">
    <div className="content has-text-centered is-family-monospace">
      <p>
        &copy; 2020-2021 <a href="https://github.com/5ebec">5ebec</a> <Br /> ::
        Powered by <a href="https://www.gatsbyjs.org/">Gatsby</a> +{" "}
        <a href="https://bulma.io/">Bulma</a>
      </p>
    </div>
  </footer>
);

export default Footer;
