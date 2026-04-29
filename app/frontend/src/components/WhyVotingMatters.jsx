import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Users, Scale, ShieldCheck } from 'lucide-react';

const WhyVotingMatters = () => {
  const { t } = useTranslation();

  const cards = [
    {
      id: 'voice',
      icon: <Users className="w-8 h-8 text-saffron" />,
      color: "bg-orange-50",
    },
    {
      id: 'democracy',
      icon: <Scale className="w-8 h-8 text-green" />,
      color: "bg-green-light",
    },
    {
      id: 'responsibility',
      icon: <ShieldCheck className="w-8 h-8 text-navy" />,
      color: "bg-blue-50",
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="py-16 bg-gray-50 sm:py-24" id="why-voting-matters">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-navy sm:text-4xl">
            {t('whyVoting.title')}
          </h2>
          <div className="mt-4 w-32 h-1.5 bg-gradient-to-r from-saffron via-gray-200 to-green mx-auto rounded-full"></div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {cards.map((card) => (
            <motion.div 
              key={card.id}
              variants={itemVariants}
              className="card-gradient-border p-8 flex flex-col items-center text-center w-full"
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 ${card.color}`}>
                {card.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {t(`whyVoting.cards.${card.id}.title`)}
              </h3>
              <p className="text-gray-600">
                {t(`whyVoting.cards.${card.id}.desc`)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyVotingMatters;
