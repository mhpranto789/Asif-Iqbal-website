import { GoogleGenAI } from '@google/genai';

export default async function handler(req: any, res: any) {
  // CORS Headers for Vercel Serverless Function
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        // use raw body
      }
    }

    const { text, voiceModel = 'adam' } = body || {};
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text string is required' });
    }

    // Check if GEMINI_API_KEY is available across common environment variable keys
    const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY || process.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(503).json({
        error: 'Gemini API Key is not configured on this Vercel deployment. Client fallback active.',
        fallbackToWebSpeech: true
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    let selectedVoiceName = 'Fenrir';
    if (voiceModel === 'puck') {
      selectedVoiceName = 'Puck';
    } else if (voiceModel === 'charon') {
      selectedVoiceName = 'Charon';
    } else if (voiceModel === 'kore') {
      selectedVoiceName = 'Kore';
    }

    const stylePrompt =
      voiceModel === 'adam'
        ? 'Deep, warm, resonant, authoritative narrative storyteller with a steady, captivating audiobook delivery'
        : 'Engaging, expressive, articulate biographical narrator';

    const cleanText = text.trim().slice(0, 1500);

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash-lite-tts',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: cleanText,
              speechMetadata: {
                style: stylePrompt,
              },
            },
          ],
        },
      ],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: selectedVoiceName },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) {
      return res.status(500).json({ error: 'No audio generated from model', fallbackToWebSpeech: true });
    }

    return res.status(200).json({
      audioBase64: base64Audio,
      mimeType: 'audio/wav',
      voice: selectedVoiceName,
      voiceModel: voiceModel,
    });
  } catch (err: any) {
    console.error('Vercel TTS error:', err);
    return res.status(500).json({
      error: err.message || 'TTS generation failed',
      fallbackToWebSpeech: true,
    });
  }
}
