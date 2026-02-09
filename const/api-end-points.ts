const API_SERVICES = {
  AUTH_SERVICE: "http://localhost:3000/api/auth",
  AI_AGENT_SERVICE: "http://localhost:3001/api/ai-agent-service",
  RECRUITMENT_SERVICE: "http://localhost:3002/api/recruitment-service",
};

export const AI_AGENT_SERVICE_ENDPOINTS = {
  GENERATE_JOB_DESCRIPTION: `${API_SERVICES.AI_AGENT_SERVICE}/generate-job-description`,
};

export const RECRUITMENT_SERVICE_ENDPOINTS = {
  CREATE_JOB: `${API_SERVICES.RECRUITMENT_SERVICE}/job/create-job`,
  GET_JOBS: `${API_SERVICES.RECRUITMENT_SERVICE}/job/get-jobs`,
  UPDATE_JOB: `${API_SERVICES.RECRUITMENT_SERVICE}/job/update-job`,
  DELETE_JOB: `${API_SERVICES.RECRUITMENT_SERVICE}/job/delete-job`,
};

export const AUTH_SERVICE_ENDPOINTS = {
  CREATE_ORGANIZATION: `${API_SERVICES.AUTH_SERVICE}/connect/organization/create`,
  GET_API_TOKEN: `${API_SERVICES.AUTH_SERVICE}/get-api-token`,
};
