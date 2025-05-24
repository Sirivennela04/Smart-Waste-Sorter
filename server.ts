import express, { Application } from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { jsonrepair } from 'jsonrepair';

dotenv.config();

const app: Application = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

const GOOGLE_GEMINI_API_KEY = process.env.GOOGLE_GEMINI_API_KEY;
const CLARIFAI_PAT = process.env.CLARIFAI_PAT;
const CLARIFAI_USER_ID = 'clarifai';
const CLARIFAI_APP_ID = 'main';
const CLARIFAI_MODEL_ID = 'general-image-recognition';

app.post('/api/generate-waste-info', async (req, res) => {
  const { itemLabel } = req.body;

  const prompt = `
Classify the following item for waste sorting.
Return ONLY a valid JSON object with these fields:
- itemName (string)
- binType (string: "recycle", "compost", or "trash")
- description (string)
- tip (string)
- fact (string)

Do not include any explanation or text outside the JSON.

Item: "${itemLabel}"
`;

  try {
    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=' + GOOGLE_GEMINI_API_KEY,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );
    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    console.log('Gemini raw output:', text);
    console.error('Full Gemini API response:', JSON.stringify(data, null, 2));

    if (!text) {
      return res.status(200).json({ error: 'No text returned from Gemini', data });
    }

    let wasteInfo;
    try {
      wasteInfo = JSON.parse(text);
      res.json(wasteInfo);
    } catch (e) {
      try {
        wasteInfo = JSON.parse(jsonrepair(text));
        res.json(wasteInfo);
      } catch (e2) {
        return res.status(200).json({ error: 'Gemini did not return valid JSON', text });
      }
    }
  } catch (err) {
    res.status(500).json({ error: 'Google Gemini API request failed' });
  }
});

app.post('/api/clarifai', async (req, res) => {
  const { base64Image, itemLabel } = req.body;
  let label = itemLabel;

  // If image, use Clarifai to get label
  if (base64Image) {
    const clarifaiRaw = JSON.stringify({
      user_app_id: {
        user_id: CLARIFAI_USER_ID,
        app_id: CLARIFAI_APP_ID
      },
      inputs: [
        {
          data: {
            image: {
              base64: base64Image
            }
          }
        }
      ]
    });
    try {
      const clarifaiResponse = await fetch(
        `https://api.clarifai.com/v2/models/${CLARIFAI_MODEL_ID}/outputs`,
        {
          method: 'POST',
          headers: {
            'Authorization': 'Key ' + CLARIFAI_PAT,
            'Content-Type': 'application/json'
          },
          body: clarifaiRaw
        }
      );
      const clarifaiData = await clarifaiResponse.json();
      const concepts = clarifaiData.outputs?.[0]?.data?.concepts;
      if (!concepts || concepts.length === 0) {
        return res.status(200).json({ error: 'No concepts found in image.' });
      }
      label = concepts[0].name;
    } catch (err) {
      return res.status(500).json({ error: 'Clarifai image model failed.' });
    }
  }

  // Now use Gemini for info generation
  const prompt = `
Classify the following item for waste sorting.
Return ONLY a valid JSON object with these fields:
- itemName (string)
- binType (string: "recycle", "compost", or "trash")
- description (string)
- tip (string)
- fact (string)

Do not include any explanation or text outside the JSON.

Item: "${label}"
`;

  try {
    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=' + GOOGLE_GEMINI_API_KEY,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );
    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    console.log('Gemini raw output:', text);
    console.error('Full Gemini API response:', JSON.stringify(data, null, 2));

    if (!text) {
      return res.status(200).json({ error: 'No text returned from Gemini', data });
    }

    let wasteInfo;
    try {
      wasteInfo = JSON.parse(text);
      res.json(wasteInfo);
    } catch (e) {
      try {
        wasteInfo = JSON.parse(jsonrepair(text));
        res.json(wasteInfo);
      } catch (e2) {
        return res.status(200).json({ error: 'Gemini did not return valid JSON', text });
      }
    }
  } catch (err) {
    res.status(500).json({ error: 'Google Gemini API request failed' });
  }
});

app.listen(3001, () => console.log('Server running on port 3001'));
