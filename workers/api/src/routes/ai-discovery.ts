/**
 * AI Discovery Route Handler
 * 
 * Calls Google Gemini API to generate product suggestions
 * based on user preferences. API key stays server-side.
 */

import type { Env } from '../index';

const GEMINI_MODEL = 'gemini-2.0-flash';

const SYSTEM_PROMPT = `You are an AI product discovery assistant for "Sumegha Handmades", a business specializing in unique handmade art products like Lippan Art, Custom Name Plates, Mandala Art, Evil Eye Decor, Shubh Symbols, and Decorative Hangings.

Your goal is to understand the user's preferences, occasions, or vibe, and suggest relevant handmade products.

For each suggestion, provide:
- productId: a unique identifier (e.g., "ai-suggest-1")
- name: product name
- description: detailed description highlighting handmade quality
- sale_price: estimated price in INR (e.g., 899, 1499)
- regular_price: slightly higher original price
- imageUrl: a placeholder URL like https://picsum.photos/seed/ai-suggest-1/800/1000
- categories: array of relevant categories

If you cannot find suitable products, explain why and return an empty array.

IMPORTANT: Return ONLY valid JSON matching this schema:
{
  "assistantResponse": "your friendly response text",
  "suggestedProducts": [{ productId, name, description, sale_price, regular_price, imageUrl, categories }]
}`;

export async function handleAiDiscovery(
    request: Request,
    env: Env,
    headers: Record<string, string>
): Promise<Response> {
    // Validate API key exists
    if (!env.GOOGLE_API_KEY) {
        return Response.json(
            { error: 'AI service not configured. Please set GOOGLE_API_KEY secret.' },
            { status: 503, headers }
        );
    }

    // Parse request body
    let body: { userQuery?: string };
    try {
        body = await request.json();
    } catch {
        return Response.json(
            { error: 'Invalid JSON body. Expected: { "userQuery": "your query" }' },
            { status: 400, headers }
        );
    }

    const { userQuery } = body;
    if (!userQuery || typeof userQuery !== 'string' || userQuery.trim().length === 0) {
        return Response.json(
            { error: 'userQuery is required and must be a non-empty string.' },
            { status: 400, headers }
        );
    }

    // Call Google Gemini API
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${env.GOOGLE_API_KEY}`;

    const geminiResponse = await fetch(geminiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [
                {
                    role: 'user',
                    parts: [{ text: `${SYSTEM_PROMPT}\n\nUser's preferences/occasion: "${userQuery}"` }],
                },
            ],
            generationConfig: {
                temperature: 0.8,
                maxOutputTokens: 2048,
                responseMimeType: 'application/json',
            },
        }),
    });

    if (!geminiResponse.ok) {
        const errorText = await geminiResponse.text();
        console.error('Gemini API error:', errorText);
        return Response.json(
            { error: 'AI service temporarily unavailable. Please try again.' },
            { status: 502, headers }
        );
    }

    const geminiData: any = await geminiResponse.json();
    const rawText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
        return Response.json(
            {
                assistantResponse: "I couldn't generate suggestions right now. Please browse our gallery!",
                suggestedProducts: [],
            },
            { headers }
        );
    }

    // Parse AI response
    try {
        const parsed = JSON.parse(rawText);
        return Response.json(parsed, { headers });
    } catch {
        // If JSON parsing fails, return the raw text as assistant response
        return Response.json(
            {
                assistantResponse: rawText,
                suggestedProducts: [],
            },
            { headers }
        );
    }
}
