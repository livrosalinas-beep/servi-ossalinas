import React, { useState } from 'react';
import type { User } from '../../types';
import { supabase } from '../../services/supabase';
import Header from '../Header';
import BottomNav from '../BottomNav';
import './ProviderPage.css';

interface ProviderPageProps {
  user?: User | null;
  onNavigate: (page: 'home' | 'auth' | 'provider' | 'profile') => void;
}

const ProviderPage: React.FC<ProviderPageProps> = ({ user, onNavigate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('construcao');
  const [price, setPrice] = useState('');
  const [district, setDistrict] = useState('Sede');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const categories = [
    'construcao',
    'transporte',
    'limpeza',
    'alimentacao',
    'pesca',
    'turismo',
    'eventos',
    'beleza',
    'outros',
  ];

  const districts = ['Sede', 'Encarnação', 'Dendê', 'Taperuçu', 'Guagipe'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setMessage('');

    try {
      if (!supabase) {
        throw new Error('Serviço não disponível');
      }

      const { error } = await supabase.from('providers').insert([
        {
          user_id: user.id,
          title,
          description,
          category,
          price: parseFloat(price),
          district,
          is_premium: false,
        },
      ]);

      if (error) throw error;

      setMessage('Serviço cadastrado com sucesso!');
      setTitle('');
      setDescription('');
      setPrice('');
      setTimeout(() => {
        onNavigate('home');
      }, 2000);
    } catch (error: any) {
      console.error('Provider submit error:', error);
      setMessage('Erro: ' + (error.message || 'Erro ao cadastrar serviço'));
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="provider-page">
        <Header />
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <p>Você precisa estar logado para prestar serviços.</p>
          <button
            className="btn btn-primary"
            onClick={() => onNavigate('auth')}
            style={{ marginTop: '20px' }}
          >
            Fazer Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="provider-page">
      <Header user={user} />

      <div className="provider-container mb-20">
        <h2 className="section-title">Cadastrar Serviço</h2>

        {message && (
          <div className={`alert ${message.includes('Erro') ? 'alert-error' : 'alert-success'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Título do Serviço</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Encanador Profissional"
              required
            />
          </div>

          <div className="form-group">
            <label>Descrição</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva seu serviço..."
              required
            />
          </div>

          <div className="form-group">
            <label>Categoria</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Preço (R$)</label>
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Ex: 150.00"
              required
            />
          </div>

          <div className="form-group">
            <label>Distrito</label>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              required
            >
              {districts.map((dist) => (
                <option key={dist} value={dist}>
                  {dist}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Cadastrando...' : 'Cadastrar Serviço'}
          </button>
        </form>
      </div>

      <BottomNav
        currentPage="provider"
        user={user}
        onNavigate={onNavigate}
        onLogout={() => { }}
      />
    </div>
  );
};

export default ProviderPage;
