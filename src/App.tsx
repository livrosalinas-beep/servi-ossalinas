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

  useEffect(() => {
    // Verificar se existe usuário logado
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          setAuth({
            user: {
              id: session.user.id,
              email: session.user.email || '',
              name: session.user.user_metadata?.name || '',
              phone: session.user.user_metadata?.phone || '',
              type: session.user.user_metadata?.type || 'client',
              created_at: session.user.created_at,
            },
            token: session.access_token,
          });
          setCurrentPage('home');
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setAuth({
            user: {
              id: session.user.id,
              email: session.user.email || '',
              name: session.user.user_metadata?.name || '',
              phone: session.user.user_metadata?.phone || '',
              type: session.user.user_metadata?.type || 'client',
              created_at: session.user.created_at,
            },
            token: session.access_token,
          });
        } else {
          setAuth({ user: null, token: null });
        }
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setAuth({ user: null, token: null });
    setCurrentPage('home');
  };

  const handlePageChange = (page: typeof currentPage) => {
    setCurrentPage(page);
  };

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
