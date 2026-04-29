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
          <div className="grid grid-cols-2 border-b-2 border-black relative z-0">
            <div className="p-8 text-center font-black text-2xl text-saffron border-r-2 border-black bg-gray-50/50">
              Lok Sabha
            </div>
            <div className="p-8 text-center font-black text-2xl text-navy bg-gray-50/50">
              Rajya Sabha
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y-2 divide-black">
            {['title', 'rep', 'method', 'term', 'role'].map((key) => (
              <div key={key} className="grid grid-cols-2 hover:bg-gray-50 transition-colors">
                {/* Lok Sabha Cell */}
                <div className="p-8 border-r-2 border-black bg-white flex flex-col gap-2">
                  <span className="text-xs font-black uppercase tracking-widest text-saffron">
                    {t(`compare.labels.${key}`)}
                  </span>
                  <div className="text-gray-800 leading-relaxed font-medium">
                    {t(`compare.loksabha.${key}`)}
                  </div>
                </div>

                {/* Rajya Sabha Cell */}
                <div className="p-8 bg-white flex flex-col gap-2">
                  <span className="text-xs font-black uppercase tracking-widest text-navy">
                    {t(`compare.labels.${key}`)}
                  </span>
                  <div className="text-gray-800 leading-relaxed font-medium">
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
