import React from 'react';
import { Hero } from '../components/Hero';
import { InteractiveKitchenEngine } from '../components/InteractiveKitchenEngine';
import { MenuEngineeringMatrix } from '../components/MenuEngineeringMatrix';
import { RoiCalculator } from '../components/RoiCalculator';
import { PlatformFeatures } from '../components/PlatformFeatures';
import { SocialProof } from '../components/SocialProof';
import { PricingTrial } from '../components/PricingTrial';
import { NewsletterCta } from '../components/NewsletterCta';
import { FaqSection } from '../components/FaqSection';

import { PageView } from '../types';

interface HomePageProps {
  onOpenTrialModal: () => void;
  onNavigate: (view: PageView) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenTrialModal, onNavigate }) => {
  return (
    <main>
      <Hero
        onOpenTrialModal={onOpenTrialModal}
        onLoginClick={() => onNavigate('login')}
      />
      <InteractiveKitchenEngine onOpenTrialModal={onOpenTrialModal} />
      <MenuEngineeringMatrix onOpenTrialModal={onOpenTrialModal} />
      <RoiCalculator onOpenTrialModal={onOpenTrialModal} />
      <PlatformFeatures onOpenTrialModal={onOpenTrialModal} />
      <SocialProof />
      <PricingTrial onOpenTrialModal={onOpenTrialModal} />
      <NewsletterCta />
      <FaqSection />
    </main>
  );
};
