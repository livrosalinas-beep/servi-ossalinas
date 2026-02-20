import React, { useEffect, useState } from 'react';
import type { User, Provider } from '../../types';
import { supabase } from '../../services/supabase';
import Header from '../Header';
import ServiceCard from '../ServiceCard';
import BottomNav from '../BottomNav';
import './HomePage.css';

interface HomePageProps {
  user?: User | null;
  onNavigate: (page: 'home' | 'auth' | 'provider' | 'profile') => void;
  onLogout: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ user, onNavigate, onLogout }) => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [filteredProviders, setFilteredProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDistrict, setSelectedDistrict] = useState('Todos');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const districts = ['Todos', 'Sede', 'Encarnação', 'Dendê', 'Taperuçu', 'Guagipe'];
  const categories = [
    { id: 'construcao', emoji: '🔨', name: 'Construção' },
    { id: 'transporte', emoji: '🚤', name: 'Transporte' },
    { id: 'limpeza', emoji: '🧹', name: 'Limpeza' },
    { id: 'alimentacao', emoji: '🍲', name: 'Alimentação' },
    { id: 'pesca', emoji: '🦞', name: 'Frutos do Mar' },
    { id: 'turismo', emoji: '🏖️', name: 'Turismo' },
  ];

  useEffect(() => {
    loadProviders();
  }, []);

  useEffect(() => {
    filterProviders();
  }, [providers, selectedDistrict, selectedCategory, searchQuery]);

  const loadProviders = async () => {
    try {
      setLoading(true);

      // Demo data se não houver dados
      const demoProviders: Provider[] = [
        {
          id: '1',
          user_id: '1',
          title: 'Encanador Profissional',
          description: 'Experiência em obras residenciais',
          category: 'construcao',
          price: 150,
          district: 'Sede',
          is_premium: true,
          rating: 5,
          reviews_count: 12,
          user: { id: '1', name: 'João Silva', email: 'joao@example.com', phone: '1199999999', type: 'provider', created_at: new Date().toISOString() },
          created_at: new Date().toISOString(),
        },
        {
          id: '2',
          user_id: '2',
          title: 'Eletricista',
          description: 'Instalações e manutenções',
          category: 'construcao',
          price: 120,
          district: 'Encarnação',
          is_premium: false,
          rating: 4,
          reviews_count: 8,
          user: { id: '2', name: 'Pedro Santos', email: 'pedro@example.com', phone: '1188888888', type: 'provider', created_at: new Date().toISOString() },
          created_at: new Date().toISOString(),
        },
      ];

      setProviders(demoProviders);
    } catch (error) {
      console.error('Erro ao carregar prestadores:', error);
      setProviders([]);
    } finally {
      setLoading(false);
    }
  };

  const filterProviders = () => {
    let filtered = providers;

    if (selectedDistrict !== 'Todos') {
      filtered = filtered.filter((p) => p.district === selectedDistrict);
    }

    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.user?.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProviders(filtered);
  };

  const handleContact = (provider: Provider) => {
    const phone = provider.user?.phone || '';
    const message = `Olá, tenho interesse no serviço: ${provider.title}`;
    const whatsappUrl = `https://wa.me/55${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="home-page">
      <Header
        user={user}
        showSearch
        onSearchChange={setSearchQuery}
        onUserClick={() => {
          if (!user) {
            onNavigate('auth');
          } else {
            onNavigate('profile');
          }
        }}
      />

      <div className="districts">
        {districts.map((district) => (
          <button
            key={district}
            className={`district-chip ${selectedDistrict === district ? 'active' : ''}`}
            onClick={() => setSelectedDistrict(district)}
          >
            {district}
          </button>
        ))}
      </div>

      <div className="categories">
        <h2 className="section-title">Categorias</h2>
        <div className="category-grid">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className="category-card"
              onClick={() => setSelectedCategory(selectedCategory === cat.id ? '' : cat.id)}
              style={{
                boxShadow: selectedCategory === cat.id ? '0 0 0 2px var(--primary)' : 'none',
              }}
            >
              <div className="category-icon">{cat.emoji}</div>
              <div className="category-name">{cat.name}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="services mb-20">
        <h2 className="section-title">Profissionais Disponíveis</h2>
        {loading ? (
          <div className="loading">
            <div style={{
              display: 'inline-block',
              width: '30px',
              height: '30px',
              border: '3px solid rgba(0, 102, 204, 0.2)',
              borderRadius: '50%',
              borderTopColor: '#0066CC',
              animation: 'spin 1s linear infinite'
            }}></div>
            <p style={{ marginTop: '12px' }}>Carregando serviços...</p>
          </div>
        ) : filteredProviders.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <div className="empty-state-title">Nenhum serviço encontrado</div>
            <div className="empty-state-text">Tente alterar seus filtros</div>
          </div>
        ) : (
          <div>
            {filteredProviders.map((provider) => (
              <ServiceCard
                key={provider.id}
                provider={provider}
                onContact={() => handleContact(provider)}
              />
            ))}
          </div>
        )}
      </div>

      <BottomNav
        currentPage="home"
        user={user}
        onNavigate={onNavigate}
        onLogout={onLogout}
      />
    </div>
  );
};

export default HomePage;
