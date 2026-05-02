import Navbar from '../components/common/Navbar';
import Hero from '../components/home/Hero';
import Introduction from '../components/home/Introduction';
import WhyVotingMatters from '../components/home/WhyVotingMatters';
import ElectionProcess from '../components/home/ElectionProcess';
import TypesOfElections from '../components/home/TypesOfElections';
import CompareHouses from '../components/home/CompareHouses';
import RegistrationGuide from '../components/home/RegistrationGuide';
import Eligibility from '../components/home/Eligibility';
import Awareness from '../components/home/Awareness';
import FAQ from '../components/home/FAQ';
import Footer from '../components/common/Footer';

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
