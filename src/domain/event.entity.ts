export type EventType = 'classic';

export interface IfscEventPublicInformation {
  organizerName: string | null;

  organizerUrl: string | null;

  venueName: string | null;

  description: string | null;
}

export interface IfscEventRound {
  id: number;

  name: string;
}

export interface IfscEventDiscipline {
  id: number;

  kind: string;

  settings: any | null;
}

export type IfscEventDisciplineKind = 'lead' | 'boulder' | 'speed' | 'para';

export type IfscEventDCatStatus = 'finished';

export interface IfscEventDcatCategoryRound {
  cateogory_round_id: number;
}

export interface IfscEventDcat {
  id: number;

  event: number;

  name: string;

  discipline: IfscEventDisciplineKind;

  category: number;

  categoryName: string;

  status: IfscEventDCatStatus;

  statusAsOf: string;

  rankingAsOf: string;

  results: string;
}

export interface Event {
  id: number;

  href: string;

  name: string;

  type: EventType;

  league: number;

  rounds: IfscEventRound[];

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

  cover: string | null;

  infosheet: string | null;

  additionalInfoUrl: string | null;

  paraclimbing: boolean;

  selfJudged: boolean;

  disciplines: IfscEventDiscipline[];
}
