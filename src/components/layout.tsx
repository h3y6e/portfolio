import React, { useEffect } from "react"
// Styles
import "../styles/index.scss"
// Components
import Navbar from "../components/navbar"
import Footer from "../components/footer"

const Layout: React.FC = ({ children }) => {
  useEffect(() => {
  }, [])

  return (
    <React.Fragment>
      <Navbar />
      {children}
      <Footer />
    </React.Fragment>
  )
}

export default Layout
