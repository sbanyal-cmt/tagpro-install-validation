import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { PhaseContainer } from '../PhaseContainer';
import { trackWelcomeStart, trackWelcomeComplete } from '@/services/analytics';
import { HelpCircle } from 'lucide-react';
import limuLogo from '@/assets/LIMU-Logo.png';
import cmtLogo from '@/assets/cmt-logo.png';
import tagProIntro from '@/assets/tagpro-intro.jpg';

interface WelcomePhaseProps {
  onNext: () => void;
  onUpdateBoxId: (boxId: string) => void;
  onUpdatePolicyId?: (policyId: string) => void;
}

export const WelcomePhase: React.FC<WelcomePhaseProps> = ({ onNext, onUpdateBoxId, onUpdatePolicyId }) => {
  // Generate random 6-character alphanumeric string for Device ID (MAC address-like format)
  const generateDeviceId = () => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `Tag_Pro-${result}`;
  };

  const [deviceId] = useState(generateDeviceId());

  // Track welcome phase start
  useEffect(() => {
    trackWelcomeStart();
  }, []);

  const handleNext = () => {
    // Update the device ID in the data
    onUpdateBoxId(deviceId);
    // Track welcome phase completion
    trackWelcomeComplete(deviceId);
    onNext();
  };

  return (
    <PhaseContainer
      currentPhase={0}
      totalPhases={4}
      title="Welcome!"
      subtitle="Let's get your Tag Pro setup"
    >
      <div className="space-y-8">
        <div className="flex justify-center items-center space-x-6 mb-6">
          <img src={limuLogo} alt="Liberty Mutual" className="h-20" />
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

        {/* Device ID Field */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="deviceId">Device ID</Label>
            <Input
              id="deviceId"
              value={deviceId}
              readOnly
              className="font-mono text-center text-lg bg-muted"
            />
            <p className="text-xs text-muted-foreground mt-1 text-center">
              Device ID from your Tag Pro package
            </p>
          </div>
        </div>

        {/* Help Callout */}
        <div className="bg-muted/50 border border-border rounded-lg p-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="text-sm text-muted-foreground hover:text-foreground underline flex items-center gap-1 w-full text-left">
                <HelpCircle className="w-4 h-4" />
                Details don't look right? Contact Support
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Information Mismatch?</AlertDialogTitle>
                <AlertDialogDescription>
                  If there is an information mismatch, please contact Customer Support:
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Phone:</span>
                      <span>1 (800) 290-8711</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Email:</span>
                      <span>tagpro_support@cmtelematics.com</span>
                    </div>
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel asChild>
                  <Button variant="default" className="bg-blue-600 hover:bg-blue-700 text-white">
                    Close
                  </Button>
                </AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <div className="flex-1 flex items-end">
          <Button
            onClick={handleNext}
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
