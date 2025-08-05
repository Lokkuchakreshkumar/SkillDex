import { GoogleGenAI } from "@google/genai";
import express from "express"
import cors from "cors"
import dotenv from "dotenv"
const app = express();
dotenv.config();
app.use(cors());

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY1
});
let prompt = `You are an expert syllabus designer. Given a course name as input, generate a complete list of topics required to master that course.Give very detailed syllabus,the user should be interested to learn the course by the syllabus also

✅ Output Format:
Return the result as a **strict JSON array** of objects. Each object must contain:
- "title": A concise topic title
- "description": A brief but clear explanation of the topic

❌ Do not include any extra text, explanations, markdown, or code blocks.

📦 Format Example:
[
  {
    "title": "Topic Title",
    "description": "Brief explanation of the topic"
  },
  {
    "title": "Next Topic",
    "description": "Another explanation"
  }
]

🧠 Goal:
List **only the topics**, in learning order, that are essential for fully mastering the course.

---

Input course: CSS
`

async function main(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  console.log(response.text.replace(/```(?:json)?\s*|```/g, ''))
  return (response.text.replace(/```(?:json)?\s*|```/g, ''));
}

let syllabus = await main(prompt);
const modularPrompt = `
You are a professional curriculum architect.

🎯 Task:
Group the given syllabus into meaningful **modules**, where each module contains related topics. You must use **every single topic** from the input — do not omit or merge them.

🧠 Instructions:
- You are given an array of topics with "title" and "description".
- Your goal is to organize them into modules based on similarity or learning progression.
- Each module must contain 2–5 related topics.
- You may rename modules for clarity.
- **Do not skip or remove any topic from the input.**
- Each topic must be placed in **exactly one module**.
- You may shorten topic titles slightly for brevity if needed, but do not lose meaning.

✅ Output Format (strict JSON only, no extra text or markdown):
[
  {
    "module": "Module Name",
    "topics": [
      { "topic": "Original or Simplified Topic Title" },
      ...
    ]
  },
  ...
]

📦 Input Syllabus:
${JSON.stringify(syllabus)}
`;


await main(modularPrompt);


app.listen('8080',()=>{
    console.log('app is listening')
})