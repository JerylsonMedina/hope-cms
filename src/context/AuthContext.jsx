import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

// Create the context
const AuthContext = createContext()

// Provider component (wraps your app)
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [userType, setUserType] = useState(null)
  const [loading, setLoading] = useState(true)

  // Function to fetch user data from our 'user' table
  async function fetchUser(userId) {
    try {
      const { data, error } = await supabase
        .from('user')
        .select('user_type, username, email')
        .eq('userid', userId)
        .single()
      
      if (error) throw error
      
      setUser(data)
      setUserType(data.user_type)
    } catch (error) {
      console.error('Error fetching user:', error)
    } finally {
      setLoading(false)
    }
  }

  // Check if user is logged in when app starts
  useEffect(() => {
    // Get current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        fetchUser(session.user.id)
      } else {
        setLoading(false)
      }
    })

    // Listen for auth changes (login, logout)
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        fetchUser(session.user.id)
      } else {
        setUser(null)
        setUserType(null)
        setLoading(false)
      }
    })

    // Cleanup listener when component unmounts
    return () => listener?.subscription.unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, userType, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook to use auth context in any component
export function useAuth() {
  return useContext(AuthContext)
}