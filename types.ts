export interface User {
  id: string;
  name: string;
  avatarUrl: string;
  balance: number;
  totalSmiles: number;
}

export interface SmileRecord {
  id: string;
  timestamp: number;
  score: number;
  reward: number;
  imageUrl: string;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  avatarUrl: string;
  score: number;
  earnings: number;
}

export enum AppState {
  LANDING = 'LANDING',
  CAMERA = 'CAMERA',
  WALLET = 'WALLET',
  LEADERBOARD = 'LEADERBOARD',
}

export interface Sponsor {
  name: string;
  logo: string; // Using simple text or icon for this demo
}