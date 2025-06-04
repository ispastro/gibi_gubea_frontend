import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import backgroundImage from '../../assets/backgroundImage.jpg'; //  You imported it

const Hero = () => {
  const { t, i18n } = useTranslation();

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-liturgical-blue/50 z-0"></div>

      {/* Content */}
      <div className="container mx-auto px-4 py-20 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block rounded-full mb-8">
            <div className="flex items-center justify-center bg-white p-4 rounded-full">
              <img src={logo} className="w-16 h-16 object-contain" alt="Logo" />
            </div>
          </div>

          <h1 className={`text-4xl md:text-6xl font-bold text-white mb-4 ${i18n.language === 'am' ? 'amharic' : ''}`}>
            {t('hero.title')}
          </h1>

          <p className={`text-xl md:text-2xl text-gold mb-8 ${i18n.language === 'am' ? 'amharic' : ''}`}>
            {t('hero.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={scrollToAbout} className="btn-gold">
              {t('hero.cta')}
            </button>

            <Link to="/admin/login" className="btn-secondary text-white border-white hover:bg-white/20">
              {t('hero.login')}
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          delay: 1,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      >
        <button onClick={scrollToAbout} className="flex flex-col items-center">
          <span className="mb-2 text-sm font-medium">{t('hero.cta')}</span>
          <ChevronDown size={24} />
        </button>
      </motion.div>
    </section>
  );
};

export default Hero;
