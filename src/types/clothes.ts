export interface ImageFormat {
  url: string;
}

export interface ImageFormats {
  large?: ImageFormat;
  medium?: ImageFormat;
  small?: ImageFormat;
}

export interface ImageData {
  id: number;
  attributes: {
    url: string;
    formats: ImageFormats;
  };
}

export interface ClothesImage {
  data: ImageData[];
}

export interface ClothesAttributes {
  name: string;
  images: ClothesImage;
  price: number;
  discount?: number;
  description?: string;
  availableSizes?: string[];
  unavailableSizes?: string[];
  discountLabel?: string;
}

export interface ClothesItem {
  id: number;
  attributes: ClothesAttributes;
}

export interface ClothesResponse {
  data: ClothesItem[];
}

export interface SingleClothesResponse {
  data: ClothesItem;
}

export interface TryOnResponse {
  data: {
    result: string;
    generatedImageUrl: string;
    clothesId: number;
  };
}

export interface TryOnError {
  data: null;
  error: {
    status: number;
    name: string;
    message: string;
  };
}
