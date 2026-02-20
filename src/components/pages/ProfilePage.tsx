import React from 'react';
import { User } from '../../types';
import Header from '../Header';
import BottomNav from '../BottomNav';
import './ProfilePage.css';

interface ProfilePageProps {
  user?: User | null;
  onNavigate: (page: 'home' | 'auth' | 'provider' | 'profile') => void;
  onLogout: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, onNavigate, onLogout }) => {
  if (!user) {
    return (
      <div className="profile-page">
        <Header />
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <p>Faça login para ver seu perfil.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <Header user={user} />

      <div className="profile-container mb-20">
        <div className="profile-header">
          <div className="profile-avatar">
            {user.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase()}
          </div>
          <div className="profile-info">
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <p className="profile-type">
              {user.type === 'provider' ? '💼 Prestador' : '👤 Cliente'}
            </p>
          </div>
        </div>

        <div className="profile-details">
          <div className="detail-item">
            <span className="detail-label">Email:</span>
            <span className="detail-value">{user.email}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Telefone:</span>
            <span className="detail-value">{user.phone || 'Não cadastrado'}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Tipo de Cuenta:</span>
            <span className="detail-value">
              {user.type === 'provider' ? 'Prestador de Serviços' : 'Cliente'}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Membro desde:</span>
            <span className="detail-value">
              {new Date(user.created_at).toLocaleDateString('pt-BR')}
            </span>
          </div>
        </div>

        <div className="profile-actions">
          {user.type === 'client' && (
            <button
              className="btn btn-primary"
              onClick={() => onNavigate('provider')}
            >
              Tornar-se Prestador
            </button>
          )}
          <button className="btn btn-danger" onClick={onLogout}>
            Sair
          </button>
        </div>
      </div>

      <BottomNav
        currentPage="profile"
        user={user}
        onNavigate={onNavigate}
        onLogout={onLogout}
      />
    </div>
  );
};

export default ProfilePage;
