export type ImageURLs = {
  image_url: string;
  large_image_url: string;
  small_image_url: string;
};

type Genre = {
  mal_id: number;
  type: string;
  name: string;
  url: string;
};

export type Anime = {
  title: string;
  synopsis: string;
  images: {
    jpg: ImageURLs;
    webp: ImageURLs;
  };
  genres: Genre[];
  score: number;
  scored_by: number;
  status: string;
  type: string;
  url: string;
  season: string;
  year: number;
  aired: {
    from: string;
    to: string;
  };
};
