const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

// Configura o aplicativo Express
const app = express();
app.use(bodyParser.json());

// Configuração do banco de dados
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '##326##Didi2006',
  database: 'mydatabase'
});

// Rota para login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Verificar se o usuário existe e a senha está correta
  pool.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length > 0) {
      const userData = results[0]; // assuming only one user with the given email and password
      res.json({
        success: true,
        nome: userData.nome,
        sobrenome: userData.sobrenome,
        email: userData.email
      });
    } else {
      res.status(401).json({ error: 'Email ou senha incorretos' });
    }
  });
});

app.post('/register', (req, res) => {
    const { nome, sobrenome, email, password } = req.body;
  
    // Validar se o email e a senha são fornecidos
    if (!nome || !sobrenome || !email || !password) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }
  
    // Inserir o usuário no banco de dados
    pool.query('INSERT INTO users (nome, sobrenome, email, password) VALUES (?, ?, ?, ?)', [nome, sobrenome, email, password], (err, results) => {
      if (err) {
        console.error('Erro ao inserir no banco de dados:', err);
        return res.status(500).json({ error: 'Erro interno do servidor' });
      }
      res.status(201).json({ success: true });
    });
  });

// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});