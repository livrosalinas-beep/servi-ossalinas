import React, { useState } from 'react';
import { supabase } from '../../services/supabase';
import Header from '../Header';
import './AuthPage.css';

interface AuthPageProps {
  onAuthSuccess: (user: any) => void;
  onNavigate: (page: 'home' | 'auth' | 'provider' | 'profile') => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onAuthSuccess, onNavigate }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [userType, setUserType] = useState<'client' | 'provider'>('client');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!supabase) {
        throw new Error('Serviço não disponível');
      }

      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) throw loginError;
      if (data?.user) onAuthSuccess(data.user);
      onNavigate('home');
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!supabase) {
        throw new Error('Serviço não disponível');
      }

      const { data, error: registerError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            phone,
            type: userType,
          },
        },
      });

      if (registerError) throw registerError;
      if (data?.user) onAuthSuccess(data.user);
      onNavigate('home');
    } catch (err: any) {
      console.error('Register error:', err);
      setError(err.message || 'Erro ao cadastrar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <Header logoText="🌊 ServiçosLocal" />

      <div className="auth-container">
        <div className="auth-tabs">
          <button
            className={`auth-tab ${mode === 'login' ? 'active' : ''}`}
            onClick={() => setMode('login')}
          >
            Login
          </button>
          <button
            className={`auth-tab ${mode === 'register' ? 'active' : ''}`}
            onClick={() => setMode('register')}
          >
            Cadastro
          </button>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        {mode === 'login' ? (
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label>Nome</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Telefone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Tipo de Conta</label>
              <select
                value={userType}
                onChange={(e) => setUserType(e.target.value as 'client' | 'provider')}
              >
                <option value="client">Cliente</option>
                <option value="provider">Prestador</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Cadastrando...' : 'Cadastrar'}
            </button>
          </form>
        )}

        <div style={{ marginBottom: '80px' }} />
      </div>
    </div>
  );
};

export default AuthPage;
