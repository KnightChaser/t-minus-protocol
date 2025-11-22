/**
 * Represents a countdown target created by the user.
 */
export interface CountdownTarget {
  /** Unique identifier for the target */
  id: string;
  /** Title shown in the UI */
  title: string;
  /** The Date/time that the countdown is targeting */
  targetDate: Date;
}

/**
 * Structured representation of the remaining time until target.
 */
export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  /** True when the countdown has reached or passed the target */
  isComplete: boolean;
}

/**
 * Top-level app state used to switch between setup, running and complete views.
 */
export enum AppState {
  SETUP = 'SETUP',
  RUNNING = 'RUNNING',
  COMPLETE = 'COMPLETE'
}

/**
 * Supported theme color keys used across the application.
 */
export type ThemeColor = 'lime' | 'cyan' | 'amber' | 'fuchsia' | 'rose';
