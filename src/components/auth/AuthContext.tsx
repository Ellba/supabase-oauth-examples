import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../../supabase';
import { UserInfo } from '../../types';

interface AuthContextType {
  session: Session | null;
  user: UserInfo | null;
  signInWithOAuth: (provider: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
  authError: string | null;
  clearAuthError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Check for auth errors in URL
    const url = new URL(window.location.href);
    const errorCode = url.searchParams.get('error_code');
    const errorDescription = url.searchParams.get('error_description');
    
    if (errorCode) {
      setAuthError(errorDescription || `Authentication error: ${errorCode}`);
      
      // Clean up the URL
      url.searchParams.delete('error');
      url.searchParams.delete('error_code');
      url.searchParams.delete('error_description');
      window.history.replaceState({}, document.title, url.toString());
    }

    return () => subscription.unsubscribe();
  }, []);

  const clearAuthError = () => {
    setAuthError(null);
  };

  const signInWithOAuth = async (provider: string) => {
    try {
      setAuthError(null);
      
      if (provider === 'workos') {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'workos',
          options: {
            redirectTo: window.location.origin,
            queryParams: {
              connection: 'conn_01JSVTMY3PG7RESMGBKSGK7PVA',
            },
          },
        });
        if (error) throw error;
      } else if (provider === 'kakao') {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'kakao',
          options: {
            redirectTo: window.location.origin,
            queryParams: {
              scopes: 'profile_nickname, profile_image',
            },
          },
        });
        if (error) throw error;
      } else if (provider === 'keycloak') {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'keycloak',
          options: {
            redirectTo: window.location.origin,
            queryParams: {
              scopes: 'openid',
            },
          },
        });
        if (error) throw error;
      } else if (provider === 'azure') {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'azure',
          options: {
            redirectTo: window.location.origin,
            queryParams: {
              scopes: 'email',
            },
          },
        });
        if (error) throw error;
      } else if (provider === 'spotify') {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'spotify',
          options: {
            redirectTo: window.location.origin,
            queryParams: {
              scopes: 'user-read-email user-read-private',
            },
          },
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: provider as any,
          options: {
            redirectTo: window.location.origin,
          },
        });
        if (error) throw error;
      }
    } catch (error: any) {
      console.error('Error signing in with OAuth:', error);
      setAuthError(error.message || 'Failed to sign in');
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error: any) {
      console.error('Error signing out:', error);
      setAuthError(error.message || 'Failed to sign out');
    }
  };

  const value = {
    session,
    user,
    signInWithOAuth,
    signOut,
    loading,
    authError,
    clearAuthError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 