import React from 'react';
import Navbar from '../../components/Navbar'; // Importando a Navbar
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #f7f7f7;
`;

const HomePage: React.FC = () => {
  return (
    <>
      <Navbar />
      <Container>
        <h1>Bem-vindo!</h1>
      </Container>
    </>
  );
};

export default HomePage;
