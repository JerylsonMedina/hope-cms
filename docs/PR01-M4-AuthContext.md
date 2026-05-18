# M4 - AuthContext Implementation (PR-01)

## Author: [ERANO TANO]
## Role: Rights & Authentication Specialist


### Overview
As the M4 team member, I am responsible for implementing the authentication context that provides session management and currentUser state to the entire application.

### My Implementation

#### File Created: `src/contexts/AuthContext.jsx`

Below is the code I wrote for this PR:

```javascript
import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../lib/supabaseClient';

const AuthContext = createContext({});

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Sign out error:', error.message);
    setCurrentUser(null);
  };

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        const { data: userRow } = await supabase
          .from('user')
          .select('user_type, record_status, username')
          .eq('userId', session.user.id)
          .single();

        setCurrentUser({
          id: session.user.id,
          email: session.user.email,
          user_type: userRow?.user_type || 'USER',
          record_status: userRow?.record_status || 'INACTIVE',
          username: userRow?.username || session.user.email?.split('@')[0],
        });
      }
      setLoading(false);
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          const { data: userRow } = await supabase
            .from('user')
            .select('user_type, record_status, username')
            .eq('userId', session.user.id)
            .single();

          setCurrentUser({
            id: session.user.id,
            email: session.user.email,
            user_type: userRow?.user_type || 'USER',
            record_status: userRow?.record_status || 'INACTIVE',
            username: userRow?.username || session.user.email?.split('@')[0],
          });
        } else if (event === 'SIGNED_OUT') {
          setCurrentUser(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const value = {
    currentUser,
    loading,
    signOut,
    isAuthenticated: !!currentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}