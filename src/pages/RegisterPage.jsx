import { useState } from 'react'
import { supabase } from '../lib/supabase'

function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })

      console.log('Response:', { data, error })

      if (error) {
        setMessage('❌ ' + error.message)
      } else {
        setMessage('✅ Check your email to confirm your account!')
        setEmail('')
        setPassword('')
      }
    } catch (err) {
      setMessage('❌ ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignUp = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    })
    if (error) setMessage('❌ ' + error.message)
  }

  const isSuccess = message.startsWith('✅')
  const isError = message.startsWith('❌')

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{
        background:
          'radial-gradient(ellipse at 60% 20%, #e0e7ff 0%, #f8faff 40%, #eef2ff 100%)',
      }}
    >
      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-indigo-100 border border-indigo-50 p-8">

        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-600 rounded-xl mb-4 shadow-md shadow-indigo-200">
            <span className="text-white text-xl font-black">H</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            Hope <span className="text-indigo-600">CMS</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">Create your account</p>
        </div>

        {/* Google Button */}
        <button
          onClick={handleGoogleSignUp}
          type="button"
          className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 font-medium text-sm py-3 px-4 rounded-xl transition-all duration-150 shadow-sm mb-6"
        >
          {/* Google G Logo SVG */}
          <svg width="18" height="18" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path fill="#EA4335" d="M24 9.5c3.14 0 5.95 1.08 8.17 2.85l6.09-6.09C34.46 3.09 29.5 1 24 1 14.82 1 7.07 6.48 3.64 14.22l7.08 5.5C12.4 13.72 17.73 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.1 24.5c0-1.64-.15-3.22-.42-4.75H24v9h12.42c-.54 2.9-2.18 5.36-4.64 7.01l7.19 5.59C43.18 37.13 46.1 31.27 46.1 24.5z"/>
            <path fill="#FBBC05" d="M10.72 28.28A14.6 14.6 0 0 1 9.5 24c0-1.49.26-2.93.72-4.28l-7.08-5.5A23.93 23.93 0 0 0 0 24c0 3.87.93 7.53 2.56 10.78l8.16-6.5z"/>
            <path fill="#34A853" d="M24 47c6.48 0 11.93-2.14 15.9-5.82l-7.19-5.59C30.6 37.4 27.47 38.5 24 38.5c-6.27 0-11.6-4.22-13.28-9.93l-8.16 6.5C6.08 42.73 14.49 47 24 47z"/>
          </svg>
          Sign up with Google
        </button>

        {/* OR Divider */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-slate-200"></div>
          <span className="text-xs text-slate-400 font-medium uppercase tracking-widest">or</span>
          <div className="flex-1 h-px bg-slate-200"></div>
        </div>

        {/* Message Alert */}
        {message && (
          <div
            className={`flex items-start gap-3 text-sm rounded-xl px-4 py-3 mb-5 border ${
              isSuccess
                ? 'bg-green-50 border-green-200 text-green-700'
                : 'bg-red-50 border-red-200 text-red-700'
            }`}
          >
            <span className="mt-0.5 text-base">{isSuccess ? '✅' : '⚠️'}</span>
            <span>{message.replace('✅ ', '').replace('❌ ', '')}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-4">

          {/* Email Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5 ml-1">
              Email Address
            </label>
            <div className="group relative border border-slate-200 rounded-xl focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 transition-all duration-150 bg-white">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full py-3 px-4 text-sm text-slate-800 bg-transparent rounded-xl focus:outline-none placeholder-slate-300"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5 ml-1">
              Choose Password
            </label>
            <div className="group relative border border-slate-200 rounded-xl focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 transition-all duration-150 bg-white">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                placeholder="••••••••"
                className="w-full py-3 px-4 text-sm text-slate-800 bg-transparent rounded-xl focus:outline-none placeholder-slate-300"
              />
            </div>
            <p className="text-xs text-slate-400 mt-1.5 ml-1">
              Must be at least 6 characters.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold text-sm py-3 px-4 rounded-xl transition-all duration-150 shadow-md shadow-indigo-200 flex items-center justify-center gap-2 mt-2"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                Creating Account...
              </>
            ) : (
              'Create Account'
            )}
          </button>

        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-slate-400">
          Already have an account?{' '}
          <a href="/" className="text-indigo-600 font-bold hover:text-indigo-700 hover:underline">
            Sign in here
          </a>
        </p>

      </div>
    </div>
  )
}

export default RegisterPage