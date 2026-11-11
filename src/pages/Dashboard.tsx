import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { storage } from '@/lib/storage';
import { Activity, Trophy, Flame, TrendingUp, Target, Award, Calendar, Zap } from 'lucide-react';
import type { User, Challenge } from '@/types';

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  useEffect(() => {
    // Initialize demo user if not exists
    let currentUser = storage.getUser();
    if (!currentUser) {
      currentUser = {
        id: '1',
        name: 'Fitness Warrior',
        email: 'user@fitai.com',
        age: 25,
        weight: 70,
        height: 175,
        bmi: 22.9,
        goal: 'muscle_gain',
        level: 'intermediate',
        points: 450,
        streak: 3,
        badges: [
          { id: '1', name: 'First Workout', description: 'Complete your first workout', icon: '🎯', earned: true, earnedDate: '2026-03-20' },
          { id: '2', name: '3-Day Streak', description: 'Train for 3 consecutive days', icon: '🔥', earned: true, earnedDate: '2026-03-23' },
        ],
      };
      storage.setUser(currentUser);
    }
    setUser(currentUser);
    setChallenges(storage.getChallenges());
  }, []);

  if (!user) return null;

  const stats = [
    {
      label: 'Current Streak',
      value: `${user.streak} days`,
      icon: Flame,
      gradient: 'from-[hsl(24,100%,50%)] to-[hsl(39,100%,50%)]',
    },
    {
      label: 'Total Points',
      value: user.points.toLocaleString(),
      icon: Trophy,
      gradient: 'from-[hsl(142,71%,45%)] to-[hsl(158,64%,52%)]',
    },
    {
      label: 'Workouts',
      value: storage.getSessions().length,
      icon: Activity,
      gradient: 'from-[hsl(271,91%,65%)] to-[hsl(291,91%,75%)]',
    },
    {
      label: 'Badges Earned',
      value: user.badges.length,
      icon: Award,
      gradient: 'from-[hsl(191,91%,55%)] to-[hsl(211,91%,65%)]',
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            Welcome back, <span className="bg-gradient-to-r from-[hsl(24,100%,50%)] to-[hsl(142,71%,45%)] bg-clip-text text-transparent">{user.name}</span>
          </h1>
          <p className="text-lg text-muted-foreground">Let's crush your fitness goals today!</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-background/50 backdrop-blur-sm border-2 border-border hover:border-[hsl(24,100%,50%)] transition-all duration-300 hover:shadow-xl">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <Card className="bg-background/50 backdrop-blur-sm border-2 border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-[hsl(24,100%,50%)]" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="grid sm:grid-cols-2 gap-4">
                <Button
                  onClick={() => navigate('/workout')}
                  size="lg"
                  className="h-24 text-lg font-semibold bg-gradient-to-r from-[hsl(24,100%,50%)] to-[hsl(142,71%,45%)] hover:opacity-90"
                >
                  <Activity className="w-6 h-6 mr-2" />
                  Start Workout
                </Button>
                <Button
                  onClick={() => navigate('/talent')}
                  size="lg"
                  variant="outline"
                  className="h-24 text-lg font-semibold border-2"
                >
                  <Target className="w-6 h-6 mr-2" />
                  Talent Assessment
                </Button>
                <Button
                  onClick={() => navigate('/plans')}
                  size="lg"
                  variant="outline"
                  className="h-24 text-lg font-semibold border-2"
                >
                  <Calendar className="w-6 h-6 mr-2" />
                  Workout Plans
                </Button>
                <Button
                  onClick={() => navigate('/progress')}
                  size="lg"
                  variant="outline"
                  className="h-24 text-lg font-semibold border-2"
                >
                  <TrendingUp className="w-6 h-6 mr-2" />
                  View Progress
                </Button>
              </CardContent>
            </Card>

            {/* Active Challenges */}
            <Card className="bg-background/50 backdrop-blur-sm border-2 border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-[hsl(142,71%,45%)]" />
                  Active Challenges
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {challenges.filter(c => !c.completed).map((challenge) => (
                  <div key={challenge.id} className="p-4 bg-secondary/30 rounded-lg border border-border">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-bold text-lg">{challenge.title}</h4>
                        <p className="text-sm text-muted-foreground">{challenge.description}</p>
                      </div>
                      <Badge className="bg-gradient-to-r from-[hsl(24,100%,50%)] to-[hsl(142,71%,45%)] text-white">
                        +{challenge.points} pts
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span className="font-medium">{challenge.progress} / {challenge.target}</span>
                      </div>
                      <Progress value={(challenge.progress / challenge.target) * 100} className="h-2" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Badges */}
            <Card className="bg-background/50 backdrop-blur-sm border-2 border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-[hsl(191,91%,55%)]" />
                  Recent Badges
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {user.badges.map((badge) => (
                  <div key={badge.id} className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
                    <div className="text-3xl">{badge.icon}</div>
                    <div className="flex-1">
                      <div className="font-semibold">{badge.name}</div>
                      <div className="text-xs text-muted-foreground">{badge.description}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Fitness Profile */}
            <Card className="bg-gradient-to-br from-[hsl(24,100%,50%)]/10 to-[hsl(142,71%,45%)]/10 border-2 border-border">
              <CardHeader>
                <CardTitle>Your Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">BMI</span>
                  <span className="font-semibold">{user.bmi}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Goal</span>
                  <Badge variant="secondary">{user.goal.replace('_', ' ')}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Level</span>
                  <Badge variant="secondary">{user.level}</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
