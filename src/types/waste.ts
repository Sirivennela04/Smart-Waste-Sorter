export type BinType = 'recycle' | 'compost' | 'trash';

export interface WasteResult {
  itemName: string;
  binType: BinType;
  description: string;
  tip?: string;
  fact: string;
}

export interface WasteCategory {
  items: string[];
  binType: BinType;
  description: string;
  tips: string[];
  facts: string[];
}

export interface WasteDatabase {
  categories: WasteCategory[];
}