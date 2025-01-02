import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();
  // Verificar se o usuário está logado (pode ser via localStorage ou redux)
  useEffect(() => {
    const user = localStorage.getItem('user'); // Ou qualquer valor de sessão
    setIsLoggedIn(!!user); // Se existir usuário no localStorage, considera como logado
  }, []);

  // Função de Logout
  const handleLogout = async () => {
    try {
      // Faz a requisição para o backend para limpar o cookie (opcional)
      await axios.post('http://localhost:5000/api/logout');

      // Limpar o token do localStorage
      localStorage.removeItem('user');

      // Atualizar estado de login
      setIsLoggedIn(false);

      // Redireciona para a página de login
      navigate('/login');
    } catch (err) {
      console.error('Erro ao fazer logout:', err);
    }
  };

  return (
    <Nav>
      <Logo>Logo</Logo>
      <HamburgerMenu onClick={() => setIsMenuOpen(!isMenuOpen)}>
        &#9776;
      </HamburgerMenu>
      <NavItems isMenuOpen={isMenuOpen}>
        <NavItem>
          <a href="/">Home</a>
        </NavItem>
        {isLoggedIn ? (
          <>
            <NavItem>
              <a href="/profile">Perfil</a>
            </NavItem>
            <NavItem>
              <a href="#" onClick={handleLogout}>
                Logout
              </a>
            </NavItem>
          </>
        ) : (
          <NavItem>
            <a href="/login" onClick={handleLogout}>
              Login
            </a>
          </NavItem>
        )}
      </NavItems>
    </Nav>
  );
};

const Nav = styled.nav`
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  position: sticky;
  top: 0;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const HamburgerMenu = styled.div`
  display: none; // Ocultar o ícone de menu hamburguer no desktop

  @media (max-width: 768px) {
    display: block;
    font-size: 30px;
    cursor: pointer;
  }
`;

const NavItems = styled.ul<{ isMenuOpen: boolean }>`
  display: flex;
  list-style-type: none;
  padding: 0;
  margin: 0;

  @media (max-width: 768px) {
    flex-direction: column;
    background-color: white;
    position: absolute;
    top: 60px;
    right: 0;
    width: 100%;
    display: ${({ isMenuOpen }) => (isMenuOpen ? 'flex' : 'none')};
  }
`;

const NavItem = styled.li`
  margin-left: 20px;

  a {
    text-decoration: none;
    color: inherit;
    font-size: 18px;

    &:hover {
      text-decoration: none; // Remover underline ao passar o mouse
    }
  }

  @media (max-width: 768px) {
    margin: 10px 0;
    text-align: center;
  }
`;

export default Navbar;
