import { CANDIDATE_ONLY, EMPLOYEE_ONLY } from "@/constents/router-links";

export function isUnder(path: string, base: string) {
  return path === base || path.startsWith(base + "/");
}

export function wantsEmployee(path: string) {
  return EMPLOYEE_ONLY.some((employeePath) => isUnder(path, employeePath));
}

export function wantsCandidate(path: string) {
  return CANDIDATE_ONLY.some((candidatePath) => isUnder(path, candidatePath));
}
