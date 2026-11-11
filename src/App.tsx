import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import LandingPage from '@/pages/LandingPage';
import Dashboard from '@/pages/Dashboard';
import WorkoutSession from '@/pages/WorkoutSession';
import TalentAssessment from '@/pages/TalentAssessment';
import WorkoutPlans from '@/pages/WorkoutPlans';
import Leaderboard from '@/pages/Leaderboard';
import Progress from '@/pages/Progress';
import NotFound from '@/pages/NotFound';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/workout" element={<WorkoutSession />} />
          <Route path="/talent" element={<TalentAssessment />} />
          <Route path="/plans" element={<WorkoutPlans />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
