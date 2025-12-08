import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressIndicatorProps {
  currentPhase: number;
  totalPhases: number;
  className?: string;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ 
  currentPhase, 
  totalPhases, 
  className 
}) => {
  return (
    <div className={cn("flex justify-center items-center space-x-3 mb-6", className)}>
      {Array.from({ length: totalPhases }, (_, index) => (
        <div
          key={index}
          className={cn(
            "w-4 h-4 rounded-full transition-all duration-300 relative",
            index < currentPhase
              ? "bg-secondary shadow-yellow ring-2 ring-secondary ring-offset-2" // Enhanced yellow for completed steps
              : index === currentPhase
              ? "bg-secondary ring-4 ring-secondary ring-offset-2 shadow-yellow scale-110" // Enhanced yellow with larger ring for current step
              : "bg-muted border-2 border-primary/30"
          )}
        >
          {index < currentPhase && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
