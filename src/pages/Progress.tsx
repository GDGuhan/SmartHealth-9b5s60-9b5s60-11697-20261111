import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { storage } from '@/lib/storage';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, Activity, Flame, Target, Calendar, Award, Download } from 'lucide-react';
import type { User, WorkoutSession } from '@/types';

export default function Progress() {
  const [user, setUser] = useState<User | null>(null);
  const [sessions, setSessions] = useState<WorkoutSession[]>([]);
  const [timeFilter, setTimeFilter] = useState<'week' | 'month' | 'all'>('week');

  useEffect(() => {
    const currentUser = storage.getUser();
    setUser(currentUser);
    setSessions(storage.getSessions());
  }, []);

  // Calculate stats
  const totalWorkouts = sessions.length;
  const totalCalories = sessions.reduce((sum, s) => sum + s.caloriesBurned, 0);
  const avgAccuracy = sessions.length > 0
    ? Math.round(sessions.reduce((sum, s) => sum + s.accuracyScore, 0) / sessions.length)
    : 0;
  const totalMinutes = sessions.reduce((sum, s) => sum + s.duration, 0);

  // Prepare chart data
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  });

  const caloriesData = last7Days.map((day, index) => ({
    day,
    calories: Math.floor(Math.random() * 300) + 150,
    accuracy: Math.floor(Math.random() * 20) + 75,
  }));

  const workoutFrequency = [
    { type: 'Squats', count: 12 },
    { type: 'Push-ups', count: 10 },
    { type: 'Lunges', count: 8 },
    { type: 'Plank', count: 7 },
    { type: 'Burpees', count: 5 },
  ];

  const stats = [
    {
      label: 'Total Workouts',
      value: totalWorkouts,
      icon: Activity,
      color: 'from-[hsl(24,100%,50%)] to-[hsl(39,100%,50%)]',
      change: '+12%',
    },
    {
      label: 'Calories Burned',
      value: totalCalories.toLocaleString(),
      icon: Flame,
      color: 'from-[hsl(0,72%,51%)] to-[hsl(24,100%,50%)]',
      change: '+8%',
    },
    {
      label: 'Avg Accuracy',
      value: `${avgAccuracy}%`,
      icon: Target,
      color: 'from-[hsl(142,71%,45%)] to-[hsl(158,64%,52%)]',
      change: '+5%',
    },
    {
      label: 'Active Minutes',
      value: totalMinutes,
      icon: Calendar,
      color: 'from-[hsl(271,91%,65%)] to-[hsl(291,91%,75%)]',
      change: '+15%',
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              <span className="bg-gradient-to-r from-[hsl(24,100%,50%)] to-[hsl(142,71%,45%)] bg-clip-text text-transparent">
                Progress Tracking
              </span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Monitor your fitness journey and achievements
            </p>
          </div>
          <Button size="lg" variant="outline" className="h-12 px-6 border-2 hidden sm:flex">
            <Download className="w-5 h-5 mr-2" />
            Export Report
          </Button>
        </div>

        {/* Time Filter */}
        <div className="flex gap-3 mb-8">
          {(['week', 'month', 'all'] as const).map((filter) => (
            <Button
              key={filter}
              onClick={() => setTimeFilter(filter)}
              variant={timeFilter === filter ? 'default' : 'outline'}
              className={`h-10 px-6 ${
                timeFilter === filter
                  ? 'bg-gradient-to-r from-[hsl(24,100%,50%)] to-[hsl(142,71%,45%)]'
                  : 'border-2'
              }`}
            >
              {filter === 'week' ? 'Last 7 Days' : filter === 'month' ? 'Last 30 Days' : 'All Time'}
            </Button>
          ))}
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-background/50 backdrop-blur-sm border-2 border-border hover:border-[hsl(24,100%,50%)] transition-all">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30 border">
                    {stat.change}
                  </Badge>
                </div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Calories & Accuracy Chart */}
          <Card className="bg-background/50 backdrop-blur-sm border-2 border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-[hsl(24,100%,50%)]" />
                Calories & Accuracy Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={caloriesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="calories"
                    stroke="hsl(24,100%,50%)"
                    strokeWidth={3}
                    dot={{ fill: 'hsl(24,100%,50%)', r: 5 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="accuracy"
                    stroke="hsl(142,71%,45%)"
                    strokeWidth={3}
                    dot={{ fill: 'hsl(142,71%,45%)', r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Workout Frequency */}
          <Card className="bg-background/50 backdrop-blur-sm border-2 border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-[hsl(142,71%,45%)]" />
                Exercise Frequency
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={workoutFrequency}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="type" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="count" fill="hsl(142,71%,45%)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Achievements */}
        <Card className="bg-background/50 backdrop-blur-sm border-2 border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-[hsl(191,91%,55%)]" />
              Recent Achievements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {user?.badges.map((badge) => (
              <div key={badge.id} className="flex items-center gap-4 p-4 bg-secondary/30 rounded-lg border border-border">
                <div className="text-4xl">{badge.icon}</div>
                <div className="flex-1">
                  <div className="font-bold text-lg">{badge.name}</div>
                  <div className="text-sm text-muted-foreground">{badge.description}</div>
                  {badge.earnedDate && (
                    <div className="text-xs text-muted-foreground mt-1">
                      Earned on {new Date(badge.earnedDate).toLocaleDateString()}
                    </div>
                  )}
                </div>
                <Badge className="bg-gradient-to-r from-[hsl(24,100%,50%)] to-[hsl(142,71%,45%)] text-white">
                  Unlocked
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
