import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { storage } from '@/lib/storage';
import { Trophy, Medal, Award, Flame, Activity, TrendingUp } from 'lucide-react';
import type { LeaderboardEntry, User } from '@/types';

export default function Leaderboard() {
  const [user, setUser] = useState<User | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [filter, setFilter] = useState<'points' | 'streak' | 'workouts'>('points');

  useEffect(() => {
    const currentUser = storage.getUser();
    setUser(currentUser);

    // Generate mock leaderboard data
    const mockData: LeaderboardEntry[] = [
      {
        rank: 1,
        userId: '101',
        name: 'Alex Thunder',
        points: 2450,
        streak: 15,
        workoutsCompleted: 45,
      },
      {
        rank: 2,
        userId: '102',
        name: 'Sarah Storm',
        points: 2280,
        streak: 12,
        workoutsCompleted: 42,
      },
      {
        rank: 3,
        userId: '103',
        name: 'Mike Beast',
        points: 2150,
        streak: 18,
        workoutsCompleted: 38,
      },
      {
        rank: 4,
        userId: '104',
        name: 'Lisa Power',
        points: 1980,
        streak: 9,
        workoutsCompleted: 35,
      },
      {
        rank: 5,
        userId: '1',
        name: currentUser?.name || 'Fitness Warrior',
        points: currentUser?.points || 450,
        streak: currentUser?.streak || 3,
        workoutsCompleted: storage.getSessions().length,
      },
      {
        rank: 6,
        userId: '105',
        name: 'Tom Titan',
        points: 1750,
        streak: 7,
        workoutsCompleted: 30,
      },
      {
        rank: 7,
        userId: '106',
        name: 'Emma Strong',
        points: 1620,
        streak: 6,
        workoutsCompleted: 28,
      },
      {
        rank: 8,
        userId: '107',
        name: 'David Flex',
        points: 1480,
        streak: 5,
        workoutsCompleted: 25,
      },
    ];

    setLeaderboard(mockData);
  }, []);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-8 h-8 text-yellow-400" />;
      case 2:
        return <Medal className="w-8 h-8 text-gray-300" />;
      case 3:
        return <Award className="w-8 h-8 text-orange-400" />;
      default:
        return <div className="w-8 h-8 flex items-center justify-center text-lg font-bold text-muted-foreground">#{rank}</div>;
    }
  };

  const sortedLeaderboard = [...leaderboard].sort((a, b) => {
    switch (filter) {
      case 'streak':
        return b.streak - a.streak;
      case 'workouts':
        return b.workoutsCompleted - a.workoutsCompleted;
      default:
        return b.points - a.points;
    }
  }).map((entry, index) => ({ ...entry, rank: index + 1 }));

  const filters = [
    { value: 'points', label: 'Points', icon: TrendingUp },
    { value: 'streak', label: 'Streak', icon: Flame },
    { value: 'workouts', label: 'Workouts', icon: Activity },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            <span className="bg-gradient-to-r from-[hsl(24,100%,50%)] to-[hsl(142,71%,45%)] bg-clip-text text-transparent">
              Leaderboard
            </span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Compete with fitness warriors worldwide
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          {filters.map((f) => (
            <Button
              key={f.value}
              onClick={() => setFilter(f.value as any)}
              variant={filter === f.value ? 'default' : 'outline'}
              className={`h-12 px-6 ${
                filter === f.value
                  ? 'bg-gradient-to-r from-[hsl(24,100%,50%)] to-[hsl(142,71%,45%)]'
                  : 'border-2'
              }`}
            >
              <f.icon className="w-5 h-5 mr-2" />
              Sort by {f.label}
            </Button>
          ))}
        </div>

        {/* Top 3 Podium */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {sortedLeaderboard.slice(0, 3).map((entry, index) => {
            const position = [1, 0, 2][index]; // Center, Left, Right
            const positionEntry = sortedLeaderboard[position];
            const height = ['h-64', 'h-72', 'h-60'][position];
            
            return (
              <div key={position} className={`${position === 0 ? 'md:order-2' : position === 1 ? 'md:order-1' : 'md:order-3'}`}>
                <Card className={`${height} bg-gradient-to-br ${
                  position === 0
                    ? 'from-yellow-500/20 to-yellow-500/5 border-yellow-500/50'
                    : position === 1
                    ? 'from-gray-500/20 to-gray-500/5 border-gray-500/50'
                    : 'from-orange-500/20 to-orange-500/5 border-orange-500/50'
                } border-2 hover:shadow-2xl transition-all`}>
                  <CardContent className="pt-6 h-full flex flex-col items-center justify-between">
                    <div className="text-center">
                      {getRankIcon(positionEntry.rank)}
                      <div className="mt-4 text-2xl font-bold">{positionEntry.name}</div>
                      {positionEntry.userId === user?.id && (
                        <Badge className="mt-2 bg-gradient-to-r from-[hsl(24,100%,50%)] to-[hsl(142,71%,45%)] text-white">
                          You
                        </Badge>
                      )}
                    </div>
                    <div className="text-center space-y-2">
                      <div className="text-4xl font-bold bg-gradient-to-r from-[hsl(24,100%,50%)] to-[hsl(142,71%,45%)] bg-clip-text text-transparent">
                        {filter === 'points'
                          ? positionEntry.points.toLocaleString()
                          : filter === 'streak'
                          ? positionEntry.streak
                          : positionEntry.workoutsCompleted}
                      </div>
                      <div className="text-sm text-muted-foreground capitalize">{filter}</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Full Leaderboard */}
        <Card className="bg-background/50 backdrop-blur-sm border-2 border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-6 h-6 text-[hsl(24,100%,50%)]" />
              Full Rankings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {sortedLeaderboard.map((entry) => (
              <div
                key={entry.userId}
                className={`p-4 rounded-lg border-2 transition-all ${
                  entry.userId === user?.id
                    ? 'bg-gradient-to-r from-[hsl(24,100%,50%)]/10 to-[hsl(142,71%,45%)]/10 border-[hsl(24,100%,50%)]'
                    : 'bg-secondary/30 border-border hover:border-[hsl(142,71%,45%)]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {getRankIcon(entry.rank)}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-lg">{entry.name}</span>
                        {entry.userId === user?.id && (
                          <Badge className="bg-gradient-to-r from-[hsl(24,100%,50%)] to-[hsl(142,71%,45%)] text-white">
                            You
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground flex gap-4 mt-1">
                        <span className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          {entry.points} pts
                        </span>
                        <span className="flex items-center gap-1">
                          <Flame className="w-3 h-3" />
                          {entry.streak} day streak
                        </span>
                        <span className="flex items-center gap-1">
                          <Activity className="w-3 h-3" />
                          {entry.workoutsCompleted} workouts
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold bg-gradient-to-r from-[hsl(24,100%,50%)] to-[hsl(142,71%,45%)] bg-clip-text text-transparent">
                      {filter === 'points'
                        ? entry.points.toLocaleString()
                        : filter === 'streak'
                        ? entry.streak
                        : entry.workoutsCompleted}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
