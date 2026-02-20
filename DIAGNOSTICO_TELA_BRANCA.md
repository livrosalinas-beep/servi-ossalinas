# 🔧 Diagnóstico - Tela Branca

Se você está vendo uma **tela branca** em localhost, execute estes passos:

## ✅ Passo 1: Verificar a Porta Correta

O Vite está rodando em **http://localhost:5174/** (não 5173!)

Verifique na saída do terminal `npm run dev`:

```
✓ Local:   http://localhost:5174/   ← USE ESTA URL
```

## ✅ Passo 2: Abrir Console do Navegador (F12)

1. Pressione **F12** (ou Ctrl+Shift+I)
2. Clique na aba **"Console"**
3. Procure por vermelho (erros)

**Comum:** "Cannot read properties of undefined"
**Solução:** Significa .env.local não está carregado

## ✅ Passo 3: Reiniciar o Servidor

```bash
# Parar com Ctrl+C
npm run dev
```

Aguarde aparecer:
```
✓ VITE v7.3.1  ready in xxx ms
✓ Local:   http://localhost:5174/
```

## ✅ Passo 4: Limpar Cache do Navegador

1. Abra DevTools (F12)
2. Clique em **Application** (ou Storage)
3. Clique em **"Clear site data"**
4. Pressione **Ctrl+Shift+R** (hard refresh)

## ✅ Passo 5: Verificar .env.local

Arquivo: `/home/sergio/Área de trabalho/files/servi-os-salinas/.env.local`

Deve ter:
```
VITE_SUPABASE_URL=https://vnjdzrtkslkcyqeefxhs.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_Tnffm2BauGWl9tigJbzPeg_qFCAwznJ
```

Se não tem, edite o arquivo.

## 🆘 Se Still Branco

Envie a saída do console (F12 > Console) com:
- Erros em vermelho
- Avisos amarelos
- Qualquer mensagem

Assim posso diagnosticar exatamente o problema.

---

**Comece abrindo http://localhost:5174/ (port 5174, não 5173!)**
