/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = "AIzaSyA7YXaveOXH7a0ElVIOAjMAcuALL40bbNo";

async function runChat(prompt) {
  const genAI = new GoogleGenerativeAI({ apiKey: API_KEY });
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARASSMENT,
      threshold: HarmBlockThreshold.MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HATE_SPEECH,
      threshold: HarmBlockThreshold.MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.MEDIUM_AND_ABOVE,
    },
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [],
  });

  const result = await chat.sendMessage(prompt);
  const response = result.response;
  console.log(response.text());
  return response.text();
}

export default runChat;
