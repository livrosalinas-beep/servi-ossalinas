# Guia de Setup - Supabase

Este documento detalha como configurar o Supabase para o projeto ServiçosLocal.

## 📋 Pré-requisitos

- Conta no GitHub (para autenticação)
- Navegador web

## ✅ Passo a Passo

### 1. Criar Projeto Supabase

1. Acesse https://supabase.com
2. Clique em **"Sign Up"** ou faça login com GitHub
3. Clique em **"New Project"**
4. Preencha:
   - **Project Name:** `servi-os-salinas`
   - **Database Password:** Crie uma senha forte (anote em lugar seguro!)
   - **Region:** Selecione `South America` → `São Paulo` para melhor latência
   - **Pricing Plan:** `Free` (gratuito, suficiente para começar)
5. Clique em **"Create New Project"**

⏳ Aguarde a criação (leva ~2 minutos)

### 2. Obter Credenciais

Após criação, você será redirecionado ao dashboard:

1. No menu lateral, clique em **"Project Settings"** (engrenagem)
2. Selecione a aba **"API"**
3. Copie as credenciais:
   - **Project URL:** Você verá `https://xxxxx.supabase.co`
   - **Anon Key:** A chave pública (público key)

> ⚠️ **IMPORTANTE:** O Anon Key é público (pode ser compartilhado). A Service Key é privada (nunca compartilhe).

### 3. Configurar Variáveis de Ambiente

1. No projeto local, abra `.env.local`
2. Preencha:
   ```
   VITE_SUPABASE_URL=https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=sua-chave-anonima-aqui
   ```
3. Salve o arquivo

### 4. Executar Migrations

As migrations criam as tabelas do banco de dados. Você pode executá-las de 2 formas:

#### Opção A: Pelo Supabase Studio (Recomendado para iniciantes)

1. No Supabase dashboard, clique em **"SQL Editor"** (no menu lateral)
2. Clique em **"New Query"**
3. Cole o conteúdo de `supabase/migrations/001_initial_schema.sql`
4. Clique em **"Run"** ou pressione `Ctrl+Enter`
5. Você verá as mensagens de sucesso

#### Opção B: Pela CLI Supabase

```bash
$ npm install -g supabase

$ supabase link --project-ref sua-ref-aqui

$ supabase db push
```

### 5. Verificar Tabelas Criadas

1. No Supabase Studio, clique em **"Table Editor"** (no menu lateral)
2. Você deve ver:
   - `providers`
   - `reviews`
   - `services`
   - `subscriptions`

Se não ver, tente executar a migration novamente.

### 6. Configurar Autenticação

1. No Supabase Dashboard, clique em **"Authentication"** (menu lateral)
2. Selecione a aba **"Providers"**
3. Aqui você pode habilitar:
   - **Email** (habilitado por padrão) ✅
   - **GitHub** (clique para configurar)
   - **Google** (clique para configurar)

Para Email, deixe como está (padrão funciona).

Você pode habilitar GitHub e Google depois, se quiser.

### 7. Testar Localmente

```bash
$ npm run dev
```

Abra http://localhost:5173

Tente:
1. Criar uma conta novo (irá para a tela de verificação de email)
2. Usar email: `teste@example.com` e senha: `Senha123!` (para testes)

> 💡 **Dica:** Em desenvolvimento, Supabase envia emails locais virtualmente.

## 🔐 Segurança (Row Level Security)

As policies de RLS já estão configuradas na migration. Isso significa:

- Qualquer um pode **visualizar** providers (públicos)
- Apenas o proprietário pode **editar** seu provider
- Apenas o cliente pode **deletar** sua conta
- etc.

Você pode ver as policies em:
1. **Authentication** → **Policies** no Supabase Studio

## 📊 Dashboard Supabase

Uma vez configurado, você pode usar o Supabase Studio para:

- 📊 Ver estatísticas
- 📝 Editar dados diretamente
- 🔐 Gerenciar usuários
- 📋 Ver logs de autenticação
- 🚨 Monitorar uso (plano gratuito tem limites)

## 🆓 Limites do Plano Gratuito

- **Database:** 500 MB
- **Auth:** Usuários ilimitados
- **Bandwidth:** 2 GB/mês
- **Computação:** Até 1 projeto
- **Suporte:** Comunidade

Suficiente para MVP e test.

## 🚀 Próximas Etapas

Após configurar Supabase:

1. Teste a aplicação localmente
2. Configure GitHub (se não fez)
3. Faça deploy no Vercel → [VERCEL_SETUP.md](./VERCEL_SETUP.md)

## 🤔 Troubleshooting

### ❌ "Cannot read properties of undefined"

**Motivo:** .env.local não está configurado

**Solução:**
```bash
cp .env.local  # copie o arquivo
nano .env.local  # edite com suas credenciais
```

### ❌ "Invalid API key"

**Motivo:** A chave no .env.local está errada

**Solução:**
1. Abra Supabase Dashboard
2. Vá para Settings → API
3. Copie a URL e KEY novamente
4. Atualize no .env.local

### ❌ "Tables don't exist"

**Motivo:** Migration não foi executada

**Solução:**
1. Abra Supabase Studio → SQL Editor
2. Cole e execute a migration novamente
3. Verifique se não há erros

## 📞 Contato

Se tiver dúvidas:
1. Abra issue no GitHub
2. Consulte [Documentação Supabase](https://supabase.com/docs)
