import styled, { css, keyframes } from 'styled-components';

export const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 2rem;
  max-width: 768px;
  margin: 0 auto;
  background-color:rgb(0, 0, 0);
  color: #e0e0e0;
`;

export const AuthTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #e0e0e0;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const OAuthText = styled.span`
  font-size: 1.5rem;
  font-weight: normal;
`;

export const ProvidersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 1.5rem;
  width: 100%;
  margin: 1rem 0;
  
  &:nth-of-type(3) {
    justify-content: center;
    display: flex;
    flex-wrap: wrap;
  }
`;

export const ProviderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  position: relative;
`;

export const ProviderIconWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 12px;
  background-color: #2a2a2a;
  transition: transform 0.3s ease;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const IconBW = styled.div<{ provider: string }>`
  width: 44px;
  height: 44px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  filter: grayscale(100%) brightness(0.3);
  transition: opacity 0.3s ease;
  opacity: 0;
  position: absolute;
  ${({ provider }) => provider && css`
    background-image: url('/src/assets/icons/${provider}.svg');
  `}
`;

export const IconColor = styled.div<{ provider: string }>`
  width: 44px;
  height: 44px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  transition: opacity 0.3s ease;
  opacity: 1;
  position: absolute;
  ${({ provider }) => provider && css`
    background-image: url('/src/assets/icons/${provider}.svg');
  `}
`;

export const ProviderName = styled.span`
  font-size: 0.8rem;
  margin-top: 0.5rem;
  text-align: center;
  color: #b0b0b0;
`;

export const AuthMessage = styled.div`
  margin-top: 2rem;
  text-align: center;
  font-size: 1.2rem;
  color: #e0e0e0;
  padding: 1rem;
  border-radius: 8px;
  background-color: #2a2a2a;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

export const UserCard = styled.div`
  width: 100%;
  padding: 2rem;
  border-radius: 12px;
  background-color: #2a2a2a;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const UserAvatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin-bottom: 1rem;
`;

export const UserName = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #e0e0e0;
`;

export const UserEmail = styled.p`
  font-size: 1rem;
  color: #b0b0b0;
  margin-bottom: 1rem;
`;

export const UserProvider = styled.span`
  font-size: 0.9rem;
  color: #909090;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const SignOutButton = styled.button`
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background-color: #333333;
  color: #e0e0e0;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #444444;
  }
`;

export const LoadingSpinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-top: 4px solid #e0e0e0;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 2rem auto;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`; 