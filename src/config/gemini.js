import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "AIzaSyBUDpwdQ-PZ3sWGZbyRJY9DeQwCRLwyeT4" });

export async function main(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: [
        {
            role:"user",
            parts:[{text:prompt}]
        }
    ],
  });
  
  const reply = response.candidates?.[0]?.content?.parts?.[0]?.text;
  return reply || "No response received.";

  
}

//image+prompt

async function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result.split(',')[1]; // strip "data:image/jpeg;base64,"
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function sendImageAndPromptToGemini(prompt, imageFile) {
  const base64Image = await fileToBase64(imageFile);

  const response = await ai.models.generateContent({ 
    
    model: "gemini-2.0-flash" ,

  
    contents: [
      {
        role: "user",
        parts: [
          { text: prompt },
          {
            inlineData: {
              mimeType: imageFile.type,
              data: base64Image,
            },
          },
        ],
      },
    ],
  });

  const reply = response.candidates?.[0]?.content?.parts?.[0]?.text;
  return reply || "No response received.";
}