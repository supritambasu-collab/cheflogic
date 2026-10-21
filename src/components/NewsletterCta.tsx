import React, { useState } from 'react';
import { Mail, CheckCircle2, Download, ArrowRight, ShieldCheck, BookOpen } from 'lucide-react';
import { triggerPlaybookPdfDownload } from '../utils/generatePdf';
import { saveCapturedLead } from '../utils/adminStore';

export const NewsletterCta: React.FC = () => {
  const [email, setEmail] = useState('');
  const [restaurantName, setRestaurantName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid restaurant or corporate email address.');
      return;
    }
    setErrorMsg('');
    setStatus('loading');

    // Save lead to local storage / admin store
    saveCapturedLead({
      type: 'newsletter',
      email: email.trim(),
      restaurantName: restaurantName.trim()
    });

    setTimeout(() => {
      setStatus('success');
      // Trigger genuine PDF download immediately upon subscription
      triggerPlaybookPdfDownload();
    }, 600);
  };

  return (
    <section className="py-20 bg-[#101524] border-b border-[#273352] relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-0 bottom-0 w-96 h-96 bg-[#0F382C]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-[#1A2238] border border-[#273352] rounded-xl p-8 sm:p-12 lg:p-16 relative shadow-2xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Narrative (7 cols) */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-[#D4AF37] mb-3">
                <BookOpen className="w-4 h-4" />
                <span>The Executive Kitchen Dispatch</span>
                <span aria-hidden="true" className="text-[#64748b]">·</span>
                <span>Weekly Intelligence</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-culinary text-white leading-tight">
                Get the weekly food cost & menu engineering playbook.
              </h2>
              
              <p className="mt-4 text-sm sm:text-base text-[#cbd5e1] leading-relaxed max-w-xl">
                Read by over 14,000 executive chefs, culinary directors, and restaurant owners. Every Tuesday morning: real wholesale protein price forecasts, seasonal yield optimization guides, and high-margin dish breakdowns.
              </p>

              {/* Free Gift Perk */}
              <button
                type="button"
                onClick={() => triggerPlaybookPdfDownload()}
                className="mt-6 flex items-center gap-3 text-xs text-[#D4AF37] hover:text-white bg-[#0F382C] hover:bg-[#154b3b] border border-[#1a5c48] hover:border-[#D4AF37]/50 p-3 rounded max-w-lg transition-all cursor-pointer text-left shadow-sm"
                title="Click to Download PDF Guidebook"
              >
                <Download className="w-4 h-4 shrink-0 text-[#D4AF37]" />
                <span>
                  <strong className="text-white">Instant Download Included:</strong> "The 2026 Restaurant Margin & Recipe Engineering Handbook" (14-Page Complete Executive PDF Master Playbook).
                </span>
              </button>
            </div>

            {/* Right Form (5 cols) */}
            <div className="lg:col-span-5 bg-[#101524] border border-[#273352] rounded-lg p-6 sm:p-8 shadow-xl">
              {status === 'success' ? (
                <div className="text-center py-4 animate-in fade-in">
                  <div className="w-12 h-12 rounded-full bg-[#0F382C] border border-[#D4AF37]/50 text-[#D4AF37] flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-serif-culinary text-white mb-2">
                    Welcome to the Brigade.
                  </h4>
                  <p className="text-xs text-[#cbd5e1] leading-relaxed mb-6">
                    A confirmation email and your instant download link for the <strong className="text-white">2026 Margin Playbook</strong> have been dispatched to <span className="font-mono text-[#D4AF37]">{email}</span>.
                  </p>
                  <button
                    type="button"
                    onClick={() => triggerPlaybookPdfDownload()}
                    className="inline-flex items-center gap-2 py-2.5 px-5 text-xs font-bold uppercase tracking-wider text-[#1A2238] bg-[#D4AF37] hover:bg-[#E5C358] active:scale-[0.98] rounded transition-all cursor-pointer shadow-md"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF Guidebook (Instant)</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <span className="text-xs uppercase tracking-wider text-white font-semibold block mb-2">
                    Subscribe for Free Weekly Briefing
                  </span>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#94a3b8] block mb-1">
                      Work / Restaurant Email
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#94a3b8] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="chef@restaurant.com"
                        className="w-full bg-[#1A2238] border border-[#273352] rounded pl-9 pr-3 py-2.5 text-xs text-white placeholder-[#64748b] focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#94a3b8] block mb-1">
                      Restaurant / Concept Name (Optional)
                    </label>
                    <input
                      type="text"
                      value={restaurantName}
                      onChange={(e) => setRestaurantName(e.target.value)}
                      placeholder="e.g. L'Atelier Modern"
                      className="w-full bg-[#1A2238] border border-[#273352] rounded px-3 py-2.5 text-xs text-white placeholder-[#64748b] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  {errorMsg && (
                    <p className="text-xs text-rose-400">{errorMsg}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full py-3.5 px-4 text-xs font-bold uppercase tracking-wider text-[#1A2238] bg-[#D4AF37] hover:bg-[#E5C358] active:scale-[0.99] rounded transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-[#D4AF37]/20"
                  >
                    <span>{status === 'loading' ? 'Securing Access...' : 'Subscribe & Download Guidebook'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="pt-2 text-center">
                    <span className="text-[11px] text-[#94a3b8] flex items-center justify-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      Zero spam. Unsubscribe anytime in 1 click.
                    </span>
                  </div>
                </form>
              )}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
