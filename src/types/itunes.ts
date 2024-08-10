export enum ITunesEnum {
  Movie = 'movie',
  Podcast = 'podcast',
  Music = 'music',
  MusicVideo = 'musicVideo',
  Audiobook = 'audiobook',
  ShortFilm = 'shortFilm',
  TvShow = 'tvShow',
  Software = 'software',
  Ebook = 'ebook',
  All = 'all',
}

export type ITunesResult = {
  wrapperType: string;
  kind: string;
  trackName: string;
  artistName: string;
  collectionName: string;
  artworkUrl60?: string;
  artworkUrl100?: string;
  previewUrl?: string;
  trackTimeMillis?: number;
  trackViewUrl?: string;
};

export type ITunesResponse = {
  resultCount: number;
  results: ITunesResult[];
};
