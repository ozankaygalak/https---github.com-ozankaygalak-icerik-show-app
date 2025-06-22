// src/types/index.ts
export type RiskLevel = 'safe' | 'caution' | 'danger';

export type Ingredient = {
  name: string;
  risk: RiskLevel;
};

export type Product = {
  id: string;
  name: string;
  brand: string;
  image: string;
  ingredients: Ingredient[];
};
