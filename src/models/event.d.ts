export type EventType = 'classic';

export interface IfscEventPublicInformation {
  organizerName: string | null;

  organizerUrl: string | null;

  venueName: string | null;

  description: string | null;
}

export interface Event {
  id: number;

  href: string;

  name: string;

  type: EventType;

  league: number;

  leagueSeason: number;

  season: number;

  starts: string;

  ends: string;

  localStart: string;

  localEnd: string;

  timezone: string;

  publicInformation: IfscEventPublicInformation

  location: string;

  cupName: string;

  country: string;

  eventImage: string;

  seriesImage: string;
}