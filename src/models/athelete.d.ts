export type AtheleteGender = 'male' | 'female' | 'non-binary' | 'other';

export interface Athelete {
  id: number;

  href: string;

  first: string;

  last: string;

  birthday: string;

  gender: AtheleteGender;

  country: string;

  city: string;

  span: number;

  height: number;

  federation: number;

  instagram: string;

  image: string;
}

export interface Federation {
  id: number;

  name: string;

  abbreviation: string;

  href: string;
}