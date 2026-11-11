import type { User, WorkoutSession, TalentProfile, Challenge } from '@/types';

const STORAGE_KEYS = {
  USER: 'fitai_user',
  SESSIONS: 'fitai_sessions',
  TALENT: 'fitai_talent',
  CHALLENGES: 'fitai_challenges',
};

export const storage = {
  // User
  getUser(): User | null {
    const data = localStorage.getItem(STORAGE_KEYS.USER);
    return data ? JSON.parse(data) : null;
  },

  setUser(user: User): void {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },

  // Workout Sessions
  getSessions(): WorkoutSession[] {
    const data = localStorage.getItem(STORAGE_KEYS.SESSIONS);
    return data ? JSON.parse(data) : [];
  },

  addSession(session: WorkoutSession): void {
    const sessions = this.getSessions();
    sessions.unshift(session);
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
  },

  // Talent Profile
  getTalentProfile(): TalentProfile | null {
    const data = localStorage.getItem(STORAGE_KEYS.TALENT);
    return data ? JSON.parse(data) : null;
  },

  setTalentProfile(profile: TalentProfile): void {
    localStorage.setItem(STORAGE_KEYS.TALENT, JSON.stringify(profile));
  },

  // Challenges
  getChallenges(): Challenge[] {
    const data = localStorage.getItem(STORAGE_KEYS.CHALLENGES);
    return data ? JSON.parse(data) : getDefaultChallenges();
  },

  updateChallenges(challenges: Challenge[]): void {
    localStorage.setItem(STORAGE_KEYS.CHALLENGES, JSON.stringify(challenges));
  },
};

function getDefaultChallenges(): Challenge[] {
  const today = new Date();
  const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

  return [
    {
      id: '1',
      title: '7-Day Streak',
      description: 'Complete workouts for 7 consecutive days',
      points: 100,
      progress: 0,
      target: 7,
      completed: false,
      expiresAt: weekFromNow.toISOString(),
    },
    {
      id: '2',
      title: '1000 Calories Burned',
      description: 'Burn 1000 calories this week',
      points: 150,
      progress: 0,
      target: 1000,
      completed: false,
      expiresAt: weekFromNow.toISOString(),
    },
    {
      id: '3',
      title: 'Perfect Form Master',
      description: 'Achieve 90%+ accuracy in 5 workouts',
      points: 200,
      progress: 0,
      target: 5,
      completed: false,
      expiresAt: weekFromNow.toISOString(),
    },
  ];
}
