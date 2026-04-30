import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const RegistrationGuide = () => {
  const { t } = useTranslation();

  const steps = ['1', '2', '3', '4'];

  return (
    <section className="py-16 bg-gray-50 sm:py-24" id="registration">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-navy sm:text-4xl h1-mobile">
            {t('registration.title')}
          </h2>
          <div className="mt-4 w-32 h-1.5 bg-gradient-to-r from-saffron via-gray-200 to-green mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="card-gradient-border p-6 text-center w-full"
            >
              <div className="w-12 h-12 bg-navy text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:bg-saffron">
                {step}
              </div>
              {index !== steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-gray-200" />
              )}
              <p className="text-gray-700 font-medium">
                {t(`registration.steps.${step}`)}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Official Resources Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-navy mb-8 border-b-2 border-saffron inline-block pb-2">
            {t('registration.official_links_title', 'Official Registration Links')}
          </h3>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 flex-wrap">
            <a
              href="https://voters.eci.gov.in/form6/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-semibold rounded-xl text-white bg-saffron hover:bg-[#e55a15] shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all w-full sm:w-auto group"
            >
              {t('registration.link_form6', 'New Voter Registration (Form 6)')}
              <svg className="ml-2 w-4 h-4 opacity-70 group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            
            <a
              href="https://voters.eci.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-navy text-base font-semibold rounded-xl text-navy bg-white hover:bg-navy hover:text-white shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all w-full sm:w-auto group"
            >
              {t('registration.link_vsp', 'Voters’ Services Portal')}
              <svg className="ml-2 w-4 h-4 opacity-70 group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            
            <a
              href="https://www.eci.gov.in/faq/en/how-to-register/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-semibold rounded-xl text-green-800 bg-green-100 hover:bg-green-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all w-full sm:w-auto group"
            >
              {t('registration.link_help', 'ECI Registration Information')}
              <svg className="ml-2 w-4 h-4 opacity-70 group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationGuide;
