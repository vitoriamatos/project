import React from 'react';
import {
  PreloaderWrapper,
  Loader,
  Spinner,
  SpinnerContainer,
  SpinnerRotator,
  SpinnerCircle,
} from './styles';

export const Preloader = () => (
  <PreloaderWrapper>
    <Loader>
      <Spinner>
        <SpinnerContainer>
          <SpinnerRotator>
            <SpinnerCircle />
          </SpinnerRotator>
        </SpinnerContainer>
      </Spinner>
    </Loader>
  </PreloaderWrapper>
);
