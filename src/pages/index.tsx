import React from "react";

// Components
import Layout from "../components/layout";
import Hero from "../components/hero";
import About from "../components/about";
import Links from "../components/links";
import Experiences from "../components/experiences";
import Products from "../components/products";
import Skills from "../components/skills";

const Index: React.FC = () => (
  <Layout>
    <Hero />
    <About>
      <Links />
    </About>
    <Experiences />
    <Products />
    <Skills />
  </Layout>
);

export default Index;

export { Head } from "../components/head";
