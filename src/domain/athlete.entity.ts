export type AthleteGender = 'male' | 'female' | 'non-binary' | 'other';

export interface Athlete {
  id: number;

  href: string;

  first: string;

  last: string;

  birthday: string;

  gender: AthleteGender;

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

