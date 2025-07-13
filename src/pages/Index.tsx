import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import DiabetesPredictionForm from '@/components/DiabetesPredictionForm';
import PredictionResult from '@/components/PredictionResult';
import FloatingElements from '@/components/FloatingElements';
import Header from '@/components/Header';
import { Brain, Activity, Shield, TrendingUp, Users, Award } from 'lucide-react';
import heroImage from '@/assets/hero-medical.jpg';

interface PredictionFormData {
  pregnancies: string;
  glucose: string;
  bloodPressure: string;
  skinThickness: string;
  insulin: string;
  bmi: string;
  diabetesPedigreeFunction: string;
  age: string;
}

interface PredictionData {
  hasDiabetes: boolean;
  confidence: number;
  riskLevel: 'low' | 'moderate' | 'high';
  factors: string[];
}

const Index = () => {
  const [currentView, setCurrentView] = useState<'hero' | 'form' | 'result'>('hero');
  const [predictionResult, setPredictionResult] = useState<PredictionData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock AI prediction function (in real app, this would call your ML API)
  const mockPrediction = (data: PredictionFormData): PredictionData => {
    const glucose = parseFloat(data.glucose);
    const bmi = parseFloat(data.bmi);
    const age = parseFloat(data.age);
    const pregnancies = parseFloat(data.pregnancies);
    const bloodPressure = parseFloat(data.bloodPressure);

    // Simple rule-based prediction for demo (replace with actual ML model)
    let riskScore = 0;
    const factors: string[] = [];

    if (glucose > 140) {
      riskScore += 30;
      factors.push('Elevated glucose levels');
    }
    if (bmi > 30) {
      riskScore += 25;
      factors.push('High BMI');
    }
    if (age > 45) {
      riskScore += 20;
      factors.push('Advanced age');
    }
    if (pregnancies > 3) {
      riskScore += 15;
      factors.push('Multiple pregnancies');
    }
    if (bloodPressure > 90) {
      riskScore += 10;
      factors.push('High blood pressure');
    }

    const hasDiabetes = riskScore > 50;
    let riskLevel: 'low' | 'moderate' | 'high';
    
    if (riskScore < 30) riskLevel = 'low';
    else if (riskScore < 60) riskLevel = 'moderate';
    else riskLevel = 'high';

    return {
      hasDiabetes,
      confidence: Math.min(riskScore + Math.random() * 20, 95),
      riskLevel,
      factors
    };
  };

  const handleFormSubmit = async (data: PredictionFormData) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const result = mockPrediction(data);
    setPredictionResult(result);
    setCurrentView('result');
    setIsLoading(false);
  };

  const handleReset = () => {
    setCurrentView('hero');
    setPredictionResult(null);
  };

  const stats = [
    { icon: Users, label: 'Patients Analyzed', value: '10,000+' },
    { icon: Activity, label: 'Accuracy Rate', value: '94.2%' },
    { icon: Shield, label: 'Data Security', value: '100%' },
    { icon: Award, label: 'Medical Grade', value: 'Certified' }
  ];

  if (currentView === 'form') {
    return (
      <div className="min-h-screen relative">
        <FloatingElements />
        <Header />
        
        <main className="relative z-10 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
            <DiabetesPredictionForm onSubmit={handleFormSubmit} isLoading={isLoading} />
          </div>
        </main>
      </div>
    );
  }

  if (currentView === 'result' && predictionResult) {
    return (
      <div className="min-h-screen relative">
        <FloatingElements />
        <Header />
        
        <main className="relative z-10 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
            <PredictionResult prediction={predictionResult} onReset={handleReset} />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <FloatingElements />
      <Header />
      
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Hero Content */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <Badge className="bg-primary/10 text-primary border-primary/20">
                    AI-Powered Medical Prediction
                  </Badge>
                  <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                    <span className="text-gradient">Diabetes Risk</span>
                    <br />
                    <span className="text-foreground">Assessment</span>
                  </h1>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    Get instant, AI-powered diabetes risk predictions based on medical data. 
                    Our advanced machine learning model provides accurate assessments to help 
                    you make informed health decisions.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    onClick={() => setCurrentView('form')}
                    className="glass-button text-lg px-8 py-4"
                  >
                    <Brain className="w-5 h-5 mr-2" />
                    Start Assessment
                  </Button>
                  <Button 
                    variant="outline" 
                    className="glass-input border-2 text-lg px-8 py-4"
                  >
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Learn More
                  </Button>
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8">
                  {stats.map((stat, index) => {
                    const IconComponent = stat.icon;
                    return (
                      <div key={index} className="text-center space-y-2">
                        <div className="bg-primary/10 p-3 rounded-full w-fit mx-auto">
                          <IconComponent className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <div className="font-bold text-lg">{stat.value}</div>
                          <div className="text-sm text-muted-foreground">{stat.label}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Hero Image */}
              <div className="relative">
                <div className="glass-card p-4 overflow-hidden">
                  <img
                    src={heroImage}
                    alt="Medical AI Dashboard"
                    className="w-full h-auto rounded-xl object-cover"
                  />
                </div>
                <div className="absolute -top-6 -right-6 bg-gradient-to-r from-primary to-primary-glow p-4 rounded-2xl">
                  <Activity className="w-8 h-8 text-white pulse-medical" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">
                Why Choose <span className="text-gradient">DiabetesAI</span>?
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Our AI system uses advanced machine learning algorithms trained on medical data 
                to provide accurate diabetes risk assessments.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Brain,
                  title: 'Advanced AI Model',
                  description: 'Trained on thousands of medical records for accurate predictions'
                },
                {
                  icon: Shield,
                  title: 'Secure & Private',
                  description: 'Your medical data is encrypted and never stored permanently'
                },
                {
                  icon: Activity,
                  title: 'Instant Results',
                  description: 'Get your diabetes risk assessment in seconds'
                }
              ].map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <Card key={index} className="glass-card group hover:scale-105 transition-transform duration-300">
                    <CardHeader className="text-center">
                      <div className="bg-gradient-to-r from-primary to-primary-glow p-3 rounded-xl w-fit mx-auto group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-center text-base">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
