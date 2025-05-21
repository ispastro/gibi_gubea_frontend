import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Cross, Heart } from 'lucide-react';

const Footer = () => {
  const { t, i18n } = useTranslation();
  
  return (
    <footer className="bg-liturgical-blue text-white py-8 px-4">
      <div className="container mx-auto">
        <motion.div 
          className="flex flex-col items-center justify-center text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center space-x-2 mb-4">
            <Cross className="text-gold" size={24} />
            <h2 className={`font-bold text-xl ${i18n.language === 'am' ? 'amharic' : ''}`}>
              {t('siteName')}
            </h2>
          </div>
          
          <p className={`max-w-lg mx-auto mb-6 ${i18n.language === 'am' ? 'amharic' : ''}`}>
            {i18n.language === 'am' 
              ? 'መንፈሳዊ ለሆኑ የአዲስ አበባ ዩኒቨርሲቲ ተማሪዎች መልካም መንፈሳዊ አብሮነት'
              : 'Providing spiritual community for Orthodox students at Addis Ababa University'}
          </p>
          
          <p className="text-white/70 text-sm flex items-center justify-center">
            &copy; {new Date().getFullYear()} 6 Kilo Gibi Gubae 
            <Heart size={14} className="mx-1 text-gold" fill="#D4AF37" /> 
            {i18n.language === 'am' ? 'በተማሪዎች' : 'Made with love by students'}
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;