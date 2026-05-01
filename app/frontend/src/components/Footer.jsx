import { useTranslation } from 'react-i18next';
import { Code2, Mail, Globe, ExternalLink } from 'lucide-react';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="relative bg-green text-white pt-16 pb-8 border-t-[6px] border-saffron" style={{ background: 'linear-gradient(90deg, #166534, #15803d, #166534)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 border-b border-white/20 pb-12">

          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                <span className="text-navy font-bold text-lg">IN</span>
              </div>
              <span className="font-extrabold text-white text-2xl tracking-tight">NEIC</span>
            </div>
            <p className="text-gray-100 leading-relaxed mb-6 max-w-md font-medium">
              {t('footer.about')} - {t('footer.disclaimer')}
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-saffron transition-colors border border-white/20">
                <Code2 className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-saffron transition-colors border border-white/20">
                <Mail className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-saffron transition-colors border border-white/20">
                <Globe className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 border-b-2 border-saffron pb-2 inline-block">
              {t('footer.links')}
            </h4>
            <ul className="space-y-4 font-medium">
              <li><a href="#process" className="text-gray-200 hover:text-white hover:underline transition-all">{t('nav.process')}</a></li>
              <li><a href="#types" className="text-gray-200 hover:text-white hover:underline transition-all">{t('nav.types')}</a></li>
              <li><a href="#registration" className="text-gray-200 hover:text-white hover:underline transition-all">{t('nav.registration')}</a></li>
              <li><a href="#faq" className="text-gray-200 hover:text-white hover:underline transition-all">{t('nav.faq')}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 border-b-2 border-navy pb-2 inline-block">
              {t('footer.official')}
            </h4>
            <ul className="space-y-4 font-medium">
              <li>
                <a href="https://www.eci.gov.in/" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-200 hover:text-white hover:underline transition-all group">
                  {t('footer.eci')} <ExternalLink className="w-3 h-3 ml-2 opacity-50 group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a href="https://voters.eci.gov.in/" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-200 hover:text-white hover:underline transition-all group">
                  {t('footer.vsp')} <ExternalLink className="w-3 h-3 ml-2 opacity-50 group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a href="https://voters.eci.gov.in/form6/" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-200 hover:text-white hover:underline transition-all group">
                  {t('footer.form6')} <ExternalLink className="w-3 h-3 ml-2 opacity-50 group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a href="https://www.eci.gov.in/faq/en/how-to-register/" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-200 hover:text-white hover:underline transition-all group">
                  {t('footer.help')} <ExternalLink className="w-3 h-3 ml-2 opacity-50 group-hover:opacity-100" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-gray-300 text-sm font-medium">
          <div>&copy; {new Date().getFullYear()} NEIC. All rights reserved.</div>
          <div className="mt-4 md:mt-0">
            <a href="#" className="hover:text-white underline">{t('footer.privacy')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
