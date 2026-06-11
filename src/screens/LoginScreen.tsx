import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { supabase } from '../lib/supabaseClient';

type AuthMode = 'login' | 'signup';

const LoginScreen: React.FC = () => {
  const { setScreen } = useStore();
  const [mode, setMode] = useState<AuthMode>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const handleLogin = async () => {
    setError('');
    if (!email.trim()) { setError('Email is required'); return; }
    if (!password.trim()) { setError('Password is required'); return; }

    setLoading(true);
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (authError) {
      setError('Invalid email or password. Please try again.');
    } else {
      setScreen('personal');
    }
  };

  const handleSignup = async () => {
    setError('');
    setSuccessMsg('');
    if (!fullName.trim()) { setError('Full name is required'); return; }
    if (!email.trim()) { setError('Email is required'); return; }
    if (!password.trim()) { setError('Password is required'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters'); return; }
    if (password !== confirmPassword) { setError('Passwords do not match'); return; }

    setLoading(true);
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
    setLoading(false);

    if (authError) {
      setError(authError.message);
    } else {
      setSuccessMsg('Account created! Check your email to confirm your account, then log in.');
      setMode('login');
      setPassword('');
      setConfirmPassword('');
      setFullName('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      mode === 'login' ? handleLogin() : handleSignup();
    }
  };

  const eyeOpen = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );

  const eyeClosed = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="w-full max-w-[600px] bg-white rounded-2xl shadow-2xl p-10 animate-fadeIn">

        {/* Dark banner */}
        <div className="bg-dark rounded-lg p-6 mb-8 border-l-4 border-gold">
          <div className="text-center">
            <div className="text-5xl mb-3">🎓</div>
            <h1 className="font-display font-bold text-[28px] text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
              {mode === 'login' ? 'Login to Enroll' : 'Create Account'}
            </h1>
            <p className="text-gray-400 text-sm mt-2">
              {mode === 'login' ? 'Sign in to access your enrollment portal' : 'Register to start your enrollment'}
            </p>
          </div>
        </div>

        <div className="space-y-5">

          {/* Full Name — signup only */}
          {mode === 'signup' && (
            <div>
              <label className="block text-[11px] uppercase tracking-[0.1em] text-gray-500 font-semibold mb-[6px]">
                Full Name
              </label>
              <input
                type="text"
                className="input-field"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => { setFullName(e.target.value); setError(''); }}
                onKeyDown={handleKeyDown}
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-[11px] uppercase tracking-[0.1em] text-gray-500 font-semibold mb-[6px]">
              Email Address
            </label>
            <input
              type="email"
              className="input-field"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              onKeyDown={handleKeyDown}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-[11px] uppercase tracking-[0.1em] text-gray-500 font-semibold mb-[6px]">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="input-field pr-12"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                onKeyDown={handleKeyDown}
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? eyeClosed : eyeOpen}
              </button>
            </div>
          </div>

          {/* Confirm Password — signup only */}
          {mode === 'signup' && (
            <div>
              <label className="block text-[11px] uppercase tracking-[0.1em] text-gray-500 font-semibold mb-[6px]">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  className="input-field pr-12"
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => { setConfirmPassword(e.target.value); setError(''); }}
                  onKeyDown={handleKeyDown}
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? eyeClosed : eyeOpen}
                </button>
              </div>
            </div>
          )}

          {/* Error message */}
          {error && (
            <p className="text-[#dc2626] text-xs mt-1">{error}</p>
          )}

          {/* Success message */}
          {successMsg && (
            <p className="text-green-600 text-xs mt-1">{successMsg}</p>
          )}

          {/* Divider */}
          <div className="w-full h-px bg-gold/30" />

          {/* Submit button */}
          <button
            onClick={mode === 'login' ? handleLogin : handleSignup}
            disabled={loading}
            className="w-full h-[52px] bg-dark text-white uppercase font-bold tracking-wider rounded-lg hover:bg-gold hover:text-black transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Create Account'}
          </button>

          {/* Toggle between login and signup */}
          <p className="text-center text-sm text-gray-500">
            {mode === 'login' ? (
              <>Don't have an account?{' '}
                <button
                  className="text-dark font-semibold hover:text-gold transition-colors"
                  onClick={() => { setMode('signup'); setError(''); setSuccessMsg(''); }}
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>Already have an account?{' '}
                <button
                  className="text-dark font-semibold hover:text-gold transition-colors"
                  onClick={() => { setMode('login'); setError(''); setSuccessMsg(''); }}
                >
                  Sign In
                </button>
              </>
            )}
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-6">
          EduEnroll &copy; 2026 | Student Enrollment Portal
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
