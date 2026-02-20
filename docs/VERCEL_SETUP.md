# Guia de Setup - Vercel

Este documento detalha como fazer deploy da aplicação no Vercel (hosting gratuito para React/Vite).

## 📋 Pré-requisitos

- Projeto já configurado no GitHub
- Supabase já configurado (ver [SUPABASE_SETUP.md](./SUPABASE_SETUP.md))
- Conta no Vercel (gratuita)

## ✅ Passo a Passo

### 1. Preparar Código para Deploy

#### Verificar se tudo está funcionando localmente

```bash
$ npm run build
```

Se houve erros, corrija antes de continuar.

#### Testar build localmente

```bash
$ npm run preview
```

Abra http://localhost:5173 e testes a app.

### 2. Fazer Push no GitHub

Se ainda não fez:

```bash
$ git add .
$ git commit -m "Setup: React + Vite + TypeScript + Supabase"
$ git push origin main
```

Verifique em https://github.com/livrosalinas-beep/servi-ossalinas

### 3. Criar Conta Vercel

1. Acesse https://vercel.com
2. Clique em **"Sign Up"**
3. Selecione **"Continue with GitHub"**
4. Autorize Vercel a acessar seus repositórios
5. Selecione sua organização GitHub

### 4. Importar Projeto

1. Na dashboard Vercel, clique em **"New Project"**
2. Você verá a lista de repositórios GitHub
3. Procure por `servi-ossalinas` e clique em **"Import"**
4. Vercel detectará automaticamente:
   - **Framework:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

Deixe como está (padrão está correto).

### 5. Configurar Variáveis de Ambiente

Importante: Suas credenciais Supabase precisam ficar no Vercel para funcionar.

1. Na página de importação, procure por **"Environment Variables"**
2. Clique em **"Add"** e adicione:

```
VITE_SUPABASE_URL = https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY = sua-chave-anonima
```

> ⚠️ Os valores devem ser exatamente iguais ao do `.env.local` local.

3. Clique em **"Add Environment Variable"** para cada uma
4. Clique em **"Deploy"**

### 6. Aguardar Build

Vercel irá:
1. Clonar seu repositório
2. Instalar dependências (`npm install`)
3. Executar build (`npm run build`)
4. Fazer deploy (`vercel deploy`)

Você verá logs em tempo real. Leva ~2-3 minutos.

Uma vez finalizado, você verá:

```
✅ Deployment Complete
🎉 https://servi-os-salinas.vercel.app
```

Seu site está ao vivo! 🚀

### 7. Testar Aplicação

Abra https://servi-os-salinas.vercel.app (ou o URL que você recebeu)

Testes:
1. ✅ Página inicial carrega?
2. ✅ Busca funciona?
3. ✅ Login/Cadastro funciona?
4. ✅ Consegue criar serviço?

Se tudo OK, parabéns! 🎉

## 🔄 Atualizações Automáticas

A partir de agora:

1. Sempre que fizer `git push origin main`, Vercel detecta automaticamente
2. Executa novo build
3. Faz deploy automático

> 💡 Se precisar fazer deploy manual, clique em **"Redeploy"** na dashboard Vercel.

## 📊 Domínio Personalizado (Opcional)

Se quiser usar seu próprio domínio (ex: servicoslocal.com.br):

1. Na dashboard Vercel, vá para **"Settings"** → **"Domains"**
2. Clique em **"Add Domain"**
3. Insira seu domínio
4. Siga as instruções para atualizar DNS

(Isso requer que você tenha um domínio registrado. Ex: Registro.BR, Namecheap, etc)

## 🚨 Troubleshooting

### ❌ Deploy Failed

Verifique os logs:
1. Na dashboard Vercel, clique em **"Deployments"**
2. Procure pelo deployment com ❌
3. Clique nele para ver os erros
4. Corrija e faça novo `git push`

Erros comuns:
- **"Cannot find module":** Faltou fazer `npm install`
- **"VITE_SUPABASE_URL is undefined":** Faltou configurar variáveis de ambiente
- **"Build failed":** Há erro de TypeScript ou sintaxe

### ❌ Funciona local mas não no Vercel

Provável causa: Variáveis de ambiente não estão configuradas.

Solução:
1. Abra Vercel Dashboard
2. Vá para **"Settings"** → **"Environment Variables"**
3. Verifique se estão configuradas corretamente
4. Clique em **"Redeploy"**

### ❌ Erro de CORS

Se receber erro de CORS ao chamar Supabase:

Supabase é seguro por padrão (CORS habilitado para qualquer domínio).

Se ainda tiver problema:
1. Abra Supabase Dashboard
2. Vá para **"Settings"** → **"API"**
3. Role até **"CORS"**
4. Verifique se seu domínio Vercel está na lista

## 📞 Próximas Etapas

Após fazer deploy:

1. ✅ Testar todas as funcionalidades
2. ✅ Configurar domínio próprio (opcional)
3. ✅ Configurar Google Analytics (opcional)
4. ✅ Configurar emails SMTP (para notificações)

## 📚 Recursos Úteis

- [Documentação Vercel](https://vercel.com/docs)
- [Documentação Vite](https://vitejs.dev/guide/static-deploy.html#deploying-a-static-site)
- [Documentação Supabase + Vercel](https://supabase.com/docs/guides/framework-guides)

## 📞 Contato

Se tiver dúvidas:
1. Abra issue no GitHub
2. Consulte documentação oficial
3. Peça ajuda na comunidade
