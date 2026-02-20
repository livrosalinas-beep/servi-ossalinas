export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  type: 'provider' | 'client' | 'admin';
  created_at: string;
}

export interface Provider {
  id: string;
  user_id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  district: string;
  is_premium: boolean;
  rating?: number;
  reviews_count?: number;
  user?: User;
  created_at: string;
}

export interface Review {
  id: string;
  provider_id: string;
  client_id: string;
  rating: number;
  comment: string;
  created_at: string;
  client?: User;
}

export interface Service {
  id: string;
  provider_id: string;
  client_id: string;
  client_name: string;
  value: number;
  commission_value: number;
  date: string;
  status: 'pending' | 'completed' | 'cancelled';
  created_at: string;
}

export interface Subscription {
  id: string;
  provider_id: string;
  plan: 'free' | 'premium' | 'professional';
  start_date: string;
  status: 'active' | 'cancelled' | 'expired';
  created_at: string;
}

export interface AuthSession {
  user: User | null;
  token: string | null;
}
