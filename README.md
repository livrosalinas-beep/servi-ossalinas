# ServiçosLocal - Plataforma de Serviços Locais

Plataforma digital de conexão entre prestadores de serviços e clientes em Salinas da Margarida, BA.

## 📋 Stack Tecnológico

### Frontend
- **React 18** com **TypeScript** para tipagem segura
- **Vite** para bundling e desenvolvimento rápido
- **CSS Modules** para estilos componentizados

### Backend & Banco de Dados
- **Supabase** (PostgreSQL gerenciado + Auth)
- **Row Level Security (RLS)** para segurança de dados
- Autenticação via Supabase Auth

### Deployment
- **Vercel** para frontend
- **Supabase** para backend e banco de dados

## 🚀 Quick Start

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- Conta no Supabase (gratuita)
- Conta na Vercel (gratuita)

### Instalação Local

```bash
# 1. Clonar repositório
git clone https://github.com/livrosalinas-beep/servi-ossalinas.git
cd servi-os-salinas

# 2. Instalar dependências
npm install

# 3. Configurar variáveis de ambiente
cp .env.example .env.local
# Editar .env.local com suas credenciais Supabase

# 4. Rodar servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── pages/          # Páginas principais
│   ├── Header.tsx      # Componente header
│   ├── ServiceCard.tsx # Card de serviço
│   └── BottomNav.tsx   # Navegação inferior
├── services/
│   └── supabase.ts     # Cliente Supabase
├── types/
│   └── index.ts        # Tipos TypeScript
├── styles/
│   └── index.css       # Estilos globais
├── App.tsx             # Componente raiz
└── main.tsx            # Entry point

supabase/
└── migrations/         # SQL migrations
```

## 🔐 Configuração Supabase

**PASSO A PASSO:** Veja [SUPABASE_SETUP.md](./docs/SUPABASE_SETUP.md)

## 🚀 Deploy no Vercel

**PASSO A PASSO:** Veja [VERCEL_SETUP.md](./docs/VERCEL_SETUP.md)

## 📚 Recursos

- [Documentação Supabase Setup](./docs/SUPABASE_SETUP.md) - Configuração do banco de dados
- [Documentação Vercel Deploy](./docs/VERCEL_SETUP.md) - Deploy da aplicação

## 🎯 Features

- ✅ Busca e filtro de prestadores por categoria e localidade
- ✅ Autenticação segura com Supabase
- ✅ Cadastro de serviços pelos prestadores
- ✅ Sistema de avaliações (1-5 estrelas)
- ✅ Perfil de usuário
- ✅ Design responsivo (mobile-first)
- ✅ Integração WhatsApp para contato

## 📱 Suportado

- ✅ Smartphone (320px+)
- ✅ Tablet (768px+)
- ✅ Desktop (1024px+)

## 📄 Licença

MIT

## 👥 Contribuições

Contribuições são bem-vindas! Por favor, abra uma Issue ou PR.

## 📧 Contato

Para dúvidas, abra uma issue no repositório.
