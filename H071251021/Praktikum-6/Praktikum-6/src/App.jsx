import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Gallery from "./components/Gallery.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-200">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Gallery />
      <Footer />
    </div>
  );
}

export default App;
