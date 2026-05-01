import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Chat from './pages/Chat';
import EVMGuide from './pages/EVMGuide';
import Login from './pages/Login';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/chat" 
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/evm" 
          element={
            <ProtectedRoute>
              <EVMGuide />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
