import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { UserPlus, Flag, Home as HomeIcon, CheckCircle2 } from 'lucide-react';

const Eligibility = () => {
  const { t } = useTranslation();

  const criteria = [
    { id: 'age', icon: <UserPlus className="w-8 h-8 text-saffron" />, color: "bg-orange-50" },
    { id: 'citizen', icon: <Flag className="w-8 h-8 text-navy" />, color: "bg-blue-50" },
    { id: 'address', icon: <HomeIcon className="w-8 h-8 text-green" />, color: "bg-green-50" },
    { id: 'sound', icon: <CheckCircle2 className="w-8 h-8 text-blue-500" />, color: "bg-cyan-50" }
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
              className="card-gradient-border p-8 flex flex-col items-center text-center w-full group"
            >
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center shadow-sm mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 ${item.color}`}>
                {item.icon}
              </div>
              <p className="font-bold text-lg text-[#111827] leading-tight">
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
