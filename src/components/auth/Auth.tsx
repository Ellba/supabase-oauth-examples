import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { authProviders, getAuthProviderName } from '../../data/authProviders';
import { AuthProvider as Provider } from '../../types';
import { supabase } from '../../supabase';
import {
  AuthContainer,
  AuthTitle,
  OAuthText,
  ProvidersGrid,
  ProviderWrapper,
  ProviderIconWrapper,
  IconBW,
  IconColor,
  ProviderName,
  AuthMessage,
  UserCard,
  UserAvatar,
  UserName,
  UserEmail,
  UserProvider,
  SignOutButton,
  LoadingSpinner
} from './AuthStyles';

// List of providers that require verification and should appear greyed out
const verificationRequiredProviders = ['apple', 'kakao', 'keycloak', 'spotify'];

const Auth: React.FC = () => {
  const { user, signInWithOAuth, signOut, loading } = useAuth();
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [userData, setUserData] = useState<any>(null);

  const handleSignIn = (provider: Provider) => {
    setSelectedProvider(provider);
    signInWithOAuth(provider);
  };

  useEffect(() => {
    // When user is authenticated, fetch user data using getUser
    const fetchUserData = async () => {
      if (user) {
        try {
          const { data, error } = await supabase.auth.getUser();
          if (error) {
            console.error('Error fetching user data:', error);
          } else {
            setUserData(data);
          }
        } catch (error) {
          console.error('Error in getUser call:', error);
        }
      } else {
        setUserData(null);
      }
    };

    fetchUserData();
  }, [user]);

  if (loading) {
    return (
      <AuthContainer>
        <LoadingSpinner />
      </AuthContainer>
    );
  }

  return (
    <AuthContainer>
      <AuthTitle>
        <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
          <img 
            src="/src/assets/icons/brand-assets/supabase-logo-wordmark--dark.png" 
            alt="Supabase" 
            style={{ height: '30px', marginRight: '12px', marginTop: '5px' }} 
          />
          <OAuthText>OAuth Login</OAuthText>
        </a>
      </AuthTitle>
      
      {user ? (
        <div>
          <UserCard>
            {user.user_metadata?.avatar_url && (
              <UserAvatar src={user.user_metadata.avatar_url} alt="User Avatar" />
            )}
            <UserName>
              {user.user_metadata?.full_name || user.user_metadata?.name || 'User'}
            </UserName>
            <UserEmail>{user.email || 'No email provided'}</UserEmail>
            {user.user_metadata?.provider && (
              <UserProvider>
                Signed in with {getAuthProviderName(user.user_metadata.provider as Provider)}
              </UserProvider>
            )}
            <SignOutButton onClick={signOut}>Sign Out</SignOutButton>
          </UserCard>
          
          {userData && (
            <div style={{ marginTop: '20px', width: '100%', maxWidth: '700px' }}>
              <h3>User Data from supabase.auth.getUser()</h3>
              <div style={{ position: 'relative' }}>
                <pre 
                  style={{ 
                    background: '#1e1e1e', 
                    color: 'white',
                    padding: '15px', 
                    borderRadius: '5px',
                    overflow: 'auto',
                    maxHeight: '1200px',
                    minHeight: '200px',
                    fontSize: '14px',
                    textAlign: 'left',
                    fontFamily: 'monospace'
                  }}
                >
                  {JSON.stringify(userData, null, 2)}
                </pre>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify(userData, null, 2));
                  }}
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: 'transparent',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer',
                    padding: '5px',
                    borderRadius: '3px'
                  }}
                  title="Copy to clipboard"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.3333 6H7.33333C6.59695 6 6 6.59695 6 7.33333V13.3333C6 14.0697 6.59695 14.6667 7.33333 14.6667H13.3333C14.0697 14.6667 14.6667 14.0697 14.6667 13.3333V7.33333C14.6667 6.59695 14.0697 6 13.3333 6Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3.33333 10H2.66666C2.31304 10 1.97391 9.85952 1.72386 9.60948C1.47381 9.35943 1.33333 9.0203 1.33333 8.66668V2.66668C1.33333 2.31305 1.47381 1.97392 1.72386 1.72387C1.97391 1.47382 2.31304 1.33334 2.66666 1.33334H8.66666C9.02028 1.33334 9.35941 1.47382 9.60946 1.72387C9.85951 1.97392 9.99999 2.31305 9.99999 2.66668V3.33334" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
          <ProvidersGrid>
            {authProviders.slice(0, 14).map((provider) => (
              <ProviderWrapper
                key={provider.id}
                onClick={() => handleSignIn(provider.id)}
              >
                <ProviderIconWrapper>
                  <IconBW 
                    provider={provider.id} 
                    style={{ 
                      opacity: verificationRequiredProviders.includes(provider.id) ? 1 : 0 
                    }} 
                  />
                  <IconColor 
                    provider={provider.id} 
                    style={{ 
                      opacity: verificationRequiredProviders.includes(provider.id) ? 0 : 1 
                    }} 
                  />
                </ProviderIconWrapper>
                <ProviderName>{provider.name}</ProviderName>
              </ProviderWrapper>
            ))}
          </ProvidersGrid>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            flexWrap: 'wrap', 
            gap: '2.2rem',
            marginTop: '0rem',
            width: '100%',
            maxWidth: '500px' 
          }}>
            {authProviders.slice(14).map((provider) => (
              <ProviderWrapper
                key={provider.id}
                onClick={() => handleSignIn(provider.id)}
              >
                <ProviderIconWrapper>
                  <IconBW 
                    provider={provider.id} 
                    style={{ 
                      opacity: verificationRequiredProviders.includes(provider.id) ? 1 : 0 
                    }} 
                  />
                  <IconColor 
                    provider={provider.id} 
                    style={{ 
                      opacity: verificationRequiredProviders.includes(provider.id) ? 0 : 1 
                    }} 
                  />
                </ProviderIconWrapper>
                <ProviderName>{provider.name}</ProviderName>
              </ProviderWrapper>
            ))}
          </div>
          
          {selectedProvider && (
            <AuthMessage>
              Redirecting to {getAuthProviderName(selectedProvider)} login...
            </AuthMessage>
          )}
        </>
      )}
    </AuthContainer>
  );
};

export default Auth; 