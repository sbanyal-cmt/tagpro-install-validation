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
    <div className={cn("flex justify-center items-center space-x-2 mb-6", className)}>
      {Array.from({ length: totalPhases }, (_, index) => (
        <div
          key={index}
          className={cn(
            "w-3 h-3 rounded-full transition-all duration-300",
            index < currentPhase
              ? "bg-secondary" // Yellow for completed steps
              : index === currentPhase
              ? "bg-secondary ring-2 ring-secondary ring-offset-2" // Yellow with ring for current step
              : "bg-muted"
          )}
        />
      ))}
    </div>
  );
};
