export type AtheleteGender = 'male' | 'female' | 'non-binary' | 'other';

export interface Athelete {
  id: number;

  href: string;

  first: string;

  last: string;

  birthday: string;

  gender: AtheleteGender;

  pronouns: string;

  country: string;

  city: string;

  span: number;

  height: number;

  federation: number;

  instagram: string;

  website: string;

  youtube: string;

  nickname: string;

  image: string;

  story: string;
}

