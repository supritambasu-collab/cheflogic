import React, { useState } from 'react';
import { Mail, CheckCircle2, Download, ArrowRight, ShieldCheck, BookOpen } from 'lucide-react';

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

    setTimeout(() => {
      setStatus('success');
    }, 600);
  };

  return (
    <section className="py-20 bg-[#0c0d0e] border-b border-[#1f2226] relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-[#c5a059]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-[#141618] border border-[#25282c] rounded-xl p-8 sm:p-12 lg:p-16 relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Narrative (7 cols) */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-[#c5a059] mb-3">
                <BookOpen className="w-4 h-4" />
                <span>The Executive Kitchen Dispatch</span>
                <span aria-hidden="true" className="text-[#4e4941]">·</span>
                <span>Weekly Intelligence</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-culinary text-[#ede8df] leading-tight">
                Get the weekly food cost & menu engineering playbook.
              </h2>
              
              <p className="mt-4 text-sm sm:text-base text-[#a7a29a] leading-relaxed max-w-xl">
                Read by over 14,000 executive chefs, culinary directors, and restaurant owners. Every Tuesday morning: real wholesale protein price forecasts, seasonal yield optimization guides, and high-margin dish breakdowns.
              </p>

              {/* Free Gift Perk */}
              <div className="mt-6 flex items-center gap-3 text-xs text-[#c5a059] bg-[#0c0d0e] border border-[#25282c] p-3 rounded max-w-lg">
                <Download className="w-4 h-4 shrink-0 text-[#c5a059]" />
                <span>
                  <strong>Instant Download Included:</strong> "The 2026 Restaurant Margin & Recipe Engineering Handbook" (48-page executive PDF).
                </span>
              </div>
            </div>

            {/* Right Form (5 cols) */}
            <div className="lg:col-span-5 bg-[#0c0d0e] border border-[#25282c] rounded-lg p-6 sm:p-8">
              {status === 'success' ? (
                <div className="text-center py-4 animate-in fade-in">
                  <div className="w-12 h-12 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-serif-culinary text-[#ede8df] mb-2">
                    Welcome to the Brigade.
                  </h4>
                  <p className="text-xs text-[#a7a29a] leading-relaxed mb-6">
                    A confirmation email and your instant download link for the <strong className="text-[#ede8df]">2026 Margin Playbook</strong> have been dispatched to <span className="font-mono text-[#c5a059]">{email}</span>.
                  </p>
                  <a
                    href="#download"
                    onClick={(e) => {
                      e.preventDefault();
                      alert("Download initiated: ChefLogic_2026_Culinary_Margin_Playbook.pdf");
                    }}
                    className="inline-flex items-center gap-2 py-2.5 px-5 text-xs font-semibold uppercase tracking-wider text-[#0c0d0e] bg-[#c5a059] hover:bg-[#d6b26d] rounded transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF Guidebook</span>
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <span className="text-xs uppercase tracking-wider text-[#ede8df] font-semibold block mb-2">
                    Subscribe for Free Weekly Briefing
                  </span>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#88837a] block mb-1">
                      Work / Restaurant Email
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#716d66] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="chef@restaurant.com"
                        className="w-full bg-[#141618] border border-[#2d3137] rounded pl-9 pr-3 py-2.5 text-xs text-[#ede8df] placeholder-[#57534e] focus:outline-none focus:border-[#c5a059]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#88837a] block mb-1">
                      Restaurant / Concept Name (Optional)
                    </label>
                    <input
                      type="text"
                      value={restaurantName}
                      onChange={(e) => setRestaurantName(e.target.value)}
                      placeholder="e.g. L'Atelier Modern"
                      className="w-full bg-[#141618] border border-[#2d3137] rounded px-3 py-2.5 text-xs text-[#ede8df] placeholder-[#57534e] focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>

                  {errorMsg && (
                    <p className="text-xs text-rose-400">{errorMsg}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full py-3.5 px-4 text-xs font-semibold uppercase tracking-wider text-[#0c0d0e] bg-[#c5a059] hover:bg-[#d6b26d] active:scale-[0.99] rounded transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-[#c5a059]/10"
                  >
                    <span>{status === 'loading' ? 'Securing Access...' : 'Subscribe & Download Guidebook'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="pt-2 text-center">
                    <span className="text-[11px] text-[#6b6760] flex items-center justify-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#88837a]" />
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
