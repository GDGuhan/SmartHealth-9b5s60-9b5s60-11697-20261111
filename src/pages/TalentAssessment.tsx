import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { storage } from '@/lib/storage';
import { analyzeTalent, recommendSports } from '@/lib/ai-analysis';
import { Target, Zap, Activity, Heart, Users, Trophy } from 'lucide-react';
import { toast } from 'sonner';
import type { User, TalentProfile, Sport } from '@/types';

export default function TalentAssessment() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [hasProfile, setHasProfile] = useState(false);
  const [talentProfile, setTalentProfile] = useState<TalentProfile | null>(null);
  const [recommendedSports, setRecommendedSports] = useState<Sport[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    const currentUser = storage.getUser();
    if (!currentUser) {
      navigate('/dashboard');
      return;
    }
    setUser(currentUser);

    const profile = storage.getTalentProfile();
    if (profile) {
      setHasProfile(true);
      setTalentProfile(profile);
      setRecommendedSports(profile.recommendedSports);
    }
  }, [navigate]);

  const handleRunAssessment = () => {
    if (!user) return;

    setIsAnalyzing(true);
    toast.info('Analyzing your workout history and performance data...');

    setTimeout(() => {
      const sessions = storage.getSessions();
      const metrics = analyzeTalent(sessions);
      const sports = recommendSports(metrics);

      const profile: TalentProfile = {
        userId: user.id,
        speed: metrics.speed,
        flexibility: metrics.flexibility,
        endurance: metrics.endurance,
        strength: metrics.strength,
        coordination: metrics.coordination,
        recommendedSports: sports,
        assessmentDate: new Date().toISOString(),
      };

      storage.setTalentProfile(profile);
      setTalentProfile(profile);
      setRecommendedSports(sports);
      setHasProfile(true);
      setIsAnalyzing(false);
      toast.success('Talent assessment complete!');
    }, 3000);
  };

  const metrics = talentProfile
    ? [
        { label: 'Speed', value: talentProfile.speed, icon: Zap, color: 'hsl(24,100%,50%)' },
        { label: 'Flexibility', value: talentProfile.flexibility, icon: Activity, color: 'hsl(271,91%,65%)' },
        { label: 'Endurance', value: talentProfile.endurance, icon: Heart, color: 'hsl(0,72%,51%)' },
        { label: 'Strength', value: talentProfile.strength, icon: Users, color: 'hsl(142,71%,45%)' },
        { label: 'Coordination', value: talentProfile.coordination, icon: Target, color: 'hsl(191,91%,55%)' },
      ]
    : [];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            <span className="bg-gradient-to-r from-[hsl(24,100%,50%)] to-[hsl(142,71%,45%)] bg-clip-text text-transparent">
              Talent Assessment
            </span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Discover your sports potential with AI-powered analysis
          </p>
        </div>

        {!hasProfile ? (
          <div className="max-w-4xl mx-auto">
            <Card className="bg-background/50 backdrop-blur-sm border-2 border-border">
              <CardContent className="pt-12 pb-12 text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-[hsl(24,100%,50%)] to-[hsl(142,71%,45%)] rounded-full mb-6">
                  <Target className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Assess Your Sports Talent</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                  Our AI will analyze your workout history, performance metrics, and physical attributes
                  to identify your strengths and recommend sports that match your natural talents.
                </p>
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  {[
                    { title: 'Speed Analysis', desc: 'Measures explosive power and quickness' },
                    { title: 'Flexibility Test', desc: 'Evaluates range of motion and mobility' },
                    { title: 'Endurance Score', desc: 'Assesses cardiovascular capacity' },
                  ].map((item, idx) => (
                    <div key={idx} className="p-4 bg-secondary/30 rounded-lg border border-border">
                      <h3 className="font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  ))}
                </div>
                <Button
                  onClick={handleRunAssessment}
                  size="lg"
                  disabled={isAnalyzing}
                  className="h-14 px-12 text-lg bg-gradient-to-r from-[hsl(24,100%,50%)] to-[hsl(142,71%,45%)]"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Trophy className="w-6 h-6 mr-2" />
                      Run Assessment
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Metrics Overview */}
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
              {metrics.map((metric, index) => (
                <Card key={index} className="bg-background/50 backdrop-blur-sm border-2 border-border hover:border-[hsl(24,100%,50%)] transition-all">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <metric.icon className="w-8 h-8" style={{ color: metric.color }} />
                      <Badge variant="secondary" className="text-lg px-3 py-1">
                        {metric.value}%
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm font-semibold text-muted-foreground">{metric.label}</div>
                      <Progress value={metric.value} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recommended Sports */}
            <Card className="bg-background/50 backdrop-blur-sm border-2 border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Trophy className="w-7 h-7 text-[hsl(24,100%,50%)]" />
                  Recommended Sports
                </CardTitle>
                <p className="text-muted-foreground">
                  Based on your physical attributes and performance data
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {recommendedSports.map((sport, index) => (
                  <div
                    key={index}
                    className={`p-6 rounded-lg border-2 transition-all ${
                      index === 0
                        ? 'bg-gradient-to-r from-[hsl(24,100%,50%)]/10 to-[hsl(142,71%,45%)]/10 border-[hsl(24,100%,50%)]'
                        : 'bg-secondary/30 border-border hover:border-[hsl(142,71%,45%)]'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-4">
                        <div className="text-5xl">{sport.icon}</div>
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-2xl font-bold">{sport.name}</h3>
                            {index === 0 && (
                              <Badge className="bg-gradient-to-r from-[hsl(24,100%,50%)] to-[hsl(142,71%,45%)] text-white">
                                Best Match
                              </Badge>
                            )}
                          </div>
                          <p className="text-muted-foreground">{sport.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-4xl font-bold bg-gradient-to-r from-[hsl(24,100%,50%)] to-[hsl(142,71%,45%)] bg-clip-text text-transparent">
                          {sport.score}
                        </div>
                        <div className="text-sm text-muted-foreground">Match Score</div>
                      </div>
                    </div>
                    <Progress value={sport.score} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleRunAssessment}
                size="lg"
                variant="outline"
                className="h-14 px-8 border-2"
                disabled={isAnalyzing}
              >
                Re-run Assessment
              </Button>
              <Button
                onClick={() => navigate('/plans')}
                size="lg"
                className="h-14 px-8 bg-gradient-to-r from-[hsl(24,100%,50%)] to-[hsl(142,71%,45%)]"
              >
                Get Personalized Plan
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
