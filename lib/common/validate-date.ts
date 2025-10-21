import { BadRequestError } from "../error/http-error";

export const isObjectId = (s: string | undefined | null): s is string =>
  typeof s === "string" && /^[a-fA-F0-9]{24}$/.test(s);

export const DatetimeLocalRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;

export function parseDatetimeLocal(value: string) {
  if (!DatetimeLocalRegex.test(value)) {
    throw new BadRequestError("Invalid datetime-local format");
  }
  // Append ":00" for seconds so it's full ISO local
  const withSeconds = value + ":00";
  return new Date(withSeconds);
}

/**
 * Calculate remaining days and percentage between two dates
 * - startDate = start date (e.g., job posting date)
 * - endDate   = end date (e.g., job closing date)
 * - Uses today's date to compute remaining time
 */
export function calculateRemainingInfo(
  startDate: string | Date,
  endDate: string | Date
) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const now = new Date();

  // Reset time to start of day for more accurate day calculations
  start.setHours(0, 0, 0, 0);
  end.setHours(23, 59, 59, 999);
  now.setHours(0, 0, 0, 0);

  // Calculate total duration between the two dates
  const totalDays = Math.ceil(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  );

  // Calculate remaining days from now to end date
  const rawRemaining = (end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
  const remainingDays = rawRemaining > 0 ? Math.ceil(rawRemaining) : 0;

  // Calculate elapsed days from start to now
  const rawElapsed = (now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
  const elapsedDays = rawElapsed > 0 ? Math.floor(rawElapsed) : 0;

  // Calculate remaining percentage (what's left of the total duration)
  let remainingPercentage = 0;
  if (totalDays > 0) {
    if (now < start) {
      // Before start date - 100% remaining
      remainingPercentage = 100;
    } else if (now > end) {
      // After end date - 0% remaining (overdue)
      remainingPercentage = 0;
    } else {
      // Between dates - calculate actual remaining percentage
      remainingPercentage = (remainingDays / totalDays) * 100;
    }
  }

  // Calculate progress percentage (how much time has passed)
  const progressPercentage = 100 - remainingPercentage;

  return {
    totalDays,
    elapsedDays,
    remainingDays,
    progressPercentage: Math.max(
      0,
      Math.min(100, Number(progressPercentage.toFixed(2)))
    ),
    remainingPercentage: Math.max(
      0,
      Math.min(100, Number(remainingPercentage.toFixed(2)))
    ),
    isOverdue: rawRemaining < 0,
    daysOverdue: rawRemaining < 0 ? Math.abs(Math.floor(rawRemaining)) : 0,
    isNotStarted: now < start,
  };
}
