const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');  // Importa o router que você exportou do routes.js

const app = express();

// Configure o CORS corretamente para permitir cookies e o frontend
app.use(cors({
  origin: 'http://localhost:3000',  // Permite o frontend do localhost
  methods: 'GET,POST',  // Permite os métodos desejados
  credentials: true  // Permite o envio de cookies com as requisições
}));

app.use(bodyParser.json());

// Registrando as rotas usando o router exportado
app.use('/api', routes);  // As rotas vão ser acessadas por "/api/login", "/api/protected", etc.

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
