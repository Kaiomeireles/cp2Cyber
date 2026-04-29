const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));

// Proposital vulnerability: Reflection without sanitization (XSS)
// Also, no security headers are set by default in this simple express setup.

app.get('/', (req, res) => {
    res.cookie('sessionID', '123456', { httpOnly: false }); // Insecure cookie
    res.send(`
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <title>ClickSeguro - Login</title>
            <style>
                body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f0f2f5; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
                .login-container { background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); width: 350px; }
                h1 { color: #1a73e8; text-align: center; margin-bottom: 1.5rem; }
                input { width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box; }
                button { width: 100%; padding: 10px; background: #1a73e8; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 16px; transition: background 0.3s; }
                button:hover { background: #1557b0; }
                .error { color: red; font-size: 14px; margin-top: 10px; }
            </style>
        </head>
        <body>
            <div class="login-container">
                <h1>ClickSeguro</h1>
                <form action="/login" method="POST">
                    <input type="text" name="username" placeholder="Usuário" required>
                    <input type="password" name="password" placeholder="Senha" required>
                    <button type="submit">Entrar</button>
                </form>
                ${req.query.error ? `<div class="error">Erro: ${req.query.error}</div>` : ''}
            </div>
        </body>
        </html>
    `);
});

app.post('/login', (req, res) => {
    const username = (req.body.username || '').trim();
    const password = (req.body.password || '').trim();
    
    console.log(`DEBUG - Login attempt: user='${username}', pass='${password}'`);
    
    // Aceitando 'admin' (case insensitive) e senha 'admin'
    if (username.toLowerCase() === 'admin' && password === 'admin') {
        return res.send(`
            <div style="font-family: sans-serif; text-align: center; margin-top: 100px;">
                <h1 style="color: #28a745;">Login realizado com sucesso!</h1>
                <p>Bem-vindo ao ClickSeguro, Admin.</p>
                <a href="/">Voltar</a>
            </div>
        `);
    }
    
    // Se falhar, volta com o erro (Vulnerabilidade XSS proposital)
    res.redirect(`/?error=Usuário ${username} não encontrado`);
});

app.listen(port, () => {
    console.log(`Aplicação ClickSeguro rodando em http://localhost:${port}`);
});
