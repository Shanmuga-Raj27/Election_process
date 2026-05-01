import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Home, Globe, BotMessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../components/Footer';

const EVMGuide = () => {
  const { t, i18n } = useTranslation();
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('preferredLanguage', lng);
    setIsLangMenuOpen(false);
  };

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'ta', name: 'தமிழ்' }
  ];

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

  return (
    <div className="min-h-screen bg-white">
      {/* Updated Header consistent with Homepage UI */}
      <header className="h-20 flex items-center justify-between px-6 md:px-12 border-b border-gray-100 bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-saffron via-white to-green flex items-center justify-center shadow-sm border border-gray-100">
            <span className="text-navy font-extrabold text-xl">IN</span>
          </div>
          <span className="font-extrabold text-2xl text-navy tracking-tight hidden sm:block">Election Edu</span>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 px-5 py-2.5 bg-saffron text-white hover:bg-[#e55a15] rounded-full transition-all text-sm font-bold shadow-md hover:shadow-lg"
          >
            <Home size={18} />
            <span className="hidden md:inline">{t('nav.home', 'Home')}</span>
          </Link>

          {/* New Prominent Language Button */}
          <div className="relative">
            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-navy text-white font-bold rounded-full shadow-lg hover:bg-navy/90 hover:scale-105 transition-all"
            >
              <Globe className="w-4 h-4" />
              <span className="uppercase">{currentLang.code}</span>
            </button>

            <AnimatePresence>
              {isLangMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 top-full mt-2 w-40 bg-white border border-gray-100 rounded-2xl shadow-2xl py-2 z-[100]"
                >
                  {languages.map((lng) => (
                    <button
                      key={lng.code}
                      onClick={() => changeLanguage(lng.code)}
                      className={`w-full text-left px-4 py-2 text-sm font-bold transition-colors ${
                        i18n.language === lng.code ? 'text-saffron bg-orange-50' : 'text-navy hover:bg-gray-50'
                      }`}
                    >
                      {lng.name}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <div className="bg-gradient-to-b from-orange-50/30 to-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-navy tracking-tighter mb-4 uppercase">
            {t('evm.title', 'How to Vote Using EVM')}
            <div className="h-1.5 w-32 bg-gradient-to-r from-saffron via-gray-200 to-green mx-auto mt-4 rounded-full"></div>
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto font-bold leading-relaxed px-4">
            {t('evm.video_desc')}
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">

        {/* Section 1: YouTube Educational Video */}
        <section className="space-y-12">
          <div className="max-w-4xl mx-auto relative card-gradient-border p-1.5">
            <div className="relative aspect-video rounded-[14px] overflow-hidden bg-black shadow-inner">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube-nocookie.com/embed/n3W-oVn4lXo?rel=0"
                title="How to Vote Using EVM"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full object-cover"
              ></iframe>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="card-gradient-border p-1">
              <div className="bg-gray-100 rounded-[16px] overflow-hidden aspect-video relative group">
                <img
                  src="https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?q=80&w=1000&auto=format&fit=crop"
                  alt="Voting Booth Process"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <span className="text-white font-black text-xl">{t('evm.procedure', 'Voting Procedure')}</span>
                </div>
              </div>
            </div>
            <div className="card-gradient-border p-1">
              <div className="bg-gray-100 rounded-[16px] overflow-hidden aspect-video relative group">
                <img
                  src="https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?q=80&w=1000&auto=format&fit=crop"
                  alt="EVM Machine Display"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <span className="text-white font-black text-xl">{t('evm.identity', 'Identity Verification')}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Step-by-Step Guide */}
        <section className="space-y-12">
          <div className="text-center">
            <h3 className="text-3xl font-black text-navy uppercase tracking-widest">
              {t('evm.steps.title', 'Voting Steps')}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-12">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="card-gradient-border p-8 hover:-translate-y-2 transition-all">
                <div className="flex gap-6 items-start">
                  <div className="shrink-0 w-16 h-16 rounded-2xl bg-navy text-white flex items-center justify-center text-3xl font-black shadow-lg">
                    {step}
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-navy mb-2 uppercase">
                      {t(`evm.steps.s${step}_title`)}
                    </h4>
                    <p className="text-gray-700 font-bold leading-relaxed">
                      {t(`evm.steps.s${step}_desc`)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default EVMGuide;
