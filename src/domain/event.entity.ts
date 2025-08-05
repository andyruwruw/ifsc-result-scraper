export type EventType = 'classic';

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

  location: string;

  organizer: string;

  organizerUrl: string;

  venue: string;

  venueDescription: string;

  cupName: string;

  country: string;

  eventImage: string;

  seriesImage: string;

  cover: string;

  infosheet: string;

  additionalInfoUrl: string;

  paraclimbing: boolean;

  selfJudged: boolean;
}

export interface EventListItemDiscipline {
  id: number;

  kind: string;

  event: number;

  createdAt: string;

  updatedAt: string;
}

export interface EventListItem {
  id: string;

  href: string;

  name: string;

  location: string;

  country: string;
  
  leagueSeason: number;

  cupName: string;

  cupId: number | null;

  starts: string;

  ends: string;

  localStart: string;

  localEnd: string;

  timezone: string;

  disciplines: EventListItemDiscipline[];
}