import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle2, ArrowRight, ShieldCheck, Clock, ExternalLink } from 'lucide-react';
import { saveCapturedLead } from '../utils/adminStore';

interface ContactPageProps {
  onOpenTrialModal: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onOpenTrialModal }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    restaurantName: '',
    role: 'Executive Chef',
    locations: '1 Kitchen',
    interest: '3-Month Free Trial Onboarding',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Save lead to local storage / admin store
    saveCapturedLead({
      type: 'contact_inquiry',
      email: formData.email,
      name: formData.fullName,
      phone: formData.phone,
      restaurantName: formData.restaurantName,
      role: formData.role,
      locations: formData.locations,
      interest: formData.interest,
      message: formData.message
    });

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="py-16 sm:py-24 bg-[#101524]">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Breadcrumb / Editorial Kicker */}
        <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-[#D4AF37] mb-4">
          <span>Concierge & Support</span>
          <span aria-hidden="true" className="text-[#4e4941]">·</span>
          <span>ChefLogic Operations Desk</span>
        </div>

        {/* Page Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif-culinary text-[#ede8df] leading-tight max-w-3xl">
          Speak with our culinary engineering specialists.
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-[#a7a29a] font-normal leading-relaxed max-w-3xl">
          Whether you operate a 40-seat neighborhood bistro or a multi-unit hospitality group, our hospitality concierges are ready to guide your kitchen onboarding for <strong className="text-[#ede8df] font-mono">https://cheflogic.ai.studio/</strong>.
        </p>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Info & Trust (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-6 bg-[#1A2238] border border-[#273352] rounded-lg">
              <span className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold block mb-4">
                Hospitality Concierge Desk
              </span>
              
              <div className="space-y-4 text-xs text-[#a7a29a]">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#ede8df] font-medium block">Direct Email</span>
                    <a href="mailto:concierge@cheflogic.ai" className="hover:underline text-[#D4AF37]">
                      concierge@cheflogic.ai
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#ede8df] font-medium block">Kitchen Emergency Hotline</span>
                    <span className="font-mono-num">+1 (800) 243-3564</span>
                    <span className="text-[11px] text-[#716d66] block">Mon–Sun 06:00 – 23:00 EST</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#ede8df] font-medium block">Culinary Labs & Offices</span>
                    <span>San Francisco, CA & Lyon, France</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-[#1A2238] border border-[#273352] rounded-lg">
              <span className="text-xs uppercase tracking-wider text-[#ede8df] font-semibold block mb-3">
                Immediate Platform Access
              </span>
              <p className="text-xs text-[#a7a29a] leading-relaxed mb-4">
                You do not need to wait for a scheduled sales call to explore ChefLogic. The live workspace is available right now:
              </p>
              <a
                href="https://cheflogic.ai.studio/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D4AF37] hover:underline"
              >
                <span>Launch cheflogic.ai.studio in New Tab</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="flex items-center gap-3 text-xs text-[#716d66]">
              <Clock className="w-4 h-4 text-[#D4AF37]" />
              <span>Average concierge response time under 15 minutes during service hours.</span>
            </div>
          </div>

          {/* Right Column: Contact & Booking Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#1A2238] border border-[#273352] rounded-lg p-6 sm:p-8">
            {submitted ? (
              <div className="py-12 text-center animate-in fade-in">
                <div className="w-14 h-14 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-serif-culinary text-[#ede8df] mb-2">
                  Inquiry Dispatched to Concierge
                </h3>
                <p className="text-sm text-[#a7a29a] max-w-md mx-auto leading-relaxed mb-6">
                  Thank you, <strong className="text-[#ede8df]">{formData.fullName}</strong>. A designated culinary account director has been assigned to <strong className="text-[#ede8df]">{formData.restaurantName || 'your restaurant'}</strong>.
                </p>
                <div className="p-4 bg-[#101524] border border-[#273352] rounded max-w-sm mx-auto text-xs text-[#D4AF37] mb-6">
                  Meanwhile, your 3-Month Free Trial pass code is: <strong className="font-mono text-white">CHEF3MONTHFREE</strong>
                </div>
                <button
                  onClick={() => setSubmitted(false)}
                  className="py-2.5 px-5 text-xs uppercase tracking-wider text-[#a7a29a] hover:text-[#ede8df] transition-colors"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-serif-culinary text-[#ede8df] mb-1">
                  Schedule a Kitchen Audit or Free Trial Setup
                </h3>
                <p className="text-xs text-[#88837a] mb-5">
                  Fill in your kitchen details and we will configure your 90-day complimentary access profile immediately.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#88837a] block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Chef Thomas Keller"
                      className="w-full bg-[#101524] border border-[#273352] rounded px-3 py-2 text-xs text-[#ede8df] placeholder-[#57534e] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#88837a] block mb-1">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="thomas@restaurant.com"
                      className="w-full bg-[#101524] border border-[#273352] rounded px-3 py-2 text-xs text-[#ede8df] placeholder-[#57534e] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#88837a] block mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 019-2834"
                      className="w-full bg-[#101524] border border-[#273352] rounded px-3 py-2 text-xs text-[#ede8df] placeholder-[#57534e] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#88837a] block mb-1">
                      Restaurant / Group Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.restaurantName}
                      onChange={(e) => setFormData({ ...formData, restaurantName: e.target.value })}
                      placeholder="The French Laundry"
                      className="w-full bg-[#101524] border border-[#273352] rounded px-3 py-2 text-xs text-[#ede8df] placeholder-[#57534e] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#88837a] block mb-1">
                      Your Kitchen Role
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full bg-[#101524] border border-[#273352] rounded px-3 py-2 text-xs text-[#ede8df] focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option>Executive Chef</option>
                      <option>Director of Food & Beverage</option>
                      <option>Head Chef / Sous Chef</option>
                      <option>Restaurant Owner / Partner</option>
                      <option>General Manager</option>
                      <option>Culinary Operations Director</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#88837a] block mb-1">
                      Kitchen Scope
                    </label>
                    <select
                      value={formData.locations}
                      onChange={(e) => setFormData({ ...formData, locations: e.target.value })}
                      className="w-full bg-[#101524] border border-[#273352] rounded px-3 py-2 text-xs text-[#ede8df] focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option>1 Kitchen (Independent)</option>
                      <option>2 - 4 Kitchens (Expanding)</option>
                      <option>5 - 15 Locations (Regional Group)</option>
                      <option>16+ Locations (Enterprise / Hotel)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#88837a] block mb-1">
                    Primary Operational Focus
                  </label>
                  <select
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    className="w-full bg-[#101524] border border-[#273352] rounded px-3 py-2 text-xs text-[#ede8df] focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option>3-Month Free Trial Onboarding</option>
                    <option>Food Cost Margin Reduction (Target 24-28%)</option>
                    <option>Perishable Waste & Spoilage Elimination</option>
                    <option>Menu Engineering Boston Matrix Audit</option>
                    <option>Optical Invoice Scanning (OCR) Integration</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#88837a] block mb-1">
                    Additional Kitchen Notes (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your current inventory process, POS system (Toast, Square, etc.), or specific cost challenges..."
                    className="w-full bg-[#101524] border border-[#273352] rounded px-3 py-2 text-xs text-[#ede8df] placeholder-[#57534e] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-4 text-xs font-semibold uppercase tracking-wider text-[#101524] bg-[#D4AF37] hover:bg-[#E5C358] active:scale-[0.99] rounded transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-[#D4AF37]/10"
                >
                  <span>{loading ? 'Transmitting Inquiries...' : 'Request Consultation & 3-Month Trial'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="text-center pt-2">
                  <span className="text-[11px] text-[#6b6760] flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#88837a]" />
                    Encrypted submission. Your culinary details remain strictly confidential.
                  </span>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
