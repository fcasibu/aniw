export type ImageURLs = {
  image_url: string;
  large_image_url: string;
  small_image_url: string;
};

export type Anime = {
  title: string;
  synopsis: string;
  images: {
    jpg: ImageURLs;
    webp: ImageURLs;
  };
  score: number;
  type: string;
  year: number;
  url: string;
};
