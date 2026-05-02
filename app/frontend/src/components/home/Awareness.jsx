import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckSquare, HeartHandshake, BookOpen } from 'lucide-react';

const Awareness = () => {
  const { t } = useTranslation();

  const cards = [
    { id: 'fakenews', icon: <AlertTriangle className="w-8 h-8 text-saffron" /> },
    { id: 'verify', icon: <CheckSquare className="w-8 h-8 text-navy" /> },
    { id: 'respect', icon: <HeartHandshake className="w-8 h-8 text-green" /> },
    { id: 'responsible', icon: <BookOpen className="w-8 h-8 text-blue-600" /> }
  ];

  return (
    <section className="py-16 bg-gray-50 sm:py-24" id="awareness">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-navy sm:text-4xl">
            {t('awareness.title')}
          </h2>
          <div className="mt-4 w-32 h-1.5 bg-gradient-to-r from-saffron via-gray-200 to-green mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              className="card-gradient-border p-6 flex gap-4 w-full"
            >
              <div className="flex-shrink-0 mt-1 transition-transform duration-300 group-hover:scale-110">
                {card.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {t(`awareness.cards.${card.id}.title`)}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t(`awareness.cards.${card.id}.desc`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Awareness;
