import { useTranslation } from 'react-i18next';
import { Home, BotMessageSquare, Languages } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const EVMGuide = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Custom Header with Logo, Language Selection, Home and AI Buttons */}
      <header className="h-20 flex items-center justify-between px-6 md:px-12 border-b border-gray-100 bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF9933] via-white to-[#138808] flex items-center justify-center shadow-sm border border-gray-100">
            <span className="text-[#06038D] font-extrabold text-xl">IN</span>
          </div>
          <span className="font-extrabold text-2xl text-[#06038D] tracking-tight hidden sm:block">Election Edu</span>
        </div>

        <div className="flex items-center gap-4 lg:gap-6">
          {/* Language Selection Button (Desktop) */}
          <div className="hidden md:flex items-center gap-2 border-r pr-4 border-gray-200">
            <Languages className="w-5 h-5 text-gray-500" />
            <select
              onChange={(e) => changeLanguage(e.target.value)}
              value={i18n.language}
              className="bg-transparent text-gray-700 font-bold focus:outline-none cursor-pointer text-sm"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
              <option value="ta">தமிழ்</option>
            </select>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 px-4 md:px-6 py-2.5 bg-[#FF671F] text-white hover:bg-[#e55a15] rounded-full transition-all text-xs md:text-sm font-bold shadow-md hover:shadow-lg"
            >
              <Home size={18} />
              <span className="hidden md:inline">Homepage</span>
            </Link>
            <Link
              to="/chat"
              className="flex items-center gap-2 px-4 md:px-6 py-2.5 bg-[#06038D] text-white hover:bg-[#05026b] rounded-full transition-all text-xs md:text-sm font-bold shadow-md hover:shadow-lg"
            >
              <BotMessageSquare size={18} />
              <span className="hidden md:inline">Ask AI Assistant</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <div className="bg-gradient-to-b from-orange-50/30 to-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-[#06038D] tracking-tighter mb-4">
            {t('evm.title', 'How to Vote Using EVM')}
            <div className="h-1.5 w-32 bg-gradient-to-r from-[#FF671F] via-gray-200 to-[#046A38] mx-auto mt-4 rounded-full"></div>
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

          {/* Two Images Below YouTube Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="card-gradient-border p-1">
              <div className="bg-gray-100 rounded-[16px] overflow-hidden aspect-video relative group">
                <img
                  src="https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?q=80&w=1000&auto=format&fit=crop"
                  alt="Voting Booth Process"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <span className="text-white font-black text-xl">Voting Procedure</span>
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
                  <span className="text-white font-black text-xl">Identity Verification</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Step-by-Step Guide with Homepage UI (Cards) */}
        <section className="space-y-12">
          <div className="text-center">
            <h3 className="text-3xl font-black text-[#06038D] uppercase tracking-widest">
              {t('evm.steps.title', 'Voting Steps')}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-12">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="card-gradient-border p-8 hover:-translate-y-2 transition-all">
                <div className="flex gap-6 items-start">
                  <div className="shrink-0 w-16 h-16 rounded-2xl bg-[#06038D] text-white flex items-center justify-center text-3xl font-black shadow-lg">
                    {step}
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-[#06038D] mb-2 uppercase">
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
