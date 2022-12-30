export interface IMovie {
  adult?: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title?: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date?: string | Date;
  title?: string;
  video?: boolean;
  vote_average: number;
  vote_count: number;
  company: string;
  first_air_date?: string | Date;
  name?: string;
  origin_country?: string[];
  original_name?: string;
}

export enum OriginCountry {
  Us = "US",
}

export interface iMovieCard {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: Date;
  first_air_date: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  seasons: Season[];
}

export interface iSlider {
  title: string;
  content: iMovieCard[];
}

export interface iMoviePage {
  adult:                 boolean;
  backdrop_path:         string;
  belongs_to_collection: null;
  budget:                number;
  genres:                Genre[];
  homepage:              string;
  id:                    number;
  imdb_id:               string;
  original_language:     OriginalLanguage;
  original_title:        string;
  overview:              string;
  popularity:            number;
  poster_path:           string;
  production_companies:  ProductionCompany[];
  production_countries:  ProductionCountry[];
  release_date:          Date;
  revenue:               number;
  runtime:               number;
  spoken_languages:      SpokenLanguage[];
  status:                string;
  tagline:               string;
  title:                 string;
  video:                 boolean;
  vote_average:          number;
  vote_count:            number;
  videos:                Videos;
  content_ratings:      ContentRatings;
  release_dates:         ReleaseDates;
  credits:               Credits;
  original_name: string;
  last_air_date: Date;
  first_air_date: Date;
  seasons: Season[];
  created_by: any[];
}

export interface ContentRatings {
  results: ContentRatingsResult[];
}

export interface ContentRatingsResult {
  iso_3166_1: string;
  rating:     string;
}

export interface CreatedBy {
  id:           number;
  credit_id:    string;
  name:         string;
  gender:       number;
  profile_path: null;
}

export enum Department {
  Art = "Art",
  Crew = "Crew",
  Production = "Production",
  Sound = "Sound",
}

export interface Cast {
  adult:                boolean;
  gender:               number;
  id:                   number;
  known_for_department: string;
  name:                 string;
  original_name:        string;
  popularity:           number;
  profile_path:         null | string;
  cast_id?:             number;
  character?:           string;
  credit_id:            string;
  order?:               number;
  department?:          Department;
  job?:                 string;
}

export interface Genre {
  id:   number;
  name: string;
}

export enum OriginalLanguage {
  Empty = "",
  En = "en",
  Es = "es",
  Fr = "fr",
}

export interface ProductionCompany {
  id:             number;
  logo_path:      string;
  name:           string;
  origin_country: string;
}

export interface ReleaseDates {
  results: ReleaseDatesResult[];
}

export interface ReleaseDatesResult {
  iso_3166_1:    string;
  release_dates: ReleaseDate[];
}

export interface ReleaseDate {
  certification: string;
  iso_639_1:     string | null;
  release_date:  Date;
  type:          number;
  note?:         string;
}

export interface VideosResult {
  iso_639_1:    string;
  iso_3166_1:   string;
  name:         string;
  key:          string;
  published_at: Date;
  site:         string;
  size:         number;
  type:         string;
  official:     boolean;
  id:           string;
}

export interface Credits {
  cast: Cast[];
  crew: Cast[];
}

export interface LastEpisodeToAir {
  air_date: Date;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
}

export interface Network {
  id: number;
  name: string;
  logo_path: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface Season {
  air_date: Date | null;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface Videos {
  results: Result[];
}

export interface Result {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: Date;
  id: string;
}

export interface BelongsToCollection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export enum ISO3166_1 {
  Us = "US",
}

export interface Result {
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: Date;
  id: string;
}
