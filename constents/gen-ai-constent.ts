import { ImageSizes } from "@/types/gen-AI";

const JD_MODEL = "gpt-4o-mini";
const JD_MAX_TOKENS = 350; // concise JD
const JD_TEMP = 0.4;

const POSTER_MODEL = "gpt-image-1";

const POSTER_SIZE = "1024x1024" as ImageSizes;

const QUESTION_PROMPT = `You are an expert interviewer.
Based on the following inputs, generate a well-structured list of high-quality interview questions:
Job Title: {{jobTitle}}
Job Description: {{jobDescription}}
Interview Duration: {{duration}} minutes
Interview Type: {{type}}
Notes: {{notes}}

🧠 Your task:

1. Analyze the job description to identify key responsibilities, required skills, and expected experience.
2. Generate a list of interview questions based on the interview duration (aim for 1 question per 5-10 minutes).
3. Adjust the number and depth of questions to match the interview duration.
4. Ensure the questions match the tone and structure of a real-life {{type}} interview.

🧾 Format your response in JSON format with an array list of questions.

Format:
{
  "interviewQuestions": [
    {
      "question": "Your question here",
      "type": "Technical/Behavioral/Experience/Problem Solving/Leadership"
    }
  ]
}

🎯 The goal is to create a structured, relevant, and time-optimized interview plan for a {{jobTitle}} role.

IMPORTANT: Return ONLY the JSON object, without any markdown code blocks or additional text.`;

export {
  POSTER_SIZE,
  JD_MODEL,
  JD_MAX_TOKENS,
  JD_TEMP,
  POSTER_MODEL,
  QUESTION_PROMPT,
};
