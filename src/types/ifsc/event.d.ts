export type IfscEventType = 'classic';

export type IfscDiscipline = 'lead' | 'speed' | 'boulder';

export interface IfscEventRound {
  id: number;

  name: string;
}

export interface IfscEventPublicInformation {
  organiser_name: string | null;

  organiser_url: string | null;

  venue_name: string | null;

  description: string | null;
}

export interface IfscEventDCat {
  dcat_id: number;
  event_id: number;
  dcat_name: string;
  discipline_kind: string;
  category_id: number;
  category_name: string;
  status: string;
  status_as_of: string;
  ranking_as_of: string;
  category_rounds: any[];
  full_results_url: string;
  top_3_results: any[];
}

export interface IfscEvent {
  id: number;

  name: string;

  type: IfscEventType;

  league_id: number

  rounds: IfscEventRound[];

  league_season_id: number;

  season_id: number;

  starts_at: string;

  ends_at: string;

  local_start_date: string;

  local_end_date: string;

  timezone: { value: string };

  location: string;

  registration_url: string;

  public_information: IfscEventPublicInformation;

  cup_name: string;

  country: string;

  registration_deadline: string;

  removal_deadline: string;

  athlete_self_registration: boolean;

  team_official_self_registration: boolean;

  event_logo: string | null;

  series_logo: string | null;

  cover: string | null;

  infosheet_url: string;

  additional_info_url: string | null;

  is_paraclimbing_event: boolean;

  self_judged: boolean;

  d_cats: IfscEventDCat[];

  dcats: IfscEventDCat[];

  disciplines: { id: number; kind: IfscDiscipline; settings: any }[];

  computed_combined_categories: any[];

  team_ranking_disciplines: IfscDiscipline[];

  team_ranking_url: string;
}
