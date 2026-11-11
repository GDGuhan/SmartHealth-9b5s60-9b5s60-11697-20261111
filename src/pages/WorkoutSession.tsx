import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { storage } from '@/lib/storage';
import { analyzePose, estimateCalories } from '@/lib/ai-analysis';
import { Camera, Play, Pause, CheckCircle, Flame, Activity, Clock, Target } from 'lucide-react';
import { toast } from 'sonner';
import type { WorkoutSession, Exercise, User } from '@/types';

export default function WorkoutSessionPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [currentRep, setCurrentRep] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [accuracyScore, setAccuracyScore] = useState(0);
  const [feedback, setFeedback] = useState<string[]>([]);
  const [sessionComplete, setSessionComplete] = useState(false);

  const exercises: Exercise[] = [
    { id: '1', name: 'Squats', reps: 15, sets: 3, completed: false, accuracyScores: [] },
    { id: '2', name: 'Push-ups', reps: 12, sets: 3, completed: false, accuracyScores: [] },
    { id: '3', name: 'Lunges', reps: 10, sets: 3, completed: false, accuracyScores: [] },
    { id: '4', name: 'Plank', reps: 1, sets: 3, completed: false, accuracyScores: [] },
  ];

  const [exercisesList, setExercisesList] = useState(exercises);

  useEffect(() => {
    const currentUser = storage.getUser();
    if (!currentUser) {
      navigate('/dashboard');
      return;
    }
    setUser(currentUser);
  }, [navigate]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
        // Simulate real-time pose analysis
        simulatePoseAnalysis();
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, isPaused]);

  const simulatePoseAnalysis = () => {
    const currentEx = exercisesList[currentExercise];
    if (!currentEx) return;

    const analysis = analyzePose(currentEx.name, {});
    setAccuracyScore(analysis.accuracy);
    setFeedback(analysis.feedback);
  };

  const handleStartWorkout = () => {
    setIsActive(true);
    setIsPaused(false);
    toast.success('Workout started! Stay focused!');
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
    toast.info(isPaused ? 'Workout resumed' : 'Workout paused');
  };

  const handleCompleteRep = () => {
    const currentEx = exercisesList[currentExercise];
    if (currentRep + 1 >= currentEx.reps) {
      // Set complete
      if (currentSet >= currentEx.sets) {
        // Exercise complete
        const updatedExercises = [...exercisesList];
        updatedExercises[currentExercise].completed = true;
        updatedExercises[currentExercise].accuracyScores.push(accuracyScore);
        setExercisesList(updatedExercises);

        if (currentExercise + 1 >= exercisesList.length) {
          // Workout complete
          completeWorkout();
        } else {
          // Next exercise
          setCurrentExercise(currentExercise + 1);
          setCurrentSet(1);
          setCurrentRep(0);
          toast.success(`${currentEx.name} completed! Moving to next exercise.`);
        }
      } else {
        // Next set
        setCurrentSet(currentSet + 1);
        setCurrentRep(0);
        toast.info(`Set ${currentSet} complete! Rest and prepare for next set.`);
      }
    } else {
      // Next rep
      setCurrentRep(currentRep + 1);
    }
  };

  const completeWorkout = () => {
    if (!user) return;

    const totalCalories = exercisesList.reduce((sum, ex) => {
      return sum + estimateCalories(ex.name, 5, user.weight);
    }, 0);

    const avgAccuracy = exercisesList.reduce((sum, ex) => {
      const avg = ex.accuracyScores.reduce((s, score) => s + score, 0) / ex.accuracyScores.length;
      return sum + avg;
    }, 0) / exercisesList.length;

    const session: WorkoutSession = {
      id: Date.now().toString(),
      userId: user.id,
      date: new Date().toISOString(),
      type: 'Full Body',
      duration: elapsedTime,
      caloriesBurned: totalCalories,
      exercises: exercisesList,
      accuracyScore: Math.round(avgAccuracy),
      completed: true,
    };

    storage.addSession(session);

    // Update user points and streak
    const updatedUser = {
      ...user,
      points: user.points + Math.round(totalCalories / 10) + Math.round(avgAccuracy),
      streak: user.streak + 1,
    };
    storage.setUser(updatedUser);

    setSessionComplete(true);
    toast.success('🎉 Workout completed! Great job!');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (sessionComplete) {
    const totalCalories = user ? exercisesList.reduce((sum, ex) => sum + estimateCalories(ex.name, 5, user.weight), 0) : 0;
    return (
      <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-[hsl(24,100%,50%)] to-[hsl(142,71%,45%)] rounded-full mb-6">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl font-bold mb-4">Workout Complete! 🎉</h1>
            <p className="text-xl text-muted-foreground">You crushed it today!</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-gradient-to-br from-[hsl(24,100%,50%)]/10 to-[hsl(24,100%,50%)]/5 border-2 border-[hsl(24,100%,50%)]/30">
              <CardContent className="pt-6 text-center">
                <Flame className="w-12 h-12 mx-auto mb-3 text-[hsl(24,100%,50%)]" />
                <div className="text-4xl font-bold mb-1">{totalCalories}</div>
                <div className="text-muted-foreground">Calories Burned</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-[hsl(142,71%,45%)]/10 to-[hsl(142,71%,45%)]/5 border-2 border-[hsl(142,71%,45%)]/30">
              <CardContent className="pt-6 text-center">
                <Clock className="w-12 h-12 mx-auto mb-3 text-[hsl(142,71%,45%)]" />
                <div className="text-4xl font-bold mb-1">{formatTime(elapsedTime)}</div>
                <div className="text-muted-foreground">Duration</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-[hsl(271,91%,65%)]/10 to-[hsl(271,91%,65%)]/5 border-2 border-[hsl(271,91%,65%)]/30">
              <CardContent className="pt-6 text-center">
                <Target className="w-12 h-12 mx-auto mb-3 text-[hsl(271,91%,65%)]" />
                <div className="text-4xl font-bold mb-1">{accuracyScore}%</div>
                <div className="text-muted-foreground">Avg Accuracy</div>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => navigate('/progress')} size="lg" variant="outline" className="h-14 px-8 border-2">
              View Progress
            </Button>
            <Button onClick={() => navigate('/dashboard')} size="lg" className="h-14 px-8 bg-gradient-to-r from-[hsl(24,100%,50%)] to-[hsl(142,71%,45%)]">
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const currentEx = exercisesList[currentExercise];
  const completedExercises = exercisesList.filter(ex => ex.completed).length;

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            <span className="bg-gradient-to-r from-[hsl(24,100%,50%)] to-[hsl(142,71%,45%)] bg-clip-text text-transparent">
              Workout Session
            </span>
          </h1>
          <p className="text-lg text-muted-foreground">Real-time AI pose detection and form analysis</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Camera Feed & Analysis */}
          <div className="lg:col-span-2 space-y-6">
            {/* Camera Preview */}
            <Card className="bg-background/50 backdrop-blur-sm border-2 border-border overflow-hidden">
              <div className="relative aspect-video bg-gradient-to-br from-secondary/50 to-secondary/20 flex items-center justify-center">
                <Camera className="w-24 h-24 text-muted-foreground" />
                <div className="absolute top-4 left-4 right-4 flex justify-between">
                  <Badge className="bg-red-500/90 text-white">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse mr-2" />
                    LIVE
                  </Badge>
                  <Badge className="bg-background/90 text-foreground text-lg font-bold">
                    {formatTime(elapsedTime)}
                  </Badge>
                </div>
                {isActive && currentEx && (
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-background/95 backdrop-blur-sm p-4 rounded-lg border-2 border-border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">Form Accuracy</span>
                        <span className={`text-2xl font-bold ${accuracyScore >= 85 ? 'text-green-500' : accuracyScore >= 70 ? 'text-yellow-500' : 'text-red-500'}`}>
                          {accuracyScore}%
                        </span>
                      </div>
                      <Progress value={accuracyScore} className="h-2 mb-3" />
                      <div className="text-sm text-muted-foreground space-y-1">
                        {feedback.map((fb, idx) => (
                          <div key={idx}>• {fb}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Controls */}
            {!isActive ? (
              <Button onClick={handleStartWorkout} size="lg" className="w-full h-16 text-lg bg-gradient-to-r from-[hsl(24,100%,50%)] to-[hsl(142,71%,45%)]">
                <Play className="w-6 h-6 mr-2" />
                Start Workout
              </Button>
            ) : (
              <div className="flex gap-4">
                <Button onClick={handlePauseResume} size="lg" variant="outline" className="flex-1 h-16 text-lg border-2">
                  {isPaused ? <Play className="w-6 h-6 mr-2" /> : <Pause className="w-6 h-6 mr-2" />}
                  {isPaused ? 'Resume' : 'Pause'}
                </Button>
                <Button onClick={handleCompleteRep} size="lg" className="flex-1 h-16 text-lg bg-gradient-to-r from-[hsl(24,100%,50%)] to-[hsl(142,71%,45%)]" disabled={isPaused}>
                  <CheckCircle className="w-6 h-6 mr-2" />
                  Complete Rep
                </Button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Current Exercise */}
            {isActive && currentEx && (
              <Card className="bg-gradient-to-br from-[hsl(24,100%,50%)]/10 to-[hsl(142,71%,45%)]/10 border-2 border-border">
                <CardHeader>
                  <CardTitle>Current Exercise</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-3xl font-bold mb-2">{currentEx.name}</h3>
                    <Badge variant="secondary" className="text-lg px-4 py-1">
                      Set {currentSet} / {currentEx.sets}
                    </Badge>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-bold bg-gradient-to-r from-[hsl(24,100%,50%)] to-[hsl(142,71%,45%)] bg-clip-text text-transparent mb-2">
                      {currentRep} / {currentEx.reps}
                    </div>
                    <div className="text-sm text-muted-foreground">Reps</div>
                  </div>
                  <Progress value={(currentRep / currentEx.reps) * 100} className="h-3" />
                </CardContent>
              </Card>
            )}

            {/* Exercise List */}
            <Card className="bg-background/50 backdrop-blur-sm border-2 border-border">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Exercises</span>
                  <Badge variant="secondary">{completedExercises} / {exercisesList.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {exercisesList.map((exercise, index) => (
                  <div
                    key={exercise.id}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      index === currentExercise && isActive
                        ? 'bg-gradient-to-r from-[hsl(24,100%,50%)]/20 to-[hsl(142,71%,45%)]/20 border-[hsl(24,100%,50%)]'
                        : exercise.completed
                        ? 'bg-green-500/10 border-green-500/30'
                        : 'bg-secondary/30 border-border'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {exercise.completed ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <Activity className="w-5 h-5 text-muted-foreground" />
                        )}
                        <div>
                          <div className="font-semibold">{exercise.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {exercise.sets} sets × {exercise.reps} reps
                          </div>
                        </div>
                      </div>
                      {exercise.completed && exercise.accuracyScores.length > 0 && (
                        <Badge className="bg-gradient-to-r from-[hsl(24,100%,50%)] to-[hsl(142,71%,45%)] text-white">
                          {Math.round(exercise.accuracyScores[0])}%
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
