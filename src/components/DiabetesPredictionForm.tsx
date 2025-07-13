import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Activity, User, Heart, Scale, TrendingUp, Calendar, Calculator, Target } from 'lucide-react';

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

interface DiabetesPredictionFormProps {
  onSubmit: (data: PredictionFormData) => void;
  isLoading?: boolean;
}

const DiabetesPredictionForm: React.FC<DiabetesPredictionFormProps> = ({ onSubmit, isLoading = false }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<PredictionFormData>({
    pregnancies: '',
    glucose: '',
    bloodPressure: '',
    skinThickness: '',
    insulin: '',
    bmi: '',
    diabetesPedigreeFunction: '',
    age: ''
  });

  const handleInputChange = (field: keyof PredictionFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields are filled
    const emptyFields = Object.entries(formData).filter(([_, value]) => !value.trim());
    if (emptyFields.length > 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Validate numeric values
    const numericFields = Object.entries(formData);
    for (const [field, value] of numericFields) {
      if (isNaN(Number(value)) || Number(value) < 0) {
        toast({
          title: "Invalid Input",
          description: `Please enter a valid positive number for ${field}.`,
          variant: "destructive",
        });
        return;
      }
    }

    onSubmit(formData);
  };

  const formFields = [
    {
      key: 'pregnancies' as keyof PredictionFormData,
      label: 'Number of Pregnancies',
      placeholder: 'e.g., 2',
      icon: User,
      description: 'Total number of pregnancies'
    },
    {
      key: 'glucose' as keyof PredictionFormData,
      label: 'Glucose Level (mg/dL)',
      placeholder: 'e.g., 120',
      icon: TrendingUp,
      description: 'Plasma glucose concentration (2-hour oral glucose tolerance test)'
    },
    {
      key: 'bloodPressure' as keyof PredictionFormData,
      label: 'Blood Pressure (mmHg)',
      placeholder: 'e.g., 80',
      icon: Heart,
      description: 'Diastolic blood pressure'
    },
    {
      key: 'skinThickness' as keyof PredictionFormData,
      label: 'Skin Thickness (mm)',
      placeholder: 'e.g., 25',
      icon: Activity,
      description: 'Triceps skin fold thickness'
    },
    {
      key: 'insulin' as keyof PredictionFormData,
      label: 'Insulin (μU/mL)',
      placeholder: 'e.g., 85',
      icon: Target,
      description: '2-hour serum insulin level'
    },
    {
      key: 'bmi' as keyof PredictionFormData,
      label: 'BMI (kg/m²)',
      placeholder: 'e.g., 25.5',
      icon: Scale,
      description: 'Body Mass Index (weight in kg / height in m²)'
    },
    {
      key: 'diabetesPedigreeFunction' as keyof PredictionFormData,
      label: 'Diabetes Pedigree Function',
      placeholder: 'e.g., 0.35',
      icon: Calculator,
      description: 'Genetic predisposition score (0.0 - 2.5)'
    },
    {
      key: 'age' as keyof PredictionFormData,
      label: 'Age (years)',
      placeholder: 'e.g., 30',
      icon: Calendar,
      description: 'Age in years'
    }
  ];

  return (
    <Card className="glass-card w-full max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-gradient">
          Diabetes Risk Assessment
        </CardTitle>
        <CardDescription className="text-lg text-muted-foreground">
          Enter your medical information to get an AI-powered diabetes risk prediction
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {formFields.map((field) => {
              const IconComponent = field.icon;
              return (
                <div key={field.key} className="space-y-2">
                  <Label 
                    htmlFor={field.key} 
                    className="text-sm font-semibold text-foreground flex items-center gap-2"
                  >
                    <IconComponent className="w-4 h-4 text-primary" />
                    {field.label}
                  </Label>
                  <Input
                    id={field.key}
                    type="number"
                    step="any"
                    min="0"
                    placeholder={field.placeholder}
                    value={formData[field.key]}
                    onChange={(e) => handleInputChange(field.key, e.target.value)}
                    className="glass-input"
                    disabled={isLoading}
                  />
                  <p className="text-xs text-muted-foreground">
                    {field.description}
                  </p>
                </div>
              );
            })}
          </div>
          
          <div className="flex justify-center pt-6">
            <Button 
              type="submit" 
              className="glass-button text-lg px-8 py-3"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <Activity className="w-5 h-5 mr-2" />
                  Predict Diabetes Risk
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default DiabetesPredictionForm;