import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X, Languages, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const navLinks = [
    { name: t('nav.home'), href: '#' },
    { name: t('nav.process'), href: '#process' },
    { name: t('nav.types'), href: '#types' },
    { name: t('nav.registration'), href: '#registration' },
    { name: t('nav.awareness'), href: '#awareness' },
    { name: t('nav.faq'), href: '#faq' },
  ];

  return (
    <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-saffron via-white to-green flex items-center justify-center shadow-sm border border-gray-100">
              <span className="text-navy font-extrabold text-xl">IN</span>
            </div>
            <span className="font-extrabold text-2xl text-navy tracking-tight hidden sm:block">Election Edu</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-600 hover:text-navy font-medium transition-colors relative group text-sm lg:text-base"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-saffron transition-all group-hover:w-full"></span>
              </a>
            ))}
            
            <button className="flex items-center gap-2 text-navy font-medium hover:text-blue-600 transition-colors text-sm lg:text-base">
              <Bot className="w-5 h-5" />
              <span>{t('nav.ai')}</span>
            </button>

            <div className="flex items-center gap-2 border-l pl-4 lg:pl-6 border-gray-200">
              <Languages className="w-5 h-5 text-gray-500" />
              <select
                onChange={(e) => changeLanguage(e.target.value)}
                value={i18n.language}
                className="bg-transparent text-gray-700 font-medium focus:outline-none cursor-pointer text-sm lg:text-base"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
                <option value="ta">தமிழ்</option>
              </select>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-navy p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-navy hover:bg-gray-50 rounded-lg"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#ai"
                className="px-3 py-2 text-base font-medium text-blue-600 hover:bg-blue-50 rounded-lg flex items-center gap-2"
                onClick={() => setIsOpen(false)}
              >
                <Bot className="w-5 h-5" />
                {t('nav.ai')}
              </a>
              <div className="px-3 py-2 mt-4 border-t border-gray-100 pt-4 flex items-center gap-2">
                <Languages className="w-5 h-5 text-gray-500" />
                <select
                  onChange={(e) => changeLanguage(e.target.value)}
                  value={i18n.language}
                  className="bg-transparent text-gray-700 font-medium focus:outline-none w-full p-2"
                >
                  <option value="en">English</option>
                  <option value="hi">हिंदी</option>
                  <option value="ta">தமிழ்</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
