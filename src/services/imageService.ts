const PAT = import.meta.env.VITE_CLARIFAI_PAT;
const USER_ID = 'gcp';
const APP_ID = 'generate';
const MODEL_ID = 'gemma-3-4b-it';

const metadata = new Headers();
metadata.append('Authorization', 'Key ' + PAT);

export const processImage = async (file: File): Promise<string> => {
  try {
    // Convert file to base64
    const reader = new FileReader();
    const base64Image = await new Promise<string>((resolve, reject) => {
      reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });


    const response = await fetch('http://localhost:3001/api/clarifai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ base64Image })
    });

    if (!response.ok) {
      throw new Error('Failed to process image with Clarifai');
    }

    const result = await response.json();
    console.log('Clarifai backend response:', result); // Debug log

    const concepts = result.outputs?.[0]?.data?.concepts;
    if (!concepts || concepts.length === 0) {
      throw new Error('No concepts found in Clarifai response');
    }
    const wasteItem = concepts[0].name.toLowerCase();
    return wasteItem || 'Unable to identify item';
  } catch (error) {
    console.error('Error processing image:', error);
    throw new Error('Failed to process image');
  }
};