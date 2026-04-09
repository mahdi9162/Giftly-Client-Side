export type FormData = {
  person: string;
  occasion: string;
  budget: string;
  interests: string[];
};

export type Recommendation = {
  _id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  alt: string;
  aiReason: string;
  label: string;
};

export type AiResponse = {
  success: boolean;
  explanation: string;
  products: Recommendation[];
  message?: string;
};

export type ResultStatus = 'idle' | 'loading' | 'success' | 'empty' | 'error';
