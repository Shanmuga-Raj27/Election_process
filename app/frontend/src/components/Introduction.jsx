import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';

const Introduction = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16 bg-white sm:py-24" id="introduction">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto card-gradient-border p-6 sm:p-10"
        >
          <div className="inline-flex items-center justify-center p-3 bg-blue-50 rounded-full mb-6">
            <Info className="w-8 h-8 text-navy" />
          </div>
          <h2 className="text-3xl font-extrabold text-navy sm:text-4xl">
            {t('intro.title')}
          </h2>
          <div className="mt-4 mb-6 w-32 h-1.5 bg-gradient-to-r from-saffron via-gray-200 to-green mx-auto rounded-full"></div>
          <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
            <p>{t('intro.desc1')}</p>
            <p className="font-medium text-gray-900 border-l-4 border-saffron pl-4 text-left italic">
              {t('intro.desc2')}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Introduction;
