export interface Product {
  id: number;
  cat: string;
  badge: string;
  name: string;
  description: string;
  image: string;
}

export type CategoryKey = 'all' | 'inverters' | 'batteries' | 'panels' | 'systems' | 'accessories';

export interface Category {
  key: CategoryKey;
  label: string;
  icon: string;
  count: number;
}
