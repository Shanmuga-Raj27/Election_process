import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Introduction from '../components/Introduction';
import WhyVotingMatters from '../components/WhyVotingMatters';
import ElectionProcess from '../components/ElectionProcess';
import TypesOfElections from '../components/TypesOfElections';
import CompareHouses from '../components/CompareHouses';
import RegistrationGuide from '../components/RegistrationGuide';
import Eligibility from '../components/Eligibility';
import Awareness from '../components/Awareness';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Introduction />
      <WhyVotingMatters />
      <ElectionProcess />
      <TypesOfElections />
      <CompareHouses />
      <RegistrationGuide />
      <Eligibility />
      <Awareness />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Home;
