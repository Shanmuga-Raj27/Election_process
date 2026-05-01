import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Globe, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const Login = () => {
  const [view, setView] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, register, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);
    }
  }, [location]);

  const syncWithBackend = async (user) => {
    try {
      const token = await user.getIdToken();
      // Call Fast API backend to verify token and sync session
      await fetch('http://127.0.0.1:8000/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_token: token })
      });
    } catch (err) {
      console.error("Backend sync failed", err);
    }
  };

  const handleSuccess = async (user) => {
    await syncWithBackend(user);
    const from = location.state?.from?.pathname || '/';
    navigate(from, { replace: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    try {
      let userCredential;
      if (view === 'register') {
        userCredential = await register(email, password, name);
      } else {
        userCredential = await login(email, password);
      }
      await handleSuccess(userCredential.user);
    } catch (err) {
      setError(err.message.replace('Firebase: ', ''));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setMessage('');
    setLoading(true);
    try {
      const userCredential = await googleSignIn();
      await handleSuccess(userCredential.user);
    } catch (err) {
      setError(err.message.replace('Firebase: ', ''));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center p-4 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 card-gradient-border p-1"
      >
        <div className="bg-white p-8 rounded-[16px] h-full w-full">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-saffron via-white to-green mb-4 shadow-sm border border-gray-100 hover:scale-105 transition-transform">
              <span className="text-navy font-black text-xl">IN</span>
            </Link>
            <h2 className="text-2xl font-black text-navy uppercase tracking-tight">
              {view === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <div className="mt-2 w-16 h-1 bg-gradient-to-r from-saffron via-gray-200 to-green mx-auto rounded-full"></div>
            {message && (
              <p className="mt-4 text-sm font-bold text-saffron bg-orange-50 py-2 px-3 rounded-lg border border-orange-100">
                {message}
              </p>
            )}
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm font-bold rounded-xl border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {view === 'register' && (
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-saffron/20 focus:border-saffron transition-all font-medium"
                />
              </div>
            )}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                placeholder="Email Address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-saffron/20 focus:border-saffron transition-all font-medium"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-saffron/20 focus:border-saffron transition-all font-medium"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-saffron text-white rounded-xl font-black text-lg shadow-lg shadow-saffron/20 hover:bg-[#e55a15] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  {view === 'login' ? 'Login' : 'Register'}
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-4 text-gray-400 font-bold tracking-widest">Or continue with</span>
            </div>
          </div>

          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full py-4 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold shadow-sm hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center gap-3"
          >
            <Globe size={20} className="text-navy" />
            Sign in with Google
          </button>

          <p className="mt-8 text-center text-gray-500 font-medium">
            {view === 'login' ? "Don't have an account?" : "Already have an account?"}{' '}
            <button
              onClick={() => { setView(view === 'login' ? 'register' : 'login'); setError(''); setMessage(''); }}
              className="text-navy font-black hover:underline"
            >
              {view === 'login' ? 'Register Now' : 'Login Here'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
