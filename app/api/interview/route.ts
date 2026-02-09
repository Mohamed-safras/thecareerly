import { QUESTION_PROMPT } from "@/const/gen-ai-constent";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPEN_ROUTER_API_KEY,
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { jobPosition, jobDescription, duration, interviewType, notes } = body;

  const finalPrompt = QUESTION_PROMPT.replace("{{jobTitle}}", jobPosition)
    .replace("{{jobDescription}}", jobDescription)
    .replace("{{duration}}", duration)
    .replace("{{type}}", interviewType)
    .replace("{{notes}}", notes || "");

  console.log("Final Prompt:", finalPrompt);

  try {
    const completion = await openai.chat.completions.create({
      model: "nvidia/nemotron-3-nano-30b-a3b:free",
      messages: [{ role: "user", content: finalPrompt }],
    });

    console.log(completion.choices[0].message);

    return NextResponse.json(completion.choices[0].message);
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Failed to generate questions", details: err },
      { status: 500 },
    );
  }
}
