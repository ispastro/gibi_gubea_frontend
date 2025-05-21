import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const { t, i18n } = useTranslation();
  
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-liturgical-blue holy-cross-bg overflow-hidden">
      <div className="absolute inset-0 bg-liturgical-blue/70"></div>
      
      <div className="container mx-auto px-4 py-20 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block p-4 bg-gold/20 rounded-full mb-8">
            <div className="w-24 h-24 flex items-center justify-center bg-white rounded-full">
              <svg viewBox="0 0 24 24" width="60" height="60" fill="#1A237E" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C11.4477 2 11 2.44772 11 3V10H5C4.44772 10 4 10.4477 4 11V13C4 13.5523 4.44772 14 5 14H11V21C11 21.5523 11.4477 22 12 22H14C14.5523 22 15 21.5523 15 21V14H20C20.5523 14 21 13.5523 21 13V11C21 10.4477 20.5523 10 20 10H15V3C15 2.44772 14.5523 2 14 2H12Z" />
              </svg>
            </div>
          </div>
          
          <h1 className={`text-4xl md:text-6xl font-bold text-white mb-4 ${i18n.language === 'am' ? 'amharic' : ''}`}>
            {t('hero.title')}
          </h1>
          
          <p className={`text-xl md:text-2xl text-gold mb-8 ${i18n.language === 'am' ? 'amharic' : ''}`}>
            {t('hero.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={scrollToAbout}
              className="btn-gold"
            >
              {t('hero.cta')}
            </button>
            
            <Link to="/admin/login" className="btn-secondary text-white border-white hover:bg-white/20">
              {t('hero.login')}
            </Link>
          </div>
        </motion.div>
      </div>
      
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 1,
          delay: 1,
          repeat: Infinity,
          repeatType: "reverse"
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