import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [userType, setUserType] = useState(null)
  const [loading, setLoading] = useState(true)

  async function fetchUser(email) {
    try {
      const { data, error } = await supabase
        .from('user')
        .select('user_type, record_status')
        .eq('userid', email)        // ← userid stores email, not UUID
        .single()

      if (error) throw error

      setUser(data)
      setUserType(data.user_type)
    } catch (error) {
      console.error('Error fetching user:', error)
      setUser(null)
      setUserType(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        fetchUser(session.user.email)   // ← was session.user.id
      } else {
        setLoading(false)
      }
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        fetchUser(session.user.email)   // ← was session.user.id
      } else {
        setUser(null)
        setUserType(null)
        setLoading(false)
      }
    })

    return () => listener?.subscription.unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, userType, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}