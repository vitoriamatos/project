
# Sistema de Login com API - Node.js

Este é um projeto base para um sistema de login com autenticação utilizando **Node.js**, **Express**, **JWT (JSON Web Token)** ,**cookies HTTP-only** e **React**. A ideia deste repositório é fornecer uma base reutilizável para autenticação e autorização, podendo ser expandida para diferentes tipos de projetos no futuro.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução para JavaScript no servidor.
- **Express**: Framework para construção de APIs e servidores web.
- **bcryptjs**: Biblioteca para hash de senhas e comparação segura de senhas.
- **jwt-simple**: Biblioteca para criação e validação de tokens JWT.
- **cookie-parser**: Middleware para manipulação de cookies HTTP.
- **dotenv**: Carrega variáveis de ambiente do arquivo `.env`.
- **React** : Para o Front end
## Como Funciona

### Estrutura do Projeto

- **Backend**: API simples que permite o login de usuários, verificando credenciais com bcrypt, gerando tokens JWT e usando cookies HTTP-only para manter a sessão do usuário.
- **Autenticação com JWT**: O token JWT é gerado quando o usuário faz login e é armazenado em um cookie HTTP-only. Esse token é enviado automaticamente em todas as requisições subsequentes para verificar a autenticidade do usuário.
- **Logout**: O logout é feito removendo o token do cookie, encerrando a sessão do usuário.

### Endpoints

#### 1. **Login** (`POST /login`)
- **Descrição**: Permite que o usuário faça login com nome de usuário e senha. Se as credenciais forem válidas, o servidor gera um token JWT e o envia como um cookie HTTP-only.
- **Parâmetros**:
  - `username`: Nome de usuário.
  - `password`: Senha do usuário.
- **Resposta**:
  - Se as credenciais forem válidas, retorna um token JWT no cookie e uma mensagem de sucesso.
  - Caso contrário, retorna um erro de autenticação.

#### 2. **Rota Protegida** (`GET /protected`)
- **Descrição**: Rota protegida que exige um token JWT válido. Se o token for válido, permite o acesso e retorna as informações do usuário.
- **Parâmetros**: Nenhum.
- **Resposta**:
  - Se o token for válido, retorna uma mensagem de sucesso e os dados do usuário.
  - Caso contrário, retorna um erro de autenticação.

#### 3. **Logout** (`POST /logout`)
- **Descrição**: Rota que permite ao usuário fazer logout, removendo o token JWT do cookie.
- **Parâmetros**: Nenhum.
- **Resposta**:
  - Retorna uma mensagem de sucesso informando que o logout foi realizado.

## Como Rodar o Projeto

### Pré-requisitos

- **Node.js** (versão 14 ou superior).
- **MySQL** (ou qualquer outro banco de dados relacional) para armazenar as informações dos usuários.
- **Postman** ou **curl** para testar as rotas da API.

### 1. Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/seu-usuario/sistema-login-api.git
cd sistema-login-api
npm install
```

### 2. Configuração do Banco de Dados

Certifique-se de que o banco de dados esteja configurado corretamente, e com um banco de dados que poderá ser usado, e que a tabela de usuários esteja presente. O código pressupõe uma tabela chamada `users` com os campos `id`, `username` e `password`.

Você pode criar a tabela `users` com a seguinte estrutura:

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);
```

### 3. Configuração do Ambiente

Crie um arquivo `.env` na raiz do diretório backend e defina a chave secreta para o JWT:

```env
JWT_SECRET_KEY=seu_secreto_aqui
```

### 4. Rodando o Servidor

Inicie o servidor com o comando:

```bash
npm start
```

O servidor estará disponível em `http://localhost:5000`.

## Testando a API

### 1. **Login**
- Método: `POST`
- URL: `http://localhost:5000/login`
- Corpo da requisição (JSON):
  ```json
  {
    "username": "usuario_exemplo",
    "password": "senha_exemplo"
  }
  ```

Se as credenciais forem corretas, você receberá um token JWT como resposta, que será armazenado em um cookie.

### 2. **Acessando a Rota Protegida**
- Método: `GET`
- URL: `http://localhost:5000/protected`

Você deve enviar o cookie com o token JWT na requisição. Se o token for válido, você terá acesso à rota.

### 3. **Logout**
- Método: `POST`
- URL: `http://localhost:5000/logout`

Ao fazer a requisição para essa rota, o cookie contendo o token JWT será removido e você será desconectado.



## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
