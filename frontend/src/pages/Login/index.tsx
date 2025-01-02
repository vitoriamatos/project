import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Realiza o login no backend
      const response = await axios.post(
        'http://localhost:5000/api/login',
        {
          username,
          password,
        },
        {
          withCredentials: true, // Envia cookies com a requisição
        }
      );

      console.log('Login bem-sucedido:', response.data);

      // Redireciona para a home após login
      navigate('/');
    } catch (err: any) {
      console.error('Erro ao tentar login:', err);
      setError(err.response.data.error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default LoginPage;
