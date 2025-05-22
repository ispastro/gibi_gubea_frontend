import { useEffect } from 'react';
import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import About from '../components/landing/About';
import Vision from '../components/landing/Vision';
import Structure from '../components/landing/Structure';
import Involvement from '../components/landing/Involvement';
import Gallery from '../components/landing/Gallery';
// import Events from '../components/landing/Events';
import Contact from '../components/landing/Contact';
import Footer from '../components/landing/Footer';

const LandingPage = () => {
  useEffect(() => {
    document.title = '፮ኪሎ ግቢ ጉባኤ | 6 Kilo Gibi Gubae';
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Vision />
        <Structure />
        <Involvement />
        <Gallery />
        {/* <Events /> */}
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;