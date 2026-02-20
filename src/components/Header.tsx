import React from 'react';
import type { User } from '../types';
import './Header.css';

interface HeaderProps {
  logoText?: string;
  user?: User | null;
  onUserClick?: () => void;
  showSearch?: boolean;
  onSearchChange?: (query: string) => void;
  searchPlaceholder?: string;
}

const Header: React.FC<HeaderProps> = ({
  logoText = '🌊 ServiçosLocal',
  user,
  onUserClick,
  showSearch = false,
  onSearchChange,
  searchPlaceholder = 'Buscar serviços...',
}) => {
  return (
    <header className="header">
      <div className="header-top">
        <div className="logo">{logoText}</div>
        <div className="user-badge" onClick={onUserClick}>
          {user ? `👤 ${user.name.split(' ')[0]}` : '👤 Entrar'}
        </div>
      </div>
      {showSearch && (
        <div className="search-bar">
          <input
            type="text"
            placeholder={searchPlaceholder}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>
      )}
    </header>
  );
};

export default Header;
