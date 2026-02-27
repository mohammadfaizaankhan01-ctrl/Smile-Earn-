import { INITIAL_USER, REWARD_PER_SMILE } from '../constants';
import { SmileRecord, User } from '../types';

const STORAGE_KEYS = {
  USER: 'smileearn_user',
  HISTORY: 'smileearn_history',
};

// Initialize if empty
if (!localStorage.getItem(STORAGE_KEYS.USER)) {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(INITIAL_USER));
}
if (!localStorage.getItem(STORAGE_KEYS.HISTORY)) {
  localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify([]));
}

export const getUser = (): User => {
  const str = localStorage.getItem(STORAGE_KEYS.USER);
  return str ? JSON.parse(str) : INITIAL_USER;
};

export const getHistory = (): SmileRecord[] => {
  const str = localStorage.getItem(STORAGE_KEYS.HISTORY);
  return str ? JSON.parse(str) : [];
};

export const recordSmile = async (score: number, imageUrl: string): Promise<{ newBalance: number, reward: number }> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 600));

  const user = getUser();
  const history = getHistory();

  // Calculate Reward (Bonus for high scores)
  const multiplier = score > 90 ? 2 : 1;
  const reward = REWARD_PER_SMILE * multiplier;

  const newRecord: SmileRecord = {
    id: Date.now().toString(),
    timestamp: Date.now(),
    score,
    reward,
    imageUrl
  };

  const updatedUser = {
    ...user,
    balance: user.balance + reward,
    totalSmiles: user.totalSmiles + 1
  };

  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser));
  localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify([newRecord, ...history]));

  return { newBalance: updatedUser.balance, reward };
};

export const withdrawFunds = async (): Promise<boolean> => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  const user = getUser();
  const updatedUser = { ...user, balance: 0 };
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser));
  return true;
};