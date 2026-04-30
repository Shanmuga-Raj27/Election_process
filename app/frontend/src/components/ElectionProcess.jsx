import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Calendar, FileText, Megaphone, UserCheck, Vote, Calculator, Trophy } from 'lucide-react';

const ElectionProcess = () => {
  const { t } = useTranslation();

  const steps = [
    { id: 'announcement', icon: <Calendar className="w-6 h-6" /> },
    { id: 'nomination', icon: <FileText className="w-6 h-6" /> },
    { id: 'campaign', icon: <Megaphone className="w-6 h-6" /> },
    { id: 'verification', icon: <UserCheck className="w-6 h-6" /> },
    { id: 'voting', icon: <Vote className="w-6 h-6" /> },
    { id: 'counting', icon: <Calculator className="w-6 h-6" /> },
    { id: 'results', icon: <Trophy className="w-6 h-6" /> }
  ];

  return (
    <section className="py-16 bg-white sm:py-24" id="process">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-navy sm:text-4xl h1-mobile">
            {t('process.title')}
          </h2>
          <div className="mt-4 w-32 h-1.5 bg-gradient-to-r from-saffron via-gray-200 to-green mx-auto rounded-full"></div>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Timeline Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-200 rounded-full"></div>
          
          <div className="space-y-8 md:space-y-12">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div 
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative flex flex-col md:flex-row items-center justify-between w-full"
                >
                  {/* Left Side */}
                  <div className={`md:w-5/12 mb-6 md:mb-0 ${isEven ? 'md:text-right md:pr-12' : 'md:order-3 md:text-left md:pl-12'}`}>
                    <div className="card-gradient-border p-6 w-full">
                      {/* Arrow pointer for desktop */}
                      <div className={`hidden md:block absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-gray-50 border-gray-100 rotate-45 ${isEven ? '-right-2 border-t border-r' : '-left-2 border-b border-l'}`}></div>
                      
                      <h3 className="text-xl font-bold text-navy mb-2 flex items-center md:inline-flex md:justify-end gap-3">
                         {!isEven && <div className="md:hidden text-saffron">{step.icon}</div>}
                         {isEven && <div className="md:hidden text-saffron">{step.icon}</div>}
                         {t(`process.steps.${step.id}.title`)}
                      </h3>
                      <p className="text-gray-600">
                        {t(`process.steps.${step.id}.desc`)}
                      </p>
                    </div>
                  </div>

                  {/* Center Dot */}
                  <div className="hidden md:flex relative w-2/12 order-2 justify-center z-10">
                    <div className="w-12 h-12 bg-white rounded-full border-4 border-saffron flex items-center justify-center shadow-sm text-saffron">
                      {step.icon}
                    </div>
                  </div>

                  {/* Empty Right Side for layout */}
                  <div className={`hidden md:block w-5/12 ${isEven ? 'order-3' : 'order-1'}`}></div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ElectionProcess;
