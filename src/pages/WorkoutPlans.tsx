import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { workoutPlans } from '@/lib/workout-plans';
import { Calendar, Clock, Target, TrendingUp, ChevronRight, Flame, Dumbbell } from 'lucide-react';

export default function WorkoutPlans() {
  const navigate = useNavigate();
  const [selectedGoal, setSelectedGoal] = useState<string>('all');

  const goals = [
    { value: 'all', label: 'All Plans', icon: Dumbbell },
    { value: 'weight_loss', label: 'Weight Loss', icon: Flame },
    { value: 'muscle_gain', label: 'Muscle Gain', icon: TrendingUp },
    { value: 'endurance', label: 'Endurance', icon: Target },
    { value: 'flexibility', label: 'Flexibility', icon: Calendar },
  ];

  const filteredPlans = selectedGoal === 'all'
    ? workoutPlans
    : workoutPlans.filter(plan => plan.goal === selectedGoal);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'intermediate':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'advanced':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      default:
        return 'bg-secondary';
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            <span className="bg-gradient-to-r from-[hsl(24,100%,50%)] to-[hsl(142,71%,45%)] bg-clip-text text-transparent">
              Workout Plans
            </span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Personalized training programs tailored to your fitness goals
          </p>
        </div>

        {/* Goal Filter */}
        <div className="flex flex-wrap gap-3 mb-8">
          {goals.map((goal) => (
            <Button
              key={goal.value}
              onClick={() => setSelectedGoal(goal.value)}
              variant={selectedGoal === goal.value ? 'default' : 'outline'}
              className={`h-12 px-6 ${
                selectedGoal === goal.value
                  ? 'bg-gradient-to-r from-[hsl(24,100%,50%)] to-[hsl(142,71%,45%)]'
                  : 'border-2'
              }`}
            >
              <goal.icon className="w-5 h-5 mr-2" />
              {goal.label}
            </Button>
          ))}
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredPlans.map((plan) => (
            <Card
              key={plan.id}
              className="bg-background/50 backdrop-blur-sm border-2 border-border hover:border-[hsl(24,100%,50%)] transition-all duration-300 hover:shadow-xl group"
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                    <p className="text-muted-foreground">{plan.description}</p>
                  </div>
                  <Badge className={`${getLevelColor(plan.level)} border`}>
                    {plan.level}
                  </Badge>
                </div>
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {plan.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Target className="w-4 h-4" />
                    {plan.exercises.length} exercises
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  <div className="font-semibold text-sm text-muted-foreground mb-2">Exercises:</div>
                  {plan.exercises.slice(0, 4).map((exercise, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg"
                    >
                      <span className="font-medium">{exercise.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {exercise.sets} × {exercise.reps} {exercise.duration ? `(${exercise.duration}s)` : ''}
                      </span>
                    </div>
                  ))}
                  {plan.exercises.length > 4 && (
                    <div className="text-sm text-muted-foreground text-center">
                      +{plan.exercises.length - 4} more exercises
                    </div>
                  )}
                </div>
                <Button
                  onClick={() => navigate('/workout')}
                  className="w-full h-12 bg-gradient-to-r from-[hsl(24,100%,50%)] to-[hsl(142,71%,45%)] group-hover:opacity-90"
                >
                  Start This Plan
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPlans.length === 0 && (
          <Card className="bg-background/50 backdrop-blur-sm border-2 border-border">
            <CardContent className="pt-12 pb-12 text-center">
              <Calendar className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No Plans Found</h3>
              <p className="text-muted-foreground">
                Try selecting a different goal filter
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
