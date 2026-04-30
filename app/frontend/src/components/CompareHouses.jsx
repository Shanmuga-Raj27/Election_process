import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const CompareHouses = () => {
  const { t } = useTranslation();

  const features = ['house', 'election', 'term', 'rep'];

  return (
    <section className="py-16 bg-white sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-navy sm:text-4xl">
            {t('compare.title')}
          </h2>
          <div className="mt-4 w-32 h-1.5 bg-gradient-to-r from-saffron via-gray-200 to-green mx-auto rounded-full"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="card-gradient-border max-w-4xl mx-auto overflow-hidden p-0 bg-white"
        >
          {/* Table Header */}
          <div className="grid grid-cols-1 md:grid-cols-2 border-b-2 border-black relative z-0">
            <div className="p-6 md:p-8 text-center font-black text-xl md:text-2xl text-saffron md:border-r-2 border-black bg-gray-50/50">
              Lok Sabha
            </div>
            <div className="p-6 md:p-8 text-center font-black text-xl md:text-2xl text-navy bg-gray-50/50 border-t-2 md:border-t-0 border-black">
              Rajya Sabha
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y-2 divide-black">
            {['title', 'rep', 'method', 'term', 'role'].map((key) => (
              <div key={key} className="grid grid-cols-1 md:grid-cols-2 hover:bg-gray-50 transition-colors">
                {/* Lok Sabha Cell */}
                <div className="p-6 md:p-8 md:border-r-2 border-black bg-white flex flex-col gap-2">
                  <span className="text-xs font-black uppercase tracking-widest text-saffron">
                    Lok Sabha • {t(`compare.labels.${key}`)}
                  </span>
                  <div className="text-gray-800 leading-relaxed font-medium p-mobile">
                    {t(`compare.loksabha.${key}`)}
                  </div>
                </div>

                {/* Rajya Sabha Cell */}
                <div className="p-6 md:p-8 bg-white flex flex-col gap-2 border-t md:border-t-0 border-black">
                  <span className="text-xs font-black uppercase tracking-widest text-navy">
                    Rajya Sabha • {t(`compare.labels.${key}`)}
                  </span>
                  <div className="text-gray-800 leading-relaxed font-medium p-mobile">
                    {t(`compare.rajyasabha.${key}`)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CompareHouses;
