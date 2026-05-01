import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X, Languages, Bot, LogOut, User, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('preferredLanguage', lng);
    setIsLangMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (err) {
      console.error("Logout error", err);
    }
  };

  const navLinks = [
    { name: t('nav.home'), href: '#' },
    { name: t('nav.process'), href: '#process' },
    { name: t('nav.types'), href: '#types' },
    { name: t('nav.registration'), href: '#registration' },
    { name: t('nav.awareness'), href: '#awareness' },
    { name: t('nav.faq'), href: '#faq' },
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'ta', name: 'தமிழ்' }
  ];

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

  return (
    <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-saffron via-white to-green flex items-center justify-center shadow-sm border border-gray-100">
                <span className="text-navy font-extrabold text-xl">IN</span>
              </div>
              <span className="font-extrabold text-2xl text-navy tracking-tight hidden sm:block">NEIC</span>
            </Link>
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

            <div className="h-8 w-px bg-gray-200 mx-2"></div>

            {currentUser ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-navy font-bold">
                  <div className="w-8 h-8 rounded-full bg-navy/10 flex items-center justify-center text-navy">
                    <User size={16} />
                  </div>
                  <span className="text-sm">Hi, {currentUser.displayName || 'Voter'}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-5 py-2 text-navy font-bold hover:text-saffron transition-colors text-sm lg:text-base"
                >
                  Login
                </Link>
                <Link
                  to="/login"
                  state={{ defaultView: 'register' }}
                  className="px-5 py-2 bg-saffron text-white font-bold rounded-xl shadow-md shadow-saffron/20 hover:bg-[#e55a15] hover:-translate-y-0.5 transition-all text-sm lg:text-base"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* New Prominent Language Button (Top-Right) */}
          <div className="flex items-center ml-4 relative">
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

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2 ml-2">
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

              <div className="pt-4 border-t border-gray-100">
                {currentUser ? (
                  <div className="space-y-2">
                    <p className="px-3 text-sm font-bold text-navy">Logged in as {currentUser.displayName || currentUser.email}</p>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="px-3 py-2 text-center text-base font-bold text-navy border border-navy/20 rounded-xl"
                    >
                      Login
                    </Link>
                    <Link
                      to="/login"
                      state={{ defaultView: 'register' }}
                      onClick={() => setIsOpen(false)}
                      className="px-3 py-2 text-center text-base font-bold text-white bg-saffron rounded-xl"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
