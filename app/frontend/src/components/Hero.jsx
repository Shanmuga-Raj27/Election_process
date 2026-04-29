import { useTranslation } from 'react-i18next';
import { ArrowRight, BotMessageSquare, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

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
        <motion.div 
          animate={{ scale: [1, 1.05, 1], rotate: [0, 2, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#FF9933]/15 rounded-full blur-3xl"
        ></motion.div>
        <motion.div 
          animate={{ scale: [1, 1.1, 1], rotate: [0, -2, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-[#138808]/15 rounded-full blur-3xl"
        ></motion.div>
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
                onClick={() => {}} // AI Assistant
                className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-semibold rounded-xl text-saffron bg-orange-50 hover:bg-orange-100 hover:shadow-md transition-all w-full sm:w-auto"
              >
                <BotMessageSquare className="mr-2 w-5 h-5" />
                {t('hero.ctaAsk')}
              </button>
            </div>
          </motion.div>
          
          {/* Right Visual Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:flex justify-center items-center relative"
          >
            {/* Parallax Container */}
            <div className="relative w-full max-w-lg aspect-square">
              {/* Central Card */}
              <motion.div 
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 flex flex-col justify-center items-center overflow-hidden z-20"
              >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-saffron via-white to-green"></div>
                <div className="w-full flex justify-between items-end gap-6 h-48 border-b-2 border-gray-100 pb-4">
                    <motion.div initial={{ height: 0 }} animate={{ height: '50%' }} transition={{ duration: 1.2, delay: 0.5 }} className="w-1/3 bg-saffron rounded-t-lg shadow-sm" />
                    <motion.div initial={{ height: 0 }} animate={{ height: '90%' }} transition={{ duration: 1.2, delay: 0.7 }} className="w-1/3 bg-navy rounded-t-lg shadow-sm" />
                    <motion.div initial={{ height: 0 }} animate={{ height: '70%' }} transition={{ duration: 1.2, delay: 0.9 }} className="w-1/3 bg-green rounded-t-lg shadow-sm" />
                </div>
                <div className="w-full mt-6 h-14 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center">
                    <div className="w-1/2 h-2 rounded-full bg-gray-200" />
                </div>
              </motion.div>

              {/* Floating Element 1 */}
              <motion.div
                animate={{ y: [15, -15, 15], rotate: [-5, 5, -5] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -top-8 -right-8 w-24 h-24 bg-white rounded-2xl shadow-xl border border-gray-100 flex items-center justify-center z-30"
              >
                <div className="w-12 h-12 rounded-full border-4 border-saffron flex items-center justify-center">
                  <span className="text-saffron font-bold">18+</span>
                </div>
              </motion.div>

              {/* Floating Element 2 */}
              <motion.div
                animate={{ y: [-15, 15, -15], rotate: [5, -5, 5] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-8 -left-8 w-32 h-20 bg-white rounded-2xl shadow-xl border border-gray-100 flex items-center justify-center z-30 gap-2 px-4"
              >
                <div className="w-3 h-3 rounded-full bg-green"></div>
                <div className="h-2 w-16 bg-gray-200 rounded-full"></div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Hero;
