import { wasteDatabase } from '../data/wasteData';
import { WasteResult } from '../types/waste';

export const identifyWaste = async (item: string): Promise<WasteResult> => {

  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const normalizedItem = item.toLowerCase().trim();
  
  for (const category of wasteDatabase.categories) {
    if (category.items.some(categoryItem => 
      normalizedItem.includes(categoryItem) || categoryItem.includes(normalizedItem)
    )) {
      const tip = category.tips[Math.floor(Math.random() * category.tips.length)];
      const fact = category.facts[Math.floor(Math.random() * category.facts.length)];
      
      return {
        itemName: item,
        binType: category.binType,
        description: category.description,
        tip,
        fact
      };
    }
  }
  
  return {
    itemName: item,
    binType: 'trash',
    description: "We couldn't identify this item specifically. When in doubt, it's safer to place it in the general waste bin.",
    tip: "Take a photo of the item next time for more accurate identification.",
    fact: "About 75% of American waste is recyclable, but we only recycle about 30% of it."
  };
};

export const identifyWasteWithClarifai = async (input: File | string): Promise<WasteResult> => {
  let response, wasteInfo;
  if (typeof input !== 'string') {
    const reader = new FileReader();
    const base64Image = await new Promise<string>((resolve, reject) => {
      reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(input);
    });
    response = await fetch('http://localhost:3001/api/clarifai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ base64Image })
    });
  } else {
    response = await fetch('http://localhost:3001/api/generate-waste-info', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ itemLabel: input })
    });
  }
  wasteInfo = await response.json();
  if (wasteInfo.error) {
    throw new Error(wasteInfo.error);
  }
  return wasteInfo as WasteResult;
};