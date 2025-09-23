const HOME = "/";
const FORBIDDEN = "/forbidden";

const API_AUTH = "/api/auth";

// Employee paths
const CONNECT_EMPLOYEE_LOGIN = "/connect/employee/login";
const CONNECT_EMPLOYEE_DASHBOARD = "/connect/employee/dashboard";
const HIRING = "/hiring";
const HIRING_JOBS = "/connect/employee/hiring/jobs";
const CREATE_JOB = "/connect/employee/hiring/jobs/create";
const CREATE_JOB_API = "/api/employee/jobs/create-job";
const GENERATE_JD = "/api/employee/generate-jd";
const GENERATE_POSTER = "/api/employee/generate-poster";

const EMPLOYEE_ONLY = [CONNECT_EMPLOYEE_DASHBOARD, "/jobs", "/teams"];

// Employee paths
const CONNECT_CANDIDATE_SIGNUP = "/connect/candidate/signup";
const CONNECT_CANDIDATE_lOGIN = "/connect/candidate/login";
const CONNECT_CANDIDATE_DASHBOARD = "/connect/candidate/dashboard";

const CANDIDATE_ONLY = [CONNECT_CANDIDATE_DASHBOARD, "/profile"];

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
  CONNECT_CANDIDATE_DASHBOARD,
  CONNECT_EMPLOYEE_DASHBOARD,
  GENERATE_JD,
  GENERATE_POSTER,
  CREATE_JOB_API,
};
