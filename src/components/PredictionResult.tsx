import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, CheckCircle, RotateCcw, TrendingUp, Activity, Heart } from 'lucide-react';

interface PredictionResultProps {
  prediction: {
    hasDiabetes: boolean;
    confidence: number;
    riskLevel: 'low' | 'moderate' | 'high';
    factors: string[];
  };
  onReset: () => void;
}

const PredictionResult: React.FC<PredictionResultProps> = ({ prediction, onReset }) => {
  const { hasDiabetes, confidence, riskLevel, factors } = prediction;

  const getRiskColor = () => {
    switch (riskLevel) {
      case 'low':
        return 'success';
      case 'moderate':
        return 'warning';
      case 'high':
        return 'destructive';
      default:
        return 'success';
    }
  };

  const getRiskIcon = () => {
    switch (riskLevel) {
      case 'low':
        return <CheckCircle className="w-6 h-6" />;
      case 'moderate':
      case 'high':
        return <AlertCircle className="w-6 h-6" />;
      default:
        return <CheckCircle className="w-6 h-6" />;
    }
  };

  const recommendations = {
    low: [
      "Continue maintaining a healthy lifestyle",
      "Regular exercise and balanced diet",
      "Annual health checkups recommended"
    ],
    moderate: [
      "Consider lifestyle modifications",
      "Increase physical activity",
      "Monitor blood sugar levels regularly",
      "Consult with healthcare provider"
    ],
    high: [
      "Immediate consultation with healthcare provider recommended",
      "Comprehensive diabetes screening advised",
      "Urgent lifestyle changes needed",
      "Consider preventive medications as advised by doctor"
    ]
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Main Result Card */}
      <Card className="glass-card">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className={`p-4 rounded-full bg-${getRiskColor()}/10 text-${getRiskColor()}`}>
              {getRiskIcon()}
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">
            Prediction Results
          </CardTitle>
          <CardDescription>
            AI-powered diabetes risk assessment based on your medical data
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Risk Level */}
          <div className="text-center space-y-3">
            <Badge 
              variant={getRiskColor() === 'success' ? 'default' : 'destructive'}
              className="text-lg px-4 py-2"
            >
              {hasDiabetes ? 'High Risk Detected' : 'Low Risk Detected'}
            </Badge>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Confidence Level</span>
                <span className="font-semibold">{confidence.toFixed(1)}%</span>
              </div>
              <Progress value={confidence} className="h-3" />
            </div>
          </div>

          {/* Risk Factors */}
          {factors.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Key Risk Factors
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {factors.map((factor, index) => (
                  <div 
                    key={index}
                    className="bg-muted/50 rounded-lg p-3 text-sm flex items-center gap-2"
                  >
                    <Activity className="w-3 h-3 text-primary" />
                    {factor}
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recommendations Card */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-primary" />
            Health Recommendations
          </CardTitle>
          <CardDescription>
            Based on your risk level, here are our recommendations
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <ul className="space-y-3">
            {recommendations[riskLevel].map((recommendation, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm">{recommendation}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Disclaimer and Actions */}
      <Card className="glass-card border-warning/20 bg-warning/5">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3 mb-4">
            <AlertCircle className="w-5 h-5 text-warning mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-semibold text-warning-foreground">Important Disclaimer</h4>
              <p className="text-sm text-muted-foreground">
                This AI prediction is for informational purposes only and should not replace 
                professional medical advice. Always consult with a qualified healthcare provider 
                for proper diagnosis and treatment.
              </p>
            </div>
          </div>
          
          <div className="flex justify-center">
            <Button 
              onClick={onReset}
              variant="outline"
              className="glass-button bg-background/80"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              New Assessment
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PredictionResult;