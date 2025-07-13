import React from 'react';
import { Activity, Heart, TrendingUp, Shield, Zap, Target } from 'lucide-react';

const FloatingElements: React.FC = () => {
  const icons = [
    { Icon: Activity, className: "top-1/4 left-10 float-element", size: 24 },
    { Icon: Heart, className: "top-1/3 right-16 float-element float-delay-1", size: 28 },
    { Icon: TrendingUp, className: "top-2/3 left-1/4 float-element float-delay-2", size: 20 },
    { Icon: Shield, className: "top-1/2 right-1/4 float-element", size: 32 },
    { Icon: Zap, className: "top-3/4 right-12 float-element float-delay-1", size: 18 },
    { Icon: Target, className: "top-1/6 right-1/3 float-element float-delay-2", size: 26 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {icons.map(({ Icon, className, size }, index) => (
        <div key={index} className={`absolute ${className}`}>
          <Icon 
            size={size} 
            className="text-primary/20 pulse-medical" 
          />
        </div>
      ))}
      
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/2 w-96 h-96 bg-gradient-to-r from-primary/10 to-primary-glow/10 rounded-full blur-3xl float-element"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-accent/15 to-secondary/15 rounded-full blur-3xl float-element float-delay-1"></div>
      <div className="absolute top-1/2 left-1/6 w-64 h-64 bg-gradient-to-r from-primary-light/10 to-primary/10 rounded-full blur-2xl float-element float-delay-2"></div>
    </div>
  );
};

export default FloatingElements;