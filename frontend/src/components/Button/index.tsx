import styled from 'styled-components';
import React from 'react';

// Define um botão estilizado
const StyledButton = styled.button<{ primary?: boolean }>`
  background: ${props => (props.primary ? '#4CAF50' : 'white')};
  color: ${props => (props.primary ? 'white' : '#4CAF50')};
  border: 2px solid #4caf50;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: ${props => (props.primary ? '#45a049' : '#f0f0f0')};
  }
`;

// Componente de botão com props
const Button: React.FC<
  React.PropsWithChildren<{ primary?: boolean; onClick?: () => void }>
> = ({ primary, onClick, children }) => {
  return (
    <StyledButton primary={primary} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export default Button;
