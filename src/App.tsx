import { useEffect, useState } from 'react';
import { supabase } from './services/supabase';
import { User, AuthSession } from './types';
import './styles/index.css';
import './App.css';

// Componentes
import Container from './components/Container';
import HomePage from './components/pages/HomePage';
import AuthPage from './components/pages/AuthPage';
import ProviderPage from './components/pages/ProviderPage';
import ProfilePage from './components/pages/ProfilePage';

function App() {
  const [auth, setAuth] = useState<AuthSession>({ user: null, token: null });
  const [currentPage, setCurrentPage] = useState<'home' | 'auth' | 'provider' | 'profile'>('home');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Verificar se existe usuário logado
    const checkAuth = async () => {
      try {
        if (!supabase) {
          throw new Error('Supabase não configurado');
        }

        const { data, error: authError } = await supabase.auth.getSession();
        
        if (authError) {
          console.warn('Aviso de autenticação:', authError);
          setLoading(false);
          return;
        }

        if (data?.session?.user) {
          setAuth({
            user: {
              id: data.session.user.id,
              email: data.session.user.email || '',
              name: data.session.user.user_metadata?.name || 'Usuário',
              phone: data.session.user.user_metadata?.phone || '',
              type: data.session.user.user_metadata?.type || 'client',
              created_at: data.session.user.created_at,
            },
            token: data.session.access_token,
          });
        }
        setLoading(false);
      } catch (err) {
        console.error('Erro ao verificar autenticação:', err);
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
        setLoading(false);
      }
    };

    checkAuth();

    // Subscribe to auth changes
    try {
      const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (session?.user) {
          setAuth({
            user: {
              id: session.user.id,
              email: session.user.email || '',
              name: session.user.user_metadata?.name || 'Usuário',
              phone: session.user.user_metadata?.phone || '',
              type: session.user.user_metadata?.type || 'client',
              created_at: session.user.created_at,
            },
            token: session.access_token,
          });
        } else {
          setAuth({ user: null, token: null });
        }
      });

      return () => {
        data?.subscription?.unsubscribe();
      };
    } catch (err) {
      console.error('Erro ao subscribir autenticação:', err);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setAuth({ user: null, token: null });
      setCurrentPage('home');
    } catch (err) {
      console.error('Erro ao fazer logout:', err);
    }
  };

  const handlePageChange = (page: typeof currentPage) => {
    setCurrentPage(page);
  };

  if (error) {
    return (
      <Container>
        <div style={{ textAlign: 'center', padding: '40px 20px', color: 'red' }}>
          <h2>⚠️ Erro</h2>
          <p>{error}</p>
          <p style={{ fontSize: '12px', marginTop: '20px', color: '#666' }}>
            Verifique se as variáveis de ambiente estão configuradas corretamente em .env.local
          </p>
        </div>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container>
        <div style={{ textAlign: 'center', padding: '40px 20px' }}>
          <div className="spinner"></div>
          <p style={{ marginTop: '12px', color: 'var(--gray)' }}>Carregando...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      {currentPage === 'home' && (
        <HomePage
          user={auth.user}
          onNavigate={handlePageChange}
          onLogout={handleLogout}
        />
      )}
      {currentPage === 'auth' && (
        <AuthPage onSuccess={() => setCurrentPage('home')} />
      )}
      {currentPage === 'provider' && (
        <ProviderPage
          user={auth.user}
          onNavigate={handlePageChange}
        />
      )}
      {currentPage === 'profile' && (
        <ProfilePage
          user={auth.user}
          onNavigate={handlePageChange}
          onLogout={handleLogout}
        />
      )}
    </Container>
  );
}

export default App;
