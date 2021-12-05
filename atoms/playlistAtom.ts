import { atom } from "recoil";

interface Image {
  height?: number | undefined;
  url: string;
  width?: number | undefined;
}

export interface Items {
  is_local: boolean;
  track: {
    id: string;
    name: string;
    artists: { name: string }[];
    album: {
      name: string;
      images?: Image[];
    };
    duration_ms: number;
    uri: string;
  };
  type?: string;
}
export interface Playlist {
  collaborative: boolean;
  description: string | null;
  external_urls: { spotify: string };
  followers: { href: string | null; total: number };
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: {
    display_name?: string | undefined;
    external_urls: { spotify: string };
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  //   primary_color: string | null;
  public: boolean | null;
  snapshot_id: string;
  tracks: {
    href: string;
    items: Items[];
    limit: number;
    next: string | null;
    offset: number;
  };
  type: string;
  uri: string;
}

const defaultPlaylist: Playlist = {
  collaborative: false,
  description: "",
  external_urls: { spotify: "" },
  followers: { href: "", total: 0 },
  href: "",
  id: "",
  images: [{ height: 0, url: "", width: 0 }],
  name: "",
  owner: {
    display_name: "",
    external_urls: { spotify: "" },
    href: "",
    id: "",
    type: "",
    uri: "",
  },
  //   primary_color: "",
  public: false,
  snapshot_id: "",
  tracks: { href: "", items: [], limit: 100, next: null, offset: 0 },
  type: "",
  uri: "",
};

export const playlistIdState = atom({
  key: "playlistIdState",
  default: "2WrGE7fdwZU7M531sga85B",
});

export const playlistState = atom({
  key: "playlistState",
  default: defaultPlaylist,
});
