import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { mockEvents } from '../../data/mockData';
import { format } from 'date-fns';

const Events = () => {
  const { t, i18n } = useTranslation();
  
  return (
    <section id="events" className="section-container bg-white">
      <motion.h2 
        className={`section-heading text-liturgical-blue ${i18n.language === 'am' ? 'amharic' : ''}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {t('events.title')}
      </motion.h2>
      
      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className={`text-xl font-semibold mb-4 text-liturgical-blue ${i18n.language === 'am' ? 'amharic' : ''}`}>
            {t('events.upcoming')}
          </h3>
          
          {mockEvents.length > 0 ? (
            <div className="space-y-4">
              {mockEvents.map((event) => (
                <motion.div 
                  key={event.id}
                  className="bg-liturgical-blue/5 rounded-lg p-5 border border-liturgical-blue/10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h4 className={`text-lg font-medium mb-2 text-liturgical-blue ${i18n.language === 'am' ? 'amharic' : ''}`}>
                    {event.title}
                  </h4>
                  
                  <div className="space-y-2 text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-gold" />
                      <span>{format(new Date(event.date), 'MMMM d, yyyy')}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-gold" />
                      <span>{event.time}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-gold" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  
                  <p className="mt-3 text-gray-700">
                    {event.description}
                  </p>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className={`text-gray-500 italic ${i18n.language === 'am' ? 'amharic' : ''}`}>
              {t('events.no_events')}
            </p>
          )}
        </motion.div>
        
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className={`text-xl font-semibold mb-4 text-liturgical-blue ${i18n.language === 'am' ? 'amharic' : ''}`}>
            {t('events.calendar')}
          </h3>
          
          <div className="bg-liturgical-blue/5 rounded-lg p-5 border border-liturgical-blue/10 h-96 flex items-center justify-center">
            <div className="text-center">
              <Calendar size={48} className="mx-auto text-gold mb-4" />
              <p className={`text-lg font-medium text-liturgical-blue ${i18n.language === 'am' ? 'amharic' : ''}`}>
                {i18n.language === 'am' ? 'የኢትዮጵያ ኦርቶዶክስ የቀን መቁጠሪያ' : 'Ethiopian Orthodox Calendar'}
              </p>
              <p className="text-gray-600 mt-2">
                {i18n.language === 'am' 
                  ? 'የአብይ አመታት መቁጠሪያ በቅርብ ጊዜ ይቀርባል'
                  : 'Coming soon with significant religious dates and fasting periods'}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Events;