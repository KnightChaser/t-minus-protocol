export interface CountdownTarget {
  id: string;
  title: string;
  targetDate: Date;
}

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
}

export enum AppState {
  SETUP = 'SETUP',
  RUNNING = 'RUNNING',
  COMPLETE = 'COMPLETE'
}

export type ThemeColor = 'lime' | 'cyan' | 'amber' | 'fuchsia' | 'rose';
