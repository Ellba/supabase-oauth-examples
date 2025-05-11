import { AuthProvider, AuthProviderInfo } from '../types';

export const authProviders: AuthProviderInfo[] = [
  { id: 'apple', name: 'Apple' },
  { id: 'azure', name: 'Azure' },
  { id: 'bitbucket', name: 'Bitbucket' },
  { id: 'discord', name: 'Discord' },
  { id: 'facebook', name: 'Facebook' },
  { id: 'figma', name: 'Figma' },
  { id: 'github', name: 'GitHub' },
  { id: 'gitlab', name: 'GitLab' },
  { id: 'google', name: 'Google' },
  { id: 'kakao', name: 'Kakao' },
  { id: 'keycloak', name: 'KeyCloak' },
  { id: 'linkedin_oidc', name: 'LinkedIn (OIDC)' },
  { id: 'notion', name: 'Notion' },
  { id: 'twitch', name: 'Twitch' },
  { id: 'twitter', name: 'Twitter' },
  { id: 'slack_oidc', name: 'Slack (OIDC)' },
  { id: 'spotify', name: 'Spotify' },
  { id: 'workos', name: 'WorkOS' },
  { id: 'zoom', name: 'Zoom' }
];

export const getAuthProviderName = (provider: AuthProvider): string => {
  const providerInfo = authProviders.find(p => p.id === provider);
  return providerInfo ? providerInfo.name : provider;
}; 