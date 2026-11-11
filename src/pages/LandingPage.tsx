import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap, Camera, Trophy, TrendingUp, Users, Award } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Camera,
      title: 'AI Pose Detection',
      description: 'Real-time form correction using advanced computer vision',
    },
    {
      icon: Trophy,
      title: 'Talent Assessment',
      description: 'Discover your sports potential with AI-powered analysis',
    },
    {
      icon: TrendingUp,
      title: 'Personalized Plans',
      description: 'Custom workout programs based on your goals and fitness level',
    },
    {
      icon: Users,
      title: 'Gamification',
      description: 'Compete with friends, earn badges, and climb leaderboards',
    },
    {
      icon: Award,
      title: 'Progress Tracking',
      description: 'Track calories, streaks, and performance improvements',
    },
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-24">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(24,100%,50%)]/10 via-background to-[hsl(142,71%,45%)]/10" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 mb-8 bg-gradient-to-br from-[hsl(24,100%,50%)] to-[hsl(142,71%,45%)] rounded-2xl shadow-2xl">
            <Zap className="w-10 h-10 text-white" />
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6">
            Your AI-Powered
            <br />
            <span className="bg-gradient-to-r from-[hsl(24,100%,50%)] to-[hsl(142,71%,45%)] bg-clip-text text-transparent">
              Fitness Coach
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
            Train smarter with real-time AI pose detection, discover your sports talent,
            and achieve your fitness goals faster than ever before.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={() => navigate('/dashboard')}
              size="lg"
              className="h-14 px-8 text-lg font-semibold bg-gradient-to-r from-[hsl(24,100%,50%)] to-[hsl(142,71%,45%)] hover:opacity-90 transition-opacity"
            >
              Start Training Now
            </Button>
            <Button
              onClick={() => navigate('/talent')}
              size="lg"
              variant="outline"
              className="h-14 px-8 text-lg font-semibold border-2"
            >
              Discover Your Talent
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { label: '10K+', sublabel: 'Active Users' },
              { label: '500K+', sublabel: 'Workouts Completed' },
              { label: '95%', sublabel: 'Accuracy Rate' },
              { label: '4.9★', sublabel: 'User Rating' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[hsl(24,100%,50%)] to-[hsl(142,71%,45%)] bg-clip-text text-transparent">
                  {stat.label}
                </div>
                <div className="text-sm text-muted-foreground mt-1">{stat.sublabel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-secondary/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Powered by <span className="bg-gradient-to-r from-[hsl(24,100%,50%)] to-[hsl(142,71%,45%)] bg-clip-text text-transparent">AI Innovation</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Advanced machine learning technology that adapts to your unique fitness journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-6 bg-background/50 backdrop-blur-sm border-2 border-border hover:border-[hsl(24,100%,50%)] transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[hsl(24,100%,50%)] to-[hsl(142,71%,45%)] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="p-12 bg-gradient-to-br from-[hsl(24,100%,50%)]/10 to-[hsl(142,71%,45%)]/10 border-2 border-border">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Fitness?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of users who are training smarter with AI-powered guidance
            </p>
            <Button
              onClick={() => navigate('/dashboard')}
              size="lg"
              className="h-14 px-12 text-lg font-semibold bg-gradient-to-r from-[hsl(24,100%,50%)] to-[hsl(142,71%,45%)] hover:opacity-90 transition-opacity"
            >
              Get Started Free
            </Button>
          </Card>
        </div>
      </section>
    </div>
  );
}
