export type ImageURLs = {
  image_url: string;
  large_image_url: string;
  small_image_url: string;
};

export type SeasonNow = {
  images: {
    jpg: ImageURLs;
    webp: ImageURLs;
  };
  title: string;
  url: string;
  synopsis: string;
};
