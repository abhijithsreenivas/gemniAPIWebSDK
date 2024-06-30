import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

// Fetch your API_KEY
const API_KEY = "##### YOUR API KEY #####";
const genAI = new GoogleGenerativeAI(API_KEY);

// The Gemini 1.5 models are versatile and work with most use cases
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

export async function run(data, modelAssistant, msg, user) {
   const chat = model.startChat({
      history: [
         {
            role: "user",
            parts: [{ text: data }],
         },
         {
            role: "model",
            parts: [{ text: modelAssistant }],
         },
      ],
      generationConfig: {
         maxOutputTokens: 100,
      },
   });

   const result = await chat.sendMessage(msg);
   const response = await result.response;
   const text = response.text();
   appendMessage(user.botName, user.botImage, `left`, text);
}

