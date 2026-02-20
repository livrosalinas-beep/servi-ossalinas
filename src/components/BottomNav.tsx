import React from 'react';
import type { User } from '../types';
import './BottomNav.css';

interface BottomNavProps {
  currentPage: 'home' | 'auth' | 'provider' | 'profile';
  user?: User | null;
  onNavigate: (page: 'home' | 'auth' | 'provider' | 'profile') => void;
  onLogout: () => void;
}

const BottomNav: React.FC<BottomNavProps> = ({
  currentPage,
  user,
  onNavigate,
  onLogout,
}) => {
  return (
    <nav className="bottom-nav">
      <button
        className={`nav-item ${currentPage === 'home' ? 'active' : ''}`}
        onClick={() => onNavigate('home')}
      >
        <span className="nav-icon">🏠</span>
        <span>Home</span>
      </button>
      <button
        className={`nav-item ${currentPage === 'provider' ? 'active' : ''}`}
        onClick={() => {
          if (!user) {
            onNavigate('auth');
          } else if (user.type === 'provider') {
            onNavigate('provider');
          }
        }}
      >
        <span className="nav-icon">💼</span>
        <span>Oferecer</span>
      </button>
      <button
        className={`nav-item ${currentPage === 'profile' ? 'active' : ''}`}
        onClick={() => {
          if (user) {
            onNavigate('profile');
          } else {
            onNavigate('auth');
          }
        }}
      >
        <span className="nav-icon">👤</span>
        <span>Perfil</span>
      </button>
      {user && (
        <button className="nav-item" onClick={onLogout}>
          <span className="nav-icon">🚪</span>
          <span>Sair</span>
        </button>
      )}
    </nav>
  );
};

export default BottomNav;
