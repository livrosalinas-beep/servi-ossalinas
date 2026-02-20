import { useEffect, useState } from 'react';
import { supabase } from './services/supabase';
import type { AuthSession } from './types';
import Container from './components/Container';
import HomePage from './components/pages/HomePage';
import AuthPage from './components/pages/AuthPage';
import ProviderPage from './components/pages/ProviderPage';
import ProfilePage from './components/pages/ProfilePage';
import './App.css';

function App() {
  const [auth, setAuth] = useState<AuthSession>({ user: null, token: null });
  const [currentPage, setCurrentPage] = useState<'home' | 'auth' | 'provider' | 'profile'>('home');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        console.log('Verificando autenticação...');

        if (!supabase) {
          if (mounted) setLoading(false);
          return;
        }

        const { data, error: authError } = await supabase.auth.getSession();

        if (authError) {
          console.error('Auth error:', authError);
          if (mounted) setLoading(false);
          return;
        }

        if (data?.session?.user && mounted) {
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

        if (mounted) setLoading(false);
      } catch (err) {
        console.error('❌ Erro:', err);
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Erro desconhecido');
          setLoading(false);
        }
      }
    };

    initializeAuth();

    const { data: authData } = supabase?.auth?.onAuthStateChange((_event, session) => {
      if (!mounted) return;
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
    }) ?? { data: { subscription: null } };

    return () => {
      mounted = false;
      authData?.subscription?.unsubscribe();
    };
  }, []);


  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setAuth({ user: null, token: null });
      setCurrentPage('home');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  if (error) {
    return (
      <Container>
        <div style={{ textAlign: 'center', padding: '40px 20px', color: '#dc3545' }}>
          <h2>⚠️ Erro</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}>
            Recarregar
          </button>
        </div>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container>
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <div style={{
            display: 'inline-block',
            width: '40px',
            height: '40px',
            border: '4px solid rgba(0, 102, 204, 0.2)',
            borderRadius: '50%',
            borderTopColor: '#0066CC',
            animation: 'spin 1s linear infinite'
          }}></div>
          <p style={{ marginTop: '20px', color: '#6c757d' }}>Carregando app...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      {currentPage === 'home' && (
        <HomePage
          user={auth.user}
          onNavigate={setCurrentPage}
          onLogout={handleLogout}
        />
      )}
      {currentPage === 'auth' && (
        <AuthPage onAuthSuccess={() => setCurrentPage('home')} onNavigate={setCurrentPage} />
      )}
      {currentPage === 'provider' && (
        <ProviderPage
          user={auth.user}
          onNavigate={setCurrentPage}
        />
      )}
      {currentPage === 'profile' && (
        <ProfilePage
          user={auth.user}
          onNavigate={setCurrentPage}
          onLogout={handleLogout}
        />
      )}
    </Container>
  );
}

export default App;
