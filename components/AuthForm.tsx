
import React, { useState, FormEvent } from 'react';
import { AuthMode } from '../types';
import { UserIcon, MailIcon, LockClosedIcon } from './Icons';

interface AuthFormProps {
  mode: AuthMode;
  onRegister: (nome: string, email: string, senha: string) => Promise<void>;
  onLogin: (email: string, senha: string) => Promise<void>;
  onToggleMode: () => void;
  loading: boolean;
  error: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ mode, onRegister, onLogin, onToggleMode, loading, error }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const isLogin = mode === AuthMode.Login;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      onLogin(email, senha);
    } else {
      onRegister(nome, email, senha);
    }
  };

  return (
    <div className="bg-gray-800 p-8 rounded-xl shadow-2xl shadow-indigo-500/10 w-full">
      <h2 className="text-3xl font-bold text-center text-white mb-6">{isLogin ? 'Login' : 'Create Account'}</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {!isLogin && (
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <UserIcon />
            </div>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Name"
              required
              className="w-full bg-gray-700 text-white border-gray-600 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
            />
          </div>
        )}
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MailIcon />
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full bg-gray-700 text-white border-gray-600 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
          />
        </div>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <LockClosedIcon />
          </div>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Password"
            required
            className="w-full bg-gray-700 text-white border-gray-600 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
          />
        </div>
        
        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-800 transition duration-300 disabled:bg-indigo-800 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading && (
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-gray-400">
        {isLogin ? "Don't have an account?" : 'Already have an account?'}
        <button onClick={onToggleMode} className="font-medium text-indigo-400 hover:text-indigo-300 ml-1">
          {isLogin ? 'Sign up' : 'Sign in'}
        </button>
      </p>
    </div>
  );
};

export default AuthForm;
