// Baseline password policy: 8+ chars, 1 upper, 1 lower, 1 number, 1 special.
export const passwordPolicy =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()[\]{};:'",.<>/?\\|`~_\-+=]).{8,}$/;

// Simple E.164-ish phone check: allows + and 7–15 digits.
// Adjust to your exact rules or plug a phone lib if needed.
export const phonePolicy = /^\+?[0-9]{7,15}$/;
