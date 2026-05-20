import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

function AuthCallbackPage() {
  const navigate = useNavigate()
  const [message, setMessage] = useState('Processing login...')
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const handleCallback = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()
      
      if (error) {
        setMessage('Authentication error. Please try again.')
        setIsError(true)
        setTimeout(() => navigate('/'), 3000)
        return
      }
      
      if (session) {
        const { data: userData } = await supabase
          .from('user')
          .select('record_status')
          .eq('userid', session.user.id)
          .single()
        
        if (userData?.record_status !== 'ACTIVE') {
          await supabase.auth.signOut()
          setMessage('Your account is pending activation. Please contact admin.')
          setIsError(true)
          setTimeout(() => navigate('/'), 3000)
        } else {
          setMessage('Login successful! Redirecting...')
          setTimeout(() => navigate('/customers'), 1000)
        }
      } else {
        setMessage('No session found. Redirecting to login...')
        setIsError(true)
        setTimeout(() => navigate('/'), 2000)
      }
    }
    
    handleCallback()
  }, [navigate])

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className={`text-gray-600 ${isError ? 'text-red-500' : ''}`}>{message}</p>
      </div>
    </div>
  )
}

export default AuthCallbackPage