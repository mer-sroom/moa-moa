//스포티파이
export interface TrackItem {
  id: string;
  name: string;
  artists: { name: string }[];
  preview_url: string | null;
  external_urls: { spotify: string };
  album: {
    images: { url: string; width: number; height: number }[];
  };
}
