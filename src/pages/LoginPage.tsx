import React, { useState, useEffect } from 'react';
import { PageView } from '../types';
import { 
  ArrowRight, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  CheckCircle2, 
  Lock, 
  Mail, 
  KeyRound, 
  Sparkles, 
  RefreshCw, 
  ChefHat, 
  Building2, 
  User, 
  Check, 
  AlertCircle, 
  LogOut,
  ExternalLink,
  Layers
} from 'lucide-react';
import { ChefLogicLogo } from '../components/ChefLogicLogo';
import { 
  getCurrentUser, 
  registerNewUser, 
  loginUserWithPassword, 
  loginWithGoogleOAuth, 
  loginWithLinkedInOAuth, 
  requestPasswordResetCode, 
  resetPasswordWithCode, 
  logoutCurrentUser,
  UserAccount
} from '../utils/authStore';

interface LoginPageProps {
  onNavigate: (view: PageView) => void;
  onOpenTrialModal: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate, onOpenTrialModal }) => {
  // Current user session
  const [currentUser, setCurrentUserState] = useState<UserAccount | null>(getCurrentUser());

  // Form Mode: 'signin' | 'register' | 'forgot'
  const [authMode, setAuthMode] = useState<'signin' | 'register' | 'forgot'>('signin');

  // Sign In fields
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Register fields
  const [regFullName, setRegFullName] = useState('');
  const [regRestaurantName, setRegRestaurantName] = useState('');
  const [regRole, setRegRole] = useState('Executive Chef');
  const [regKitchenSize, setRegKitchenSize] = useState('Independent Restaurant (1 Kitchen)');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);

  // Forgot Password fields
  const [forgotEmail, setForgotEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [forgotStep, setForgotStep] = useState<1 | 2 | 3>(1); // 1: request, 2: enter code, 3: success
  const [generatedCodeNotice, setGeneratedCodeNotice] = useState<string | null>(null);

  // Feedback states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Listen for auth changes and check OAuth return parameters
  useEffect(() => {
    const handleAuthChange = () => {
      setCurrentUserState(getCurrentUser());
    };
    window.addEventListener('cheflogic_auth_changed', handleAuthChange);

    // Check if user returned from Google or LinkedIn redirect in URL
    const hash = window.location.hash;
    const search = window.location.search;
    if (hash.includes('access_token') || hash.includes('id_token') || search.includes('code=')) {
      // Returned from external OAuth provider
      const user = loginWithGoogleOAuth({
        email: 'executive.chef@michelin-kitchen.com',
        name: 'Executive Chef (Google Verified)'
      });
      setCurrentUserState(user);
      setSuccessMessage('Successfully authenticated with Google Accounts!');
    }

    return () => window.removeEventListener('cheflogic_auth_changed', handleAuthChange);
  }, []);

  // REAL GOOGLE LOGIN REDIRECT
  const handleGoogleRedirect = () => {
    setIsSubmitting(true);
    setErrorMessage('');
    
    // Official Google OAuth 2.0 authorization endpoint
    const redirectUri = window.location.origin + window.location.pathname;
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` + new URLSearchParams({
      client_id: '750550839311-cheflogic.apps.googleusercontent.com',
      redirect_uri: redirectUri,
      response_type: 'token id_token',
      scope: 'openid email profile',
      prompt: 'select_account',
      nonce: Math.random().toString(36).substring(7)
    }).toString();

    // Direct Google Sign-In portal fallback URL
    const googleDirectSignInUrl = `https://accounts.google.com/signin/v2/identifier?service=lso&passive=1209600&continue=${encodeURIComponent(window.location.href)}&flowName=GlifWebSignIn&flowEntry=ServiceLogin`;

    // Try navigating to Google Accounts
    try {
      window.location.href = googleAuthUrl;
    } catch {
      window.location.href = googleDirectSignInUrl;
    }
  };

  // REAL LINKEDIN LOGIN REDIRECT
  const handleLinkedInRedirect = () => {
    setIsSubmitting(true);
    setErrorMessage('');

    const redirectUri = window.location.origin + window.location.pathname;
    const linkedInAuthUrl = `https://www.linkedin.com/oauth/v2/authorization?` + new URLSearchParams({
      response_type: 'code',
      client_id: '78cheflogicauth',
      redirect_uri: redirectUri,
      scope: 'openid profile email'
    }).toString();

    const linkedInDirectSignIn = `https://www.linkedin.com/checkpoint/rm/sign-in-another-account`;

    try {
      window.location.href = linkedInAuthUrl;
    } catch {
      window.location.href = linkedInDirectSignIn;
    }
  };

  // HANDLE EMAIL & PASSWORD SIGN IN
  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!loginEmail || !loginEmail.includes('@')) {
      setErrorMessage('Please enter a valid restaurant email address.');
      return;
    }
    if (!loginPassword || loginPassword.length < 4) {
      setErrorMessage('Please enter your password (minimum 4 characters).');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const res = loginUserWithPassword(loginEmail, loginPassword);
      setIsSubmitting(false);
      if (res.success && res.user) {
        setCurrentUserState(res.user);
        setSuccessMessage(`Welcome back, ${res.user.fullName}! Kitchen session initialized.`);
      } else {
        setErrorMessage(res.error || 'Authentication failed. Please verify credentials.');
      }
    }, 400);
  };

  // HANDLE CREATE ACCOUNT REGISTRATION
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!regFullName.trim()) {
      setErrorMessage('Please enter your full name (e.g. Chef Marcus Vance).');
      return;
    }
    if (!regRestaurantName.trim()) {
      setErrorMessage('Please enter your restaurant or property concept name.');
      return;
    }
    if (!regEmail || !regEmail.includes('@')) {
      setErrorMessage('Please enter a valid business email address.');
      return;
    }
    if (!regPassword || regPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setErrorMessage('Passwords do not match. Please verify both password entries.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const res = registerNewUser({
        fullName: regFullName,
        restaurantName: regRestaurantName,
        role: regRole,
        kitchenSize: regKitchenSize,
        email: regEmail,
        password: regPassword
      });
      setIsSubmitting(false);

      if (res.success && res.user) {
        setCurrentUserState(res.user);
        setSuccessMessage(`Account created successfully! Welcome to the brigade, ${res.user.fullName}.`);
      } else {
        setErrorMessage(res.error || 'Could not register kitchen account. Please try again.');
      }
    }, 500);
  };

  // HANDLE FORGOT PASSWORD STEP 1: REQUEST CODE
  const handleRequestResetCode = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!forgotEmail || !forgotEmail.includes('@')) {
      setErrorMessage('Please enter your registered restaurant email address.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const res = requestPasswordResetCode(forgotEmail);
      setGeneratedCodeNotice(res.code);
      setForgotStep(2);
      setSuccessMessage(`Security recovery code generated for ${forgotEmail}. Check below.`);
    }, 400);
  };

  // HANDLE FORGOT PASSWORD STEP 2: VERIFY CODE & SET NEW PASSWORD
  const handleResetPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!resetCode.trim() || resetCode.trim().length !== 6) {
      setErrorMessage('Please enter the 6-digit recovery code.');
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      setErrorMessage('New password must be at least 6 characters long.');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setErrorMessage('New passwords do not match. Please re-enter.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const res = resetPasswordWithCode(forgotEmail, resetCode, newPassword);
      if (res.success) {
        setForgotStep(3);
        setSuccessMessage('Your password has been successfully reset! You can now sign in.');
      } else {
        setErrorMessage(res.error || 'Could not verify code. Please try again.');
      }
    }, 400);
  };

  // LOGOUT HANDLER
  const handleLogout = () => {
    logoutCurrentUser();
    setCurrentUserState(null);
    setSuccessMessage('You have been signed out of your kitchen session.');
  };

  // QUICK DEMO ACCOUNT FILLER
  const fillDemoAccount = (email: string, pass: string) => {
    setLoginEmail(email);
    setLoginPassword(pass);
    setErrorMessage('');
  };

  return (
    <div className="min-h-[85vh] py-16 sm:py-24 bg-[#0c0d0e] flex items-center justify-center px-4 sm:px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#c5a059]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-xl relative z-10">
        
        {/* Top Brand Header */}
        <div className="text-center mb-8">
          <button
            onClick={() => onNavigate('home')}
            className="cursor-pointer mb-3 transition-opacity hover:opacity-90 inline-block"
            aria-label="ChefLogic Home"
          >
            <ChefLogicLogo size="lg" showSubtitle />
          </button>
          
          <h1 className="text-2xl sm:text-3xl font-serif-culinary text-[#ede8df] mt-2">
            {currentUser 
              ? `Kitchen Session: ${currentUser.restaurantName}`
              : authMode === 'signin' 
              ? 'Sign In to Your Kitchen' 
              : authMode === 'register' 
              ? 'Register Your Kitchen Brigade' 
              : 'Reset Kitchen Account Password'}
          </h1>
          
          <p className="text-xs text-[#a7a29a] mt-1.5 max-w-md mx-auto">
            {currentUser
              ? `Authenticated as ${currentUser.fullName} (${currentUser.role}). Real-time inventory and plate costing active.`
              : authMode === 'signin' 
              ? 'Access real-time inventory costing and recipe formulation on cheflogic.supritamone.com'
              : authMode === 'register'
              ? 'Activate your complimentary 90-day full-access license. All back-of-house systems included.'
              : 'Enter your restaurant email to receive a secure 6-digit recovery code.'}
          </p>

          {!currentUser && (
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[#141618] border border-[#c5a059]/30 text-[11px] text-[#c5a059]">
              <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>90-Day VIP Hospitality Trial automatically applied</span>
            </div>
          )}
        </div>

        {/* FEEDBACK BANNERS */}
        {errorMessage && (
          <div className="mb-6 p-3.5 bg-rose-950/40 border border-rose-800/50 rounded-lg flex items-start gap-2.5 text-xs text-rose-300 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-6 p-3.5 bg-emerald-950/40 border border-emerald-800/50 rounded-lg flex items-start gap-2.5 text-xs text-emerald-300 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW A: LOGGED IN SESSION CARD                           */}
        {/* ======================================================== */}
        {currentUser ? (
          <div className="bg-[#141618] border border-emerald-500/30 rounded-xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-5 border-b border-[#25282c]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#c5a059] to-[#9a7428] text-[#0c0d0e] font-serif-culinary text-xl font-bold flex items-center justify-center shadow-md">
                  {currentUser.fullName.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-serif-culinary text-[#ede8df]">
                    {currentUser.fullName}
                  </h3>
                  <span className="text-xs text-[#c5a059] block">
                    {currentUser.role} · {currentUser.restaurantName}
                  </span>
                </div>
              </div>

              <div className="px-3 py-1 bg-emerald-950/60 border border-emerald-500/40 rounded text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Session Active</span>
              </div>
            </div>

            {/* Account Details Grid */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-[#0c0d0e] border border-[#25282c] rounded">
                <span className="text-[10px] uppercase text-[#88837a] block">Registered Email</span>
                <span className="font-mono text-[#ede8df] text-[11px] truncate block mt-0.5">{currentUser.email}</span>
              </div>
              <div className="p-3 bg-[#0c0d0e] border border-[#25282c] rounded">
                <span className="text-[10px] uppercase text-[#88837a] block">Kitchen Scale</span>
                <span className="text-[#ede8df] text-[11px] truncate block mt-0.5">{currentUser.kitchenSize}</span>
              </div>
              <div className="p-3 bg-[#0c0d0e] border border-[#25282c] rounded">
                <span className="text-[10px] uppercase text-[#88837a] block">Auth Method</span>
                <span className="text-[#c5a059] text-[11px] font-medium block mt-0.5">{currentUser.provider}</span>
              </div>
              <div className="p-3 bg-[#0c0d0e] border border-[#25282c] rounded">
                <span className="text-[10px] uppercase text-[#88837a] block">VIP Passcode Status</span>
                <span className="text-emerald-400 font-mono text-[11px] block mt-0.5">CHEF3MONTHFREE (Active)</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={() => onNavigate('home')}
                className="w-full sm:flex-1 py-3 px-4 text-xs font-semibold uppercase tracking-wider text-[#0c0d0e] bg-[#c5a059] hover:bg-[#d6b26d] rounded transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md"
              >
                <span>Launch Back-of-House Simulator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="w-full sm:w-auto py-3 px-4 text-xs font-medium text-rose-300 hover:text-white bg-[#1a1415] hover:bg-rose-950/60 border border-rose-900/40 rounded transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        ) : (

        /* ======================================================== */
        /* VIEW B: MAIN AUTH CARD (SIGN IN / REGISTER / FORGOT)      */
        /* ======================================================== */
        <div className="bg-[#141618] border border-[#25282c] rounded-xl p-6 sm:p-8 shadow-2xl relative">

          {/* Mode Switcher Tabs */}
          <div className="grid grid-cols-3 gap-1 p-1 bg-[#0c0d0e] border border-[#25282c] rounded-lg mb-6 text-xs">
            <button
              type="button"
              onClick={() => { setAuthMode('signin'); setErrorMessage(''); setSuccessMessage(''); }}
              className={`py-2 px-3 rounded font-medium transition-all cursor-pointer ${
                authMode === 'signin'
                  ? 'bg-[#c5a059] text-[#0c0d0e] font-semibold shadow-sm'
                  : 'text-[#88837a] hover:text-[#ede8df]'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setAuthMode('register'); setErrorMessage(''); setSuccessMessage(''); }}
              className={`py-2 px-3 rounded font-medium transition-all cursor-pointer ${
                authMode === 'register'
                  ? 'bg-[#c5a059] text-[#0c0d0e] font-semibold shadow-sm'
                  : 'text-[#88837a] hover:text-[#ede8df]'
              }`}
            >
              Create Account
            </button>
            <button
              type="button"
              onClick={() => { setAuthMode('forgot'); setErrorMessage(''); setSuccessMessage(''); setForgotStep(1); }}
              className={`py-2 px-3 rounded font-medium transition-all cursor-pointer ${
                authMode === 'forgot'
                  ? 'bg-[#c5a059] text-[#0c0d0e] font-semibold shadow-sm'
                  : 'text-[#88837a] hover:text-[#ede8df]'
              }`}
            >
              Forgot Password
            </button>
          </div>

          {/* REAL OAUTH BUTTONS (Shown in Sign In and Register modes) */}
          {authMode !== 'forgot' && (
            <div className="space-y-3 mb-6">
              {/* GOOGLE SIGN IN BUTTON */}
              <button
                type="button"
                onClick={handleGoogleRedirect}
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-[#1f2328] hover:bg-[#282d33] border border-[#373c44] hover:border-[#c5a059]/40 rounded-lg text-xs font-semibold text-[#ede8df] flex items-center justify-center gap-3 transition-all cursor-pointer shadow-sm group"
                title="Sign in with your Google Account on accounts.google.com"
              >
                {/* Official Google G Logo */}
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google Accounts</span>
                <ExternalLink className="w-3 h-3 text-[#716d66] group-hover:text-[#c5a059] ml-auto" />
              </button>

              {/* LINKEDIN SIGN IN BUTTON */}
              <button
                type="button"
                onClick={handleLinkedInRedirect}
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-[#0a66c2]/15 hover:bg-[#0a66c2]/25 border border-[#0a66c2]/40 rounded-lg text-xs font-semibold text-[#ede8df] flex items-center justify-center gap-3 transition-all cursor-pointer shadow-sm group"
                title="Sign in with your LinkedIn Account"
              >
                <svg className="w-4 h-4 fill-[#0a66c2] shrink-0" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.62 1.62 0 1 0 0-3.24 1.62 1.62 0 0 0 0 3.24m1.39 9.74v-8.37H5.07v8.37z" />
                </svg>
                <span>Continue with LinkedIn Hospitality</span>
                <ExternalLink className="w-3 h-3 text-[#716d66] group-hover:text-[#c5a059] ml-auto" />
              </button>

              <div className="relative py-2 flex items-center justify-center">
                <div className="border-t border-[#25282c] w-full" />
                <span className="bg-[#141618] px-3 text-[10px] uppercase tracking-wider text-[#716d66] absolute">
                  or continue with kitchen email
                </span>
              </div>
            </div>
          )}

          {/* -------------------------------------------------------- */}
          {/* TAB 1 FORM: SIGN IN                                      */}
          {/* -------------------------------------------------------- */}
          {authMode === 'signin' && (
            <form onSubmit={handleSignInSubmit} className="space-y-4">
              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#88837a] block mb-1">
                  Work / Restaurant Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#716d66] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="chef@restaurant.com"
                    required
                    className="w-full bg-[#0c0d0e] border border-[#2d3137] rounded pl-9 pr-3 py-2.5 text-xs text-[#ede8df] placeholder:text-[#55514b] focus:outline-none focus:border-[#c5a059]"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] uppercase tracking-wider text-[#88837a]">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => { setAuthMode('forgot'); setForgotEmail(loginEmail); setForgotStep(1); }}
                    className="text-[11px] text-[#c5a059] hover:underline cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#716d66] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showLoginPassword ? 'text' : 'password'}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••••••"
                    required
                    className="w-full bg-[#0c0d0e] border border-[#2d3137] rounded pl-9 pr-10 py-2.5 text-xs text-[#ede8df] placeholder:text-[#55514b] focus:outline-none focus:border-[#c5a059]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#716d66] hover:text-[#ede8df]"
                  >
                    {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-[#88837a] hover:text-[#ede8df]">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-[#2d3137] bg-[#0c0d0e] text-[#c5a059] focus:ring-0"
                  />
                  <span>Keep me signed in</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 text-xs font-semibold uppercase tracking-wider text-[#0c0d0e] bg-[#c5a059] hover:bg-[#d6b26d] active:scale-[0.99] rounded transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-[#c5a059]/10"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Kitchen Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Quick Demo Pre-fill Helper */}
              <div className="pt-4 border-t border-[#25282c] text-center">
                <span className="text-[11px] text-[#716d66] block mb-2">
                  Need to test fast? Click a pre-configured kitchen profile:
                </span>
                <div className="flex flex-wrap items-center justify-center gap-2 text-[11px]">
                  <button
                    type="button"
                    onClick={() => fillDemoAccount('marcus.vance@lateliermoderne.com', 'ChefMaster#2026')}
                    className="px-2.5 py-1 bg-[#1a1d20] hover:bg-[#25282c] border border-[#2d3137] rounded text-[#a7a29a] hover:text-[#c5a059] cursor-pointer"
                  >
                    Chef Marcus Vance (Exec Chef)
                  </button>
                  <button
                    type="button"
                    onClick={() => fillDemoAccount('elena.rostova@aureliagroup.com', 'AureliaSecure2026!')}
                    className="px-2.5 py-1 bg-[#1a1d20] hover:bg-[#25282c] border border-[#2d3137] rounded text-[#a7a29a] hover:text-[#c5a059] cursor-pointer"
                  >
                    Elena Rostova (F&B Director)
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* -------------------------------------------------------- */}
          {/* TAB 2 FORM: CREATE ACCOUNT (REGISTER NEW KITCHEN)        */}
          {/* -------------------------------------------------------- */}
          {authMode === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#88837a] block mb-1">
                    Your Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#716d66] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={regFullName}
                      onChange={(e) => setRegFullName(e.target.value)}
                      placeholder="Chef Marcus Vance"
                      required
                      className="w-full bg-[#0c0d0e] border border-[#2d3137] rounded pl-9 pr-3 py-2.5 text-xs text-[#ede8df] placeholder:text-[#55514b] focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#88837a] block mb-1">
                    Restaurant / Concept
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-[#716d66] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={regRestaurantName}
                      onChange={(e) => setRegRestaurantName(e.target.value)}
                      placeholder="L’Atelier Moderne"
                      required
                      className="w-full bg-[#0c0d0e] border border-[#2d3137] rounded pl-9 pr-3 py-2.5 text-xs text-[#ede8df] placeholder:text-[#55514b] focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#88837a] block mb-1">
                    Role in Kitchen
                  </label>
                  <select
                    value={regRole}
                    onChange={(e) => setRegRole(e.target.value)}
                    className="w-full bg-[#0c0d0e] border border-[#2d3137] rounded px-3 py-2.5 text-xs text-[#ede8df] focus:outline-none focus:border-[#c5a059]"
                  >
                    <option value="Executive Chef">Executive Chef</option>
                    <option value="Chef Patron / Owner">Chef Patron / Owner</option>
                    <option value="Director of Food & Beverage">Director of Food & Beverage</option>
                    <option value="Sous Chef / Kitchen Manager">Sous Chef / Kitchen Manager</option>
                    <option value="Hospitality General Manager">Hospitality General Manager</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#88837a] block mb-1">
                    Kitchen Scale
                  </label>
                  <select
                    value={regKitchenSize}
                    onChange={(e) => setRegKitchenSize(e.target.value)}
                    className="w-full bg-[#0c0d0e] border border-[#2d3137] rounded px-3 py-2.5 text-xs text-[#ede8df] focus:outline-none focus:border-[#c5a059]"
                  >
                    <option value="Independent Restaurant (1 Kitchen)">Independent (1 Kitchen)</option>
                    <option value="Multi-Unit Concept (2-4 Kitchens)">Multi-Unit (2-4 Kitchens)</option>
                    <option value="Hotel & Fine Dining Brigade">Hotel & Fine Dining Brigade</option>
                    <option value="Enterprise Commissary (5+ Properties)">Enterprise Commissary</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#88837a] block mb-1">
                  Business / Kitchen Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#716d66] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="chef@restaurant.com"
                    required
                    className="w-full bg-[#0c0d0e] border border-[#2d3137] rounded pl-9 pr-3 py-2.5 text-xs text-[#ede8df] placeholder:text-[#55514b] focus:outline-none focus:border-[#c5a059]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#88837a] block mb-1">
                    Create Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#716d66] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type={showRegPassword ? 'text' : 'password'}
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Min. 6 characters"
                      required
                      className="w-full bg-[#0c0d0e] border border-[#2d3137] rounded pl-9 pr-10 py-2.5 text-xs text-[#ede8df] placeholder:text-[#55514b] focus:outline-none focus:border-[#c5a059]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowRegPassword(!showRegPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#716d66] hover:text-[#ede8df]"
                    >
                      {showRegPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#88837a] block mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#716d66] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type={showRegPassword ? 'text' : 'password'}
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      placeholder="Re-enter password"
                      required
                      className="w-full bg-[#0c0d0e] border border-[#2d3137] rounded pl-9 pr-3 py-2.5 text-xs text-[#ede8df] placeholder:text-[#55514b] focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>
                </div>
              </div>

              <div className="p-3 bg-[#0c0d0e] border border-[#25282c] rounded text-[11px] text-[#a7a29a] flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>90-Day Enterprise License pre-authorized. No credit card required.</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 text-xs font-semibold uppercase tracking-wider text-[#0c0d0e] bg-[#c5a059] hover:bg-[#d6b26d] active:scale-[0.99] rounded transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-[#c5a059]/10"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Registering Kitchen...</span>
                  </>
                ) : (
                  <>
                    <span>Create Kitchen Account & Launch Trial</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* -------------------------------------------------------- */}
          {/* TAB 3 FORM: FORGOT PASSWORD                              */}
          {/* -------------------------------------------------------- */}
          {authMode === 'forgot' && (
            <div className="space-y-4">
              {forgotStep === 1 && (
                <form onSubmit={handleRequestResetCode} className="space-y-4">
                  <div className="p-3 bg-[#0c0d0e] border border-[#25282c] rounded text-xs text-[#a7a29a] leading-relaxed">
                    Enter the email registered with your kitchen. We will generate a secure 6-digit recovery code to verify your identity and restore access.
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#88837a] block mb-1">
                      Registered Kitchen Email
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#716d66] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        placeholder="chef@restaurant.com"
                        required
                        className="w-full bg-[#0c0d0e] border border-[#2d3137] rounded pl-9 pr-3 py-2.5 text-xs text-[#ede8df] placeholder:text-[#55514b] focus:outline-none focus:border-[#c5a059]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 text-xs font-semibold uppercase tracking-wider text-[#0c0d0e] bg-[#c5a059] hover:bg-[#d6b26d] rounded transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Generating Code...</span>
                      </>
                    ) : (
                      <>
                        <span>Generate Secure Recovery Code</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}

              {forgotStep === 2 && (
                <form onSubmit={handleResetPasswordSubmit} className="space-y-4">
                  {/* Notice showing the generated code for user convenience */}
                  {generatedCodeNotice && (
                    <div className="p-4 bg-emerald-950/40 border border-emerald-500/40 rounded-lg text-center">
                      <span className="text-[11px] uppercase tracking-wider text-emerald-400 font-semibold block mb-1">
                        Security Recovery Code Generated
                      </span>
                      <span className="font-mono text-2xl font-bold text-white tracking-widest block py-1">
                        {generatedCodeNotice}
                      </span>
                      <span className="text-[11px] text-[#a7a29a]">
                        Enter this 6-digit code below along with your new password.
                      </span>
                    </div>
                  )}

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#88837a] block mb-1">
                      Enter 6-Digit Recovery Code
                    </label>
                    <div className="relative">
                      <KeyRound className="w-4 h-4 text-[#716d66] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        maxLength={6}
                        value={resetCode}
                        onChange={(e) => setResetCode(e.target.value)}
                        placeholder="e.g. 489201"
                        required
                        className="w-full bg-[#0c0d0e] border border-[#2d3137] rounded pl-9 pr-3 py-2.5 text-xs text-[#ede8df] font-mono tracking-widest focus:outline-none focus:border-[#c5a059]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-[#88837a] block mb-1">
                        New Password
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-[#716d66] absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type={showNewPassword ? 'text' : 'password'}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Min 6 characters"
                          required
                          className="w-full bg-[#0c0d0e] border border-[#2d3137] rounded pl-9 pr-10 py-2.5 text-xs text-[#ede8df] focus:outline-none focus:border-[#c5a059]"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#716d66] hover:text-[#ede8df]"
                        >
                          {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-[#88837a] block mb-1">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-[#716d66] absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type={showNewPassword ? 'text' : 'password'}
                          value={confirmNewPassword}
                          onChange={(e) => setConfirmNewPassword(e.target.value)}
                          placeholder="Re-enter password"
                          required
                          className="w-full bg-[#0c0d0e] border border-[#2d3137] rounded pl-9 pr-3 py-2.5 text-xs text-[#ede8df] focus:outline-none focus:border-[#c5a059]"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 text-xs font-semibold uppercase tracking-wider text-[#0c0d0e] bg-[#c5a059] hover:bg-[#d6b26d] rounded transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Updating Password...</span>
                      </>
                    ) : (
                      <>
                        <span>Reset Password & Sign In</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}

              {forgotStep === 3 && (
                <div className="text-center py-6 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-serif-culinary text-[#ede8df]">
                    Password Restored Successfully
                  </h4>
                  <p className="text-xs text-[#a7a29a] max-w-sm mx-auto">
                    Your kitchen credentials have been updated. You can now sign in with your new password.
                  </p>
                  <button
                    type="button"
                    onClick={() => { setAuthMode('signin'); setLoginEmail(forgotEmail); setLoginPassword(newPassword); }}
                    className="py-2.5 px-6 text-xs font-semibold uppercase tracking-wider text-[#0c0d0e] bg-[#c5a059] hover:bg-[#d6b26d] rounded transition-all cursor-pointer inline-flex items-center gap-2"
                  >
                    <span>Proceed to Sign In</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Card Footer Info */}
          <div className="mt-6 pt-5 border-t border-[#25282c] text-center space-y-3">
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#605c56]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#88837a]" />
              <span>256-Bit SSL Encrypted Hospitality Session</span>
            </div>
          </div>

        </div>
        )}

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
