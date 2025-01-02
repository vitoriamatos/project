import styled from 'styled-components';

// Styled-component para o Preloader
export const PreloaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: table;
  height: 100%;
  width: 100%;
  background: #fff;
  z-index: 99999;
`;

export const Loader = styled.div`
  display: table-cell;
  vertical-align: middle;
  text-align: center;
`;

export const Spinner = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 64px;
  margin-left: -32px;
`;

export const SpinnerContainer = styled.div`
  position: absolute;
  width: 100%;
  padding-bottom: 100%;
  top: 50%;
  left: 50%;
  margin-top: -50%;
  margin-left: -50%;
  animation: spinner-linspin 1568.2353ms linear infinite;
`;

export const SpinnerRotator = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  animation: spinner-easespin 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;
`;

export const SpinnerCircle = styled.div`
  position: absolute;
  width: 200%;
  height: 100%;
  border-style: solid;
  border-color: #361cc1 #361cc1 #e1e1e1;
  border-radius: 50%;
  border-width: 6px;
`;
