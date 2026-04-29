import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { UserPlus, Flag, Home as HomeIcon, CheckCircle2 } from 'lucide-react';

const Eligibility = () => {
  const { t } = useTranslation();

  const criteria = [
    { id: 'age', icon: <UserPlus className="w-6 h-6 text-saffron" /> },
    { id: 'citizen', icon: <Flag className="w-6 h-6 text-navy" /> },
    { id: 'address', icon: <HomeIcon className="w-6 h-6 text-green" /> },
    { id: 'sound', icon: <CheckCircle2 className="w-6 h-6 text-blue-500" /> }
  ];

  return (
    <section className="py-16 bg-white sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-navy sm:text-4xl">
            {t('eligibility.title')}
          </h2>
          <div className="mt-4 w-32 h-1.5 bg-gradient-to-r from-saffron via-gray-200 to-green mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {criteria.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="card-gradient-border p-6 flex flex-col items-center text-center w-full"
            >
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 transition-transform duration-300 group-hover:scale-110">
                {item.icon}
              </div>
              <p className="font-semibold text-gray-800">
                {t(`eligibility.items.${item.id}`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Eligibility;
