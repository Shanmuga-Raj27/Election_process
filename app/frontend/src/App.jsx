import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Chat from './pages/Chat';
import EVMGuide from './pages/EVMGuide';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/evm" element={<EVMGuide />} />
      </Routes>
    </Router>
  );
}

export default App;
