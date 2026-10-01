import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // Initialize Gemini API client
  const ai = new GoogleGenAI();

  // High-fidelity AI Text-To-Speech Route
  app.post('/api/tts', async (req, res) => {
    try {
      const { text, voiceModel = 'adam', language = 'en' } = req.body;
      if (!text || typeof text !== 'string') {
        return res.status(400).json({ error: 'Text string is required' });
      }

      // Voice mapping:
      // Adam: Fenrir (deep, rich, masculine, authoritative narrator)
      // Puck: Charismatic, expressive storyteller
      // Charon: Deep, calm, reflective
      // Kore: Clear, warm, articulate
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

      // Trim text to avoid exceeding single utterance limits
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
        return res.status(500).json({ error: 'No audio generated from model' });
      }

      res.json({
        audioBase64: base64Audio,
        mimeType: 'audio/wav',
        voice: selectedVoiceName,
        voiceModel: voiceModel,
      });
    } catch (err: any) {
      console.error('TTS Generation error:', err);
      res.status(500).json({ error: err.message || 'TTS generation failed' });
    }
  });

  // Serve static files from public directory (images, videos, icons)
  app.use(express.static(path.join(__dirname, 'public')));

  const isProduction = process.env.NODE_ENV === 'production';
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
