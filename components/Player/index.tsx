import { VolumeOffIcon, VolumeUpIcon } from "@heroicons/react/outline";
import {
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  ReplyIcon,
  RewindIcon,
  SwitchHorizontalIcon,
} from "@heroicons/react/solid";
import { debounce } from "lodash";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../../atoms/songAtom";
import useSongInfo from "../../hooks/useSongInfo";
import useSpotify from "../../hooks/useSpotify";

const Player = () => {
  const spotifyAPI = useSpotify();
  const { data: session, status } = useSession();
  const songInfo = useSongInfo();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);

  function handlePlayPause() {
    spotifyAPI.getMyCurrentPlaybackState().then((data) => {
      if (data?.body?.is_playing) {
        spotifyAPI.pause();
        setIsPlaying(false);
      } else {
        spotifyAPI.play();
        setIsPlaying(true);
      }
    });
  }
  function fetchCurrentSong() {
    if (!songInfo) {
      spotifyAPI
        .getMyCurrentPlayingTrack()
        .then((data) => setCurrentTrackId(data?.body?.item?.id));
      spotifyAPI
        .getMyCurrentPlaybackState()
        .then((data) => setIsPlaying(data?.body?.is_playing));
    }
  }
  const debounceAdjustVolume = useCallback(
    debounce((volume) => spotifyAPI.setVolume(volume), 500),
    []
  );
  useEffect(() => {
    if (spotifyAPI.getAccessToken() && !currentTrackIdState) {
      fetchCurrentSong();
    }
  }, [currentTrackIdState, session, spotifyAPI]);

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debounceAdjustVolume(volume)?.catch((err) => console.error(err));
    }
  }, [volume]);
  return (
    <div className="h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
      {/* Left */}
      <div className="flex items-center space-x-4 ">
        <img
          className="hidden md:inline h-10 w-10"
          src={songInfo?.album?.images?.[0].url}
          alt={songInfo?.album?.name}
        />
        <div>
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists?.[0].name}</p>
        </div>
      </div>

      {/* Center */}
      <div className="flex items-center justify-evenly">
        <SwitchHorizontalIcon className="button" />
        <RewindIcon className="button" />
        {isPlaying ? (
          <PauseIcon onClick={handlePlayPause} className="button h-10 w-10" />
        ) : (
          <PlayIcon onClick={handlePlayPause} className="button h-10 w-10" />
        )}
        <FastForwardIcon className="button" />
        <ReplyIcon className="button" />
      </div>

      {/* Right */}
      <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
        <VolumeOffIcon
          onClick={() => volume > 0 && setVolume(volume - 10)}
          className="button"
        />
        <input
          type="range"
          min={0}
          max={100}
          className="w-14 md:w-28"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          name=""
          id=""
        />
        <VolumeUpIcon
          onClick={() => volume < 100 && setVolume(volume + 10)}
          className="button"
        />
      </div>
    </div>
  );
};

export default Player;
