import React, { useState } from 'react';
import { ChefHat, Leaf, Target, Award, HeartHandshake, ShieldCheck, ArrowRight } from 'lucide-react';
import { CULINARY_TEAM_IMG } from '../assets/images';

interface AboutPageProps {
  onOpenTrialModal: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenTrialModal }) => {
  const [teamImg, setTeamImg] = useState<string>(CULINARY_TEAM_IMG);
  return (
    <div className="py-16 sm:py-24 bg-[#0c0d0e]">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Editorial Breadcrumb / Subtitle */}
        <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-[#c5a059] mb-4">
          <span>Our Story & Mission</span>
          <span aria-hidden="true" className="text-[#4e4941]">·</span>
          <span>Founded by Chefs, Engineered for Margins</span>
        </div>

        {/* Page Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif-culinary text-[#ede8df] leading-tight max-w-3xl">
          We believe high culinary art and back-of-house financial discipline belong together.
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-[#a7a29a] font-normal leading-relaxed max-w-3xl">
          ChefLogic was born on the line during a chaotic Saturday night dinner service in 2022. We watched brilliant chefs throw out thousands of dollars in pristine fish and organic herbs on Sunday morning, simply because restaurant software treated food like screws in a hardware store.
        </p>

        {/* Feature Image: Culinary Team Story */}
        <div className="my-12 rounded-lg overflow-hidden border border-[#25282c] shadow-2xl bg-[#141618]">
          <div className="aspect-[16/9] w-full relative">
            <img
              src={teamImg}
              alt="Executive culinary directors and head chefs developing flavor matrices and recipe yield algorithms in test kitchen"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              onError={() => {
                if (teamImg !== '/images/culinary_team.jpg') {
                  setTeamImg('/images/culinary_team.jpg');
                }
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d0e] via-transparent to-transparent" />
            <div className="absolute bottom-4 left-6 right-6 text-xs text-[#a7a29a]">
              ChefLogic test kitchen & culinary data laboratory · San Francisco & Lyon
            </div>
          </div>
        </div>

        {/* Chapter 1: The Founding Problem */}
        <div className="space-y-12 text-[#d5cfc4] leading-relaxed text-sm sm:text-base">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif-culinary text-[#ede8df] mb-4">
              01. The Tragedy of Kitchen Waste
            </h2>
            <p className="text-[#a7a29a] mb-4">
              Across the global hospitality industry, roughly 10% to 15% of all purchased food is discarded before it ever reaches a dining table. That represents over $160 billion in vanished revenue and millions of metric tons of greenhouse emissions annually.
            </p>
            <p className="text-[#a7a29a]">
              Yet restaurant margins remain notoriously razor-thin (typically 3% to 7%). Traditional inventory software required weary sous chefs to count cans on clipboards after a 14-hour shift, entering data into clunky ERP tools that provided no insight until weeks after invoices were paid.
            </p>
          </div>

          {/* Chapter 2: The Solution */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif-culinary text-[#ede8df] mb-4">
              02. The Creation of cheflogic.ai.studio
            </h2>
            <p className="text-[#a7a29a] mb-4">
              We asked a foundational question: What if inventory wasn't a static graveyard of past costs, but an active, intelligent creative assistant for the chef?
            </p>
            <p className="text-[#a7a29a]">
              Our platform continuously monitors what enters the walk-in, calculates exact portion yields, and pairs surplus ingredients into high-margin menu specials before spoilage occurs. If your distributor delivers an unexpected surplus of halibut or chanterelles, ChefLogic formulates tonight's signature course with complete food cost percentages calculated to the tenth of a cent.
            </p>
          </div>

          {/* Mission Pillar Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            <div className="p-6 bg-[#141618] border border-[#25282c] rounded-lg">
              <div className="w-9 h-9 rounded bg-[#c5a059]/15 border border-[#c5a059]/30 flex items-center justify-center text-[#c5a059] mb-4">
                <Leaf className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif-culinary text-[#ede8df] mb-2">
                1 Billion Pounds
              </h3>
              <p className="text-xs text-[#a7a29a] leading-relaxed">
                Our north-star pledge: Divert 1 billion pounds of perishable food from landfills across our global partner kitchens by 2030.
              </p>
            </div>

            <div className="p-6 bg-[#141618] border border-[#25282c] rounded-lg">
              <div className="w-9 h-9 rounded bg-[#c5a059]/15 border border-[#c5a059]/30 flex items-center justify-center text-[#c5a059] mb-4">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif-culinary text-[#ede8df] mb-2">
                4-7% Margin Expansion
              </h3>
              <p className="text-xs text-[#a7a29a] leading-relaxed">
                Transforming precarious restaurant operations into durable, profitable enterprises capable of paying fair wages and flourishing.
              </p>
            </div>

            <div className="p-6 bg-[#141618] border border-[#25282c] rounded-lg">
              <div className="w-9 h-9 rounded bg-[#c5a059]/15 border border-[#c5a059]/30 flex items-center justify-center text-[#c5a059] mb-4">
                <ChefHat className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif-culinary text-[#ede8df] mb-2">
                Chef Autonomy
              </h3>
              <p className="text-xs text-[#a7a29a] leading-relaxed">
                Technology that serves the chef’s creative vision, never constraining culinary imagination with rigid corporate templates.
              </p>
            </div>
          </div>

          {/* Chapter 3: Our Principles */}
          <div className="pt-6">
            <h2 className="text-2xl sm:text-3xl font-serif-culinary text-[#ede8df] mb-4">
              03. The ChefLogic Manifesto
            </h2>
            <ul className="space-y-4 text-sm text-[#a7a29a]">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#c5a059] mt-2 shrink-0" />
                <div>
                  <strong className="text-[#ede8df]">Culinary Honor:</strong> We treat ingredients with reverent respect. A farmer spent months cultivating that heirloom vegetable or raising that livestock; wasting it is an avoidable failure.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#c5a059] mt-2 shrink-0" />
                <div>
                  <strong className="text-[#ede8df]">Recipe Sovereignty:</strong> Your recipes belong solely to your culinary team. ChefLogic never shares proprietary ratios, secret sauces, or internal cost cards with third parties.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#c5a059] mt-2 shrink-0" />
                <div>
                  <strong className="text-[#ede8df]">Transparent Economics:</strong> No hidden processing fees, no locked vendor agreements. We build software that pays for itself ten times over within the first fortnight.
                </div>
              </li>
            </ul>
          </div>

          {/* Call to action block */}
          <div className="mt-12 p-8 bg-[#141618] border border-[#c5a059]/30 rounded-lg text-center">
            <h3 className="text-2xl font-serif-culinary text-[#ede8df] mb-2">
              Ready to bring intelligent economics to your brigade?
            </h3>
            <p className="text-xs text-[#a7a29a] max-w-lg mx-auto mb-6">
              Claim your 3-month complimentary trial to <strong className="text-[#ede8df]">https://cheflogic.ai.studio/</strong> today. Onboarding takes less than 20 minutes.
            </p>
            <button
              onClick={onOpenTrialModal}
              className="py-3 px-6 text-xs font-semibold uppercase tracking-wider text-[#0c0d0e] bg-[#c5a059] hover:bg-[#d6b26d] rounded transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <span>Begin 3-Month Free Trial</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
