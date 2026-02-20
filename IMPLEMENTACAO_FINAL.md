# 🚀 PASSO A PASSO FINAL - SUPABASE & DEPLOYMENT

Ótimo! Você tem as credenciais do Supabase. Agora precisa executar apenas **2 passos** para colocar tudo funcionando.

## ✅ O que já foi feito

- ✅ .env.local atualizado com suas credenciais
- ✅ Código React pronto no GitHub
- ✅ SQL migrations criadas

## 🎯 Faltando: 2 Passos Simples

---

## PASSO 1: Executar Migration SQL (5 minutos)

Este passo cria as tabelas do banco de dados no Supabase.

### Opção A: Pelo Supabase Studio (Mais Fácil) 🎯 RECOMENDADO

1. Abra seu dashboard Supabase: https://app.supabase.com

2. Selecione seu projeto `servi-os-salinas` na sidebar

3. No menu lateral esquerdo, clique em **"SQL Editor"** (ícone de banco de dados)

4. Clique em **"New Query"** (botão verde)

5. Limpe o conteúdo padrão e **copie e cole o SQL abaixo:**

```sql
-- Users table (managed by Supabase Auth, mas adicionamos campos extras)
-- This is created automatically by Supabase Auth

-- Providers table
CREATE TABLE IF NOT EXISTS providers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(50) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  district VARCHAR(100),
  is_premium BOOLEAN DEFAULT FALSE,
  rating DECIMAL(3, 2) DEFAULT 0,
  reviews_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID NOT NULL REFERENCES providers(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Services table (completed or pending services)
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID NOT NULL REFERENCES providers(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  client_name VARCHAR(255),
  value DECIMAL(10, 2),
  commission_value DECIMAL(10, 2),
  date TIMESTAMP,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Subscriptions table (for premium plans)
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID NOT NULL REFERENCES providers(id) ON DELETE CASCADE,
  plan VARCHAR(50) DEFAULT 'free',
  start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_providers_user_id ON providers(user_id);
CREATE INDEX idx_providers_category ON providers(category);
CREATE INDEX idx_providers_district ON providers(district);
CREATE INDEX idx_reviews_provider_id ON reviews(provider_id);
CREATE INDEX idx_reviews_client_id ON reviews(client_id);
CREATE INDEX idx_services_provider_id ON services(provider_id);
CREATE INDEX idx_services_client_id ON services(client_id);
CREATE INDEX idx_subscriptions_provider_id ON subscriptions(provider_id);

-- Enable Row Level Security (RLS)
ALTER TABLE providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Policies for providers table
CREATE POLICY "Providers are viewable by everyone" ON providers
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own providers" ON providers
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own providers" ON providers
  FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own providers" ON providers
  FOR DELETE USING (auth.uid() = user_id);

-- Policies for reviews table
CREATE POLICY "Reviews are viewable by everyone" ON reviews
  FOR SELECT USING (true);

CREATE POLICY "Users can insert reviews" ON reviews
  FOR INSERT WITH CHECK (auth.uid() = client_id);

-- Policies for services table
CREATE POLICY "Users can view their own services" ON services
  FOR SELECT USING (auth.uid() = provider_id OR auth.uid() = client_id);

CREATE POLICY "Users can insert their own services" ON services
  FOR INSERT WITH CHECK (auth.uid() = client_id);

CREATE POLICY "Users can update their own services" ON services
  FOR UPDATE USING (auth.uid() = provider_id OR auth.uid() = client_id);

-- Policies for subscriptions table
CREATE POLICY "Users can view their own subscriptions" ON subscriptions
  FOR SELECT USING (
    auth.uid() IN (
      SELECT user_id FROM providers WHERE id = subscriptions.provider_id
    )
  );

CREATE POLICY "Users can insert their own subscriptions" ON subscriptions
  FOR INSERT WITH CHECK (
    auth.uid() IN (
      SELECT user_id FROM providers WHERE id = subscriptions.provider_id
    )
  );
```

6. Pressione **Ctrl+Enter** ou clique em **"Run"** (botão verde)

7. Você verá mensagens como:
   ```
   ✓ CREATE TABLE
   ✓ CREATE INDEX
   ✓ ALTER TABLE
   ✓ CREATE POLICY
   ```

8. **✅ Pronto!** Suas tabelas foram criadas.

### Verificar se funcionou

1. No menu lateral, clique em **"Table Editor"**

2. Você deve ver:
   - ✅ `providers`
   - ✅ `reviews`
   - ✅ `services`
   - ✅ `subscriptions`

Se vê as 4 tabelas: **Parabéns! ✨** Banco de dados pronto.

---

## PASSO 2: Testar Aplicação Localmente (5 minutos)

Agora teste se sua aplicação conecta ao Supabase:

```bash
cd /home/sergio/Área\ de\ trabalho/files/servi-os-salinas

npm install    # (se ainda não fez)

npm run dev
```

Você verá:

```
➜  VITE v7.3.1  ready in 234 ms

➜  Local:   http://localhost:5173/
```

### Teste no Navegador

1. Abra http://localhost:5173

2. Você verá a página inicial com:
   - 🌊 Logo "ServiçosLocal"
   - 🔍 Barra de busca
   - 📍 Filtros de distrito
   - 🏷️ Categorias
   - 👤 Botão de login

3. Clique em **"Entrar"** (canto superior direito)

4. **Teste Login:**
   - Email: `teste@example.com`
   - Senha: `Teste123!`
   - Clique em **"Entrar"**

   ✓ Se entrou: significa a conexão com Supabase está **FUNCIONANDO** 🎉

5. **Teste Cadastro:**
   - Clique na aba **"Cadastro"**
   - Preencha:
     - Nome: `João Silva`
     - Email: `joao@example.com`
     - Telefone: `(75) 99999-9999`
     - Senha: `Teste123!`
     - Tipo: `Prestador`
   - Clique em **"Cadastrar"**

   ✓ Se funcionou, o usuário foi criado no Supabase 🎉

6. **Inspecione no Supabase Studio:**
   - Vá para https://app.supabase.com
   - Clique em **"Authentication"** → **"Users"**
   - Você deve ver seus usuários criados!

### Se tiver erros

**Erro 1: "Cannot read properties of undefined (reading 'supabase')"**
- Solução: .env.local não está sendo lido
- Comando: Reinicie o servidor (`Ctrl+C` e `npm run dev` novamente)

**Erro 2: "Invalid API key"**
- Solução: Chave no .env.local está errada
- Verifique em: https://app.supabase.com → Settings → API

**Erro 3: "relation 'providers' does not exist"**
- Solução: Migration não foi executada
- Volte ao Passo 1 e execute o SQL novamente

---

## PASSO 3: Deploy no Vercel (Automático!)

Uma vez que tudo funciona localmente, fazer deploy é bem simples:

### 3.1 Preparar para Deploy

```bash
cd /home/sergio/Área\ de\ trabalho/files/servi-os-salinas

# Verifique se o build funciona
npm run build

# Se não houver erros:
npm run preview    # Visualiza o build localmente
```

### 3.2 Fazer Push no GitHub

```bash
git add .
git commit -m "feat: Add Supabase credentials to .env.local"
git push origin main
```

### 3.3 Deploy no Vercel

1. Abra https://vercel.com

2. Faça login com GitHub (se não fez, crie conta)

3. Clique em **"New Project"**

4. Você verá seus repositórios:
   - Procure por **`servi-ossalinas`**
   - Clique em **"Import"**

5. Vercel detecta automaticamente:
   - ✅ Framework: `Vite`
   - ✅ Build Command: `npm run build`
   - ✅ Output Directory: `dist`

   Deixe como está.

6. **Configure Variáveis de Ambiente:**

   Antes de clicar em "Deploy", procure por **"Environment Variables"**

   Adicione:
   ```
   VITE_SUPABASE_URL = https://vnjdzrtkslkcyqeefxhs.supabase.co
   VITE_SUPABASE_ANON_KEY = sb_publishable_Tnffm2BauGWl9tigJbzPeg_qFCAwznJ
   ```

7. Clique em **"Deploy"**

8. Aguarde o build (leva ~2-3 minutos na primeira vez)

9. Você receberá uma URL como:
   ```
   https://servi-os-salinas.vercel.app
   ```

### ✅ Aplicação ao Vivo!

Abra a URL no navegador e teste:
- Página inicial carrega? ✓
- Login funciona? ✓
- Cadastro funciona? ✓

---

## 📋 Checklist Final

- [ ] Executou migration SQL no Supabase
- [ ] Vê 4 tabelas no Supabase Studio
- [ ] .env.local tem as credenciais corretas
- [ ] `npm run dev` funciona
- [ ] Consegue fazer login localmente
- [ ] Consegue fazer cadastro localmente
- [ ] Fez push no GitHub
- [ ] Deploy no Vercel sucedido
- [ ] URL pública funciona

---

## 🎉 Resultado Final

Você terá:

```
🌐 URL Pública: https://servi-os-salinas.vercel.app
📊 Banco de Dados: Supabase (PostgreSQL)
🔐 Autenticação: Supabase Auth
⚡ Deploy: Automático (git push → vercel deploy)
💰 Custo: R$ 0,00 (free tier)
```

---

## 📞 Próximos Passos (Depois)

Uma vez tudo funcionando:

1. Configurar domínio customizado (opcional)
2. Implementar mais features
3. Adicionar GoogleAnalytics
4. Criar dashboard admin
5. Etc.

Mas primeiro, **execute os 3 passos acima e me avise quando terminar!** 🚀

---

Começar pelo **PASSO 1** 👆
