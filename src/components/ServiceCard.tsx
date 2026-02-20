import React from 'react';
import type { Provider } from '../types';
import './ServiceCard.css';

interface ServiceCardProps {
  provider: Provider;
  onClick?: () => void;
  onContact?: () => void;
  onDelete?: () => void;
  isAdmin?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ provider, onClick, onContact, onDelete, isAdmin }) => {
  const initials = (provider.user?.name || 'NA')
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className="service-card" onClick={onClick}>
      <div className="service-header">
        <div className="provider-avatar">{initials}</div>
        <div className="service-info">
          <div className="provider-name">{provider.user?.name || 'Profissional'}</div>
          <div className="service-title">{provider.title}</div>
          <div className="rating">
            <span className="stars">
              {'⭐'.repeat(Math.round(provider.rating || 0))}
            </span>
            <span>({provider.reviews_count || 0})</span>
          </div>
        </div>
        {provider.is_premium && <div className="badge badge-premium">Premium</div>}
      </div>
      <div className="service-details">
        <div>
          <div className="price">R$ {provider.price.toFixed(2)}</div>
          <div className="price-unit">por serviço</div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {isAdmin && onDelete && (
            <button className="btn-contact" style={{ backgroundColor: 'var(--danger)' }} onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}>
              Excluir
            </button>
          )}
          <button className="btn-contact" onClick={(e) => {
            e.stopPropagation();
            onContact?.();
          }}>
            Chamar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
