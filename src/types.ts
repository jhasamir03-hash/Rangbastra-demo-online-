export interface Review {
  id: string;
  reviewer: string;
  location: string;
  occasion: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface FabricCare {
  fabric: string;
  lining: string;
  embellishment: string;
  washCare: string;
  components: string;
}

export interface Product {
  id: string;
  filename: string;
  image: string;
  name: string;
  price: string;
  rawPrice: number;
  category: 'LEHENGAS' | 'FESTIVE EDIT' | 'OCCASION WEAR';
  categories: Array<'ALL' | 'LEHENGAS' | 'FESTIVE EDIT' | 'OCCASION WEAR'>;
  color: string;
  colorHex: string;
  accentHex: string;
  description: string;
  sku: string;
  dispatchTimeline: string;
  rating: number;
  reviewCount: number;
  reviews: Review[];
  fabricCare: FabricCare;
  visualDetails: {
    palette: string;
    silhouette: string;
    embroidery: string;
    dupattaStyling: string;
  };
  reelId?: string;
  isHeroCandidate?: boolean;
  isFeaturedEdit?: boolean;
}

export interface AtelierReel {
  id: string;
  title: string;
  caption: string;
  duration: string;
  views: string;
  productId: string;
  productName: string;
  productPrice: string;
  productFilename: string;
  productImage?: string;
  tags: string[];
}

export type CategoryType = 'ALL' | 'LEHENGAS' | 'FESTIVE EDIT' | 'OCCASION WEAR';

