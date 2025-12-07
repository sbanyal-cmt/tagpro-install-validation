import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PhaseContainer } from '../PhaseContainer';
import { trackWelcomeStart, trackWelcomeComplete } from '@/services/analytics';
import libertyMutualLogo from '@/assets/Liberty-Mutual-Logo.png';
import cmtLogo from '@/assets/cmt-logo.png';
import tagProIntro from '@/assets/tagpro-intro.jpg';

interface WelcomePhaseProps {
  onNext: () => void;
  onUpdateBoxId: (boxId: string) => void;
  onUpdatePolicyId?: (policyId: string) => void;
}

export const WelcomePhase: React.FC<WelcomePhaseProps> = ({ onNext, onUpdateBoxId, onUpdatePolicyId }) => {
  // Generate random 4-digit number for Box ID with new format
  const generateBoxId = () => {
    const randomNumber = Math.floor(Math.random() * 9000) + 1000; // 1000-9999
    return `Tag_Pro-${randomNumber}`;
  };

  // Generate Policy ID: "Policy"_random number_Box ID
  const generatePolicyId = (boxId: string) => {
    const randomNumber = Math.floor(Math.random() * 900000) + 100000; // 100000-999999
    return `Policy_${randomNumber}_${boxId}`;
  };

  const [boxId, setBoxId] = useState(generateBoxId());
  const [policyId] = useState(() => {
    const initialBoxId = generateBoxId();
    return generatePolicyId(initialBoxId);
  });

  // Track welcome phase start
  useEffect(() => {
    trackWelcomeStart();
  }, []);

  const handleBoxIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newBoxId = e.target.value;
    setBoxId(newBoxId);
  };

  const handleNext = () => {
    // Update the box ID in the data
    onUpdateBoxId(boxId);
    // Update policy ID if handler exists
    if (onUpdatePolicyId) {
      const currentPolicyId = generatePolicyId(boxId);
      onUpdatePolicyId(currentPolicyId);
    }
    // Track welcome phase completion
    trackWelcomeComplete(boxId);
    onNext();
  };

  const canProceed = boxId.trim().length > 0;

  return (
    <PhaseContainer
      currentPhase={0}
      totalPhases={4}
      title="Welcome!"
      subtitle="Let's get your Tag Pro setup"
    >
      <div className="space-y-8">
        <div className="flex justify-center items-center space-x-6 mb-6">
          <img src={libertyMutualLogo} alt="Liberty Mutual" className="h-6" />
          <img src={cmtLogo} alt="Cambridge Mobile Telematics" className="h-20" />
        </div>
        
        <div className="text-center space-y-6">
          {/* Tag Pro Intro Image */}
          <div className="bg-muted/20 p-6 border rounded-lg">
            <img 
              src={tagProIntro} 
              alt="Tag Pro Introduction" 
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>

        {/* Policy ID Field */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="policyId">Policy ID</Label>
            <Input
              id="policyId"
              value={generatePolicyId(boxId)}
              readOnly
              className="font-mono text-center text-lg bg-muted"
            />
          </div>
        </div>

        {/* Box ID Field */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="boxId">Box ID</Label>
            <Input
              id="boxId"
              value={boxId}
              onChange={handleBoxIdChange}
              placeholder="Tag_Pro-XXXX"
              className="font-mono text-center text-lg"
            />
            <p className="text-xs text-muted-foreground mt-1 text-center">
              Box ID from your Tag Pro package
            </p>
          </div>
        </div>

        <div className="flex-1 flex items-end">
          <Button
            onClick={handleNext}
            disabled={!canProceed}
            className="w-full text-lg py-6 font-semibold"
            variant="default"
          >
            Confirm & Begin
          </Button>
        </div>
      </div>
    </PhaseContainer>
  );
};
