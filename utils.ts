import { TimeLeft, ThemeColor } from './types';

/**
 * Calculate the remaining time until `targetDate`.
 * Returns a TimeLeft object with years, days, hours, minutes, seconds and isComplete.
 */
export function calculateTimeLeft(targetDate: Date): TimeLeft {
  const difference = +targetDate - +new Date();

  if (difference > 0) {
    const msPerYear = 1000 * 60 * 60 * 24 * 365.25;
    const years = Math.floor(difference / msPerYear);
    const remainingAfterYears = difference % msPerYear;
    const days = Math.floor(remainingAfterYears / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remainingAfterYears / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((remainingAfterYears / 1000 / 60) % 60);
    const seconds = Math.floor((remainingAfterYears / 1000) % 60);

    return {
      years,
      days,
      hours,
      minutes,
      seconds,
      isComplete: false
    };
  }

  return { years: 0, days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true };
}

/**
 * Split a number into its individual digits, padded to `minLength`.
 * Example: getDigits(5, 2) -> [0,5]
 */
export function getDigits(num: number, minLength: number): number[] {
  const str = num.toString().padStart(minLength, '0');
  return str.split('').map((s) => Number(s));
}

/**
 * Map theme to top gradient classes used by tailwind utilities in the app UI.
 */
export function getGradientForTheme(theme: ThemeColor): string {
  switch (theme) {
    case 'cyan':
      return 'from-cyan-400 via-blue-500 to-purple-500';
    case 'amber':
      return 'from-amber-400 via-orange-500 to-red-500';
    case 'fuchsia':
      return 'from-fuchsia-400 via-purple-500 to-indigo-500';
    case 'rose':
      return 'from-rose-500 via-red-600 to-orange-500';
    default:
      return 'from-lime-400 via-emerald-500 to-cyan-500';
  }
}

/**
 * Ambient color utility used by the background glows.
 */
export function getAmbientColor(theme: ThemeColor, pos: 'left' | 'right'): string {
  if (theme === 'cyan') return pos === 'left' ? 'bg-cyan-500/5' : 'bg-blue-500/5';
  if (theme === 'amber') return pos === 'left' ? 'bg-amber-500/5' : 'bg-orange-500/5';
  if (theme === 'fuchsia') return pos === 'left' ? 'bg-fuchsia-500/5' : 'bg-purple-500/5';
  if (theme === 'rose') return pos === 'left' ? 'bg-rose-500/5' : 'bg-red-500/5';
  return pos === 'left' ? 'bg-lime-500/5' : 'bg-emerald-500/5';
}

/**
 * Calculate an approximate count of heartbeats left until the target date.
 * Uses 80 beats per minute as the baseline (80/60 beats per second).
 */
export function heartbeatCount(targetDate: Date): number {
  const now = Date.now();
  const diff = Math.max(0, targetDate.getTime() - now);
  return Math.floor((diff / 1000) * (80 / 60));
}
