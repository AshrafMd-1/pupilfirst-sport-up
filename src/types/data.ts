export interface Article {
  id: number;
  title: string;
  thumbnail: string;
  sport: Sport;
  date: string;
  summary: string;
  teams: Team[];
}

export interface ArticleDetail extends Article {
  content: string;
}

export interface Sport {
  id: number;
  name: string;
}

export interface Team {
  id: number;
  name: string;
}

export interface Match {
  id: number;
  name: string;
  location: string;
  sportName: string;
  endsAt: string;
  isRunning: boolean;
  teams: Team[];
}

export interface MatchDetail extends Match {
  playingTeam: number;
  story: string;
  startsAt: string;
  score: object;
}

export interface Preference {
  preferences:{
    sports?: string[];
    teams?: string[];
  }
}
