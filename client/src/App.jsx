import { MotionConfig } from "motion/react";
import { Route,Routes } from "react-router-dom";
import { Navbar } from "./components/share/NavBar.jsx"
import { DashBoard, DocsPage,LinksPage } from "./pages";

export default function App() {
  return(
    <MotionConfig reducedMotion="user">
      <Navbar />
      <Routes>
        <Route path="/" element={ <DashBoard /> } />
        <Route path="/dashboard" element={ <DashBoard /> } />
        <Route path="/docs" element={ <DocsPage /> } />
        <Route path="/links" element={ <LinksPage /> } />
      </Routes>
    </MotionConfig>
  )
}
