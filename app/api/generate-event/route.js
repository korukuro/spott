import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    // 1. Tell Gemini to natively output JSON
    const model = genAI.getGenerativeModel({ 
        model: "gemini-2.5-flash",
        generationConfig: {
            responseMimeType: "application/json",
        }
    });

    // 2. You can simplify the prompt since Gemini knows it must be JSON
    const systemPrompt = `You are an event planning assistant. Generate event details based on the user's description.

Return this exact JSON structure:
{
  "title": "Event title (catchy and professional, single line)",
  "description": "Detailed event description in a single paragraph. Make it 2-3 sentences describing what attendees will learn and experience.",
  "category": "One of: tech, music, sports, art, food, business, health, education, gaming, networking, outdoor, community",
  "suggestedCapacity": 50,
  "suggestedTicketType": "free" // or "paid"
}

User's event idea: ${prompt}

Rules:
- Make title catchy and under 80 characters
- Description should be 2-3 sentences and informative
`;

    const result = await model.generateContent(systemPrompt);
    const text = result.response.text();

    console.log("Raw Gemini Output:", text);

    // 3. Parse it directly! No regex or markdown scrubbing needed.
    const eventData = JSON.parse(text);

    return NextResponse.json(eventData);
    
  } catch (error) {
    console.error("Error generating event:", error);
    
    // Quick tip: Catching that 429 Rate Limit error gracefully for the frontend
    if (error.message?.includes("429") || error.status === 429) {
        return NextResponse.json(
            { error: "Our AI is a bit overwhelmed right now. Please try again in a few seconds!" },
            { status: 429 }
        );
    }

    return NextResponse.json(
      { error: "Failed to generate event: " + error.message },
      { status: 500 }
    );
  }
}