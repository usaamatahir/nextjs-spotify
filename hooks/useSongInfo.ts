import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { Track } from "../atoms/playlistAtom";
import { currentTrackIdState } from "../atoms/songAtom";
import useSpotify from "./useSpotify";

function useSongInfo() {
  const spotifyAPI = useSpotify();
  const [currentIdTrack, setCurrentIdTrack] =
    useRecoilState(currentTrackIdState);
  const [songInfo, setSongInfo] = useState<Track | undefined>();

  useEffect(() => {
    const fetchSongInfo = async () => {
      if (currentTrackIdState) {
        const trackInfo = await fetch(
          `https://api.spotify.com/v1/tracks/${currentIdTrack}`,
          {
            headers: {
              Authorization: `Bearer ${spotifyAPI.getAccessToken()}`,
            },
          }
        )
          .then((res) => res.json())
          .catch((err) => console.log(err));
        setSongInfo(trackInfo);
      }
    };
    fetchSongInfo();
  }, [currentTrackIdState, spotifyAPI]);
  return songInfo;
}

export default useSongInfo;
