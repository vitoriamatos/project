const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jwt-simple');
const cookieParser = require('cookie-parser');
const db = require('./db'); // Assumindo que você tem uma função para acessar o banco de dados

const router = express.Router();

// Use o cookie-parser para manipular cookies
router.use(cookieParser());
router.use(express.json());

const dotenv = require('dotenv');
dotenv.config(); // Carregar variáveis do .env
const secretKey = process.env.JWT_SECRET_KEY;

// Rota de login (gera e envia o token via cookie HTTP-only)
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Verifica se o nome de usuário e senha são fornecidos
  if (!username || !password) {
    return res.status(400).json({ message: 'Nome de usuário e senha são obrigatórios' });
  }

  try {
    // Verifica se o usuário existe no banco de dados
    const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Usuário ou senha inválidos' });
    }

    const user = rows[0];

    // Valida a senha
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Usuário ou senha inválidos' });
    }

    // Cria o JWT com os dados do usuário
    const payload = {
      id: user.id,
      username: user.username,
    };
    const token = jwt.encode(payload, secretKey);

    // Envia o token no cookie HTTP-only
    res.cookie('token', token, {
      httpOnly: true, // Não pode ser acessado via JavaScript
      secure: false, 
      maxAge: 3600000, // Tempo de expiração do cookie (1 hora)
      sameSite: 'Strict', // Protege contra CSRF
    });

    return res.json({ message: 'Login bem-sucedido' });
  } catch (err) {
    console.error('Erro ao fazer login:', err);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Rota protegida (verifica o token JWT no cookie)
router.get('/protected', (req, res) => {
  const token = req.cookies.token; // Recupera o token do cookie

  if (!token) {
    return res.status(401).json({ message: 'Não autorizado' });
  }

  try {
    // Decodifica o token e verifica se é válido
    const decoded = jwt.decode(token, secretKey);

    req.user = decoded; // Salva as informações do usuário decodificado na requisição
    return res.json({ message: 'Acesso autorizado', user: req.user });
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido ou expirado' });
  }
});

// Rota de logout (remove o token)
router.post('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: false, 
    sameSite: 'Strict',
  });
  
  return res.status(200).json({ message: 'Logout bem-sucedido' });
});

module.exports = router;  // Exporta o router para ser utilizado no app.js
