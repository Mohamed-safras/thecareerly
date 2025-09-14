const FORBIDDEN = "/forbidden";
const HOME = "/";

const CONNECT_CANDIDATE_SIGNUP = "/connect/candidate/signup";
const CONNECT_CANDIDATE_lOGIN = "/connect/candidate/login";
const CONNECT_EMPLOYEE_LOGIN = "/connect/employee/login";

const API_AUTH = "/api/auth";
const HIRING = "/hiring";
const HIRING_JOBS = "/hiring/jobs";
const CREATE_JOB = "/hiring/jobs/create";

const EMPLOYEE_ONLY = ["/dashboard", "/jobs", "/teams"];
const CANDIDATE_ONLY = ["/applications", "/profile"];

export {
  HOME,
  FORBIDDEN,
  CONNECT_CANDIDATE_SIGNUP,
  CONNECT_CANDIDATE_lOGIN,
  HIRING,
  HIRING_JOBS,
  CREATE_JOB,
  EMPLOYEE_ONLY,
  CANDIDATE_ONLY,
  CONNECT_EMPLOYEE_LOGIN,
  API_AUTH,
};
