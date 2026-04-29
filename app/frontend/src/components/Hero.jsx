import { useTranslation } from 'react-i18next';
import { ArrowRight, BotMessageSquare, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import flagImg from '../assets/images/flag.png';

const Hero = () => {
  const { t } = useTranslation();

  return (
    <div className="relative bg-white overflow-hidden min-h-[90vh] flex items-center">
      {/* Background with abstract wave and particle effects */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Indian Flag Inspired Background Bands */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FF9933]/15 via-white/80 to-[#138808]/15"></div>
        <div className="absolute top-0 w-full h-1/3 bg-[#FF9933]/5 blur-[120px]"></div>
        <div className="absolute bottom-0 w-full h-1/3 bg-[#138808]/5 blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="sm:text-center lg:text-left py-12 lg:py-24"
          >
            <h1 className="text-4xl tracking-tight font-extrabold text-navy sm:text-5xl md:text-6xl lg:text-7xl mb-6">
              <span className="block">{t('hero.title')}</span>
            </h1>
            <p className="mt-3 text-lg text-gray-700 sm:mt-5 sm:text-xl max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed font-medium border-l-4 border-saffron pl-4">
              {t('hero.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:justify-center lg:justify-start">
              <a
                href="#process"
                className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-semibold rounded-xl text-white bg-saffron hover:bg-[#e55a15] hover:shadow-lg hover:-translate-y-0.5 transition-all w-full sm:w-auto"
              >
                {t('hero.ctaStart')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>

              <a
                href="#registration"
                className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-navy text-base font-semibold rounded-xl text-navy bg-transparent hover:bg-navy hover:text-white hover:shadow-lg hover:-translate-y-0.5 transition-all w-full sm:w-auto"
              >
                <CheckCircle2 className="mr-2 w-5 h-5" />
                {t('hero.ctaRegister')}
              </a>
            </div>

            <div className="mt-6 sm:mt-8 flex justify-center lg:justify-start">
              <button
                onClick={() => { }} // AI Assistant
                className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-semibold rounded-xl text-saffron bg-orange-50 hover:bg-orange-100 hover:shadow-md transition-all w-full sm:w-auto"
              >
                <BotMessageSquare className="mr-2 w-5 h-5" />
                {t('hero.ctaAsk')}
              </button>
            </div>
          </motion.div>

          {/* Right Visual Content - New Image Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center items-center relative"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative w-full max-w-lg aspect-square lg:aspect-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-white"
            >
              <img
                src={flagImg}
                alt="Indian Flag"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </motion.div>
          </motion.div>


        </div>
      </div>
    </div>
  );
};

export default Hero;
