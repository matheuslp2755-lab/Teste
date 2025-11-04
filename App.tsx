
import React, { useState, useEffect } from 'react';
import { auth, db } from './services/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  signOut,
  User
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import AuthForm from './components/AuthForm';
import { AuthMode } from './types';
import { LogoIcon } from './components/Icons';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [authMode, setAuthMode] = useState<AuthMode>(AuthMode.Login);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleRegister = async (nome: string, email: string, senha: string):Promise<void> => {
    setError('');
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const newUser = userCredential.user;
      const userData = {
        nome,
        email,
        seguindo: [],
        seguidores: [],
      };
      await setDoc(doc(db, 'usuarios', newUser.uid), userData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (email: string, senha: string):Promise<void> => {
    setError('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, senha);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async ():Promise<void> => {
    setLoading(true);
    try {
      await signOut(auth);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setError('');
    setAuthMode(prevMode => prevMode === AuthMode.Login ? AuthMode.Register : AuthMode.Login);
  };

  if (loading && !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <svg className="animate-spin h-8 w-8 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      {user ? (
        <div className="w-full max-w-md text-center bg-gray-800 p-8 rounded-xl shadow-2xl shadow-indigo-500/10">
          <div className="flex justify-center mb-6">
            <LogoIcon />
          </div>
          <h1 className="text-3xl font-bold text-indigo-400 mb-2">Welcome Back!</h1>
          <p className="text-gray-300 mb-6">You are logged in as {user.email}</p>
          <button
            onClick={handleLogout}
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 focus:ring-offset-gray-800 transition duration-300 disabled:bg-red-800 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging out...' : 'Logout'}
          </button>
        </div>
      ) : (
        <div className="w-full max-w-md">
            <div className="flex justify-center mb-8">
                <LogoIcon />
            </div>
          <h1 className="text-4xl font-bold text-center mb-2 text-white">MP Social</h1>
          <p className="text-center text-gray-400 mb-8">Connect with your world.</p>
          <AuthForm
            mode={authMode}
            onRegister={handleRegister}
            onLogin={handleLogin}
            onToggleMode={toggleAuthMode}
            loading={loading}
            error={error}
          />
        </div>
      )}
    </div>
  );
};

export default App;
