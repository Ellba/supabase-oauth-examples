export type AuthProvider = 
  | 'apple' 
  | 'azure' 
  | 'bitbucket' 
  | 'discord' 
  | 'facebook' 
  | 'figma' 
  | 'github' 
  | 'gitlab' 
  | 'google' 
  | 'kakao' 
  | 'keycloak' 
  | 'linkedin' 
  | 'notion' 
  | 'twitch' 
  | 'twitter' 
  | 'slack' 
  | 'spotify' 
  | 'workos' 
  | 'zoom';

export interface AuthProviderInfo {
  id: AuthProvider;
  name: string;
}

export interface UserInfo {
  id: string;
  email?: string;
  user_metadata?: {
    avatar_url?: string;
    full_name?: string;
    name?: string;
    email?: string;
    provider?: string;
  };
} 