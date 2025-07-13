import React from 'react';
import { Activity, Brain, Stethoscope } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-6 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="glass-card p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="bg-gradient-to-r from-primary to-primary-glow p-3 rounded-xl">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1">
                  <Stethoscope className="w-4 h-4 text-primary pulse-medical" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gradient">
                  DiabetesAI
                </h1>
                <p className="text-sm text-muted-foreground">
                  Advanced Medical Prediction System
                </p>
              </div>
            </div>
            
            <div className="hidden sm:flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Activity className="w-4 h-4 text-primary" />
                <span>AI-Powered Analysis</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;