import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Landmark, Building2, Building, MapPin } from 'lucide-react';

const TypesOfElections = () => {
  const { t } = useTranslation();

  const types = [
    { id: 'loksabha', icon: <Landmark className="w-8 h-8 text-saffron" /> },
    { id: 'rajyasabha', icon: <Building2 className="w-8 h-8 text-navy" /> },
    { id: 'assembly', icon: <Building className="w-8 h-8 text-green" /> },
    { id: 'local', icon: <MapPin className="w-8 h-8 text-gray-600" /> }
  ];

  return (
    <section className="py-16 bg-gray-50 sm:py-24" id="types">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-navy sm:text-4xl">
            {t('types.title')}
          </h2>
          <div className="mt-4 w-32 h-1.5 bg-gradient-to-r from-saffron via-gray-200 to-green mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {types.map((type, index) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-gradient-border p-8 flex gap-6 w-full"
            >
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  {type.icon}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#111827] mb-3 opacity-100">
                  {t(`types.cards.${type.id}.title`)}
                </h3>
                <p className="text-[#1f2937] leading-relaxed opacity-100 font-medium">
                  {t(`types.cards.${type.id}.desc`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TypesOfElections;
