import { LeaderboardEntry, Sponsor, User } from './types';

export const APP_NAME = "SmileEarn";
export const CURRENCY = "USDC";
export const REWARD_PER_SMILE = 0.01;

export const INITIAL_USER: User = {
  id: 'user_001',
  name: 'Alex Smiler',
  avatarUrl: 'https://picsum.photos/seed/alex/100/100',
  balance: 12.50,
  totalSmiles: 124,
};

export const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, name: "Sarah Joy", avatarUrl: "https://picsum.photos/seed/sarah/100/100", score: 9850, earnings: 450.25 },
  { rank: 2, name: "Mike Grin", avatarUrl: "https://picsum.photos/seed/mike/100/100", score: 8720, earnings: 380.10 },
  { rank: 3, name: "Jessica Laugh", avatarUrl: "https://picsum.photos/seed/jessica/100/100", score: 7540, earnings: 210.55 },
  { rank: 4, name: "David Beam", avatarUrl: "https://picsum.photos/seed/david/100/100", score: 6200, earnings: 150.00 },
];

export const SPONSORS: Sponsor[] = [
  { name: "Web3 Foundation", logo: "W3F" },
  { name: "Base", logo: "BASE" },
  { name: "Smile Labs", logo: "SL" },
  { name: "AI Collective", logo: "AIC" },
];

// Placeholder for MediaPipe FaceMesh CDN URLs if needed, 
// but we will use the npm package in standard environment.
// For this environment, we assume dependencies are resolved.
